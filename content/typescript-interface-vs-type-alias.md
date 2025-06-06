---
title: TypeScript Interface vs Type Alias
date: 2022-02-07
tag: Project Foundation, Front-End, TypeScript
description: Understanding the differences between interfaces and type aliases in TypeScript
image: https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80
---

# TypeScript Interface vs Type Alias

The [Official Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) provides some information about the difference between them.

Why I prefer to use `type alias` over `interface` because:

1. Declaration merging: if the same interface (same name) is declared twice with different properties, they will be merged into one interface with all the properties. With type alias, it will trigger a TypeScript error.
2. Usually we talk about types when we refer to TypeScript. It's commonly used the suffix `Type` when defining them. Files are often called `*.types.ts` and folder `./types/my.types.ts`.
3. It's not called InterfaceScript, isn't it? :)

Definitely. They are almost the same, there is no real benefit in most cases of using one over the other. What makes sense is to choose one and stick to it.
