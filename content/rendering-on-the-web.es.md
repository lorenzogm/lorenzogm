---
title: Renderizado en la web
date: 2020-10-22
tag: Fundamentos Web, Rendering
description: Comparación entre renderizado en el cliente, servidor y generación de sitios estáticos
image: https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80
---

# Renderizado en la Web

Una de las decisiones más importantes que afectará la arquitectura es cómo renderizamos el contenido. Esta decisión afectará varias métricas destacadas a considerar, algunas de ellas son:

- **Velocidad** y **Experiencia de Usuario**
- **Datos obsoletos**
- **SEO**
- **Costos de infraestructura**
- **Complejidad**
- **Seguridad**

El propósito de este artículo es analizar los tipos existentes de renderizado para la Web para ayudarnos a tomar la decisión.

![](https://miro.medium.com/max/1400/0*yrpG02dcyI6HUWVp)Fuente: [Articles by Victoria](https://lo-victoria.com/client-side-rendering-vs-server-side-rendering-vs-static-site-generation)

# Terminología

Los tres tipos principales de renderizado en la web son:

- **Renderizado del Lado del Servidor (SSR)**: la página se renderiza en tiempo de ejecución en el servidor en respuesta a la navegación. Toda la lógica, plantillas y obtención de datos se manejan en el servidor.
- **Generación de Sitios Estáticos (SSG)**: las páginas estáticas se generan en tiempo de construcción. Toda la lógica, plantillas y obtención de datos se manejan en el servidor en tiempo de construcción.
- **Renderizado del Lado del Cliente (CSR)**: la página se renderiza en tiempo de ejecución en el navegador. Toda la lógica, plantillas, enrutamiento y obtención de datos se manejan en el cliente.

# **Velocidad y Experiencia de Usuario**

Para medir el rendimiento vamos a prestar atención al proceso de carga de un sitio web:

![](https://miro.medium.com/max/1400/0*bd-nvxMwziZjeUIw)Fuente: [datacadamia](https://datacadamia.com/_detail/web/browser/page_loading_key_moment.png?id=web%3Abrowser%3Apage_load)

Y nos vamos a enfocar en las siguientes métricas:

- **TTFB:** [Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) — tiempo entre hacer clic en un enlace y el primer bit de contenido que llega.
- **FCP:** [First Contentful Paint](https://web.dev/fcp/) — cuando el contenido solicitado se vuelve visible.
- **TTI:** [Time To Interactive](https://web.dev/tti/) — cuando la página se vuelve interactiva para el usuario.

Con esta información revisemos el resumen de nuevo:

![](https://miro.medium.com/max/926/1*kjqxrMqihBRn7UiSsNWTZA.png)

- **SSR**: Porque la página se renderiza en el servidor, TTFB es lento, pero no hay retraso entre TTI y FCP. La **velocidad** **es** **rápida** (depende de los recursos del servidor) y la **UX es genial** porque el contenido está listo para interactuar (TTI = FCP). Sin embargo, SSR no puede ser usado con un CDN.
- **SSG**: Como el navegador está renderizando páginas estáticas, TTFB es rápido y el retraso entre TTI y FCP es mínimo. Por lo tanto, la **velocidad es rápida** y la **UX es genial**. Comparado con SSR, SSG tiene la ventaja de que puede ser usado con un CDN.
- **CSR**: TTFB es rápido pero el tiempo de carga hasta que la página está lista para interactuar (TTI) podría ser mucho, porque toda la lógica, plantillas y obtención de datos se manejan en el navegador. CSR puede ser usado con un CDN para impulsar el rendimiento.

# Datos obsoletos

Los datos están obsoletos cuando la información mostrada no está actualizada. Este es un tema destacado al decidir nuestra arquitectura. Revisemos cada caso:

![](https://miro.medium.com/max/928/1*OXFIU159uTF29fAu0YC9sA.png)

- **SSR**: La página se renderiza en el servidor en tiempo de ejecución. Por lo tanto, los datos se obtendrían con cada solicitud y no estarían obsoletos.
- **SSG**: La página se renderiza en el servidor en tiempo de construcción. En este caso, los datos podrían estar obsoletos. Este enfoque podría ser muy útil para sitios web donde los datos no cambian muy a menudo (como blogs), pero no funcionará si los datos necesitan cambiar constantemente.
- **CSR**: Caso similar al SSR. La página se renderiza en el navegador en tiempo de ejecución. Entonces, los datos se obtendrían con cada solicitud.

# **SEO**

SEO podría ser el punto clave para decidir cuál es la arquitectura correcta para tu proyecto.

![](https://miro.medium.com/max/932/1*M8IelDjF4fNeR_pNhOBpKw.png)

- **SSR**: Las páginas completamente renderizadas se envían a los bots, así que no hay riesgo de indexación parcial. Además, SSR puede acelerar los tiempos de carga de página, lo que puede ayudar a mejorar el ranking en el motor de búsqueda.
- **SSG**: Las páginas completamente renderizadas se envían a los bots, así que no hay riesgo de indexación parcial. Además, SSG puede acelerar los tiempos de carga de página (incluso más que SSR), lo que puede ayudar a mejorar el ranking en el motor de búsqueda.
- **CSR**: El contenido puede no estar disponible cuando el bot del motor de búsqueda está rastreando la página. Entonces hay un riesgo de "indexación parcial".

# **Costos de infraestructura**

Las tres soluciones requieren infraestructura para manejar la construcción y el despliegue. En ese caso, los costos no cambiarán mucho de un enfoque al otro. Lo que vamos a evaluar es ¿qué tan caro es mantener los servidores para tener nuestro sitio web funcionando?

![](https://miro.medium.com/max/928/1*fL0kpWrfX8mRoMx8GVqZ4w.png)

- **SSR**: Esta es la solución más cara. Como la página se renderiza en el servidor, toda la carga de trabajo se hace en el servidor en tiempo de ejecución. Por lo tanto, necesitamos invertir dinero en esos servidores que están corriendo constantemente.
- **SSG**: Las páginas estáticas son manejadas por el navegador. Para sitios web muy grandes, el tiempo de construcción escalaría y esto podría afectar los costos de los servidores para construir la aplicación.
- **CSR**: El navegador está tomando la carga de trabajo, así que no hay costo extra para mantener el sitio web funcionando.

# Complejidad

La configuración de infraestructura, desarrollo del sitio web y mantenibilidad de los proyectos son las áreas a tener en mente sobre este tema.

![](https://miro.medium.com/max/924/1*c1Peg5sKtxgMVA1U6u6m_w.png)

Solía ser que crear un sitio web con SSR o SSG era muy complejo comparado con CSR. Sin embargo, hoy en día hay muchas opciones para escribir fácilmente aplicaciones web con SSR o SSG. Por lo tanto, la complejidad no debería ser un tema ahora para decidir qué tipo de renderizado elegir.

# Seguridad

En este punto, probablemente la decisión ya está tomada y la seguridad (o la seguridad extra) no debería ser un tema clave para decidir qué tipo de renderizado elegir.

![](https://miro.medium.com/max/924/1*6deQbqEmOxydZW6ZPgGCgg.png)

Solo vale la pena mencionar que con SSG, como la página es estática, no está conectada a ningún servidor. Entonces esta es una capa extra de seguridad con los siguientes beneficios:

- Algunas de las vulnerabilidades más comunes (inyecciones y XSS) no afectarán un SSG. Los atacantes no pueden hackear tu base de datos ya que el sitio web no está conectado a ella.
- La salida es HTML puro, CSS y otros archivos estáticos, es muy poco probable que el contenido estático contenga vulnerabilidades de seguridad.

# Conclusiones

Echemos un vistazo al resumen de cada tema discutido antes para tener una mejor visión general:

![](https://miro.medium.com/max/924/1*LuOjAZpvzUBCLQQB1aNU-Q.png)

Y emparejemos los proyectos más comunes con la tecnología más adecuada para usar. Hay dos tipos principales de proyectos, basados en el contenido:

- **Contenido público**: Cuando el proyecto es un sitio de contenido, probablemente SEO es muy importante. Por lo tanto, CSR no es una opción. SSG debería ser el camino a seguir porque es menos caro, más performante y añade seguridad extra. Pero depende de qué tan a menudo cambien los datos. Si no cambian muy frecuentemente, SSG es la mejor opción. Sin embargo, si los datos cambian muy frecuentemente o con cada renderizado, SSR o una solución híbrida (hidratación) con SSG + SSR sería requerida.

> Ejemplos: Sitios Web Corporativos, Blogs, Tiendas de Ecommerce o cualquier otro sitio de contenido serían algunos ejemplos para este caso de uso.

- **Contenido privado**: Cuando el contenido está oculto detrás de un login, entonces la opción clara es CSR. Porque SEO no es requerido, los datos están relacionados al usuario y cambian muy a menudo. SSR podría mejorar el rendimiento del sitio web, sin embargo los costos de infraestructura y la complejidad podrían ser desventajas enormes comparadas con los beneficios.

> Ejemplos: Apps Bancarias, Apps Sociales o cualquier otra aplicación detrás de un login.

¡Perfecto! Ahora deberíamos tener suficiente información para decidir cómo construir nuestro próximo proyecto.

# Bonus track

He escrito un pequeño sitio web con React y Next.js para demostrar algunas de las ideas de este artículo:

- Demo: [https://nextjs-rendering-types-demo.vercel.app/](https://nextjs-rendering-types-demo.vercel.app/)
- Código fuente: [https://github.com/lorenzogm/nextjs-rendering-types-demo](https://github.com/lorenzogm/nextjs-rendering-types-demo)

¡Diviértete!