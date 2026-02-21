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
  // ── Chapter 1: Lambda Calculus ──────────────────────────────────
  {
    term: "Lambda Calculus",
    definition:
      "A tiny formal system where everything is a function. It has only three things: variables, making functions, and calling functions — yet it can express any computation.",
    link: "https://en.wikipedia.org/wiki/Lambda_calculus",
    chapters: ["1", "2"],
  },
  {
    term: "Function",
    definition:
      "A rule that takes an input and returns an output. In programming, functions are reusable chunks of logic.",
    link: "https://en.wikipedia.org/wiki/Function_(mathematics)",
    chapters: ["1", "4"],
  },
  {
    term: "Abstraction",
    definition:
      "Creating a function by naming a parameter and writing a body. In lambda calculus, λx.x+1 abstracts over x.",
    link: "https://en.wikipedia.org/wiki/Lambda_calculus#lambdaAbstraction",
    chapters: ["1"],
  },
  {
    term: "Application",
    definition:
      "Calling a function by giving it an argument. In lambda calculus, (λx.x+1) 5 applies the function to 5, yielding 6.",
    link: "https://en.wikipedia.org/wiki/Lambda_calculus#Beta_reduction",
    chapters: ["1"],
  },
  {
    term: "Turing Complete",
    definition:
      "A system that can compute anything computable — given enough time and memory. If a language is Turing complete, there's no program it fundamentally can't express.",
    link: "https://en.wikipedia.org/wiki/Turing_completeness",
    chapters: ["1", "4", "10"],
  },
  {
    term: "Church-Turing Thesis",
    definition:
      "The claim that lambda calculus and Turing machines compute exactly the same set of functions — meaning functional and imperative programming are equally powerful.",
    link: "https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis",
    chapters: ["1"],
  },
  {
    term: "Mutable State",
    definition:
      "Data that can be changed in place after creation. Pure functional programming avoids this, preferring to create new values instead of modifying existing ones.",
    link: "https://en.wikipedia.org/wiki/Mutable_object",
    chapters: ["1", "4", "8"],
  },

  // ── Chapter 2: Curry-Howard ─────────────────────────────────────
  {
    term: "Curry-Howard Correspondence",
    definition:
      "The deep discovery that types in programming correspond to propositions in logic, and programs correspond to proofs. Writing a function with type A → B is proving that A implies B.",
    link: "https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence",
    chapters: ["2", "10"],
  },
  {
    term: "Type",
    definition:
      "A description of what kind of value is allowed. Types help catch mistakes before running the program.",
    link: "https://en.wikipedia.org/wiki/Type_system",
    chapters: ["2", "7"],
  },
  {
    term: "Proposition",
    definition:
      "A statement that is either true or false. In the Curry-Howard view, each type is a proposition and each program is a proof of that proposition.",
    link: "https://en.wikipedia.org/wiki/Proposition",
    chapters: ["2"],
  },
  {
    term: "Combinator",
    definition:
      "A function that has no free variables — it only refers to its own parameters. K and S are fundamental combinators that can express any computation when combined.",
    link: "https://en.wikipedia.org/wiki/Combinatory_logic",
    chapters: ["1", "2"],
  },
  {
    term: "Intuitionistic Logic",
    definition:
      "A flavor of logic where proving something means constructing it. You can't prove something exists by assuming it doesn't and finding a contradiction — you have to build it.",
    link: "https://en.wikipedia.org/wiki/Intuitionistic_logic",
    chapters: ["2"],
  },
  {
    term: "Natural Deduction",
    definition:
      "A proof system that mirrors how humans actually reason: introduce assumptions, derive consequences, and discharge assumptions. It maps directly to how we write programs.",
    link: "https://en.wikipedia.org/wiki/Natural_deduction",
    chapters: ["2"],
  },
  {
    term: "Beta-Reduction",
    definition:
      "The act of calling a function: substituting the argument for the parameter in the body. (λx.x+1) 5 beta-reduces to 5+1. This is both running a program and simplifying a proof.",
    link: "https://en.wikipedia.org/wiki/Lambda_calculus#Beta_reduction",
    chapters: ["1", "2"],
  },
  {
    term: "Dependent Types",
    definition:
      "Types that can depend on values. For example, 'a list of exactly 5 integers' — the type itself encodes the length. This enables extremely precise compile-time checks.",
    link: "https://en.wikipedia.org/wiki/Dependent_type",
    chapters: ["2"],
  },
  {
    term: "Product Type",
    definition:
      "A type that bundles values together — like a struct or tuple. A pair [string, number] is a product type. In logic, it corresponds to 'and' (conjunction).",
    link: "https://en.wikipedia.org/wiki/Product_type",
    chapters: ["2", "7"],
  },
  {
    term: "Sum Type",
    definition:
      "A type that is one of several variants — like 'either a string or a number.' In TypeScript, A | B is a sum type. In logic, it corresponds to 'or' (disjunction).",
    link: "https://en.wikipedia.org/wiki/Tagged_union",
    chapters: ["2", "7"],
  },

  // ── Chapter 3: Category Theory ──────────────────────────────────
  {
    term: "Category Theory",
    definition:
      "A branch of math that studies structure and composition in the most abstract way. Objects, arrows between them, and rules for composing arrows — that's it.",
    link: "https://en.wikipedia.org/wiki/Category_theory",
    chapters: ["3"],
  },
  {
    term: "Category",
    definition:
      "A collection of objects and arrows (morphisms) between them, with rules for composing arrows. Types and functions form a category; so do database tables and queries.",
    link: "https://en.wikipedia.org/wiki/Category_(mathematics)",
    chapters: ["3"],
  },
  {
    term: "Morphism",
    definition:
      "An arrow between two objects in a category. In programming, a function from type A to type B is a morphism. The concept generalizes far beyond functions.",
    link: "https://en.wikipedia.org/wiki/Morphism",
    chapters: ["3"],
  },
  {
    term: "Functor",
    definition:
      "A structure-preserving map between categories. In programming, anything with a .map() method — arrays, options, promises — is a functor.",
    link: "https://en.wikipedia.org/wiki/Functor",
    chapters: ["3", "5"],
  },
  {
    term: "Natural Transformation",
    definition:
      "A systematic way to convert between two functors while respecting their structure. Converting every Option<T> to an Array<T> in a consistent way is a natural transformation.",
    link: "https://en.wikipedia.org/wiki/Natural_transformation",
    chapters: ["3"],
  },
  {
    term: "Monad",
    definition:
      "A design pattern for chaining computations that carry context — like possible failure, async work, or side effects. It has a way to wrap values and a way to chain operations.",
    link: "https://en.wikipedia.org/wiki/Monad_(functional_programming)",
    chapters: ["3", "5", "9"],
  },
  {
    term: "Adjoint Functors",
    definition:
      "A pair of functors that are 'optimal inverses' of each other. Monads arise from composing adjoint functors — this is how abstract math connects to practical programming patterns.",
    link: "https://en.wikipedia.org/wiki/Adjoint_functors",
    chapters: ["3"],
  },
  {
    term: "Endofunctor",
    definition:
      "A functor from a category to itself. When people say 'a monad is a monoid in the category of endofunctors,' they mean a monad maps a type system to itself with extra structure.",
    link: "https://en.wikipedia.org/wiki/Functor#Endofunctors",
    chapters: ["3"],
  },
  {
    term: "Side Effects",
    definition:
      "Anything a function does besides returning a value — printing to the console, writing to a database, reading the clock, throwing an error. Pure functions have no side effects.",
    link: "https://en.wikipedia.org/wiki/Side_effect_(computer_science)",
    chapters: ["3", "4", "6"],
  },

  // ── Chapter 4: Lisp to ML ──────────────────────────────────────
  {
    term: "Higher-Order Functions",
    definition:
      "Functions that take other functions as arguments or return functions as results. Array.map() is a higher-order function — it takes a function and applies it to each element.",
    link: "https://en.wikipedia.org/wiki/Higher-order_function",
    chapters: ["1", "4"],
  },
  {
    term: "Garbage Collection",
    definition:
      "Automatic memory management. The runtime detects objects that are no longer reachable and frees their memory, so programmers don't have to do it manually.",
    link: "https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)",
    chapters: ["4"],
  },
  {
    term: "Type Inference",
    definition:
      "The compiler's ability to figure out types automatically without you writing them. When you write const x = 5, TypeScript infers x is a number.",
    link: "https://en.wikipedia.org/wiki/Type_inference",
    chapters: ["4", "9"],
  },
  {
    term: "Polymorphism",
    definition:
      "Writing code that works with many types. A function sort<T>(list: T[]) is polymorphic — it works for arrays of any type, not just one specific type.",
    link: "https://en.wikipedia.org/wiki/Polymorphism_(computer_science)",
    chapters: ["4", "5", "6"],
  },
  {
    term: "Algebraic Data Types",
    definition:
      "Types built from two operations: 'and' (product types — structs/tuples) and 'or' (sum types — tagged unions). They make it easy to model domain concepts precisely.",
    link: "https://en.wikipedia.org/wiki/Algebraic_data_type",
    chapters: ["4", "7"],
  },
  {
    term: "Pattern Matching",
    definition:
      "A way to branch on the shape of data. Instead of if/else chains, you match against the structure of a value and destructure it in one step. The compiler ensures all cases are covered.",
    link: "https://en.wikipedia.org/wiki/Pattern_matching",
    chapters: ["4", "7"],
  },
  {
    term: "Referential Transparency",
    definition:
      "An expression is referentially transparent if you can replace it with its value without changing the program's behavior. This makes code predictable and testable.",
    link: "https://en.wikipedia.org/wiki/Referential_transparency",
    chapters: ["4", "5"],
  },
  {
    term: "Pure",
    definition:
      "A function is pure if it always returns the same output for the same input and causes no side effects. Pure functions are easier to test, cache, and run in parallel.",
    link: "https://en.wikipedia.org/wiki/Pure_function",
    chapters: ["4", "5"],
  },

  // ── Chapter 5: Haskell and Monads ───────────────────────────────
  {
    term: "Lazy Evaluation",
    definition:
      "A strategy where expressions aren't computed until their values are actually needed. This allows working with infinite data structures and avoids unnecessary computation.",
    link: "https://en.wikipedia.org/wiki/Lazy_evaluation",
    chapters: ["5"],
  },
  {
    term: "Type Classes",
    definition:
      "A way to define shared behavior for different types — like an interface, but more powerful. Functor, Monad, and Eq are type classes. Types 'opt in' by providing implementations.",
    link: "https://en.wikipedia.org/wiki/Type_class",
    chapters: ["5"],
  },
  {
    term: "Higher-Kinded Types",
    definition:
      "The ability to abstract over type constructors, not just types. Instead of just 'a list of numbers,' you can talk about 'any container of numbers' — Array, Option, Effect, etc.",
    link: "https://en.wikipedia.org/wiki/Kind_(type_theory)",
    chapters: ["5", "9"],
  },
  {
    term: "Do Notation",
    definition:
      "Syntactic sugar that makes monadic code look like sequential imperative code. Haskell's 'do' block, Scala's 'for' comprehension, and Effect's 'Effect.gen' all serve this purpose.",
    link: "https://en.wikipedia.org/wiki/Monad_(functional_programming)#do_notation",
    chapters: ["5", "10"],
  },
  {
    term: "Bind",
    definition:
      "The operation that chains monadic computations. It takes a monadic value and a function, unwraps the value, passes it to the function, and returns a new monadic value. Also called flatMap or >>=.",
    link: "https://en.wikipedia.org/wiki/Monad_(functional_programming)#Overview",
    chapters: ["5", "10"],
  },
  {
    term: "Applicative",
    definition:
      "A pattern between Functor and Monad in power. It lets you apply a function inside a context to a value inside a context — useful when computations are independent of each other.",
    link: "https://en.wikipedia.org/wiki/Applicative_functor",
    chapters: ["5"],
  },

  // ── Chapter 6: Effect Systems and Algebraic Effects ─────────────
  {
    term: "Effect System",
    definition:
      "A type-level system that tracks not just what a function returns, but what side effects it might perform — like reading files, throwing errors, or accessing a database.",
    link: "https://en.wikipedia.org/wiki/Effect_system",
    chapters: ["6", "10"],
  },
  {
    term: "Algebraic Effects",
    definition:
      "A way to declare what operations a computation performs (the effects) separately from how those operations are handled (the handlers). More composable than monads.",
    link: "https://en.wikipedia.org/wiki/Algebraic_effects",
    chapters: ["6", "10"],
  },
  {
    term: "Effect Handler",
    definition:
      "An interpreter for algebraic effects. It defines what actually happens when an effect operation is performed — like deciding whether 'log' prints to console or writes to a file.",
    link: "https://en.wikipedia.org/wiki/Algebraic_effects#Handling",
    chapters: ["6"],
  },
  {
    term: "Monad Transformer",
    definition:
      "A way to combine monads by stacking them — like wrapping async inside error-handling inside state. Notoriously complex: N effects require N² boilerplate. Algebraic effects avoid this.",
    link: "https://en.wikipedia.org/wiki/Monad_transformer",
    chapters: ["6", "9"],
  },
  {
    term: "Row Polymorphism",
    definition:
      "A type system feature that lets you say 'this computation uses these effects, plus possibly others.' It enables composing effects without specifying all of them upfront.",
    link: "https://en.wikipedia.org/wiki/Row_polymorphism",
    chapters: ["6"],
  },

  // ── Chapter 7: Making Illegal States Unrepresentable ────────────
  {
    term: "Null Reference",
    definition:
      "A special value meaning 'no value' that can masquerade as any type. Tony Hoare called it his 'billion-dollar mistake' because it causes crashes when code assumes a value exists.",
    link: "https://en.wikipedia.org/wiki/Null_pointer",
    chapters: ["7"],
  },
  {
    term: "Option",
    definition:
      "A type that explicitly represents 'a value or nothing' — Some(value) or None. Unlike null, the type system forces you to handle the 'nothing' case. Also called Maybe in Haskell.",
    link: "https://effect.website/docs/data-types/option/",
    chapters: ["7", "10"],
  },
  {
    term: "Either",
    definition:
      "A type that represents one of two possibilities — typically Right(success) or Left(error). It forces explicit error handling because the type system won't let you ignore the Left case.",
    link: "https://effect.website/docs/data-types/either/",
    chapters: ["7", "10"],
  },
  {
    term: "Discriminated Union",
    definition:
      "A type where each variant has a tag field that identifies which variant it is. TypeScript's union types with a shared literal field (like 'type: \"success\"') are discriminated unions.",
    link: "https://en.wikipedia.org/wiki/Tagged_union",
    chapters: ["7", "10"],
  },
  {
    term: "Exhaustive",
    definition:
      "Handling every possible case with no gaps. When the compiler checks that your switch/match covers all variants of a union type, that's exhaustiveness checking.",
    link: "https://en.wikipedia.org/wiki/Exhaustive_testing",
    chapters: ["7"],
  },

  // ── Chapter 8: Fibers and Structured Concurrency ────────────────
  {
    term: "Fiber",
    definition:
      "A lightweight unit of concurrent work managed by the runtime, not the OS. Thousands can run concurrently with minimal memory overhead. Think of them as virtual threads.",
    link: "https://effect.website/docs/concurrency/fibers/",
    chapters: ["8", "10"],
  },
  {
    term: "Structured Concurrency",
    definition:
      "A model where child tasks belong to a parent scope, so cancellation and errors are managed predictably. When a parent scope ends, all its children are cleaned up.",
    link: "https://en.wikipedia.org/wiki/Structured_concurrency",
    chapters: ["8", "10"],
  },
  {
    term: "Green Threads",
    definition:
      "Lightweight threads managed by a runtime instead of the operating system. They use far less memory than OS threads and can number in the millions.",
    link: "https://en.wikipedia.org/wiki/Green_thread",
    chapters: ["8"],
  },
  {
    term: "Message Passing",
    definition:
      "A concurrency model where tasks communicate by sending messages to each other, rather than sharing memory. This avoids data races and makes concurrent code easier to reason about.",
    link: "https://en.wikipedia.org/wiki/Message_passing",
    chapters: ["8"],
  },
  {
    term: "Cancellation",
    definition:
      "Stopping a running computation before it finishes. In Effect, cancellation is safe and deterministic — resources are always cleaned up and child fibers are interrupted.",
    link: "https://effect.website/docs/concurrency/fibers/#interruption",
    chapters: ["8", "10"],
  },

  // ── Chapter 9: Scala, ZIO ──────────────────────────────────────
  {
    term: "Contravariance",
    definition:
      "A type relationship where subtyping flows in the opposite direction. If Dog extends Animal, then Handler<Animal> can be used where Handler<Dog> is expected. In Effect, the R parameter is contravariant.",
    link: "https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)",
    chapters: ["9", "10"],
  },
  {
    term: "Covariance",
    definition:
      "A type relationship where subtyping flows in the same direction. If Dog extends Animal, then Array<Dog> can be used where Array<Animal> is expected. In Effect, A and E are covariant.",
    link: "https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)",
    chapters: ["9", "10"],
  },
  {
    term: "Effect",
    definition:
      "A computation that may need services, may fail, and may produce a value. Effect<A, E, R> makes all three explicit in the type, so the compiler can verify correctness.",
    link: "https://effect.website/docs/getting-started/the-effect-type/",
    chapters: ["6", "9", "10"],
  },
  {
    term: "Intersection Type",
    definition:
      "A type that combines multiple types with '&'. A value of type A & B has all the properties of both A and B. Effect uses this to merge environmental requirements automatically.",
    link: "https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types",
    chapters: ["9", "10"],
  },

  // ── Chapter 10: Effect Convergence ──────────────────────────────
  {
    term: "Layer",
    definition:
      "A recipe for building a service and its dependencies. Layers compose like puzzle pieces — Effect verifies at compile time that all required dependencies are provided.",
    link: "https://effect.website/docs/requirements-management/layers/",
    chapters: ["10"],
  },
  {
    term: "Cause",
    definition:
      "A data type that captures every possible way a computation can fail — expected errors, unexpected defects, interruptions, and combinations of these. No failure information is ever lost.",
    link: "https://effect.website/docs/error-management/cause/",
    chapters: ["10"],
  },
  {
    term: "Generics",
    definition:
      "Type parameters that let code work with many types. Effect<A, E, R> uses three generic parameters so one type can describe any combination of success, error, and requirements.",
    link: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    chapters: ["10"],
  },
  {
    term: "Conditional Types",
    definition:
      "TypeScript types that choose between outcomes based on a condition, like: T extends string ? 'yes' : 'no'. Effect uses these for type-level computation when composing effects.",
    link: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
    chapters: ["10"],
  },
  {
    term: "Compile Time",
    definition:
      "When the TypeScript compiler checks your code, before it ever runs. Errors caught at compile time can't cause production crashes. Effect pushes as many checks as possible to compile time.",
    link: "https://en.wikipedia.org/wiki/Compile_time",
    chapters: ["2", "7", "10"],
  },

  // ── Cross-cutting terms ─────────────────────────────────────────
  {
    term: "Composition",
    definition:
      "Building complex things from simpler things. Composing two functions means piping the output of one into the input of another. Effect is designed so that everything composes.",
    link: "https://en.wikipedia.org/wiki/Function_composition_(computer_science)",
    chapters: ["1", "3", "10"],
  },
  {
    term: "Imperative Programming",
    definition:
      "A style where you give step-by-step instructions that modify state. 'Set x to 5, then add 1 to x.' Contrasts with functional programming, where you describe relationships between values.",
    link: "https://en.wikipedia.org/wiki/Imperative_programming",
    chapters: ["1", "4"],
  },
  {
    term: "Functional Programming",
    definition:
      "A style built on composing pure functions and avoiding mutable state. Programs describe what to compute, not how to mutate memory. Effect brings this approach to TypeScript.",
    link: "https://en.wikipedia.org/wiki/Functional_programming",
    chapters: ["4", "5", "9"],
  },
  {
    term: "Proof Assistant",
    definition:
      "Software that helps write and verify mathematical proofs. Because of Curry-Howard, a verified proof is also a correct program. Coq, Agda, Lean, and Idris are proof assistants.",
    link: "https://en.wikipedia.org/wiki/Proof_assistant",
    chapters: ["2"],
  },
  {
    term: "Desugar",
    definition:
      "To transform syntactic sugar (convenient shorthand) into its underlying form. 'do { x <- m; f x }' desugars to 'm >>= (\\x -> f x)'. The sugar is for humans; the core form is for the compiler.",
    link: "https://en.wikipedia.org/wiki/Syntactic_sugar",
    chapters: ["5", "10"],
  },
] as const;
