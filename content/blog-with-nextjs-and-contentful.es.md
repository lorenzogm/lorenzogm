---
title: Blog con Next.js y Contentful
date: 2020-11-02
tag: Blog, Next.js, Contentful, Tailwind CSS
description: Construyendo un blog con Next.js, Tailwind CSS y Contentful como CMS headless
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

¡Hola!

Esta es una nueva publicación para compartir mi viaje, porque estamos haciendo cosas muy geniales en el trabajo y sería una pena no compartirlas.

En este caso hemos hecho algo simple, hemos construido un blog con React, Next.js y Contentful. Un par de enlaces antes de empezar con los detalles:

- Demo: [https://lorenzogm.com/](https://lorenzogm.com/)
- Código fuente: [https://github.com/lorenzogm/blog](https://github.com/lorenzogm/blog)

![](https://miro.medium.com/max/1400/1*MEef6ssM8_W_QyR0D-1yew.jpeg)Gente señalando WTFs en la demo. Sí, no me gusta hacer estilos.

# Stack

- Frontend: React con TypeScript, Next.js y Tailwind CSS
- Backend: Contentful como CMS Headless
- DevOps: Vercel

Durante los últimos años he estado probando varios frameworks y librerías en el mundo JavaScript, principalmente en el ecosistema React. Y finalmente, he encontrado un stack sólido donde me siento cómodo.

# TypeScript

Es simplemente indispensable. Es difícil tener el código 100% tipado, pero eso no es requerido. TypeScript ya está ayudando a escribir mejor código, incluso si algunos tipos no están definidos.

Para el blog, el código está 100% tipado. Estoy usando dos paquetes para ayudarme con esta tarea:

> La configuración compartida que tenemos disponible en Valtech CH, para **ESLint, Prettier y TypeScript**. Las reglas estrictas de linting me ayudaron a escribir mejor código JavaScript y TypeScript.

[https://www.npmjs.com/package/@valtech-ch/eslint-config-react](https://www.npmjs.com/package/@valtech-ch/eslint-config-react)

> Un **generador de código TypeScript para Contentful**. Automáticamente, obtienes los tipos para usar con TypeScript para el contenido definido en Contentful.

[https://github.com/intercom/contentful-typescript-codegen](https://github.com/intercom/contentful-typescript-codegen)

# Next.js

Hoy en día, un blog como este necesita ser construido con **Generación de Sitios Estáticos** (SSG). ¿Por qué? Escribí sobre este tema en este artículo **"Rendering on the Web"**:

[

## Rendering on the Web

### Una de las decisiones más importantes que afectará la arquitectura es cómo renderizamos el contenido. Esta decisión...

medium.com

](https://medium.com/valtech-ch/rendering-on-the-web-c384850aeba6)

Desde Next.js 9.3, la **Generación de Sitios Estáticos** es posible con Next.js. En el pasado habría construido algo similar con Gatsby, pero en este caso Next.js es mi opción. ¿Por qué? Desafortunadamente, no escribí nada sobre por qué uso Next.js sobre Gatsby. Pero lo tengo en mi lista de _Tareas Pendientes_.

# Tailwind CSS

¡Hablemos de estilos! Oh, no me gustan los estilos. Tiendo a preguntar a mis colegas si pueden tomar los tickets de estilo y yo tomo los tickets sobre lógica.

He tratado de dar estilo a mis proyectos de varias maneras diferentes: con CSS Modules, Styled Components, Emotion y créeme, he probado un par más. Y ahora, estoy probando Tailwind CSS...

No puedo decir mucho sobre Tailwind CSS. Me gusta hasta ahora, porque es muy rápido para dar estilo.

# Contentful

Hay muchas soluciones al decidir elegir un CMS headless para manejar el contenido. En este caso, he usado Contentful porque es una solución estratégica en nuestra empresa, Valtech, que es una de las empresas fundadoras de MACH Alliance.

En caso de que tengas algo de interés sobre MACH Alliance, un enlace:

[

## MACH Alliance Blog

### Editar descripción

machalliance.org

](https://machalliance.org/)

Así que empecé probando Contentful. Un blog es un caso muy básico y no es la mejor manera de probar las limitaciones de Contentful. Pero tiene sentido empezar con algo básico.

Con Contentful, una cuenta gratuita es suficiente para un proyecto como este. Después de crear una cuenta, necesitas definir cómo va a estar estructurado tu contenido antes de definir el contenido final del blog. La UI es muy simple y hace que todo el proceso sea muy fácil.

En el lado del desarrollador, podemos obtener los datos de Contentful a través de su API REST o con GraphQL. En este caso, he usado [este paquete](https://www.npmjs.com/package/contentful) para obtener los datos.

Considerando la Experiencia del Desarrollador y la Experiencia del Gestor de Contenido, parece una gran solución hasta ahora. Probablemente en el futuro necesitemos probar soluciones más complejas para ver las limitaciones de Contentful.

# Vercel

Si no lo conoces, solo pruébalo. Funciona muy bien con Next.js y el tiempo invertido en DevOps se reduce a casi nada.

# Conclusiones

Como resultado, he creado un blog con las siguientes características:

- Es rápido, es **increíblemente rápido**, porque usamos **Generación de Sitios Estáticos** de **Next.js**.
- Un **CMS Headless** como **Contentful** hizo que todo el proceso fuera rápido y fácil, y ahora puedo agregar contenido fácilmente a mi blog.

Pongamos los enlaces con la demo y el código fuente otra vez. Hacer scroll hasta arriba para revisarlos al principio podría ser muy cansado.

- Demo: [https://lorenzogm.com/](https://lorenzogm.com/)
- Código fuente: [https://github.com/lorenzogm/blog](https://github.com/lorenzogm/blog)