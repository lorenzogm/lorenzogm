---
title: 4 Puntos de dolor para hacer tu proyecto más mantenible
date: 2020-10-07
tag: Fundamentos del Proyecto
description: Herramientas de desarrollo imprescindibles
image: https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

![](https://miro.medium.com/max/1400/1*WzQp_E2TAKEDw9jLaVtA-A.jpeg)

# **Cómo hicimos nuestro proyecto más mantenible**

Tal vez esta situación te suene familiar: eres un desarrollador de software y te unes a un proyecto. Es una buena combinación porque conoces las tecnologías y el proyecto en sí es interesante para ti. Así que te incorporas rápidamente y te sientes cómodo contribuyendo al proyecto fácilmente...

Sin embargo, el proyecto ha estado funcionando por un tiempo y la base de código ya es bastante grande. Aún no tienes una visión general de las páginas existentes y con cada nuevo ticket, pasas más tiempo encontrando la página correcta, y el componente correcto, que el tiempo que gastas arreglando el bug, porque todos empezamos arreglando bugs cuando nos unimos a un proyecto.

Ok, ahora sabemos dónde está la página y encontramos el componente con el bug. Pero el bug no está ahí, viene del componente padre. No hay problema, vamos a revisarlo... y el componente padre está en algún otro lugar en el enorme árbol de carpetas. Luego descubres que el bug podría estar relacionado con una función definida en la carpeta "utils"... para este momento, ya has perdido el contexto del primer componente. Pero algún tiempo después, finalmente arreglas el bug. El ticket está hecho y estás feliz.

Hora de tomar el siguiente ticket, es algo similar al anterior, así que debería ser fácil. Te tomas tu tiempo otra vez para encontrar dónde está el código que buscas y cuando llegas... funcionalidad similar hecha de una manera completamente diferente. Sí, es normal: varios desarrolladores han estado trabajando en el proyecto, así que diferentes maneras de lograr un resultado similar. Mmm, pero ahora las carpetas y los archivos también tienen una convención de nomenclatura diferente, y una estructura de carpetas diferente. De todas formas, aún encuentras el bug y lo arreglas. El ticket está hecho y estás feliz, otra vez.

En algún momento empiezas a recibir tickets más complejos y el tiempo gastado para entender qué está pasando y cómo puedes arreglarlo sigue aumentando con la complejidad. Estás empezando a darte cuenta de los principales puntos de dolor de tu base de código.

# **4 Puntos de dolor en nuestro proyecto**

**1. Falta de estructura de carpetas**

En realidad, hay algo de estructura, porque alguien creó las carpetas "components" y "pages", pero dentro de esas carpetas... oh querido, esa es la jungla.

- Algunas páginas están en la carpeta de componentes.
- Muchos componentes, no muy reutilizables y usados solo una vez están en la carpeta "components".
- Algo similar está pasando con el caos de la carpeta "utils".

**2. Falta de convenciones de código**

De alguna manera, no hubo tiempo para configurar algunas reglas básicas para las tecnologías usadas en el proyecto. Por lo tanto, algunas prácticas "no muy buenas" han sido utilizadas en toda la base de código.

**3. Falta de pruebas automatizadas**

Las pruebas son buenas, todos sabemos que las pruebas son muy buenas y muy útiles, pero ¿quién tiene tiempo para escribir pruebas? Yo no, y tampoco los otros desarrolladores que previamente trabajaron en el proyecto, aparentemente.

**4. Falta de documentación**

Si no tuvieron tiempo para luchar contra los puntos anteriores. No se espera documentación sobre el proyecto para nada. O al menos no relacionada con los principales puntos de dolor sobre la mesa.

# **4 pasos para hacer nuestro proyecto más mantenible**

Pudimos ver cómo estos puntos de dolor nos estaban ralentizando y frustrando al equipo, así que empezamos a tomar 4 pasos para arreglarlos y hacer nuestro proyecto más mantenible:

1. Definir una estructura de carpetas.
2. Definir reglas de linting y convenciones de código.
3. Escribir pruebas automatizadas.
4. Escribir documentación sobre los pasos anteriores.

Cada paso vendrá con un post detallado proporcionando más información sobre nuestra experiencia.