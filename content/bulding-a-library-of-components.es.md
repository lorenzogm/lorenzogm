---
title: Construyendo una librería de componentes
date: 2022-08-02
tag: Front-End, Design System, UI Library
description: Construir tu propia librería de componentes es algo en lo que muchos ingenieros y empresas han pensado en algún momento. En nuestro equipo, hemos pasado por ese proceso y el objetivo de este documento es compartir nuestra experiencia.
image: https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80
---

# Construyendo una librería de componentes

Construir tu propia librería de componentes es algo en lo que muchos ingenieros y empresas han pensado en algún momento. En nuestro equipo, hemos pasado por ese proceso y el objetivo de este documento es compartir nuestra experiencia.

## Nuestro viaje

Me gustaría describir mis pensamientos sobre este tema desde que comencé mi carrera, y estoy seguro de que muchos desarrolladores han seguido un viaje similar:

### Creando mis componentes desde cero

Al principio de mi carrera, empecé creando componentes UI desde cero. Cuando me di cuenta de la cantidad de trabajo que se requería, decidí elegir una librería para hacerlo más rápido y adoptar mejores prácticas.

### Elegir una librería

Entonces, en el siguiente proyecto, decidí usar una librería bien conocida y bien probada (como Material UI), ¡y fue genial! Añadiendo algo de contenido y algunos estilos y mis componentes estaban listos para usar. Pero no todo era brillante:

- Aprender cómo usar la librería tomó algo de tiempo, ya que a veces no era directo cómo añadir contenido o cómo modificar el estilo.
- Cuando la librería se ajustaba a nuestro caso de uso era genial, pero en algún punto, tuvimos casos de uso no cubiertos por la librería, así que tuvimos que adaptar el componente para ajustarse a nuestras necesidades, lo que significa tiempo extra luchando con los límites de la librería.
- Finalmente, mi componente estaba funcionando, pero no era perfecto: bugs en un navegador específico, falta de accesibilidad, y un componente realmente complejo y sucio que era difícil de mantener.

### Añadiendo componentes personalizados a la librería

La vida te da otra oportunidad para hacer tu mejor esfuerzo con un nuevo proyecto. Y aprendí del anterior, así que decidí seguir con la librería pero si tenía un caso de uso que no encajaba, lo iba a crear desde cero de una manera limpia y reutilizable.

La teoría tenía sentido, pero en la práctica, adaptar el componente personalizado a la librería era un poco más difícil. Era más limpio que la solución anterior, pero las adaptaciones entre la librería y los componentes seguían siendo demasiado complejas.

Además, tuvimos problemas desde el primer enfoque: construir tus propios componentes es difícil.

### Componentes sin estilo al rescate

En los últimos años, hemos visto que las librerías de componentes sin estilo obtuvieron algo de atracción, como Radix UI, Reach UI o Headless UI. Entonces, ¿por qué no usarlas en lugar de nuestros componentes personalizados?

La solución en ese punto fue una combinación de una librería, con componentes sin estilo y algunos componentes personalizados (los más simples y muy específicos para nuestro caso de uso).

En este punto, obtuvimos una buena cantidad de cosas ya hechas por la librería principal y los componentes headless. Sin embargo, la integración entre la librería y los componentes (headless y personalizados) a veces seguía siendo demasiado compleja. P.ej. el theming, donde era mejor usar nuestro propio tema que adaptar el proporcionado por la librería.

### Colecciones de componentes ya hechos

Por otro lado, un flujo de nuevas plantillas (secciones completas listas para usar) empezó a obtener algo de atracción. En este caso, se proporciona el código HTML + CSS crudo sin ninguna abstracción y la sección completa está lista para copiar y pegar en tu proyecto. Estoy hablando de colecciones como Tailwind UI o Flowbite.

Todas las soluciones anteriores tenían algo en común: creamos un sistema de componentes, desde los más básicos hasta los más complejos. Si mantenemos en mente la metodología de Diseño Atómico, empezamos desde los átomos, luego a las moléculas, organismos, plantillas, y finalmente las páginas. La idea central de crear un sistema de componentes era implícita en las soluciones anteriores, siguiendo un enfoque Bottom-Up.

En este caso, con el enfoque Top-Down siguiendo las plantillas proporcionadas por colecciones como Tailwind UI o Flowbite, empezamos desde los organismos (secciones de una página, lo que esas librerías proporcionan).

Este es el resumen de mi viaje hasta el día presente: 29 de julio, 2022. Ahora hablemos del futuro.

## Nuestro contexto

Para nosotros, es importante analizar nuestro contexto para descubrir qué solución se ajusta a nuestras necesidades.

No somos una empresa que crea su propio producto, somos una agencia que trabaja con múltiples clientes, y los requisitos cambian de un proyecto al siguiente. Además, necesitamos tener en cuenta que podríamos no estar en control total de los procesos y prácticas, ya que dependerá del cliente.

Por otro lado, queremos optimizar la entrega de nuestros proyectos construyendo arquitecturas de referencia y aceleradores. Esos aceleradores necesitan estar más cerca de producción, lo que significa que necesitan ser opinados respecto a la tecnología usada.

## Nuestros requisitos

Basado en el contexto descrito arriba, estos son los requisitos para nuestra solución:

- Queremos una librería de componentes basada en React y Tailwind CSS, ya que es usado y lo suficientemente flexible para ajustarse a nuestras necesidades.
- Preferimos no construir y mantener nuestros propios componentes, estamos recolectando componentes (preferiblemente sin estilo) de otras librerías.
- Queremos empezar con un conjunto de secciones ya hechas para acelerar nuestro trabajo.

## Nuestra solución

En este punto del tiempo, tiene sentido para nosotros continuar con la siguiente solución:

1. Tomar un enfoque Top-Down, donde empezamos desde la colección de secciones proporcionadas por Tailwind UI.
2. Dividimos las plantillas en componentes React para crear los elementos más simples: Button, Heading, Link, Paragraph, etc.
3. Las instancias de esos elementos en las secciones no tienen ninguna relación entre ellas, así que un sistema de diseño necesita ser creado a partir de ellas. Este es el núcleo del trabajo que necesitamos hacer junto con nuestro equipo de diseño.
4. Introducimos componentes sin estilo (de Radix UI, Headless UI, etc. cuando sea necesario) y les aplicamos nuestro estilo.
5. No estamos creando una librería para ser usada en los proyectos, estamos creando un boilerplate que sirve como acelerador para acelerar el desarrollo. Nada está fijo, todo puede ser adaptado a las necesidades del proyecto.
6. El diseño y el front-end están impulsados por las secciones definidas. El marcado de las secciones está fijo, pero nuevas variantes pueden ser añadidas para hacer toda la colección de secciones.

Al final, la idea central es crear un lugar para compartir, atreverse y cuidar, un hub que usamos para ayudarnos en nuestros proyectos y donde contribuimos de vuelta con más secciones, con nuestros aprendizajes, y con nuestras experiencias.