---
title: Automatización de Pruebas en el Front-End
date: 2022-02-07
tag: Fundamentos del Proyecto, Front-End, Testing
description: Estrategia para escribir pruebas automatizadas
image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

# Automatización de Pruebas en el Front-End

Para definir la estrategia de pruebas unitarias se requiere analizar 4 puntos diferentes:

- Los tipos de pruebas disponibles
- Cómo escribir pruebas mantenibles
- Estructura del software front-end
- Herramientas para escribir pruebas automatizadas

Analicémoslos independientemente.

## Tipos de pruebas

<!-- ![Testing Automation in the Front-End](./testing-automation-in-the-front-end.png) -->

Muchos más detalles sobre los tipos de pruebas se pueden encontrar en este artículo sobre [Front-End Test Automation](https://medium.com/valtech-ch/frontend-test-automation-639bc2ad79ef).

Las pruebas de integración deberían proporcionar un buen equilibrio entre costo, velocidad y confianza, por eso la mayoría de las pruebas deberían ser pruebas de integración.

## Estructura del software

Siguiendo la estructura del proyecto descrita en [design system](/ring-ui/design-system), estos son los componentes disponibles en la UI:

- Foundation
- Components
- Features
- Pages
- Layouts

Y manteniendo en mente las conclusiones de la sección anterior, el foco en la estructura del proyecto estaría principalmente en las Pages y los Layouts. Sin embargo, para proyectos donde se usa un CMS, también es importante probar las features, ya que probar una página específica no significa que todas las features hayan sido probadas.

Como parte de las páginas, las solicitudes del lado del servidor deberían incluirse para probar toda la función requerida para traer los datos de la API, aplicar cualquier modificación requerida y servirla a la página.

## Cómo escribir pruebas mantenibles

El enfoque principal al escribir pruebas mantenibles es escribir las pruebas como el usuario final vería el software. De esta manera, lo que realmente importa es que la salida en la pantalla:

- Qué se muestra: Esto se puede lograr afirmando la semántica y el contenido que se renderiza en el DOM, sin probar el estilo.
- Cómo debería comportarse: realizando acciones como click o escribir como el usuario lo haría.

Mientras los requisitos de negocio sean los mismos, las pruebas siguen siendo válidas. Y este enfoque nos permitiría modificar completamente la implementación sin la necesidad de crear, actualizar o eliminar pruebas automatizadas.

Este enfoque está totalmente alineado con nuestra conclusión anterior sobre la necesidad de implementar pruebas de integración.

## Herramientas

- Jest, el framework de pruebas
- Testing Library, una librería que nos ayuda a probar el comportamiento de nuestro software, no los detalles de implementación
- MSW (Mock Service Worker), una librería que usa service workers para mockear las solicitudes de API

## Qué es una prueba de integración

Después del contexto requerido descrito arriba, ahora es momento de definir qué es una prueba de integración.

Mientras que una prueba unitaria probaría una sola función aislada (componentes), una prueba de integración probaría múltiples funciones (componentes) juntas.

[Testing Library](https://testing-library.com/docs/#what-you-should-avoid-with-testing-library) tiene un papel muy importante para ayudarnos a enfocarnos en cómo las páginas son interactuadas por los usuarios y evitar probar detalles de implementación.

Si no estás familiarizado con Testing Library, por favor echa un vistazo a este [ejemplo específico](https://testing-library.com/docs/react-testing-library/example-intro) para escribir pruebas.

## Mocking

Mocking es reemplazar una parte específica del software por código falso que simula lo que el código real está haciendo.

Las pruebas de integración apuntan a probar múltiples unidades juntas tan cerca como sea posible al comportamiento final como el usuario lo verá en producción. Por lo tanto, los mocks deberían evitarse.

Las llamadas a API (con MSW) o animaciones (con Jest) son algunos buenos ejemplos donde los mocks deberían ser mockeados.

También puedes leer [este artículo](https://kentcdodds.com/blog/the-merits-of-mocking) sobre mocking y por qué debería evitarse.

## Conclusiones

Para resumir, la mayoría de las pruebas deberían ser pruebas de integración enfocadas en estos componentes:

- Features
- Pages (que incluyen solicitudes del lado del servidor)

Probar estos componentes debería proporcionar suficiente confianza en nuestras pruebas automatizadas y un porcentaje muy alto de cobertura de pruebas, ya que estamos probando múltiples unidades juntas.

Para agregar más confianza, las pruebas unitarias podrían agregarse a los "Elements" y los "Modules" manteniendo los principios definidos en este documento.