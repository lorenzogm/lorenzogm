---
title: React Component
date: 2022/01/22
tag: Project Foundation, Front-End, React
description: Defining a React component
---

I like to follow some guidelines when writing React components.

```jsx
export type ButtonProps = {
  disabled: boolean
  variant?: 'primary' | 'secondary',
}

export function Button({ disabled, variant}: ButtonProps): ReactElement {
  // implementation
}
```

## Props

1. Naming props with the component name and the suffix props
2. Define the props above the component
3. Define each prop in the same type, then can be later used as "ButtonProps['variant']", unless they are objects.

## Component

1. Named export
2. Define the props explicitly, avoid "function Button({ props })"
3. Return a ReactElement
