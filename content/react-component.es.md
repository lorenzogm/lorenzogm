---
title: Componente React
date: 2022-01-22
tag: Fundamentos del Proyecto, Front-End, React
description: Definiendo un componente React
image: https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

Me gusta seguir algunas pautas al escribir componentes React.

```jsx
export type ButtonProps = {
  disabled: boolean
  variant?: 'primary' | 'secondary',
}

export function Button({ disabled, variant}: ButtonProps): ReactElement {
  // implementación
}
```

## Props

1. Nombrar las props con el nombre del componente y el sufijo props
2. Definir las props arriba del componente
3. Definir cada prop en el mismo tipo, luego se puede usar como "ButtonProps['variant']", a menos que sean objetos.

## Componente

1. Exportación nombrada
2. Definir las props explícitamente, evitar "function Button({ props })"
3. Retornar un ReactElement