---
title: Estilos de Funciones
date: 2025-01-10
tag: Front-End, Fundamentos del Proyecto
description: Una función puede ser definida con la palabra clave "function" (declaración de función o funciones regulares) o como una variable (expresión de función o arrow functions)
image: https://eslint.org/og?title=func-style&summary=A%20pluggable%20and%20configurable%20linter%20tool%20for%20identifying%20and%20reporting%20on%20patterns%20in%20JavaScript.%20Maintain%20your%20code%20quality%20with%20ease.%0A&is_rule=true&recommended=false&fixable=&suggestions=
---

# Estilos de Funciones

Una función puede ser definida con la palabra clave "function" (declaración de función o funciones regulares) o como una variable (expresión de función o arrow functions).

Prefiero usar arrow functions para callbacks, en cualquier otro caso uso funciones regulares.

Prefiero escribir declaraciones de función porque:

1. Son elevadas (hoisted), así que puedo escribir la función principal en la parte superior y las funciones hijas abajo.
2. Son más legibles, empezar con la palabra function te dice antes qué es.
3. Las arrow functions pueden ser más cortas, lo cual es muy bueno porque escribes menos código. Para casos simples está bien, pero puede ser el punto de partida de una función que se vuelve más compleja y difícil de leer.
4. Es más rápido si necesitas debuggear con "console.log", ya que no permiten un return implícito.
5. No necesito una nueva línea para exportaciones por defecto.