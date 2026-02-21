import { createWriteStream } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import dotenv from "dotenv";

dotenv.config();

const SERP_API_KEY = process.env.SERP_API_KEY;
if (!SERP_API_KEY) {
  console.error("SERP_API_KEY is missing. Add it to .env before running this script.");
  process.exit(1);
}

const SOURCE_MARKDOWN = resolve("effect-intellectual-lineage.md");
const OUTPUT_DIR = resolve("public/images/figures");
const METADATA_PATH = resolve("src/data/figures.generated.json");
const TEMP_DIR = resolve(".tmp/figure-images");
const QUALITY = 82;
const SEED_FIGURES = [
  "Alan Turing",
  "William Alvin Howard",
  "Saunders Mac Lane",
  "Samuel Eilenberg",
  "Eugenio Moggi",
  "Philip Wadler",
  "Tony Hoare",
  "Michael Arnaldi"
];
const QUERY_HINTS = {
  "Eugenio Moggi": "computer scientist",
  "Haskell Brooks Curry": "mathematician",
  "Joe Armstrong": "Erlang",
  "Martin Sústrik": "ZeroMQ",
  "Nathaniel J. Smith": "Python Trio programming",
  "Michael Arnaldi": "TypeScript Effect"
};
const TRUSTED_HOSTS = [
  "wikipedia.org",
  "wikimedia.org",
  "britannica.com",
  "acm.org",
  "mit.edu",
  "stanford.edu",
  "historyofprogramminglanguages.info",
  "jetbrains.com",
  "medium.com"
];

const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const maxFigures = limitArg ? Number.parseInt(limitArg.split("=")[1], 10) : 18;

const slugify = (value) => {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const normalizeForMatch = (value) => {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const extractFigureNames = (markdown) => {
  const matches = markdown.matchAll(/\*\*([\p{L}][\p{L}.'\-\s]+?)\*\*\s*\((?:born\s+)?\d{4}(?:[–-]\d{4})?\)/gu);
  const unique = new Set(SEED_FIGURES);

  for (const match of matches) {
    const name = match[1].trim();
    if (name.length < 4 || name.length > 40) {
      continue;
    }

    if (name.includes("Effect") || name.includes("TypeScript")) {
      continue;
    }

    unique.add(name);
  }

  return [...unique].slice(0, maxFigures);
};

const calculateCandidateScore = (candidate, name) => {
  const nameSlug = normalizeForMatch(name);
  const nameTokens = nameSlug.split(" ").filter(Boolean);
  const lastName = nameTokens.at(-1) ?? "";

  const haystack = normalizeForMatch(
    [candidate.title, candidate.source, candidate.link, candidate.original].filter(Boolean).join(" ")
  );

  const host = (() => {
    try {
      return new URL(candidate.link ?? candidate.original).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();

  let score = 0;

  if (nameSlug && haystack.includes(nameSlug)) {
    score += 40;
  }

  const matchedTokenCount = nameTokens.filter((token) => haystack.includes(token)).length;
  if (matchedTokenCount >= 2) {
    score += 20;
  }
  score += matchedTokenCount * 2;

  if (lastName && haystack.includes(lastName)) {
    score += 10;
  }

  if (TRUSTED_HOSTS.some((trustedHost) => host.endsWith(trustedHost))) {
    score += 25;
  }

  const dimensions = Number(candidate.original_width ?? 0) * Number(candidate.original_height ?? 0);
  if (dimensions > 800 * 800) {
    score += 12;
  } else if (dimensions > 400 * 400) {
    score += 7;
  }

  return score;
};

const hasReasonableNameMatch = (candidate, name, hint = "") => {
  const nameSlug = normalizeForMatch(name);
  const nameTokens = nameSlug.split(" ").filter(Boolean);
  const lastName = nameTokens.at(-1) ?? "";
  const hintTokens = normalizeForMatch(hint)
    .split(" ")
    .filter((token) => token.length >= 4);
  const haystack = normalizeForMatch(
    [candidate.title, candidate.source, candidate.link, candidate.original].filter(Boolean).join(" ")
  );

  const fullNameMatch = Boolean(nameSlug && haystack.includes(nameSlug));
  const matchedTokenCount = nameTokens.filter((token) => haystack.includes(token)).length;
  const matchRatio = nameTokens.length === 0 ? 0 : matchedTokenCount / nameTokens.length;
  const ratioMatch = Boolean(lastName && haystack.includes(lastName) && matchRatio >= 0.75);
  const baseMatch = fullNameMatch || ratioMatch;

  if (!baseMatch) {
    return false;
  }

  if (hintTokens.length === 0) {
    return true;
  }

  return hintTokens.some((token) => haystack.includes(token));
};

const pickBestImageResult = (results, name, hint = "") => {
  if (!Array.isArray(results)) {
    return null;
  }

  const usable = results
    .filter((item) => typeof item.original === "string" && item.original.startsWith("http"))
    .filter((item) => !item.original.toLowerCase().endsWith(".gif"))
    .filter((item) => hasReasonableNameMatch(item, name, hint));
  const ranked = usable
    .map((candidate) => ({ candidate, score: calculateCandidateScore(candidate, name) }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.candidate ?? null;
};

const downloadFile = async (url, targetPath) => {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
      accept: "image/*,*/*;q=0.8",
      referer: "https://www.google.com/"
    }
  });
  if (!response.ok || !response.body) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`URL did not return an image (${contentType || "unknown content type"})`);
  }

  await pipeline(response.body, createWriteStream(targetPath));
};

const convertToWebp = (sourcePath, targetPath) => {
  const conversion = spawnSync("cwebp", ["-quiet", "-q", String(QUALITY), sourcePath, "-o", targetPath], {
    stdio: "inherit"
  });

  if (conversion.status !== 0) {
    throw new Error(`cwebp failed for ${basename(sourcePath)}`);
  }
};

const main = async () => {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(TEMP_DIR, { recursive: true });

  const markdown = await readFile(SOURCE_MARKDOWN, "utf-8");
  const figureNames = extractFigureNames(markdown);

  if (figureNames.length === 0) {
    console.error("No figure names were extracted from markdown.");
    process.exit(1);
  }

  const metadata = [];

  for (const [index, name] of figureNames.entries()) {
    const query = `${name} portrait`;
    const hint = QUERY_HINTS[name] ?? "";
    const slug = slugify(name);
    const outputPath = resolve(OUTPUT_DIR, `${slug}.webp`);

    try {
      const url = new URL("https://serpapi.com/search.json");
      url.searchParams.set("engine", "google_images");
      url.searchParams.set("safe", "active");
      url.searchParams.set("api_key", SERP_API_KEY);
      url.searchParams.set("num", "20");

      const quotedName = `\"${name}\"`;
      const queryCandidates = [
        `${quotedName} portrait site:wikipedia.org`,
        `${quotedName} portrait wikimedia commons`,
        hint ? `${quotedName} ${hint} portrait` : null,
        hint ? `${quotedName} ${hint} photo` : null,
        query
      ].filter(Boolean);
      let bestImage = null;

      for (const candidateQuery of queryCandidates) {
        url.searchParams.set("q", candidateQuery);
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`SERP API request failed: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        bestImage = pickBestImageResult(json.images_results, name, hint);
        if (bestImage) {
          break;
        }
      }

      if (!bestImage) {
        console.warn(`[${index + 1}/${figureNames.length}] No image result found for ${name}`);
        continue;
      }

      const originalUrl = bestImage.original ?? bestImage.thumbnail;
      const guessedExtension = extname(new URL(originalUrl).pathname) || ".jpg";
      const tempPath = resolve(TEMP_DIR, `${slug}${guessedExtension}`);

      try {
        await downloadFile(originalUrl, tempPath);
      } catch (error) {
        if (!bestImage.thumbnail) {
          throw error;
        }
        await downloadFile(bestImage.thumbnail, tempPath);
      }
      convertToWebp(tempPath, outputPath);
      await rm(tempPath, { force: true });

      metadata.push({
        name,
        image: `/images/figures/${slug}.webp`,
        query,
        sourcePage: bestImage.link ?? originalUrl,
        sourceDomain: bestImage.source ?? null,
        sourceTitle: bestImage.title ?? null,
        width: bestImage.original_width ?? null,
        height: bestImage.original_height ?? null
      });

      console.log(`[${index + 1}/${figureNames.length}] saved ${name}`);
    } catch (error) {
      console.warn(`[${index + 1}/${figureNames.length}] failed ${name}: ${error.message}`);
    }

    await sleep(350);
  }

  await writeFile(METADATA_PATH, `${JSON.stringify(metadata, null, 2)}\n`);
  await rm(TEMP_DIR, { recursive: true, force: true });

  console.log(`\nDone. Saved ${metadata.length} images and metadata to ${METADATA_PATH}.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
