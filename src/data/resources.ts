export type ResourceCategory = "Blog Post" | "Video" | "Interactive" | "Website";

export type Resource = {
  id: string;
  title: string;
  author: string;
  date?: string;
  url: string;
  summary: string;
  category: ResourceCategory;
};

export const resourceCategories: ResourceCategory[] = [
  "Blog Post",
  "Video",
  "Interactive",
  "Website",
];

export const resources: Resource[] = [
  // Blog Posts
  {
    id: "type-driven-2026",
    title: "Why Effect is Becoming the Go-To Choice for TypeScript APIs",
    author: "Type Driven",
    date: "2026-01-20",
    url: "https://blog.type-driven.com/effect-ts-new-standard/",
    summary:
      "Examines how AI coding assistants increasingly recommend Effect over traditional Node.js frameworks, arguing that typed errors, structured concurrency, and built-in observability position it as the emerging standard for production TypeScript backends.",
    category: "Blog Post",
  },
  {
    id: "lytras-2024",
    title: "My Impressions of Effect-TS",
    author: "Dimitrios Lytras",
    date: "2024-02-09",
    url: "https://dnlytras.com/blog/effect-ts",
    summary:
      "A practical experience report on treating errors as values with Effect-TS, demonstrating typed error handling and validation while advocating pragmatic, incremental adoption.",
    category: "Blog Post",
  },
  {
    id: "hunter-2025",
    title: "The Case for Effect",
    author: "Ryan Hunter",
    date: "2025",
    url: "https://ryanhunter.io/the-case-for-effect/",
    summary:
      "Argues that Effect will become critical infrastructure for AI agents and agentic workflows due to its strict runtime guarantees, explicit error handling, and alignment with emerging regulatory requirements for autonomous systems.",
    category: "Blog Post",
  },
  {
    id: "niser-2025",
    title: "The Difficulty of Complexity",
    author: "Ethan Niser",
    date: "2025-08-29",
    url: "https://ethanniser.dev/blog/the-difficulty-of-complexity",
    summary:
      "Explores the distinction between complexity and difficulty, arguing that Effect follows the playbook of innovations like React by providing powerful abstractions that reduce difficulty when handling complex software requirements.",
    category: "Blog Post",
  },
  {
    id: "arnaldi-2025",
    title: "TS+ Post-Mortem",
    author: "Michael Arnaldi",
    date: "2025-07-03",
    url: "https://effect.website/blog/ts-plus-postmortem/#ai-development-with-effect",
    summary:
      "Recounts the experimental TS+ TypeScript compiler fork, its goals and achievements, and why it was abandoned. Emphasizes that advanced AI models excel at understanding and generating Effect code.",
    category: "Blog Post",
  },

  // Videos
  {
    id: "barake-cache-2026",
    title: "Cache | Effect in 5(ish)",
    author: "Lucas Barake",
    date: "2026-01-12",
    url: "https://www.youtube.com/watch?v=e0qYYn4deWs",
    summary:
      "A concise tutorial covering Effect's Cache module, including cache creation, concurrent deduplication, refresh vs invalidate strategies, error caching, compound keys, and telemetry.",
    category: "Video",
  },
  {
    id: "barake-actor-2026",
    title: "Actor Model | Effect.ts Cluster",
    author: "Lucas Barake",
    date: "2026-01-26",
    url: "https://www.youtube.com/watch?v=Pp9ufBrtNgE",
    summary:
      "A deep dive into the Actor Model as implemented in Effect.ts Cluster, covering horizontal scaling, sharding, virtual actors, persistence, distributed transactions, and failover recovery.",
    category: "Video",
  },
  {
    id: "leaderiop-http-2025",
    title: "Effect's HTTP Platform",
    author: "Leader Iop",
    date: "2025-09-25",
    url: "https://www.youtube.com/watch?v=mUB1damANE8",
    summary:
      "A comprehensive tutorial on the Effect Platform HTTP module for building robust, type-safe HTTP applications, covering servers, clients, routing, middleware, retries, and integration with Schema and Config.",
    category: "Video",
  },
  {
    id: "corpa-functor-2025",
    title: "Effect is a Functor... (and, of course, many more things!!)",
    author: "Flavio Corpa",
    date: "2025-08-23",
    url: "https://www.youtube.com/watch?v=S_42ROXYQQ0",
    summary:
      "An educational video explaining what a Functor is using TypeScript, building toward a connection between the concept and the Effect library.",
    category: "Video",
  },
  {
    id: "effect-bedrock-2025",
    title: "Amazon Bedrock AI Provider Integration for the Effect AI SDKs",
    author: "Effect (Maxwell Brown)",
    date: "2025-08-14",
    url: "https://www.youtube.com/watch?v=foXwx_5I_v4",
    summary:
      "Official Effect channel stream covering the integration of Amazon Bedrock as an AI provider for the Effect AI SDKs.",
    category: "Video",
  },
  {
    id: "langton-secret-2025",
    title: "The Simple Secret Behind Effect's Power",
    author: "Kit Langton",
    date: "2025-08-05",
    url: "https://www.youtube.com/watch?v=F5aWLtEdNjE",
    summary:
      "A talk exploring the fundamental design principle that makes Effect powerful as a TypeScript library.",
    category: "Video",
  },

  // Interactive
  {
    id: "langton-visual-effect",
    title: "Visual Effect",
    author: "Kit Langton",
    url: "https://effect.kitlangton.com/",
    summary:
      "An interactive visualization tool that demonstrates how Effect operations execute over time using animated visual representations and synchronized sound effects.",
    category: "Interactive",
  },

  // Websites
  {
    id: "langton-tweet-2026",
    title: "Kit Langton on Effect (X Article)",
    author: "Kit Langton",
    date: "2026-01-29",
    url: "https://x.com/kitlangton/status/2016945444312498340",
    summary:
      "A post by Kit Langton linking to an article about Effect on X/Twitter.",
    category: "Website",
  },
  {
    id: "effect-institute",
    title: "Effect Institute",
    author: "Kit Langton",
    url: "https://www.effect.institute/",
    summary:
      "An interactive educational platform for learning the Effect TypeScript library, featuring narrated lessons with a real human voice, interactive code examples, and chapter-based progression.",
    category: "Website",
  },
];
