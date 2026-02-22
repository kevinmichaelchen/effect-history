---
title: "Effect vs tsyringe — Dependency Injection Without the Container"
description: "tsyringe gives you a runtime DI container with decorators. Effect gives you compile-time dependency tracking woven into the type system. Here's why that difference matters."
date: 2025-02-21T14:00:00
tags: ["effect", "tsyringe", "dependency-injection", "type-safety"]
---

## Introduction

Microsoft's [tsyringe](https://github.com/microsoft/tsyringe) is a lightweight dependency injection container for TypeScript. If you've worked in Java or C#, its decorator-based approach feels familiar: mark a class `@injectable()`, register it in a container, and resolve it at runtime. It's clean, minimal, and well-suited to the OOP tradition of inversion of control.

But tsyringe inherits the limitations of that tradition. Dependencies are discovered at runtime through reflection metadata. Interfaces vanish during compilation, so you wire them with string tokens. The container is a mutable singleton that knows everything about your application's object graph — and the type system knows almost nothing about it.

Effect takes a fundamentally different approach. Dependencies aren't registered in a container — they're declared in the type signature. The `R` parameter in `Effect<A, E, R>` is a compile-time record of every service a computation requires. If you forget to provide one, your program doesn't compile. No runtime surprises. No missing-binding exceptions in production.

This post compares the two approaches and argues that Effect's type-level dependency injection is a better foundation for TypeScript applications.

## The Container vs. the Type Signature

tsyringe follows the classic IoC container pattern. You register providers in a global container, and the container constructs your object graph at runtime:

```typescript
import "reflect-metadata";
import { container, injectable, inject, singleton } from "tsyringe";

interface IDatabase {
  query(sql: string): Promise<any>;
}

@injectable()
class PostgresDatabase implements IDatabase {
  async query(sql: string) { /* ... */ }
}

@singleton()
class UserService {
  constructor(@inject("IDatabase") private db: IDatabase) {}
}

// Register at runtime — not checked by TypeScript
container.register("IDatabase", { useClass: PostgresDatabase });

// Resolve at runtime — could throw if "IDatabase" isn't registered
const userService = container.resolve(UserService);
```

The string `"IDatabase"` is a runtime key. TypeScript can't verify that it points to a valid registration. If you misspell it, rename the token, or forget to register it, you find out at runtime — or worse, in production.

Effect encodes the same information in the type system:

```typescript
import { Effect, Context, Layer } from "effect";

class Database extends Context.Tag("Database")<
  Database,
  { readonly query: (sql: string) => Effect.Effect<any> }
>() {}

class UserService extends Context.Tag("UserService")<
  UserService,
  { readonly getUser: (id: number) => Effect.Effect<any> }
>() {}

// This effect *declares* that it needs a Database
const getUser = (id: number): Effect.Effect<any, never, Database> =>
  Effect.gen(function* () {
    const db = yield* Database;
    return yield* db.query(`SELECT * FROM users WHERE id = ${id}`);
  });
```

The `Database` requirement isn't a string token — it's a type. If the dependency isn't provided before the program runs, TypeScript refuses to compile. The entire dependency graph is visible in the type signature, checked at compile time, and enforced by the language itself.[^1]

## Decorators and Reflection vs. Plain Functions

tsyringe requires three things that sit outside TypeScript's standard type system:

1. **`reflect-metadata`** — a polyfill that must be imported before any DI code runs
2. **`experimentalDecorators: true`** — an unstable compiler flag
3. **`emitDecoratorMetadata: true`** — which emits runtime type information that TypeScript normally erases

This is a load-bearing dependency chain. If your bundler strips metadata during minification, DI breaks.[^2] If you're using a tool that doesn't support `emitDecoratorMetadata` (like SWC or esbuild in some configurations), you need workarounds. And the experimental decorators API is being superseded by the TC39 Stage 3 decorators proposal, which has a different semantics — creating a migration path that tsyringe hasn't yet fully navigated.

Effect uses none of this. Services are defined with plain classes and functions. No decorators, no metadata reflection, no compiler flags. A `Tag` is a value. A `Layer` is a value. Composition is function application:

```typescript
const DatabaseLive = Layer.succeed(
  Database,
  { query: (sql) => Effect.succeed({ rows: [] }) }
);

const UserServiceLive = Layer.effect(
  UserService,
  Effect.gen(function* () {
    const db = yield* Database;
    return { getUser: (id) => db.query(`SELECT * FROM users WHERE id = ${id}`) };
  })
);

// Compose layers — type system tracks what's provided and what's still needed
const AppLayer = UserServiceLive.pipe(Layer.provide(DatabaseLive));
```

No global container. No mutation. No import-order sensitivity. Just values composed with functions — the same paradigm the lambda calculus established in 1936.[^3]

## Interfaces Vanish; Tags Don't

One of tsyringe's most persistent pain points is that TypeScript interfaces are erased at compile time. Since tsyringe resolves dependencies at runtime using reflected type information, it can't "see" interfaces. You must bridge the gap with string or symbol tokens:

```typescript
// tsyringe: the string "ILogger" is the only link between interface and implementation
@injectable()
class App {
  constructor(@inject("ILogger") private logger: ILogger) {}
}

container.register("ILogger", { useClass: ConsoleLogger });
```

If you rename the interface, the string stays behind. If two modules accidentally use the same string token, they silently collide. The type system provides no guardrails.

Effect's `Tag` system solves this structurally. A Tag is a first-class value that carries its service type:

```typescript
class Logger extends Context.Tag("Logger")<
  Logger,
  { readonly info: (msg: string) => Effect.Effect<void> }
>() {}
```

The `Logger` Tag is simultaneously the key and the type. When you write `yield* Logger` inside an `Effect.gen`, TypeScript infers the correct service type and adds `Logger` to the `R` requirement. No string matching. No risk of collision. Refactoring tools rename everything in lockstep.

## Lifecycle: Scopes vs. Container Hierarchies

tsyringe provides four lifecycle scopes: Transient (new instance every time), Singleton (one instance globally), ResolutionScoped (one per resolution chain), and ContainerScoped (one per container). For hierarchical scoping, you create child containers:

```typescript
const requestContainer = container.createChildContainer();
requestContainer.register("RequestId", { useValue: generateId() });
// Child inherits parent registrations, but has its own scoped instances
```

This works, but the lifecycle of a registration is determined by how it's registered — not by the computation that uses it. There's no compile-time guarantee that a request-scoped service won't accidentally depend on a transient one, or that resources are cleaned up when the scope ends.

Effect's `Scope` is a first-class value that represents a resource's lifetime:[^4]

```typescript
const dbPool = Effect.acquireRelease(
  connectToDatabase(),          // acquire
  (pool) => pool.close()        // release — guaranteed, even on interruption
);

const DatabaseLive = Layer.scoped(Database, dbPool);
```

When a `Layer` is scoped, its finalizers run when the scope closes — whether the computation succeeded, failed, or was interrupted by a concurrent fiber. The runtime guarantees this. tsyringe's `Disposable` interface provides a weaker version — you must remember to call `container.dispose()`, and interruption-safety isn't part of the model.

## Testing: Mocking Without a Container

Both approaches support testing through service substitution, but the mechanics differ significantly.

In tsyringe, you typically reset the global container and re-register mocks:

```typescript
beforeEach(() => {
  container.clearInstances();
  container.register("IDatabase", { useValue: mockDatabase });
});
```

This is imperative, stateful, and order-dependent. If one test forgets to clean up, the next test inherits stale state. The container is shared mutable state — the thing dependency injection was supposed to help you manage.

In Effect, you provide alternative implementations at the type level:

```typescript
const mockDatabase = Layer.succeed(Database, {
  query: () => Effect.succeed({ rows: [{ id: 1, name: "Test" }] }),
});

const testProgram = myProgram.pipe(Effect.provide(mockDatabase));
// No global state. No cleanup. Each test composes its own dependency graph.
```

Since `Layer` composition is pure and immutable, tests are inherently isolated. There's no shared container to corrupt. And because the `R` type tracks dependencies, if your test forgets to provide a mock, the compiler tells you — not a runtime error three levels deep in a stack trace.

## Beyond Injection: The Effect System Advantage

tsyringe solves one problem well: constructing object graphs with managed lifecycles. But dependency injection doesn't exist in a vacuum. Real applications also need concurrency, error handling, resource management, retries, timeouts, and observability.

With tsyringe, each of these concerns requires a separate library, a separate integration, and a separate mental model. Your DI container doesn't know about your error handling strategy, which doesn't know about your concurrency model, which doesn't know about your resource cleanup.

Effect unifies all of these under a single type: `Effect<A, E, R>`.[^5]

| Capability | Effect | tsyringe |
|---|---|---|
| Dependency injection | Yes (R type, Layers) | Yes (container, decorators) |
| Compile-time dep checking | Yes | No |
| No decorator/metadata dependency | Yes | No (requires reflect-metadata) |
| Typed errors | Yes (E type) | No |
| Structured concurrency | Yes (fibers) | No |
| Resource safety (Scope) | Yes (guaranteed finalization) | Partial (manual dispose) |
| Retries & scheduling | Yes | No |
| Observability (metrics, tracing) | Yes | No |
| Streaming | Yes (Stream) | No |
| Schema validation | Yes (Effect Schema) | No |

This isn't a criticism of tsyringe for lacking these features — it's a DI container, not an effect system. But it does mean that choosing tsyringe for DI locks you into assembling the remaining capabilities piecemeal. Effect's DI is one facet of a unified system where all the pieces compose through the same algebra.[^6]

## When tsyringe Makes Sense

tsyringe is a reasonable choice when:

- You're working in an existing OOP codebase with class-based architecture
- Your team is familiar with DI containers from Java, C#, or NestJS
- You need a lightweight solution and don't want to adopt a full effect system
- Your project is small enough that runtime DI errors are caught quickly

It's especially well-suited to NestJS applications, where the decorator-based style is already the convention.

## Conclusion

tsyringe and Effect both solve dependency injection, but they start from different premises. tsyringe says: *"Tell the container how to build your objects, and it will wire them together at runtime."* Effect says: *"Declare what your program needs in its type signature, and the compiler will ensure everything is provided before it runs."*

The difference is the difference between runtime discovery and compile-time proof. tsyringe's approach works — millions of Java and C# applications prove that. But TypeScript's type system is powerful enough to do better. Effect's `R` parameter makes dependency graphs visible and verifiable without reflection, decorators, or a mutable global container.

If you're starting a new TypeScript project and want dependency injection the type system actually enforces, Effect does that. tsyringe doesn't.

---

[^1]: See [Chapter 9, "Scala, ZIO, and the Mainstream Effect System"](/chapters/9-scala-zio-and-the-mainstream-effect-system-20042020) — ZIO's `R` parameter for dependency injection was a direct precursor to Effect's environment type, making dependencies a first-class part of the type signature.

[^2]: Minifiers like Terser strip variable names and metadata that `reflect-metadata` depends on. Production builds using tsyringe often require `keep_fnames: true` or similar configuration — a fragile workaround that increases bundle size.

[^3]: See [Chapter 1, "The Lambda Calculus"](/chapters/1-the-lambda-calculus-computation-as-function-19321936) — Church's insight that computation is function application. Effect's Layer composition is a direct descendant of this idea: services are functions from dependencies to implementations.

[^4]: See [Chapter 7, "Making Illegal States Unrepresentable"](/chapters/7-making-illegal-states-unrepresentable-19652010) — Scope and resource safety make resource leaks a type error, not a runtime surprise.

[^5]: See [Chapter 10, "Effect: The Convergence"](/chapters/10-effect-the-convergence-2020present) — how sixty years of ideas converged into a single TypeScript library that unifies error handling, concurrency, resource management, and dependency injection.

[^6]: See [Chapter 3, "Category Theory"](/chapters/3-category-theory-the-mathematics-of-structure-19451971) — monads, functors, and natural transformations provide the algebraic laws that make Effect composition reliable across all its subsystems.
