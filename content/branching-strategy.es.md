---
title: Estrategia de Branching
date: 2022-02-05
description: 'Detalles para un flujo de trabajo con git: Branching, commits, Pull Requests y Versionado'
tag: Fundamentos del Proyecto, Git
image: https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80
---

## Branching

Se debe usar [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para nombrar las ramas.

    {type}/{ticket-number}-{ticket-title}


    feat/123456-title-of-the-ticket
    fix/123456-title-of-the-ticket

## Commits

Además de las verificaciones de calidad anteriores, hay una verificación más que te impedirá hacer commit de tu código: el mensaje del commit.

El mensaje del commit es analizado por `commitlint` y debe seguir un formato específico definido por [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Para obtener ayuda en este proceso, este repositorio incluye `commitizen`. Solo abre tu terminal (¡terminal FTW!) y ejecuta:

    npm run cz

## Pull requests

Los pull requests se fusionarán en la rama principal a través de `squash and merge`, proporcionando un historial lineal y limpio de commits para el repositorio. Esto también está conectado al [versionado](#Versioning) automático.

> **Por lo tanto, es muy importante tener el título correcto en el Pull Request**

El título debe seguir los Conventional Commits descritos en la sección de [commits](#Commits), con dos adiciones:

- El número del ticket antes del título
- El número del Pull Request

Entonces, el formato final debería ser así:

    type(scope): [LGM-123456] title of the ticket (#XY)

El cual está compuesto por los siguientes elementos:

- Tipo: "feat", "fix" son los más comunes, la lista completa está en la sección de [commits](#Commits).
- Alcance: descrito en [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Número del ticket: [LGM-XXXXXX]
- Título del ticket
- (#YY) Referencia al PR en GitHub (Se agregará automáticamente antes de finalizar el squash merge).

Para obtener ayuda en este proceso, este repositorio incluye un [Pull Request Linter](../../.github/workflows/pull-request-linter.yml). Este workflow de GitHub agrega una verificación adicional para verificar el título del Pull Request.

## Versionado

Siguiendo [Semantic Versioning](https://semver.org/)

Dado un número de versión MAJOR.MINOR.PATCH, incrementa:

La versión MAJOR cuando haces cambios incompatibles en la API,
La versión MINOR cuando agregas funcionalidad de manera compatible hacia atrás, y
La versión PATCH cuando haces correcciones de errores compatibles hacia atrás.

Este repositorio usa [Semantic Release](https://github.com/semantic-release/semantic-release) para liberar automáticamente versiones siguiendo las reglas definidas arriba y la siguiente [configuración](./../.releaserc).