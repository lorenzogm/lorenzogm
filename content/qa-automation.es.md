---
title: Automatización de QA
date: 2024-03-02
tag: Fundamentos del Proyecto
description: Mejores prácticas y estrategias para la automatización de control de calidad
image: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

# Automatización de QA

Los objetivos principales del control de calidad son:

- Detectar defectos en el software
- Detectarlos temprano

Para detectar defectos en el software usamos el siguiente conjunto de herramientas, para detectarlos temprano las introducimos en el proceso de desarrollo.

| Área                       | Herramienta | Tipo    | Cuándo       |
| -------------------------- | ----------- | ------- | ------------ |
| Seguridad                  | SonarQube   | Estático| Pull Request |
| Pruebas End-to-end         | Cypress     | Dinámico| Pull Request |
| Accesibilidad              | Axe         | Dinámico| Pull Request |
| Regresión Visual           | Percy       | Dinámico| Pull Request |
| Rendimiento Front-End      | Debug Bear  | Dinámico| Nocturno     |
| Rendimiento Back-End       | Blazemeter  | Dinámico| Nocturno     |

## Tipos

- Estático: la herramienta ejecuta contra el código y reporta los resultados.
- Dinámico: se requiere un servidor en ejecución para ejecutar la herramienta.

## Cuándo

- Pull Request: Se incluye un trabajo en el CI, el trabajo se activa cuando se crea o actualiza un PR y debe pasar.
- Nocturno: La herramienta está configurada para ejecutarse de forma regular.