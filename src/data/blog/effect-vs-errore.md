---
title: "Effect vs errore — Why 'Errors as Values' Isn't Enough"
description: "errore.org offers typed errors for TypeScript, but Effect's intellectual lineage reveals why programs-as-values demands far more."
date: 2025-02-21
tags: ["effect", "errore", "type-safety", "functional-programming"]
---

## Introduction

[errore](https://errore.org/) is a TypeScript library that brings typed errors to your codebase. It's a clean idea: instead of throwing exceptions, return errors as values and let the type system track what can go wrong. If you've been burned by untyped `catch` blocks, errore's pitch is immediately appealing.

But if typed errors were the whole story, we wouldn't need Effect. The intellectual history behind Effect reveals that "errors as values" is one chapter in a much longer arc — one that stretches from the lambda calculus through category theory, algebraic effects, and structured concurrency. errore addresses a real pain point, but it solves only one dimension of a problem that is inherently multi-dimensional.

This post argues that errore is a useful stepping stone, but that Effect — born from decades of accumulated insight — is the destination.

## Programs as Values, Not Just Errors as Values

errore models *errors* as values. Effect models *entire programs* as values.[^1]

This distinction is fundamental. When you write an Effect program, the value you're constructing isn't just a result-or-error — it's a *description* of a computation that can be inspected, composed, retried, timed out, traced, and interpreted in multiple ways. This is the programs-as-values paradigm, and it emerges directly from the lambda calculus, where computation itself is just function application.[^2]

The Curry-Howard correspondence deepens this: a type signature is a proposition, and a program that inhabits that type is a proof.[^3] Effect's type signature `Effect<A, E, R>` isn't merely carrying data — it's asserting a proposition about what the program does, what can go wrong, and what it needs. errore gives you `E`. Effect gives you `E`, `A`, and `R` together, as an algebraic structure with laws.

```typescript
// errore: errors as values
const result: Result<User, NotFoundError | DbError> = await findUser(id);

// Effect: programs as values
const program: Effect<User, NotFoundError | DbError, UserRepo | DbConnection> = findUser(id);
// ^ This is a value. It hasn't run yet. You can compose, retry, trace it.
```

Category theory provides the vocabulary: Effect is a *monad* (actually a more powerful structure), and composition follows categorical laws.[^4] errore gives you a tagged union; Effect gives you a composable algebra.

## Structured Concurrency and Fibers

errore has no concurrency model. It doesn't need one — it's a library for error typing, not execution. But this is precisely the gap.

Real programs need to run things concurrently: fetch data from multiple sources, race timeouts against operations, fan out work to parallel workers. If your error-typing library can't participate in concurrent workflows, you're back to managing `Promise.all` and `Promise.race` with ad hoc error handling — exactly the unstructured approach that produces bugs.

Effect provides structured concurrency through fibers.[^5] Every concurrent operation runs on a fiber — a lightweight, cooperative thread with a well-defined lifecycle. Fibers form a parent-child tree: if a parent is interrupted, its children are interrupted too. No orphaned tasks. No dangling promises. No resource leaks from forgotten concurrent branches.

```typescript
// Race two operations with automatic cleanup
const fastest = Effect.race(fetchFromCacheEffect, fetchFromDbEffect);

// Run concurrently with typed errors from both
const both = Effect.all([validateInput, checkPermissions], { concurrency: 2 });
```

This wasn't invented in a vacuum. Structured concurrency traces back through Dijkstra's structured programming, through Erlang's supervision trees, through Kotlin's coroutine scopes.[^5] Effect inherits these lessons. errore doesn't address them at all.

## Resource Safety and Scoped Lifetimes

When you open a database connection, a file handle, or a network socket, you must close it — even when errors occur, even when concurrent operations are interrupted. errore gives you typed errors, but nothing to ensure the connection gets closed when those errors happen during a concurrent interruption.

Effect provides `Scope` — a first-class representation of a resource's lifetime.[^6] Resources are acquired and released within a scope, and the runtime guarantees finalization regardless of how the computation exits: success, failure, or interruption.

```typescript
const dbPool = Effect.acquireRelease(
  connectToDatabase(),       // acquire
  (pool) => pool.close()     // release — guaranteed
);
```

This is the "making illegal states unrepresentable" principle applied to resource management.[^6] A resource without a scope is a resource that can leak. Effect makes leaks a type error.

## Dependency Injection via the Environment Type

errore's `Result<A, E>` has two channels: success and error. Effect's `Effect<A, E, R>` has three — and that third channel, `R`, changes everything.

`R` represents the *requirements* of a computation.[^7] It's a type-level declaration of what services, configurations, or capabilities the program needs to run. This is dependency injection resolved at the type level, not through a runtime container.

```typescript
// This Effect requires a UserRepo and a Logger to run
const createUser: Effect<User, ValidationError, UserRepo | Logger> = ...

// Provide dependencies via layers — composable, testable, type-safe
const program = createUser.pipe(
  Effect.provide(UserRepoLive),
  Effect.provide(LoggerConsole),
);
```

In ZIO (Effect's Scala predecessor), this `R` channel was the breakthrough that unified dependency injection with the effect system.[^7] errore offers nothing comparable — if you need DI, you wire it up separately, losing the type safety and composability.

## Algebraic Effects Heritage

Effect's name isn't a coincidence. It inherits from the algebraic effects research tradition, which models side effects as *operations* that can be given different *handlers*.[^8]

This means the same program can be interpreted differently depending on context: in production it hits a real database; in tests it uses an in-memory store; in a dry-run mode it logs what it *would* do. The program description is separate from its interpretation.

errore doesn't participate in this paradigm. It's a data structure for error values, not an effect system. It can't express "this computation performs logging and database access" in a way that allows swapping implementations.

## Beyond Error Typing

Once you have programs as values with typed errors, structured concurrency, resource safety, dependency injection, and algebraic effect handlers, you can build higher-level abstractions:

| Capability | Effect | errore |
|---|---|---|
| Typed errors | Yes | Yes |
| Programs as values | Yes | No |
| Structured concurrency | Yes (fibers) | No |
| Resource safety (Scope) | Yes | No |
| Dependency injection (R) | Yes | No |
| Retries & scheduling | Yes | No |
| Observability (metrics, tracing) | Yes | No |
| Streaming (Stream) | Yes | No |
| Schema validation | Yes (Effect Schema) | No |
| Platform-agnostic HTTP | Yes (Effect Platform) | No |

Effect's convergence[^9] is the result of decades of ideas coming together: lambda calculus, type theory, category theory, algebraic effects, structured concurrency, and practical lessons from Haskell, Scala, and ZIO. Each capability isn't bolted on — it's a natural consequence of the programs-as-values foundation.

## Conclusion

errore solves a real problem. Typed errors are better than `unknown` in your `catch` blocks. If all you need is error typing, errore is a fine choice.

But most programs need more than error typing. They need concurrency that doesn't leak. Resources that close themselves. Dependencies that compose. Computations that can be inspected and reinterpreted. These aren't nice-to-haves — they're the problems that cause production incidents at 2 AM.

Effect exists because "errors as values" was never the whole answer. The whole answer is *programs* as values — and that requires an intellectual foundation that took sixty years to build.

---

[^1]: See [Chapter 10, "Effect: The Convergence"](/chapters/10-effect-the-convergence-2020present) for how Effect unifies programs-as-values across the TypeScript ecosystem.

[^2]: See [Chapter 1, "The Lambda Calculus"](/chapters/1-the-lambda-calculus-computation-as-function-19321936) — Church's insight that computation is function application laid the groundwork for treating programs as composable values.

[^3]: See [Chapter 2, "The Curry-Howard Correspondence"](/chapters/2-the-curry-howard-correspondence-proofs-are-programs-19341969) — types are propositions, programs are proofs. Effect's three-channel type signature is a proposition about what the program does.

[^4]: See [Chapter 3, "Category Theory"](/chapters/3-category-theory-the-mathematics-of-structure-19451971) — monads, functors, and natural transformations provide the algebraic laws that make Effect composition reliable.

[^5]: See [Chapter 8, "Fibers and Structured Concurrency"](/chapters/8-fibers-and-structured-concurrency-19862018) — from Dijkstra's structured programming to Effect's fiber runtime.

[^6]: See [Chapter 7, "Making Illegal States Unrepresentable"](/chapters/7-making-illegal-states-unrepresentable-19652010) — Scope and resource safety make resource leaks a type error, not a runtime surprise.

[^7]: See [Chapter 9, "Scala, ZIO, and the Mainstream Effect System"](/chapters/9-scala-zio-and-the-mainstream-effect-system-20042020) — ZIO's `R` parameter for dependency injection was a direct precursor to Effect's environment type.

[^8]: See [Chapter 6, "Effect Systems and Algebraic Effects"](/chapters/6-effect-systems-and-algebraic-effects-19862013) — algebraic effects model side effects as operations with swappable handlers.

[^9]: See [Chapter 10, "Effect: The Convergence"](/chapters/10-effect-the-convergence-2020present) — how sixty years of ideas converged into a single TypeScript library.
