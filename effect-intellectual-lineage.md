# The Intellectual Lineage of Effect: From Principia Mathematica to TypeScript

> _"To be fair, you have to have a very high IQ to understand Effect."_ — David Abram

Not because Effect is needlessly complex — but because it stands on the shoulders of ninety years of breakthroughs in
mathematics, logic, and computer science. Every combinator, every type parameter, every fiber traces back to an idea
that someone, somewhere, fought to discover. This document tells that story.

---

## Table of Contents

1. [The Lambda Calculus: Computation as Function (1932–1936)](#1-the-lambda-calculus-computation-as-function-19321936)
2. [The Curry-Howard Correspondence: Proofs Are Programs (1934–1969)](#2-the-curry-howard-correspondence-proofs-are-programs-19341969)
3. [Category Theory: The Mathematics of Structure (1945–1971)](#3-category-theory-the-mathematics-of-structure-19451971)
4. [From Lisp to ML: Functional Programming Takes Shape (1958–1978)](#4-from-lisp-to-ml-functional-programming-takes-shape-19581978)
5. [Haskell and the Monad Revelation (1987–1995)](#5-haskell-and-the-monad-revelation-19871995)
6. [Effect Systems and Algebraic Effects (1986–2013)](#6-effect-systems-and-algebraic-effects-19862013)
7. [Making Illegal States Unrepresentable (1965–2010)](#7-making-illegal-states-unrepresentable-19652010)
8. [Fibers and Structured Concurrency (1986–2018)](#8-fibers-and-structured-concurrency-19862018)
9. [Scala, ZIO, and the Mainstream Effect System (2004–2020)](#9-scala-zio-and-the-mainstream-effect-system-20042020)
10. [Effect: The Convergence (2020–Present)](#10-effect-the-convergence-2020present)
11. [The Complete Timeline](#11-the-complete-timeline)
12. [References](#12-references)

---

## 1. The Lambda Calculus: Computation as Function (1932–1936)

Before there were computers, there was a question: _What does it mean to compute something?_

**Alonzo Church** (1903–1995), a mathematician at Princeton, answered it. In 1932–1933 he introduced a notation for
anonymous functions — the **lambda calculus** — as part of a system intended to provide foundations for all of
mathematics[^church-1936]. The original system was shown to be inconsistent by his students Stephen Kleene and J.B.
Rosser in 1935, but Church isolated the computational core and published it in 1936 as "An Unsolvable Problem of
Elementary Number Theory"[^church-1936] — seven months before Alan Turing published his own model of computation using
what we now call Turing machines.

The lambda calculus consists of just three constructs: **variables**, **abstraction** (creating functions), and
**application** (calling functions). From these minimal primitives, Church demonstrated that arbitrary computation could
be expressed. No loops, no mutable state, no assignments — just functions.

In 1936–1937, Turing proved that the class of lambda-definable functions and the class of Turing-computable functions
are identical[^church-turing]. This result — the **Church-Turing thesis** — established something profound: functional
programming is not a "weaker" or "more limited" paradigm than imperative programming. It is exactly as powerful. The two
approaches are different lenses on the same mathematical reality.

> Every time you write `(x) => x + 1` in TypeScript, you are using Church's notation. Every time you compose two
> functions, you are performing lambda calculus.

---

## 2. The Curry-Howard Correspondence: Proofs Are Programs (1934–1969)

### Curry's Observation (1934)

**Haskell Brooks Curry** (1900–1982) — yes, _that_ Haskell — spent decades studying combinatory logic, a formalism
related to lambda calculus. In 1934, he noticed something peculiar: the types of the basic combinators **K** and **S**
corresponded exactly to axiom schemes in intuitionistic logic[^curry-howard-wiki]:

| Combinator | Type                    | Logical Axiom             |
| ---------- | ----------------------- | ------------------------- |
| **K**      | `a → (b → a)`           | _α → (β → α)_             |
| **S**      | `(a→(b→c))→((a→b)→a→c)` | _(α→(β→γ))→((α→β)→(α→γ))_ |

He published this observation in "Functionality in Combinatory Logic"[^curry-1934], then spent two decades refining it
with Robert Feys in their 1958 magnum opus _Combinatory Logic, Volume I_[^curry-feys-1958].

### Howard's Manuscript (1969)

In 1969, **William Alvin Howard** wrote a manuscript titled "The formulae-as-types notion of construction"[^howard-1969]
that made the correspondence explicit and comprehensive. While Curry had connected combinatory logic to Hilbert-style
proof systems, Howard connected the **lambda calculus** to **Gentzen's natural deduction**[^howard-1969] — a proof
system that more closely mirrors how mathematicians actually reason.

Howard's insight went beyond Curry's in a critical way: he showed that **proof normalization** (simplifying proofs)
corresponds to **program evaluation** (running programs). The computational process of beta-reduction in lambda calculus
_is_ the same structural operation as proof simplification in logic[^wadler-propositions].

The full correspondence:

| Logic                      | Programming               |
| -------------------------- | ------------------------- |
| Proposition                | Type                      |
| Proof                      | Program                   |
| Implication (_A → B_)      | Function type (`A → B`)   |
| Conjunction (_A ∧ B_)      | Product type (`[A, B]`)   |
| Disjunction (_A ∨ B_)      | Sum type (`A \| B`)       |
| Universal quantification   | Generic / dependent types |
| Existential quantification | Existential types         |
| True                       | Unit type (`void`)        |
| False                      | Empty type (`never`)      |
| Modus ponens               | Function application      |

Howard's manuscript circulated as a xeroxed copy for _eleven years_ before being formally published in
1980[^howard-1969]. Remarkably, **Nicolaas de Bruijn** at Eindhoven independently discovered the same correspondence
while building the Automath proof system in the late 1960s[^debruijn].

### Martin-Löf's Type Theory (1971–1984)

**Per Martin-Löf** (born 1942) took Howard's proposal and built a complete formal system around it. His **intuitionistic
type theory**[^martin-lof-1984] extended the Curry-Howard correspondence from propositional logic to full predicate
logic using **dependent types** — types that depend on values:

- **Pi types** (`Π x:A. B(x)`) — dependent functions, corresponding to universal quantification ("for all")
- **Sigma types** (`Σ x:A. B(x)`) — dependent pairs, corresponding to existential quantification ("there exists")

In his landmark 1979 paper "Constructive Mathematics and Computer Programming"[^martin-lof-1979], Martin-Löf proposed
that type theory could function simultaneously as a formal system for mathematics _and_ as a programming language. This
vision directly spawned the proof assistants Coq (1989), Agda, Idris, and Lean.

### Why This Matters for Effect

When a TypeScript developer writes:

```typescript
Effect<User, NotFoundError | ValidationError, Database & Logger>;
```

they are, in a precise sense, writing a **logical proposition**: "Given a Database and Logger, this computation produces
a User or fails with a NotFoundError or ValidationError." The type checker _verifies_ this proposition at compile time —
it demands a proof (your program) that the proposition holds.

When errors are handled via `catchTag`, error types are removed from the union — the logical equivalent of **discharging
a disjunct**. When dependencies are provided via `Layer.provide`, requirement types are removed — the equivalent of
**discharging a premise**. When you arrive at `Effect<User, never, never>`, you have a **closed proof**: a theorem with
no open hypotheses[^effect-type-docs].

This is not a metaphor. It is the Curry-Howard correspondence, realized in an industrial programming language,
eighty-eight years after Curry first noticed that combinators look like axioms.

---

## 3. Category Theory: The Mathematics of Structure (1945–1971)

### The Founding Paper (1945)

In 1940, at a topology conference at the University of Michigan, **Saunders Mac Lane** delivered a lecture on group
extensions. In the audience was **Samuel Eilenberg**, a Polish-born topologist. Eilenberg immediately recognized a
connection between Mac Lane's algebraic results and a topological calculation by Steenrod. This collision of algebra and
topology sparked a fifteen-year collaboration[^eilenberg-maclane-1945].

Their 1945 paper, "General Theory of Natural Equivalences"[^eilenberg-maclane-1945], introduced three concepts that
would reshape mathematics:

1. **Category** — a collection of objects and arrows (morphisms) between them
2. **Functor** — a structure-preserving mapping between categories
3. **Natural transformation** — a systematic family of morphisms connecting two functors

The central motivation was the concept of **naturality** — that certain mathematical constructions are canonical,
independent of arbitrary choices. Categories were introduced as scaffolding, functors as structure-preserving maps, and
natural transformations as the real goal[^stanford-category-theory].

### Monads Enter the Picture (1958–1967)

The concept that would eventually transform programming emerged through several hands:

- **1958**: Roger Godement identified what we now call monads (as "standard constructions") while studying sheaf
  cohomology[^godement-1958]
- **1965**: **Eilenberg and John C. Moore** published "Adjoint Functors and Triples," establishing the connection
  between monads and adjoint functors[^eilenberg-moore-1965]. They introduced the Eilenberg-Moore category (the category
  of algebras for a monad)
- **1965**: **Heinrich Kleisli** independently introduced the Kleisli category — the "free" decomposition of a monad
  into an adjunction[^kleisli-1965]
- **~1967**: **Jean Bénabou** coined the term "monad," replacing the earlier names "standard construction" and
  "triple"[^benabou-monad]

In 1971, Mac Lane published _Categories for the Working Mathematician_[^maclane-1971], which codified the field and gave
us the famous characterization:

> "A monad in X is just a monoid in the category of endofunctors of X, with product × replaced by composition of
> endofunctors and unit set by the identity endofunctor."

### Moggi's Breakthrough: Monads as Computational Effects (1989–1991)

For forty years, monads remained in the realm of pure mathematics. Then **Eugenio Moggi**, at the University of
Edinburgh, had a startling insight: the categorical concept of a monad was precisely the right abstraction for modeling
**side effects** in programming languages.

His 1989 paper "Computational Lambda-Calculus and Monads"[^moggi-1989], presented at the Fourth Annual Symposium on
Logic in Computer Science, proposed that a program should be modeled not as a function from values to values, but as a
morphism from a value type _A_ to a computation type _T(A)_, where _T_ is a monad.

The expanded 1991 journal paper "Notions of Computation and Monads"[^moggi-1991] demonstrated that diverse computational
effects all fit within a uniform monadic framework:

| Effect          | Monad _T(A)_        |
| --------------- | ------------------- |
| Partiality      | `A + ⊥` (lift)      |
| Non-determinism | `𝒫(A)` (powerset)   |
| Side effects    | `(A × S)^S` (state) |
| Exceptions      | `A + E`             |
| Continuations   | `R^(R^A)`           |
| Interactive I/O | interaction trees   |

The 1989 paper won the **LICS Test-of-Time Award** in 2009[^moggi-lics-award]. Moggi had connected a mathematical
structure invented to study algebraic topology to the practical problem of modeling database queries, file I/O, and
mutable state.

> Effect's `Effect<A, E, R>` is a direct descendant of Moggi's _T(A)_ — a monadic computation type that encodes success,
> failure, and environmental requirements.

---

## 4. From Lisp to ML: Functional Programming Takes Shape (1958–1978)

### Lisp: Lambda Calculus Gets a Compiler (1958)

**John McCarthy** (1927–2011) at MIT created **Lisp** (LISt Processing) — the first programming language to directly
embody Church's lambda calculus[^mccarthy-1960]. Published in 1960 as "Recursive Functions of Symbolic Expressions and
Their Computation by Machine," the paper demonstrated that with a few operators and Church's notation for anonymous
functions, one could build a Turing-complete language[^mccarthy-1960].

Lisp introduced concepts we now take for granted: **conditional expressions**, **recursive function definitions**,
**garbage collection** (McCarthy described the first mark-and-sweep algorithm[^mccarthy-1960]), and **higher-order
functions** — functions as first-class values that can be passed as arguments and returned as results.

### ML: Types Without Tears (1973)

**Robin Milner** (1934–2010) arrived at the University of Edinburgh from Stanford in 1973 and co-founded the Laboratory
for Foundations of Computer Science. He developed **ML** (Meta Language) as the metalanguage for the Edinburgh LCF
theorem prover[^milner-1978].

ML's revolutionary contribution was **static type inference**: the compiler automatically determines the types of
expressions without programmer annotations. Milner's 1978 paper "A Theory of Type Polymorphism in
Programming"[^milner-1978] presented **Algorithm W**, which infers the most general (principal) type for any expression.
Luis Damas and Milner proved it sound and complete in 1982[^damas-milner-1982].

The system, now called **Hindley-Milner** (because J. Roger Hindley independently proved the principal type property in
1969[^hindley-1969]), underpins every ML-family language: OCaml, F#, Haskell, and — through its influence on structural
typing — TypeScript.

ML also introduced **algebraic data types** with **pattern matching** and a **module system** — the building blocks of
modern typed functional programming.

### Strachey and Referential Transparency (1967)

The philosophical foundation connecting pure mathematics to practical programming was articulated by **Christopher
Strachey** in his 1967 lecture notes "Fundamental Concepts in Programming Languages"[^strachey-1967]:

> "If we wish to find the value of an expression which contains a sub-expression, the only thing we need to know about
> the sub-expression is its value."

This is **referential transparency**: an expression can be replaced by its value without changing the program's
behavior. A function is **pure** if it is deterministic and side-effect free. Programs built from pure functions can be
reasoned about like mathematical equations — you can substitute equals for equals, enable compiler optimizations
(memoization, parallelization), and test without mocks[^strachey-1967].

The tension between referential transparency and real-world programs that _must_ perform I/O is the central drama of
functional programming from the 1980s onward. Effect resolves this tension by representing effects as **values** that
_describe_ computations without executing them — preserving referential transparency while enabling real-world
interaction[^effect-blog-react].

---

## 5. Haskell and the Monad Revelation (1987–1995)

### The Birth of Haskell (1987)

By 1987, more than a dozen non-strict, purely functional programming languages existed — Miranda, Lazy ML, Orwell,
Clean, and others. The research community was fragmented. At the Conference on Functional Programming Languages and
Computer Architecture (FPCA '87) in Portland, Oregon, a consensus emerged that an open standard was needed. **Simon
Peyton Jones** and **Paul Hudak** initiated a committee; **Philip Wadler** endorsed the effort[^history-haskell].

Haskell 1.0 was published on April 1, 1990[^history-haskell]. Its defining characteristics:

- **Lazy evaluation**: expressions evaluated only when needed
- **Purity**: all functions are free of side effects
- **Type classes**: a mechanism for ad hoc polymorphism invented by Wadler and Steve Blott[^wadler-blott-typeclasses]
- **Higher-kinded types**: the ability to abstract over type constructors, enabling `Functor`, `Applicative`, and
  `Monad` to be expressed in the type system

### Wadler Brings Monads to Programmers (1990–1995)

Philip Wadler (born 1956) was the key figure who translated Moggi's categorical insight into practical programming.
Three landmark papers accomplished this:

1. **"Comprehending Monads"** (1990)[^wadler-comprehending] — showed that list comprehensions are a special case of
   monadic structure, and generalizing them yields a powerful programming abstraction. Wadler's opening line: "Monads
   were conceived in the 1950s, list comprehensions in the 1970s. They have quite independent origins, but fit with each
   other remarkably well."

2. **"The Essence of Functional Programming"** (POPL 1992)[^wadler-essence] — an invited talk requiring _no prior
   knowledge of monads or category theory_, demonstrating how monads enable modular programs through a running
   interpreter example.

3. **"Imperative Functional Programming"** (POPL 1993, with Simon Peyton Jones)[^wadler-imperative] — presented monadic
   I/O as "composable, extensible, efficient" and requiring "no extensions to the type system." This paper received the
   **POPL 2003 Most Influential Paper Award**.

**Haskell 1.3** (1996) officially adopted monadic I/O, and **do notation** was introduced as syntactic sugar:
`do { x <- action; f x }` desugars to `action >>= \x -> f x`[^history-haskell].

> Effect's `Effect.gen` with `yield*` is the TypeScript equivalent of Haskell's `do` notation — syntactic sugar that
> makes monadic code look imperative while preserving full type safety and composability.

---

## 6. Effect Systems and Algebraic Effects (1986–2013)

### The First Effect Systems (1986)

While monads provided one framework for reasoning about effects, a parallel line of research pursued a different
approach: annotating types with information about their side effects.

**David K. Gifford** and **John M. Lucassen** at MIT published "Integrating Functional and Imperative Programming" at
the 1986 ACM Conference on LISP and Functional Programming[^gifford-lucassen-1986]. They proposed _fluent languages_
with a static checking system that simultaneously determines both the **type** and the **effect class** of every
expression. Just as types classify values, effects classify side effects.

Their 1988 follow-up, "Polymorphic Effect Systems"[^lucassen-gifford-1988], extended the framework with polymorphism —
effects could be abstracted over just like types. **Jean-Pierre Talpin** and **Pierre Jouvelot** further advanced this
in their 1992 paper on "Polymorphic Type, Region and Effect Inference"[^talpin-jouvelot-1992].

### Algebraic Effects: The Plotkin-Pretnar Revolution (2003–2013)

The theoretical breakthrough came from Edinburgh. **Gordon Plotkin** and **John Power** published "Algebraic Operations
and Generic Effects" in 2003[^plotkin-power-2003], proving that computational effects can be treated as algebraic
operations subject to equational reasoning.

Then Plotkin and **Matija Pretnar** (his PhD student, later at the University of Ljubljana) produced two seminal papers:

- **"Handlers of Algebraic Effects"** (ESOP 2009)[^plotkin-pretnar-2009] — introduced **effect handlers**, a mechanism
  that generalizes exception handlers to _any_ computational effect. A handler acts as an interpreter for a set of
  operations, yielding a model of the algebraic theory. This paper received the **ETAPS 2022 Test of Time Award**.

- **"Handling Algebraic Effects"** (LMCS 2013)[^plotkin-pretnar-2013] — the expanded theory demonstrating handlers for
  nondeterminism, interactive I/O, concurrency, state, time, and their combinations.

The key insight: **effects are operations; handlers are interpretations**. You declare _what_ operations a computation
may perform (the effect signature) and separately _interpret_ those operations (the handler). This decoupling is more
modular than the monadic approach and eliminates the notorious **monad transformer problem**.

### The Monad Transformer Problem

Haskell's approach to composing effects — **monad transformers** (`StateT`, `ReaderT`, `ExceptT`) — suffers from
well-known issues:

1. **n² instances**: _n_ effects × _n_ transformers = _O(n²)_ boilerplate lifting instances[^schrijvers-2019]
2. **Lifting**: operations from inner layers must be explicitly lifted through outer layers
3. **Ordering sensitivity**: `StateT s (Either e)` behaves differently from `EitherT e (State s)`
4. **Poor type inference**: deeply stacked transformers produce unwieldy types

Algebraic effects sidestep all of these. Effects compose seamlessly — no lifting, no ordering sensitivity, no
combinatorial explosion of instances[^schrijvers-2019].

### Languages That Implemented Algebraic Effects

| Language      | Year | Creators                              | Innovation                                |
| ------------- | ---- | ------------------------------------- | ----------------------------------------- |
| **Eff**       | 2010 | Andrej Bauer, Matija Pretnar          | First language built on algebraic effects |
| **Koka**      | 2012 | Daan Leijen (Microsoft Research)      | Row-polymorphic effect types              |
| **Idris**     | 2013 | Edwin Brady                           | Algebraic effects + dependent types       |
| **Frank**     | 2017 | Lindley, McBride, McLaughlin          | Effects without explicit handler syntax   |
| **OCaml 5.0** | 2022 | Sivaramakrishnan, Dolan, White et al. | Algebraic effects in industrial language  |

---

## 7. Making Illegal States Unrepresentable (1965–2010)

### Hoare's Billion-Dollar Mistake (1965)

In 1965, **Sir Tony Hoare** introduced the **null reference** while designing the type system for ALGOL W. At QCon
London in March 2009, he confessed[^hoare-2009]:

> "I call it my billion-dollar mistake. It was the invention of the null reference in 1965. … I couldn't resist the
> temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors,
> vulnerabilities, and system crashes."

From the Curry-Howard perspective, null is a **lie in the type system**. When a variable is declared as `string`, the
type asserts "this value is a string." But if null is permitted, the actual proposition is "this value is a string _or
null_" — a hidden disjunction. Every dereference of a potentially-null reference is an **unproven assumption**.

### Algebraic Data Types: The Solution (1977–1990)

The solution had been known to functional programmers for decades:

```haskell
-- Haskell (1990)
data Maybe a = Nothing | Just a
```

```ocaml
(* ML/OCaml *)
type 'a option = None | Some of 'a
```

The `Maybe`/`Option` type is a **sum type**: a value is either `Nothing` (the absence of a value) or `Just` wrapping an
actual value. The disjunction is _explicit in the type_. Pattern matching forces you to handle both cases. The type
system demands a complete proof.

The history of algebraic data types traces through McCarthy's 1961 analysis of product and sum type
cardinalities[^mccarthy-1961], Hoare's 1966 "Notes on Data Structuring" (which, ironically, contains what may be the
first discussion of using sum types for compile-time error detection[^hoare-1966]), Milner's 1977 formalization in
ML[^milner-1978], the HOPE language's 1980 introduction of exhaustive pattern matching[^burstall-hope-1980], and
Miranda's 1985 coining of the term "algebraic data type"[^miranda-1985].

### Minsky's Maxim (2010)

**Yaron Minsky**, CEO of Jane Street Capital, crystallized the principle in his "Effective ML" presentation
(~2010)[^minsky-effective-ml]:

> **"Make illegal states unrepresentable."**

Choose your types such that states that are illegal in your domain _cannot be constructed_. If an invalid state cannot
exist as a value, it cannot cause a runtime bug.

Effect embodies this principle at every level. Its `Cause<E>` type is a sum type that makes it structurally impossible
to lose error information:

```typescript
type Cause<E> =
  | Empty // no error
  | Fail<E> // expected typed error
  | Die // unexpected defect
  | Interrupt // fiber cancellation
  | Sequential<E> // errors in sequence
  | Parallel<E>; // concurrent errors
```

Every possible failure mode is represented. None can be silently discarded.

---

## 8. Fibers and Structured Concurrency (1986–2018)

### Erlang: Concurrency Without Shared State (1986)

**Joe Armstrong** (1950–2019), together with Robert Virding and Mike Williams, created **Erlang** at Ericsson in
1986[^armstrong-erlang]. The motivation: Ericsson's telephone switches served hundreds of thousands of users and could
_never go down_.

Erlang's BEAM virtual machine runs lightweight **processes** — not OS threads, but runtime-managed green threads costing
only a few hundred bytes each. Processes communicate exclusively via **message passing** with no shared mutable state.
The "let it crash" philosophy means processes are designed to fail and be restarted by supervisors[^armstrong-erlang].

### Structured Concurrency (2016–2018)

The concept of **structured concurrency** — ensuring concurrent operations have clear ownership, well-defined lifetimes,
and guaranteed cleanup — was formulated by:

1. **Martin Sústrik** (2016) — coined the term with his C library libdill[^sustrik-2016]
2. **Nathaniel J. Smith** (2017) — refined it with the "nursery" pattern in Python's Trio, drawing an analogy to
   Dijkstra's critique of GOTO statements[^smith-trio-2017]
3. **Roman Elizarov** (2018) — independently arrived at the same ideas for Kotlin coroutines[^elizarov-2018]

The core insight: just as structured programming (Dijkstra, 1968) replaced `goto` with block-scoped control flow,
structured concurrency replaces unbounded thread spawning with scoped concurrent tasks that cannot outlive their parent.

> Effect implements structured concurrency through **fibers** — lightweight virtual threads with hierarchical
> parent-child relationships, resource-safe cancellation, and deterministic cleanup[^effect-fiber-docs].

---

## 9. Scala, ZIO, and the Mainstream Effect System (2004–2020)

### Odersky's Scala: FP Meets the Enterprise (2004)

**Martin Odersky** (born 1958), a student of Niklaus Wirth who had collaborated with Philip Wadler on the Pizza language
(1996) and Generic Java (1998)[^odersky-scala], released **Scala** in 2003–2004. Scala unified object-oriented and
functional programming on the JVM, proving that FP could thrive in industrial settings.

Critically, Scala's ecosystem gave rise to **Cats Effect** (Daniel Spiewak and the Typelevel community) and **ZIO**
(John De Goes) — the functional effect systems that directly inspired Effect.

### ZIO: The Template for Effect (2017–2020)

**John De Goes** began work on what would become ZIO in early 2017[^degoes-history], contributing an asynchronous effect
system to Scalaz 8.

Key dates:

- **January 2, 2018**: De Goes committed a radical departure — introducing **statically-typed, polymorphic errors** into
  the effect type, rather than fixing errors to `Throwable` as in `scala.concurrent.Future`[^degoes-history]
- **June 11, 2018**: ZIO was officially born as a standalone project[^degoes-history]
- **Late 2018**: De Goes discovered that exploiting **contravariance** on the environment type parameter enabled Scala
  to automatically infer intersecting requirements when composing effects — eliminating the need for monad
  transformers[^degoes-history]
- **August 3, 2020**: ZIO 1.0 released[^degoes-zio-1]

ZIO's signature type `ZIO[R, E, A]` — an effect requiring environment `R`, potentially failing with `E`, and succeeding
with `A` — became the direct model for Effect's `Effect<A, E, R>`.

De Goes' teaching experience was pivotal. He observed that developers struggled with monad transformer complexity, type
inference issues, and difficulty justifying FP's practical benefits. This led him to prioritize accessibility — renaming
`pure` to `ZIO.succeed`, moving away from Haskell naming conventions[^degoes-history]. Effect inherits this pragmatic
philosophy.

---

## 10. Effect: The Convergence (2020–Present)

### Michael Arnaldi's Vision

**Michael Arnaldi**, CEO of Effectful Technologies, created Effect driven by his experience as CTO of a FinTech company
where the team handled real financial stakes. They lacked confidence using plain TypeScript because JavaScript was never
designed for building banking applications[^arnaldi-bakery].

Effect began around 2020 under the organization Matechs-Garage on GitHub, initially described as "a full port of ZIO and
ZIO-Prelude in TypeScript"[^matechs-zio-prelude]. While initially a 1:1 port, it "fully embraced the power of TypeScript
and evolved in its own, unique way"[^bogomolov-intro].

### The fp-ts Merger (2023)

In early 2023, the fp-ts and Effect communities merged. **Giulio Canti**, the creator of fp-ts, joined the Effect
organization. Effect became the successor to fp-ts v2 — what would have been fp-ts v3[^effect-vs-fpts].

### TypeScript's Type System: The Unlikely Enabler

Effect exists because TypeScript's type system — designed to describe the shapes of JavaScript objects — turned out to
be powerful enough for category-theoretic abstractions:

- **Generics** (TS 0.9, 2013): enable the `Effect<A, E, R>` triple
- **Discriminated unions**: enable exhaustive pattern matching on `Cause`, `Exit`, `Option`, `Either`
- **Conditional types** (TS 2.8, 2018): enable type-level computation for inferring composed effect types
- **Variance annotations** (TS 4.7, 2022): enable covariance on `A` and `E`, making error types compose via union

TypeScript's type system is **Turing complete**[^ts-turing-complete] — a property that emerges from the combination of
conditional types, recursive types, and mapped types. Effect exploits this to verify complex invariants about effect
composition entirely at compile time.

### What Effect Synthesizes

Effect is not a single idea. It is the convergence of ninety years of ideas:

| Concept                   | Origin                       | In Effect                                         |
| ------------------------- | ---------------------------- | ------------------------------------------------- |
| Programs as values        | Church (1936), Moggi (1991)  | Lazy `Effect<A, E, R>` values                     |
| Typed error channel       | Moggi (1991), De Goes (2018) | `E` parameter with union composition              |
| Environmental DI          | Reader monad, ZIO (2018)     | `R` parameter with `Context`/`Layer`              |
| Monadic do-notation       | Wadler (1992), Haskell `do`  | `Effect.gen` with `yield*`                        |
| Algebraic data types      | ML (1977), Haskell (1990)    | `Cause`, `Exit`, `Option`, `Either`               |
| Exhaustive error handling | HOPE (1980), Minsky (~2010)  | `catchTag` with compile-time checks               |
| Fibers                    | Erlang (1986)                | Lightweight virtual threads                       |
| Structured concurrency    | Sústrik (2016), Smith (2017) | `fork`, `forkDaemon`, `Scope`                     |
| Effect systems            | Gifford & Lucassen (1986)    | Type-level tracking of all effects                |
| Algebraic effects         | Plotkin & Pretnar (2009)     | Separation of declaration and interpretation      |
| Category theory           | Eilenberg & Mac Lane (1945)  | `map`, `flatMap`, `pipe` — functorial composition |
| Curry-Howard              | Curry (1934), Howard (1969)  | Types as propositions about program behavior      |

### The Core Type, Decoded

```typescript
Effect<A, E = never, R = never>;
```

From the Effect codebase at `packages/effect/src/Effect.ts`:

```typescript
export interface Effect<out A, out E = never, out R = never> extends Effect.Variance<A, E, R>, Pipeable {
  [Symbol.iterator](): EffectGenerator<Effect<A, E, R>>;
}
```

Three type parameters, each with a lineage:

- **`A` (Success)** — the constructive content of the proof. What the program produces. Traces to Church's lambda
  calculus (computation produces values).
- **`E` (Error)** — the typed failure channel. Traces to Moggi's monadic treatment of exceptions, De Goes' typed error
  innovation in ZIO, and Minsky's principle of making failure modes explicit. `never` means "cannot fail."
- **`R` (Requirements)** — the environmental dependencies. Traces to the Reader monad, De Goes' environment type
  parameter in ZIO, and Plotkin's separation of effect declaration from interpretation. `never` means "needs nothing."

### Effect.gen: Do-Notation for TypeScript

From `packages/effect/src/internal/core.ts`:

```typescript
export const gen: typeof Effect.gen = function () {
  const f = arguments.length === 1 ? arguments[0] : arguments[1].bind(arguments[0]);
  return fromIterator(() => f(pipe));
};
```

This exploits JavaScript generators to achieve what Haskell achieves with `do` notation and Scala with `for`
comprehensions — making monadic bind look like variable assignment:

```typescript
// Haskell: do { user <- fetchUser id; posts <- fetchPosts user; pure (user, posts) }
// Scala:   for { user <- fetchUser(id); posts <- fetchPosts(user) } yield (user, posts)

// Effect:
const program = Effect.gen(function* () {
  const user = yield* fetchUser(id);
  const posts = yield* fetchPosts(user);
  return { user, posts };
});
```

The generator pauses at each `yield*`, the runtime resolves the effect, and sends the result back in. Standard
JavaScript control flow (`if`, `for`, `while`) works naturally inside — no special syntax required[^effect-gen-docs].

### Cause: Lossless Error Representation

From `packages/effect/src/Cause.ts`:

```typescript
export type Cause<E> = Empty | Fail<E> | Die | Interrupt | Sequential<E> | Parallel<E>;
```

Six variants, each representing a distinct failure mode. This is an algebraic data type in the tradition of ML (1977)
and Haskell (1990), using TypeScript's discriminated unions — themselves a direct implementation of sum types from type
theory[^adt-history].

### Layer: Compile-Time Dependency Verification

```typescript
class Random extends Context.Tag("MyRandomService")<Random, { readonly next: Effect.Effect<number> }>() {}

const program = Effect.gen(function* () {
  const random = yield* Random;
  return yield* random.next;
});
// Type: Effect<number, never, Random>
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// The compiler tracks that `Random` is required
```

Attempting to run this effect without providing `Random` produces a **compile-time error**. The entire dependency graph
is verified before a single line of code executes[^effect-services-docs].

---

## 11. The Complete Timeline

```
1910  Whitehead & Russell      Principia Mathematica (referential transparency)
1932  Church                   Lambda notation introduced
1934  Curry                    Types of combinators ≅ logical axioms
1936  Church                   Untyped lambda calculus; Entscheidungsproblem
1936  Turing                   Turing machines; equivalence with lambda calculus
1945  Eilenberg & Mac Lane     Category theory founded
1958  Curry & Feys             Combinatory Logic, Volume I
1958  McCarthy                 Lisp: first functional programming language
1958  Godement                 First monads ("standard constructions")
1965  Eilenberg & Moore        Monad algebras and adjunctions
1965  Hoare                    Null reference introduced (the billion-dollar mistake)
1967  Strachey                 Referential transparency defined for CS
1967  Bénabou                  The term "monad" coined
1969  Hindley                  Principal type property
1969  Howard                   "The formulae-as-types notion of construction"
1971  Mac Lane                 Categories for the Working Mathematician
1971  Martin-Löf               Intuitionistic type theory (first version)
1973  Milner                   ML development begins at Edinburgh
1977  Milner                   Sum and product types formalized in ML
1978  Milner                   Algorithm W for type inference
1980  Burstall et al.          HOPE: exhaustive pattern matching
1984  Martin-Löf               Intuitionistic Type Theory (Bibliopolis)
1985  Turner                   Miranda coins "algebraic data type"
1986  Gifford & Lucassen       Effect systems introduced at MIT
1986  Armstrong et al.         Erlang: lightweight processes, message passing
1987  Haskell committee        Formed at FPCA '87
1989  Moggi                    "Computational Lambda-Calculus and Monads"
1990  Haskell 1.0              First report published
1990  Wadler                   "Comprehending Monads"
1991  Moggi                    "Notions of Computation and Monads"
1992  Wadler                   "The Essence of Functional Programming"
1993  Wadler & Peyton Jones    "Imperative Functional Programming" (monadic I/O)
1996  Haskell 1.3              Monadic I/O adopted; do notation
1996  Odersky & Wadler         Pizza: FP features on the JVM
2003  Plotkin & Power           Algebraic operations and generic effects
2004  Odersky                  Scala released
2009  Plotkin & Pretnar         "Handlers of Algebraic Effects"
2009  Hoare                    "Billion dollar mistake" confession at QCon London
2010  Bauer & Pretnar           Eff: first language built on algebraic effects
~2010 Minsky                   "Make illegal states unrepresentable"
2012  TypeScript 0.8            Released by Microsoft
2013  Plotkin & Pretnar         "Handling Algebraic Effects" (full theory)
2016  Sústrik                  Structured concurrency coined
2017  Smith                    Nursery pattern in Trio
2017  De Goes                  ZIO work begins
2018  De Goes                  ZIO born: ZIO[R, E, A] with typed errors
2018  TypeScript 2.8            Conditional types
2020  Arnaldi                  Effect-TS development begins
2022  OCaml 5.0                 Algebraic effect handlers in production
2022  TypeScript 4.7            Variance annotations
2023  fp-ts + Effect merger     Canti joins Effect organization
2024  Effect 3.0                First stable release after 5 years
2026  Effect v4 beta            Rewritten runtime, unified packages
```

---

## Epilogue

The tragedy is not that Effect is complex. The tragedy is that its brilliance is invisible to those who haven't traced
the lineage.

When someone says Effect "feels like a new programming language," they are accidentally correct — but not in the way
they mean. Effect is not a new language. It is the _distillation_ of ninety years of discoveries about the nature of
computation, compressed into a TypeScript library.

Every `yield*` is a monadic bind, born in Moggi's Edinburgh office in 1989. Every `Cause` variant is an algebraic data
type, formalized by Milner in 1977. Every `Layer` is a proof obligation, checked by the compiler via the Curry-Howard
correspondence. Every fiber is a lightweight process, inheriting Erlang's 1986 insight that concurrency without shared
state is the path to reliability.

The engineers who dismiss Effect as "verbose" are looking at the syntax and missing the semantics. They see unfamiliar
combinators and conclude complexity. But what they are actually seeing is the _compressed knowledge of nine decades_ of
the brightest minds in mathematics and computer science — Church, Curry, Eilenberg, Mac Lane, Milner, Moggi, Wadler,
Plotkin, De Goes, Arnaldi — each standing on the shoulders of those who came before.

As David Abram suggests: the abstractions are subtle. The lineage is deep. And the payoff — typed errors, structured
concurrency, compile-time dependency verification, lossless failure tracking, referential transparency — is not
theoretical. It is the difference between software that works and software that works _reliably_.

---

## 12. References

[^church-1936]:
    Church, A. "An Unsolvable Problem of Elementary Number Theory." _American Journal of Mathematics_ 58.2 (1936):
    345–363. [PDF][church-1936-pdf]

[^church-turing]: Church-Turing Thesis. _Wikipedia_. [Link][church-turing-wiki]

[^curry-howard-wiki]: Curry-Howard Correspondence. _Wikipedia_. [Link][curry-howard-wiki]

[^curry-1934]:
    Curry, H.B. "Functionality in Combinatory Logic." _Proceedings of the National Academy of Sciences U.S.A._ 20
    (1934): 584–590.

[^curry-feys-1958]: Curry, H.B. and Feys, R. _Combinatory Logic, Volume I_. Amsterdam: North-Holland, 1958.

[^howard-1969]:
    Howard, W.A. "The formulae-as-types notion of construction." 1969. Published in _To H.B. Curry: Essays on
    Combinatory Logic, Lambda Calculus, and Formalism_. Academic Press, 1980. pp. 479–490.

[^wadler-propositions]:
    Wadler, P. "Propositions as Types." _Communications of the ACM_ 58.12 (2015): 75–84.
    [Link][wadler-propositions-link]

[^debruijn]:
    De Bruijn, N.G. "The Mathematical Language AUTOMATH, Its Usage, and Some of Its Extensions." _Symposium on Automatic
    Demonstration_, Springer, 1970.

[^martin-lof-1984]: Martin-Löf, P. _Intuitionistic Type Theory_. Naples: Bibliopolis, 1984. [PDF][martin-lof-pdf]

[^martin-lof-1979]:
    Martin-Löf, P. "Constructive Mathematics and Computer Programming." _Proceedings of the 6th International Congress
    of Logic, Methodology, and Philosophy of Science_, 1982.

[^effect-type-docs]: "The Effect Type." _Effect Documentation_. [Link][effect-type-docs-link]

[^eilenberg-maclane-1945]:
    Eilenberg, S. and Mac Lane, S. "General Theory of Natural Equivalences." _Transactions of the American Mathematical
    Society_ 58 (1945): 231–294. [PDF][eilenberg-maclane-pdf]

[^stanford-category-theory]: "Category Theory." _Stanford Encyclopedia of Philosophy_. [Link][stanford-category-link]

[^godement-1958]: Godement, R. _Topologie algébrique et théorie des faisceaux_. Paris: Hermann, 1958.

[^eilenberg-moore-1965]:
    Eilenberg, S. and Moore, J.C. "Adjoint Functors and Triples." _Illinois Journal of Mathematics_ 9.3 (1965): 381–398.

[^kleisli-1965]:
    Kleisli, H. "Every Standard Construction is Induced by a Pair of Adjoint Functors." _Proceedings of the American
    Mathematical Society_ 16.3 (1965): 544–546.

[^benabou-monad]: Bénabou, J. "Introduction to Bicategories." _Reports of the Midwest Category Seminar_, Springer, 1967.

[^maclane-1971]:
    Mac Lane, S. _Categories for the Working Mathematician_. Graduate Texts in Mathematics, Vol. 5. New York:
    Springer, 1971.

[^moggi-1989]:
    Moggi, E. "Computational Lambda-Calculus and Monads." _Fourth Annual Symposium on Logic in Computer Science_ (LICS).
    IEEE, 1989. pp. 14–23. [PDF][moggi-1989-pdf]

[^moggi-1991]:
    Moggi, E. "Notions of Computation and Monads." _Information and Computation_ 93.1 (1991): 55–92.
    [PDF][moggi-1991-pdf]

[^moggi-lics-award]: LICS Test-of-Time Award, 2009. Awarded to Moggi 1989.

[^mccarthy-1960]:
    McCarthy, J. "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I." _Communications
    of the ACM_ 3.4 (1960): 184–195.

[^mccarthy-1961]:
    McCarthy, J. "A Basis for a Mathematical Theory of Computation." 1961. _Western Joint Computer Conference_.

[^milner-1978]:
    Milner, R. "A Theory of Type Polymorphism in Programming." _Journal of Computer and System Sciences_ 17 (1978):
    348–375. [PDF][milner-1978-pdf]

[^damas-milner-1982]:
    Damas, L. and Milner, R. "Principal Type-Schemes for Functional Programs." _9th ACM SIGPLAN-SIGACT Symposium on
    Principles of Programming Languages_ (POPL). 1982.

[^hindley-1969]:
    Hindley, J.R. "The Principal Type-Scheme of an Object in Combinatory Logic." _Transactions of the American
    Mathematical Society_ 146 (1969): 29–60.

[^strachey-1967]:
    Strachey, C. "Fundamental Concepts in Programming Languages." Lecture notes, International Summer School in Computer
    Programming, Copenhagen, 1967. [PDF][strachey-pdf]

[^effect-blog-react]: Arnaldi, M. "From React to Effect." _Effect Blog_, August 2024. [Link][effect-blog-react-link]

[^history-haskell]:
    Hudak, P., Hughes, J., Peyton Jones, S., and Wadler, P. "A History of Haskell: Being Lazy With Class." _Third ACM
    SIGPLAN Conference on History of Programming Languages_ (HOPL III). 2007. [PDF][history-haskell-pdf]

[^wadler-blott-typeclasses]:
    Wadler, P. and Blott, S. "How to Make Ad-Hoc Polymorphism Less Ad Hoc." _16th ACM SIGPLAN-SIGACT Symposium on
    Principles of Programming Languages_ (POPL). 1989.

[^wadler-comprehending]:
    Wadler, P. "Comprehending Monads." _ACM Conference on Lisp and Functional Programming_. Nice, France, 1990.
    Published in _Mathematical Structures in Computer Science_ 2.4 (1992): 461–493.

[^wadler-essence]:
    Wadler, P. "The Essence of Functional Programming." _19th Annual Symposium on Principles of Programming Languages_
    (POPL). 1992. pp. 1–14.

[^wadler-imperative]:
    Peyton Jones, S.L. and Wadler, P. "Imperative Functional Programming." _20th ACM SIGPLAN-SIGACT Symposium on
    Principles of Programming Languages_ (POPL). 1993. POPL 2003 Most Influential Paper Award.

[^gifford-lucassen-1986]:
    Gifford, D.K. and Lucassen, J.M. "Integrating Functional and Imperative Programming." _1986 ACM Conference on LISP
    and Functional Programming_ (LFP '86).

[^lucassen-gifford-1988]:
    Lucassen, J.M. and Gifford, D.K. "Polymorphic Effect Systems." _15th ACM SIGPLAN-SIGACT Symposium on Principles of
    Programming Languages_ (POPL '88).

[^talpin-jouvelot-1992]:
    Talpin, J.-P. and Jouvelot, P. "Polymorphic Type, Region and Effect Inference." _Journal of Functional Programming_
    2.3 (1992): 245–271.

[^plotkin-power-2003]:
    Plotkin, G. and Power, J. "Algebraic Operations and Generic Effects." _Applied Categorical Structures_ 11 (2003):
    69–94. [PDF][plotkin-power-pdf]

[^plotkin-pretnar-2009]:
    Plotkin, G. and Pretnar, M. "Handlers of Algebraic Effects." _European Symposium on Programming_ (ESOP). 2009. ETAPS
    2022 Test of Time Award. [PDF][plotkin-pretnar-2009-pdf]

[^plotkin-pretnar-2013]:
    Plotkin, G. and Pretnar, M. "Handling Algebraic Effects." _Logical Methods in Computer Science_ 9.4:23 (2013).
    [PDF][plotkin-pretnar-2013-pdf]

[^schrijvers-2019]:
    Schrijvers, T., Piróg, M., Wu, N., and Jaskelioff, M. "Monad Transformers and Modular Algebraic Effects: What Binds
    Them Together." _Haskell Symposium_. 2019.

[^hoare-2009]:
    Hoare, C.A.R. "Null References: The Billion Dollar Mistake." _QCon London_, March 2009. [Video][hoare-video]

[^hoare-1966]:
    Hoare, C.A.R. "Notes on Data Structuring." 1972 (written ~1966). In _Structured Programming_, Academic Press.

[^adt-history]: Wayne, H. "A Very Early History of Algebraic Data Types." 2024. [Link][adt-history-link]

[^burstall-hope-1980]:
    Burstall, R., MacQueen, D., and Sannella, D. "HOPE: An Experimental Applicative Language." _1980 LISP Conference_.

[^miranda-1985]:
    Turner, D. "Miranda: A Non-Strict Functional Language with Polymorphic Types." _Functional Programming Languages and
    Computer Architecture_ (FPCA). 1985.

[^minsky-effective-ml]: Minsky, Y. "Effective ML." Jane Street Tech Blog. [Link][minsky-link]

[^armstrong-erlang]:
    Armstrong, J. "A History of Erlang." _Third ACM SIGPLAN Conference on History of Programming Languages_ (HOPL
    III). 2007.

[^sustrik-2016]: Sústrik, M. "Structured Concurrency." 2016. Blog post introducing libdill.

[^smith-trio-2017]:
    Smith, N.J. "Notes on Structured Concurrency, or: Go Statement Considered Harmful." 2018. [Link][smith-trio-link]

[^elizarov-2018]: Elizarov, R. Structured Concurrency in Kotlin Coroutines. 2018.

[^effect-fiber-docs]: "Fibers." _Effect Documentation_. [Link][effect-fiber-link]

[^odersky-scala]: Odersky, M. "The Origins of Scala." _Artima_. [Link][odersky-scala-link]

[^degoes-history]: De Goes, J.A. "A Brief History of ZIO." [Link][degoes-history-link]

[^degoes-zio-1]: De Goes, J.A. "ZIO 1.0 Released." [Link][degoes-zio1-link]

[^arnaldi-bakery]: "Michael Arnaldi on Effect-TS." _The Developers' Bakery_ #67. [Link][arnaldi-bakery-link]

[^matechs-zio-prelude]:
    "Effect-TS Core: ZIO-Prelude Inspired Typeclasses & Module Structure." _Matechs Blog_. [Link][matechs-blog-link]

[^bogomolov-intro]: Bogomolov, Y. "Introduction to Effect." [Link][bogomolov-link]

[^effect-vs-fpts]: "Effect vs fp-ts." _Effect Documentation_. [Link][effect-vs-fpts-link]

[^ts-turing-complete]: "TypeScript Type System Turing Completeness." _GitHub Issue #14833_. [Link][ts-turing-link]

[^effect-gen-docs]: "Using Generators." _Effect Documentation_. [Link][effect-gen-link]

[^effect-services-docs]: "Managing Services." _Effect Documentation_. [Link][effect-services-link]

<!-- Reference-style links -->

[church-1936-pdf]: https://ics.uci.edu/~lopes/teaching/inf212W12/readings/church.pdf
[church-turing-wiki]: https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis
[curry-howard-wiki]: https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence
[wadler-propositions-link]: https://dl.acm.org/doi/fullHtml/10.1145/2699407
[martin-lof-pdf]: https://archive-pml.github.io/martin-lof/pdfs/Bibliopolis-Book-retypeset-1984.pdf
[effect-type-docs-link]: https://effect.website/docs/getting-started/the-effect-type/
[eilenberg-maclane-pdf]:
  https://www.ams.org/journals/tran/1945-058-00/S0002-9947-1945-0013131-6/S0002-9947-1945-0013131-6.pdf
[stanford-category-link]: https://plato.stanford.edu/entries/category-theory/
[moggi-1989-pdf]: https://www.cs.cmu.edu/~crary/819-f09/Moggi89.pdf
[moggi-1991-pdf]: https://www.cs.cmu.edu/~crary/819-f09/Moggi91.pdf
[milner-1978-pdf]: https://homepages.inf.ed.ac.uk/wadler/papers/papers-we-love/milner-type-polymorphism.pdf
[strachey-pdf]: https://www.cs.cmu.edu/~crary/819-f09/Strachey67.pdf
[effect-blog-react-link]: https://effect.website/blog/from-react-to-effect/
[history-haskell-pdf]: https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/history.pdf
[plotkin-power-pdf]: https://homepages.inf.ed.ac.uk/gdp/publications/alg_ops_gen_effects.pdf
[plotkin-pretnar-2009-pdf]: https://homepages.inf.ed.ac.uk/gdp/publications/Effect_Handlers.pdf
[plotkin-pretnar-2013-pdf]: https://homepages.inf.ed.ac.uk/gdp/publications/handling-algebraic-effects.pdf
[hoare-video]: https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/
[adt-history-link]: https://www.hillelwayne.com/post/algdt-history/
[minsky-link]: https://blog.janestreet.com/effective-ml-revisited/
[smith-trio-link]: https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/
[effect-fiber-link]: https://effect.website/docs/concurrency/fibers/
[odersky-scala-link]: https://www.artima.com/articles/the-origins-of-scala
[degoes-history-link]: https://degoes.net/articles/zio-history
[degoes-zio1-link]: https://degoes.net/articles/zio-1.0
[arnaldi-bakery-link]: https://thebakery.dev/67/
[matechs-blog-link]: https://www.matechs.com/blog/effect-ts-core-zio-prelude-inspired-typeclasses-module-structure
[bogomolov-link]: https://ybogomolov.me/01-effect-intro
[effect-vs-fpts-link]: https://effect.website/docs/additional-resources/effect-vs-fp-ts/
[ts-turing-link]: https://github.com/microsoft/TypeScript/issues/14833
[effect-gen-link]: https://effect.website/docs/getting-started/using-generators/
[effect-services-link]: https://effect.website/docs/requirements-management/services/
