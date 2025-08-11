---
title: Una Mejor Estructura de Carpetas para React
date: 2021-11-30
tag: Front-End, Fundamentos del Proyecto, React
description: Beneficios de invertir tiempo para identificar la mejor estructura de carpetas que funcione para ti
image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1634&q=80
---

# Una Mejor Estructura de Carpetas para React

Comencemos con un resumen rápido sobre los puntos clave de este artículo:

- ¿Por qué React no tiene una estructura de carpetas específica?
- ¿Por qué es importante una estructura de carpetas?
- Déjame sugerir una mejor estructura de carpetas

https://miro.medium.com/v2/resize:fit:1400/format:webp/1*TEdNCDBQAtpcKv3d0K3a1g.jpeg

## ¿Por qué React no tiene una estructura de carpetas específica?

No planeo responder esa pregunta, de hecho me pregunto por qué no hay una estructura de carpetas específica.

Leyendo la Documentación Oficial de React sobre estructura de archivos, descubrimos que no hay una manera recomendada de estructurar proyectos React.

Por un lado, podemos pensar que es genial, y en realidad lo es; tenemos la flexibilidad de decidir cómo queremos estructurar los archivos en nuestro proyecto. Usamos una estructura de carpetas que nos gusta, algo con lo que nos sentimos cómodos y algo que es adecuado para ese proyecto específico.

Por otro lado, hay algunas razones por las que, para mí, es muy importante pensar cuidadosamente sobre la estructura de carpetas.
¿Por qué es importante una estructura de carpetas?

Invertir tiempo para identificar la mejor estructura de carpetas que funcione para ti traerá algunos beneficios:

- Mantenibilidad: si se usa la misma estructura de carpetas en tus proyectos. Es más fácil volver a un proyecto viejo cuando sabes de memoria dónde está todo y cómo las diferentes piezas están trabajando juntas.
- Escalabilidad: en proyectos grandes, la base de código podría volverse un verdadero desastre fácilmente si una estructura de carpetas no está claramente definida.
- Colocación: mantener el código más cerca de donde se usa impulsaría tu productividad.
- La buena web de toda la vida: React te permite mezclar las diferentes capas de una aplicación web. HTML, CSS, JavaScript y datos pueden mezclarse fácilmente, lo que podría reducir la reutilización de tu código.

## Una mejor estructura de carpetas para React

Esta estructura de carpetas es mejor porque, como vimos arriba, no hay una estructura de carpetas recomendada. Así que algo es mejor que nada :)

La siguiente estructura de carpetas está basada en Next.js. Si no lo estás usando, las páginas podrían moverse a la carpeta UI y Layout Dynamic debería colocarse en algún lugar conectado a tu Router.

https://miro.medium.com/v2/resize:fit:2000/format:webp/1*4Bo2qaOyzqS65DIo2dFYGA.jpeg

Una carpeta UI sin obtención de datos hará que el proceso de documentar la UI con Storybook y escribir pruebas con Jest sea más rápido. Principalmente porque el número de APIs a mockear debería ser ninguna o, al menos, muy reducida.

Además, dividir la capa de datos y la capa de UI haría que tus componentes sean más fáciles de reutilizar en el mismo proyecto o en algún otro proyecto.

## Estructura de archivos en los componentes UI

Otro tema importante es cómo estructurar los archivos dentro de un componente. Digamos que tenemos un acordeón en nuestra carpeta "elements"

https://miro.medium.com/v2/resize:fit:2000/format:webp/1*qOQCTgfrnfRZgjE1akE64A.jpeg

¿Por qué dividir el Accordion en lógica (useAccordion), marcado (Accordion) y estilo (Accordion.styled)? Pueden ir fácilmente todos juntos en el mismo archivo, React nos permite hacerlo. Sin embargo, veamos cuándo este patrón podría ser útil:

https://miro.medium.com/v2/resize:fit:2000/format:webp/1*HPmvyLWWrDf70Owx4pax-A.jpeg

La imagen de arriba describe las 4 capas y cómo pueden ser compartidas entre web y móvil (con React Native).

- Capa de Datos (API): debería ser 100% independiente ya que puede ser completamente reutilizada entre proyectos web y móvil.
- Capa de Lógica (JavaScript): en este caso puede ser 100% reutilizada como web, así que ¿por qué no una carpeta "logic" de nivel superior? Porque la colocación es muy importante, y mantener la lógica cerca del marcado se siente más importante para mí que tener su propia carpeta (que sería una buena solución si estás desarrollando en paralelo una app web y una móvil).
- Capa de Estilo (CSS): algunos estilos, si son CSS-in-JS, podrían ser compartidos entre aplicaciones web y móvil. Otra vez, la colocación es una preocupación relevante por las mismas razones descritas arriba para la lógica.
- Capa de Marcado (HTML): desafortunadamente, el marcado no puede ser reutilizado entre web y móvil. React Native podría usarse en web, pero la semántica de la página se perdería y la accesibilidad también sufriría. Esta es la razón principal por la que, mantener un marcado independiente, es importante dividir las capas si estás planeando desarrollar una app web y una móvil.

## Conclusiones

Usa esta estructura de carpetas o prueba tu propia. Pero definitivamente, siéntate con tu equipo, levanta este tema y decidan juntos cómo quieren estructurar su(s) proyecto(s).