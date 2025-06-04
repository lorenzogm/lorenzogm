---
title: Next.js Architecture - API SDK + UI Separation
date: 2025-06-04
tag: Next.js, Architecture, TypeScript
description: A clean architecture pattern for separating API/SDK logic from UI components using TypeScript interfaces and adapters
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

# Next.js Architecture: API SDK + UI Separation

A clean architecture pattern for separating API/SDK logic from UI components using TypeScript interfaces and adapters. This approach helps maintain clean separation of concerns while ensuring type safety across your entire application.

## The Problem

In many Next.js applications, data fetching logic and UI components become tightly coupled, making it difficult to:

- Maintain consistent data structures across components
- Test components in isolation
- Reuse business logic across different pages
- Update APIs without breaking UI code

## The Solution: Layered Architecture

This architecture introduces clear separation between your data layer (API SDK) and presentation layer (UI components), connected through well-defined TypeScript interfaces.

## Folder Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── articles/
│       └── page.tsx
│
├── api/              # SDK Layer - Data & Business Logic
│   ├── apiSdk.ts     # Centralized SDK entry point
│   ├── articles.ts   # Article data & types
│   ├── home.ts       # Home page data & types
│   └── layout.ts     # Shared layout data & types
│
└── ui/               # UI Layer - Presentation Logic
    ├── elements/     # Atomic components (Button, Text)
    ├── patterns/     # Reusable patterns
    ├── pages/        # Page-specific components
    │   ├── home-page/
    │   └── article-detail-page/
    └── layout/       # Layout components (Header, Footer)
```

## TypeScript Interface Pattern

### API Layer Types (Data-Focused)
Define interfaces that match your raw data structure and business logic needs. These types should reflect the actual shape of data coming from your APIs or data sources.

### UI Layer Types (Component-Focused)
Create interfaces optimized for component rendering with processed data. These types should be tailored to what your components actually need for rendering, not necessarily matching the raw data structure.

### Adapter Pattern Implementation
Transform API data structures into UI-optimized formats using adapter functions. These functions act as a bridge between your raw data and the format your UI components expect.

## Centralized SDK Pattern

### SDK Entry Point
Create a single SDK object that organizes all content access functions by category. This centralized approach makes it easy to manage and maintain your data access patterns.

### Usage in Components
Import the SDK and access content through clean, centralized methods. This keeps your components focused on presentation while delegating data concerns to the SDK layer.

## Benefits

**Type Safety**: Full TypeScript coverage from API to UI ensures runtime errors are caught at compile time.

**Single Responsibility**: API layer handles data fetching and business logic, while UI layer focuses purely on presentation.

**Adapter Pattern**: Clean data transformation between layers allows you to optimize data structures for each layer's specific needs.

**Centralized Access**: All content access goes through a single SDK interface, making it easy to mock for testing and maintain consistency.

**Maintainable**: Easy to update APIs without touching UI code, and vice versa. Changes are isolated to their respective layers.

**Testable**: Components can be tested with mock data easily, and business logic can be tested independently.

## Implementation Steps

### 1. Create API layer
Start by defining your data types and API functions with proper TypeScript interfaces.

### 2. Build centralized SDK
Create a single entry point that exports all your API modules in an organized structure.

### 3. Design UI interfaces
Define component-specific interfaces that are optimized for rendering, not data storage.

### 4. Implement adapters
Create transformation functions that convert API data into UI-friendly formats.

### 5. Use SDK in components
Import the SDK in your Next.js pages and components for clean, type-safe data access.

## Conclusion

This architecture pattern scales well for complex applications while maintaining clean separation of concerns. It provides the flexibility to evolve your API and UI layers independently while ensuring type safety throughout your application.

The key is to think of your API layer as a service that provides data, and your UI layer as a consumer that presents that data in the best possible way for users.
