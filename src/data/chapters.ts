export const chapterSummaries: Record<string, string> = {
  "1": "How anonymous functions became the core model of computation.",
  "2": "Why types can be read like logical claims about programs.",
  "3": "How category theory gave us compositional abstractions like monads.",
  "4": "How Lisp and ML made functional ideas practical for real software.",
  "5": "How Haskell turned monads from theory into everyday programming patterns.",
  "6": "How effect systems track side effects and algebraic effects structure them.",
  "7": "How type-driven modeling prevents impossible states before runtime.",
  "8": "How fibers and structured concurrency made async programs safer.",
  "9": "How Scala and ZIO prepared the ground for Effect in TypeScript.",
  "10": "How Effect combines these threads into one coherent toolkit.",
  "11": "A chronological map from foundational papers to modern practice.",
  "12": "Primary references for deeper reading."
};

export type Era = {
  label: string;
  years: string;
  color: string;
  darkColor: string;
};

export const eras: Era[] = [
  { label: "Foundations", years: "1930s–1960s", color: "#8f5c17", darkColor: "#dba450" },
  { label: "Theory Matures", years: "1970s–1980s", color: "#7a5520", darkColor: "#c4903a" },
  { label: "Monads & FP", years: "1987–1995", color: "#4a6a3a", darkColor: "#8ab87a" },
  { label: "Effects & Types", years: "1986–2013", color: "#3d7a7a", darkColor: "#6abfbf" },
  { label: "Modern Era", years: "2004–Present", color: "#266a67", darkColor: "#92d2ce" },
];

export type ChapterMeta = {
  number: string;
  eraIndex: number;
  yearRange: string;
  keyFigures: string[];
  externalLinks: { label: string; url: string }[];
};

export const chapterMeta: Record<string, ChapterMeta> = {
  "1": {
    number: "1",
    eraIndex: 0,
    yearRange: "1932–1936",
    keyFigures: ["Alonzo Church", "Alan Turing"],
    externalLinks: [
      { label: "Lambda Calculus (Wikipedia)", url: "https://en.wikipedia.org/wiki/Lambda_calculus" },
      { label: "Church's 1936 paper (PDF)", url: "https://ics.uci.edu/~lopes/teaching/inf212W12/readings/church.pdf" },
      { label: "Church-Turing thesis", url: "https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis" },
    ],
  },
  "2": {
    number: "2",
    eraIndex: 0,
    yearRange: "1934–1969",
    keyFigures: ["Haskell Brooks Curry", "William Alvin Howard", "Per Martin-Löf"],
    externalLinks: [
      { label: "Curry-Howard Correspondence", url: "https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence" },
      { label: "Wadler: Propositions as Types", url: "https://dl.acm.org/doi/fullHtml/10.1145/2699407" },
      { label: "Martin-Löf Type Theory (PDF)", url: "https://archive-pml.github.io/martin-lof/pdfs/Bibliopolis-Book-retypeset-1984.pdf" },
    ],
  },
  "3": {
    number: "3",
    eraIndex: 0,
    yearRange: "1945–1971",
    keyFigures: ["Saunders Mac Lane", "Samuel Eilenberg", "Eugenio Moggi"],
    externalLinks: [
      { label: "Category Theory (Stanford)", url: "https://plato.stanford.edu/entries/category-theory/" },
      { label: "Moggi 1989 (PDF)", url: "https://www.cs.cmu.edu/~crary/819-f09/Moggi89.pdf" },
      { label: "Eilenberg-Mac Lane 1945 (PDF)", url: "https://www.ams.org/journals/tran/1945-058-00/S0002-9947-1945-0013131-6/S0002-9947-1945-0013131-6.pdf" },
    ],
  },
  "4": {
    number: "4",
    eraIndex: 1,
    yearRange: "1958–1978",
    keyFigures: ["John McCarthy", "Robin Milner"],
    externalLinks: [
      { label: "Lisp (Wikipedia)", url: "https://en.wikipedia.org/wiki/Lisp_(programming_language)" },
      { label: "ML (Wikipedia)", url: "https://en.wikipedia.org/wiki/ML_(programming_language)" },
      { label: "Milner 1978 (PDF)", url: "https://homepages.inf.ed.ac.uk/wadler/papers/papers-we-love/milner-type-polymorphism.pdf" },
      { label: "Strachey 1967 (PDF)", url: "https://www.cs.cmu.edu/~crary/819-f09/Strachey67.pdf" },
    ],
  },
  "5": {
    number: "5",
    eraIndex: 2,
    yearRange: "1987–1995",
    keyFigures: ["Philip Wadler"],
    externalLinks: [
      { label: "Haskell (Wikipedia)", url: "https://en.wikipedia.org/wiki/Haskell_(programming_language)" },
      { label: "A History of Haskell (PDF)", url: "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/history.pdf" },
      { label: "Monad (Wikipedia)", url: "https://en.wikipedia.org/wiki/Monad_(functional_programming)" },
    ],
  },
  "6": {
    number: "6",
    eraIndex: 3,
    yearRange: "1986–2013",
    keyFigures: [],
    externalLinks: [
      { label: "Effect system (Wikipedia)", url: "https://en.wikipedia.org/wiki/Effect_system" },
      { label: "Algebraic effects (Wikipedia)", url: "https://en.wikipedia.org/wiki/Algebraic_effects" },
      { label: "Plotkin & Pretnar 2009 (PDF)", url: "https://homepages.inf.ed.ac.uk/gdp/publications/Effect_Handlers.pdf" },
      { label: "Koka language", url: "https://koka-lang.github.io/koka/doc/index.html" },
    ],
  },
  "7": {
    number: "7",
    eraIndex: 3,
    yearRange: "1965–2010",
    keyFigures: ["Tony Hoare"],
    externalLinks: [
      { label: "Hoare: Billion Dollar Mistake (video)", url: "https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/" },
      { label: "Algebraic data type (Wikipedia)", url: "https://en.wikipedia.org/wiki/Algebraic_data_type" },
      { label: "ADT History (Hillel Wayne)", url: "https://www.hillelwayne.com/post/algdt-history/" },
      { label: "Effective ML (Jane Street)", url: "https://blog.janestreet.com/effective-ml-revisited/" },
    ],
  },
  "8": {
    number: "8",
    eraIndex: 3,
    yearRange: "1986–2018",
    keyFigures: ["Joe Armstrong", "Martin Sústrik", "Nathaniel J. Smith", "Roman Elizarov"],
    externalLinks: [
      { label: "Erlang (Wikipedia)", url: "https://en.wikipedia.org/wiki/Erlang_(programming_language)" },
      { label: "Structured Concurrency (Smith)", url: "https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/" },
      { label: "Effect Fibers docs", url: "https://effect.website/docs/concurrency/fibers/" },
    ],
  },
  "9": {
    number: "9",
    eraIndex: 4,
    yearRange: "2004–2020",
    keyFigures: ["Martin Odersky"],
    externalLinks: [
      { label: "Scala (Wikipedia)", url: "https://en.wikipedia.org/wiki/Scala_(programming_language)" },
      { label: "ZIO History (De Goes)", url: "https://degoes.net/articles/zio-history" },
      { label: "Origins of Scala (Artima)", url: "https://www.artima.com/articles/the-origins-of-scala" },
    ],
  },
  "10": {
    number: "10",
    eraIndex: 4,
    yearRange: "2020–Present",
    keyFigures: ["Michael Arnaldi"],
    externalLinks: [
      { label: "Effect website", url: "https://effect.website" },
      { label: "Effect GitHub", url: "https://github.com/Effect-TS/effect" },
      { label: "Effect docs", url: "https://effect.website/docs" },
      { label: "The Effect Type", url: "https://effect.website/docs/getting-started/the-effect-type/" },
      { label: "Using Generators", url: "https://effect.website/docs/getting-started/using-generators/" },
      { label: "Arnaldi on Developers' Bakery", url: "https://thebakery.dev/67/" },
    ],
  },
  "11": {
    number: "11",
    eraIndex: 4,
    yearRange: "1910–2026",
    keyFigures: [],
    externalLinks: [],
  },
  "12": {
    number: "12",
    eraIndex: 4,
    yearRange: "",
    keyFigures: [],
    externalLinks: [],
  },
};

export type TimelineEvent = {
  year: number;
  label: string;
  chapter: string;
  eraIndex: number;
  link?: string;
};

export const timelineEvents: TimelineEvent[] = [
  { year: 1932, label: "Lambda calculus", chapter: "1", eraIndex: 0, link: "https://en.wikipedia.org/wiki/Lambda_calculus" },
  { year: 1934, label: "Curry's observation", chapter: "2", eraIndex: 0, link: "https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence" },
  { year: 1936, label: "Church-Turing thesis", chapter: "1", eraIndex: 0, link: "https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis" },
  { year: 1945, label: "Category theory", chapter: "3", eraIndex: 0, link: "https://en.wikipedia.org/wiki/Category_theory" },
  { year: 1958, label: "Lisp", chapter: "4", eraIndex: 1, link: "https://en.wikipedia.org/wiki/Lisp_(programming_language)" },
  { year: 1965, label: "Monads & null", chapter: "3", eraIndex: 1, link: "https://en.wikipedia.org/wiki/Monad_(category_theory)" },
  { year: 1969, label: "Howard manuscript", chapter: "2", eraIndex: 1 },
  { year: 1973, label: "ML", chapter: "4", eraIndex: 1, link: "https://en.wikipedia.org/wiki/ML_(programming_language)" },
  { year: 1986, label: "Erlang & effect systems", chapter: "8", eraIndex: 2, link: "https://en.wikipedia.org/wiki/Erlang_(programming_language)" },
  { year: 1989, label: "Moggi: monads = effects", chapter: "3", eraIndex: 2, link: "https://www.cs.cmu.edu/~crary/819-f09/Moggi89.pdf" },
  { year: 1990, label: "Haskell 1.0", chapter: "5", eraIndex: 2, link: "https://en.wikipedia.org/wiki/Haskell_(programming_language)" },
  { year: 1992, label: "Wadler: Essence of FP", chapter: "5", eraIndex: 2 },
  { year: 2003, label: "Algebraic effects", chapter: "6", eraIndex: 3 },
  { year: 2004, label: "Scala", chapter: "9", eraIndex: 3, link: "https://en.wikipedia.org/wiki/Scala_(programming_language)" },
  { year: 2009, label: "Effect handlers", chapter: "6", eraIndex: 3, link: "https://homepages.inf.ed.ac.uk/gdp/publications/Effect_Handlers.pdf" },
  { year: 2016, label: "Structured concurrency", chapter: "8", eraIndex: 4 },
  { year: 2018, label: "ZIO born", chapter: "9", eraIndex: 4, link: "https://degoes.net/articles/zio-history" },
  { year: 2020, label: "Effect begins", chapter: "10", eraIndex: 4, link: "https://github.com/Effect-TS/effect" },
  { year: 2024, label: "Effect 3.0", chapter: "10", eraIndex: 4, link: "https://effect.website" },
];

export type FigureMeta = {
  name: string;
  years?: string;
  contribution: string;
  chapters: string[];
  wikipedia?: string;
  eraIndex: number;
};

export const figureMeta: Record<string, FigureMeta> = {
  "Alonzo Church": {
    name: "Alonzo Church",
    years: "1903–1995",
    contribution: "Invented lambda calculus, the foundation of all functional programming.",
    chapters: ["1"],
    wikipedia: "https://en.wikipedia.org/wiki/Alonzo_Church",
    eraIndex: 0,
  },
  "Alan Turing": {
    name: "Alan Turing",
    years: "1912–1954",
    contribution: "Proved lambda calculus and Turing machines are equivalent in power.",
    chapters: ["1"],
    wikipedia: "https://en.wikipedia.org/wiki/Alan_Turing",
    eraIndex: 0,
  },
  "Haskell Brooks Curry": {
    name: "Haskell Brooks Curry",
    years: "1900–1982",
    contribution: "Discovered the correspondence between types and logical axioms.",
    chapters: ["2"],
    wikipedia: "https://en.wikipedia.org/wiki/Haskell_Curry",
    eraIndex: 0,
  },
  "William Alvin Howard": {
    name: "William Alvin Howard",
    years: "born 1926",
    contribution: "Made the proofs-as-programs correspondence explicit and comprehensive.",
    chapters: ["2"],
    wikipedia: "https://en.wikipedia.org/wiki/William_Alvin_Howard",
    eraIndex: 0,
  },
  "Per Martin-Löf": {
    name: "Per Martin-Löf",
    years: "born 1942",
    contribution: "Built intuitionistic type theory, extending Curry-Howard to full logic.",
    chapters: ["2"],
    wikipedia: "https://en.wikipedia.org/wiki/Per_Martin-L%C3%B6f",
    eraIndex: 1,
  },
  "Saunders Mac Lane": {
    name: "Saunders Mac Lane",
    years: "1909–2005",
    contribution: "Co-founded category theory, giving us the mathematical language of composition.",
    chapters: ["3"],
    wikipedia: "https://en.wikipedia.org/wiki/Saunders_Mac_Lane",
    eraIndex: 0,
  },
  "Samuel Eilenberg": {
    name: "Samuel Eilenberg",
    years: "1913–1998",
    contribution: "Co-founded category theory and developed the theory of monad algebras.",
    chapters: ["3"],
    wikipedia: "https://en.wikipedia.org/wiki/Samuel_Eilenberg",
    eraIndex: 0,
  },
  "Eugenio Moggi": {
    name: "Eugenio Moggi",
    years: "born 1958",
    contribution: "Connected monads to computational effects — the key bridge to programming.",
    chapters: ["3"],
    wikipedia: "https://en.wikipedia.org/wiki/Eugenio_Moggi",
    eraIndex: 2,
  },
  "John McCarthy": {
    name: "John McCarthy",
    years: "1927–2011",
    contribution: "Created Lisp, bringing lambda calculus into practical programming.",
    chapters: ["4"],
    wikipedia: "https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)",
    eraIndex: 1,
  },
  "Robin Milner": {
    name: "Robin Milner",
    years: "1934–2010",
    contribution: "Created ML and type inference, the basis of all modern typed FP.",
    chapters: ["4"],
    wikipedia: "https://en.wikipedia.org/wiki/Robin_Milner",
    eraIndex: 1,
  },
  "Philip Wadler": {
    name: "Philip Wadler",
    years: "born 1956",
    contribution: "Translated monads from math to programming with landmark papers.",
    chapters: ["5"],
    wikipedia: "https://en.wikipedia.org/wiki/Philip_Wadler",
    eraIndex: 2,
  },
  "Tony Hoare": {
    name: "Tony Hoare",
    years: "born 1934",
    contribution: "Invented null references — the \"billion-dollar mistake\" that motivated sum types.",
    chapters: ["7"],
    wikipedia: "https://en.wikipedia.org/wiki/Tony_Hoare",
    eraIndex: 1,
  },
  "Joe Armstrong": {
    name: "Joe Armstrong",
    years: "1950–2019",
    contribution: "Co-created Erlang, pioneering lightweight processes and the actor model.",
    chapters: ["8"],
    wikipedia: "https://en.wikipedia.org/wiki/Joe_Armstrong_(programmer)",
    eraIndex: 2,
  },
  "Martin Sústrik": {
    name: "Martin Sústrik",
    contribution: "Coined the term \"structured concurrency\" with libdill.",
    chapters: ["8"],
    eraIndex: 4,
  },
  "Nathaniel J. Smith": {
    name: "Nathaniel J. Smith",
    contribution: "Refined structured concurrency with the nursery pattern in Trio.",
    chapters: ["8"],
    eraIndex: 4,
  },
  "Roman Elizarov": {
    name: "Roman Elizarov",
    contribution: "Independently brought structured concurrency to Kotlin coroutines.",
    chapters: ["8"],
    wikipedia: "https://en.wikipedia.org/wiki/Roman_Elizarov",
    eraIndex: 4,
  },
  "Martin Odersky": {
    name: "Martin Odersky",
    years: "born 1958",
    contribution: "Created Scala, unifying OOP and FP and enabling ZIO.",
    chapters: ["9"],
    wikipedia: "https://en.wikipedia.org/wiki/Martin_Odersky",
    eraIndex: 3,
  },
  "Michael Arnaldi": {
    name: "Michael Arnaldi",
    contribution: "Created Effect, synthesizing 90 years of CS into one TypeScript toolkit.",
    chapters: ["10"],
    eraIndex: 4,
  },
};

export const plainLanguageGlossary = [
  {
    term: "Function",
    definition:
      "A rule that takes an input and returns an output. In programming, functions are reusable chunks of logic.",
    link: "https://en.wikipedia.org/wiki/Function_(mathematics)",
    chapters: ["1", "4"],
  },
  {
    term: "Type",
    definition:
      "A description of what kind of value is allowed. Types help catch mistakes before running the program.",
    link: "https://en.wikipedia.org/wiki/Type_system",
    chapters: ["2", "7"],
  },
  {
    term: "Monad",
    definition:
      "A way to chain computations while keeping context, like possible failure, async work, or logging.",
    link: "https://en.wikipedia.org/wiki/Monad_(functional_programming)",
    chapters: ["3", "5"],
  },
  {
    term: "Effect",
    definition:
      "A computation that may need services, may fail, and may produce a value. Effect makes this explicit in types.",
    link: "https://effect.website/docs/getting-started/the-effect-type/",
    chapters: ["6", "10"],
  },
  {
    term: "Fiber",
    definition:
      "A lightweight unit of concurrent work that can be started, composed, interrupted, and observed safely.",
    link: "https://effect.website/docs/concurrency/fibers/",
    chapters: ["8"],
  },
  {
    term: "Structured Concurrency",
    definition:
      "A model where child tasks belong to a parent scope, so cancellation and errors are managed predictably.",
    link: "https://en.wikipedia.org/wiki/Structured_concurrency",
    chapters: ["8"],
  },
] as const;
