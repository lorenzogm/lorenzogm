---
title: Estructura del Proyecto
date: 2022-05-29
tag: Fundamentos del Proyecto
description: Esta estructura de proyecto podría compartirse entre disciplinas para facilitar la comunicación en el equipo.
image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

Esta estructura de proyecto podría compartirse entre disciplinas para facilitar la comunicación en el equipo.

Significa compartir una estructura entre:

- Criterios de Aceptación: Especificaciones propiedad de los analistas de negocio en herramientas como Confluence.
- Diseño: UX y UI propiedad de los diseñadores en herramientas como Figma.
- Front-end: Se puede aplicar a la estructura de carpetas en el código FE, a storybook o cualquier otra herramienta para documentar el sistema de diseño y los modelos de contenido requeridos para la comunicación con el BE.
- Back-end: Esta estructura debería ser aplicable a los componentes requeridos para el BE, pero viene desde la perspectiva de la UI, por lo que necesita ser mejor probada para los diferentes casos.

Estructura del Proyecto:

Sigue el patrón de [Diseño Atómico](https://bradfrost.com/blog/post/atomic-web-design/) con algunos cambios:

- Los `Atoms` se llaman `Elements` (Elementos)
- Las `Molecules` se llaman `Modules` (Módulos)
- Los `Organisms` se llaman `Sections` (Secciones)
- Los `Templates` no están incluidos. Como las páginas de contenido se crean a través de un CMS, en la mayoría de los casos hay una correspondencia 1:1 entre plantillas y páginas. Por lo tanto, esta distinción solo existe en el código FE, pero no en las otras disciplinas. En el código FE la plantilla es responsable de la UI, y la página del fetching de datos.
- Se agregan `Layouts` para componer la página final.

Estas son las categorías requeridas:

1. Fundamentos: La base del sistema de diseño son los tokens de diseño y activos básicos.
2. Elementos: Los elementos son los bloques de construcción básicos de la materia.
3. Módulos: Los módulos son grupos de átomos unidos entre sí y son las unidades fundamentales más pequeñas de un compuesto. Estos módulos toman sus propias propiedades y sirven como la columna vertebral de nuestros sistemas de diseño.
4. Secciones: Las secciones son grupos de módulos unidos para formar una parte relativamente compleja y distinta de una interfaz.
5. Páginas: Las páginas consisten principalmente en grupos de características unidas para formar páginas.
6. Layouts: Los layouts definen la estructura global de la página: en la mayoría de los casos header, main y footer. Pero también podrían contener una barra de notificación genérica o popup de consentimiento de cookies.