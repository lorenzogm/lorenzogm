---
title: "Monorepo UI Organization: Choosing Between Collocated and Workspace Patterns"
date: "2025-06-24"
description: "Navigating architectural decisions in monorepos with multiple workspaces: when to colocate UI components in your web app versus separating them into dedicated UI libraries."
tags: ["frontend", "architecture", "monorepo", "ui", "patterns", "storybook", "workspaces"]
image: "https://miro.medium.com/v2/resize:fit:1200/1*e_Aq_GnUvYTFhel0tDT_OQ.jpeg"
---

# Monorepo UI Organization: Choosing Between Collocated and Workspace Patterns

In a monorepo environment with multiple workspaces—typically including a web application, Storybook application, and UI library—organizing your UI components becomes a critical architectural decision. The choice between different patterns depends on your project's scale, team structure, and long-term goals. Let's explore two main approaches and their implications.

## The Fundamental Question

In a monorepo with separate workspaces for your web application, Storybook, and UI library, there are multiple ways to structure your components, and there is no universally right or wrong approach. The key is understanding the trade-offs and choosing the pattern that best fits your specific context and team needs.

## Pattern 1: Collocated Components (Web App Workspace)

For smaller applications, keeping UI blocks collocated with adapters directly in the web application workspace provides an excellent developer experience.

### Benefits
- **Better Developer Experience**: Everything is in one workspace, making it easier to navigate and understand
- **Faster Development**: Less abstraction layers mean quicker implementation
- **Simpler Mental Model**: Developers can see the full picture without jumping between workspaces
- **Reduced Monorepo Complexity**: Fewer inter-workspace dependencies to manage

### Considerations
- **Storybook Stories**: In this pattern, creating Storybook stories might be unnecessary overhead
- **Business Value Question**: Are Storybook stories a client requirement? Do they provide tangible business value?
- **Limited Reusability**: Components are tied to the specific web application

## Pattern 2: UI Library Workspace Pattern (Dedicated UI Workspace)

For larger projects, especially those with multi-brand requirements or multiple applications, separating the entire UI into its own workspace within the monorepo can be beneficial.

### Monorepo Structure
```
monorepo/
├── packages/
│   ├── web-app/           # Main application
│   ├── ui-library/        # Shared UI components
│   └── storybook/         # Component documentation
```

### Architecture Layers
1. **Page** (in the web-app workspace)
2. **Adapter** (in the web-app workspace)
3. **Block** (in the ui-library workspace)

### Benefits
- **Better Scalability**: UI components can be shared across multiple applications within the monorepo
- **Clear Separation of Concerns**: UI library remains dumb, accepting props and exposing event handlers
- **Multi-brand Support**: Different brands can use the same UI components with different styling
- **Storybook Integration**: Dedicated UI workspace works seamlessly with Storybook workspace
- **Version Management**: UI library can be versioned independently

### Challenges
- **Worse Developer Experience**: More layers and workspace navigation complexity
- **Increased Development Time**: Multiple abstraction layers slow down feature development
- **Event Handler Complexity**: Determining where to place event handlers becomes challenging
- **Workspace Dependencies**: Managing dependencies between workspaces adds complexity

## The Event Handler Dilemma

One of the most complex aspects of the UI library workspace pattern is determining where event handlers should live in the monorepo:

- **They must be in the web-app workspace** (not in the ui-library workspace)
- **Page-level vs. Adapter-level**: Where exactly should they be placed within the web app?
- **Server/Client Boundary Issues**: When you need both server and client components across workspaces

### Potential Solution Structure
```
web-app/
├── page.controller.ts (use server)
└── page.view.ts (use client)
```

However, this creates a new problem: the client-side `page.view.ts` cannot directly call block adapters that use server-side code, especially when those blocks are in a separate UI library workspace.

## Making the Right Choice

### Choose Collocated Pattern (Web App Workspace) When:
- Building a single application within the monorepo
- Team prefers faster development cycles
- No multi-brand or multi-app requirements
- Storybook is not a business requirement
- You want to minimize workspace dependencies

### Choose UI Library Workspace Pattern When:
- Planning to build multiple applications in the monorepo
- Long-term scalability is a priority
- UI component sharing across different apps is essential
- Team can handle increased workspace complexity
- Storybook documentation provides clear business value

## Storybook Considerations in Monorepos

The presence of a dedicated Storybook workspace in your monorepo raises important questions:

- **Is Storybook a client requirement?** If not mandated, evaluate its business value
- **Documentation vs. Development Driver**: Storybook should document your UI, not drive your architecture
- **Workspace Coupling**: A UI library workspace naturally pairs with Storybook for component documentation

## Key Questions to Ask

Before deciding on an architecture pattern for your monorepo, consider these questions:

1. **Do you have multi-brand requirements?**
2. **Are you planning multiple apps that share UI components within the monorepo?**
3. **Is Storybook a client requirement or business necessity?**
4. **What's your team's tolerance for workspace complexity vs. development speed?**
5. **How important is independent versioning of your UI components?**
6. **Do you have the tooling to manage inter-workspace dependencies effectively?**

## Conclusion

The choice between collocated components in your web app workspace and a dedicated UI library workspace isn't about finding the "correct" approach—it's about finding the right fit for your monorepo's specific needs. Consider your project's scale, team structure, and long-term goals when making this architectural decision.

In monorepo environments, the presence of multiple workspaces (web app, UI library, Storybook) adds another layer of complexity to consider. While a UI library workspace scales better and pairs naturally with Storybook documentation, it also introduces workspace dependencies and development overhead that may not be justified for simpler applications.

Remember, Storybook should be treated as documentation and shouldn't drive your main application's architecture unless it provides clear business value or is explicitly required by your client.

The key is to be intentional about your choice and understand the trade-offs you're making. Both patterns have their place in monorepo architectures, and the best decision depends on your specific context and constraints.

---

*Cover image credits: [Creating a Design System with Monorepo](https://medium.com/loftbr/creating-a-design-system-with-monorepo-bc18e055fb3c)*
