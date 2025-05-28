---
title: Encapsulate Dependencies
date: 2025/01/10
tag: Front-End, Project Foundation
description: When working with dependencies, like a React component imported from a library, it's recommended to reference the library only once in your project.
---

# Encapsulate Dependencies

When working with dependencies, like a React component imported from a library, it's recommended to reference the library only once in your project.

## The component is not modified

"elements/index.ts" (No need to create a folder for the component)

    import ComponentFromLibrary from '@library'

    export const Component = ComponentFromLibrary

## The component is modified

At "elements/Component/Component.tsx".

    import ComponentFromLibrary from '@library'

    export function Component() {
      return <ComponentFromLibrary />
    }
