---
title: Interface vs Type Alias en TypeScript
date: 2022-02-07
tag: Fundamentos del Proyecto, Front-End, TypeScript
description: Comprendiendo las diferencias entre interfaces y alias de tipos en TypeScript
image: https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80
---

# Interface vs Type Alias en TypeScript

El [Manual Oficial](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) proporciona información sobre la diferencia entre ellos.

Por qué prefiero usar `type alias` sobre `interface`:

1. Fusión de declaraciones: si la misma interfaz (mismo nombre) se declara dos veces con propiedades diferentes, se fusionarán en una interfaz con todas las propiedades. Con type alias, esto activará un error de TypeScript.
2. Usualmente hablamos de tipos cuando nos referimos a TypeScript. Es común usar el sufijo `Type` al definirlos. Los archivos a menudo se llaman `*.types.ts` y las carpetas `./types/my.types.ts`.
3. No se llama InterfaceScript, ¿verdad? :)

Definitivamente. Son casi lo mismo, no hay beneficio real en la mayoría de los casos de usar uno sobre el otro. Lo que tiene sentido es elegir uno y mantenerlo.