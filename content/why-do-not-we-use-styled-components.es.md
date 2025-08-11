---
title: ¿Por qué no usamos Styled Components?
date: 2022-03-07
tag: Fundamentos del Proyecto, Front-End, Styling
description: Explorando alternativas a styled-components y soluciones CSS-in-JS
image: https://miro.medium.com/v2/resize:fit:652/1*N0XV3gco7Ed4brMoxwdjVg.png
---

# ¿Por qué no usamos Styled Components?

- _No es independiente del framework_: escribir nuestro CSS en nuestro JS y usar una librería que soporte nuestro framework causa muchos problemas si alguna vez necesitamos actualizar o cambiar frameworks. Aunque esperamos que Ring sea una librería de React por mucho tiempo, cuando llegue el momento de cambiar frameworks, requerirá reescritura significativa.
- _Los styled components pueden ser difíciles de leer_: Porque se ven como otros componentes de React, a veces puede ser difícil distinguir cuál es cuál y qué está pasando. Esto puede ralentizar la incorporación y hacer que los desarrolladores sean menos eficientes.
- _Los styled components se compilan en tiempo de ejecución_: Esto significa mucho más JS a través del cable y más tiempo de procesamiento.

Para más sobre las limitaciones puedes leer estas discusiones de la industria:

- [Why we are Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) por Sam Magura, Mantenedor de Emotion
- [The React Core Team Finally Have Opinions About CSS](https://dev.to/hypeddev/the-react-core-team-finally-have-opinions-about-css-16f0) por Oliver Williams