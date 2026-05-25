---
title: "El Ciclo de Vida del Desarrollo de Software Agéntico"
date: "2026-05-22"
tag: AI, Desarrollo Agéntico, Proceso, Skills
description: Un flujo de trabajo estructurado para el desarrollo de software con agentes de IA — desde la definición del épico hasta la verificación E2E, usando skills probadas y una separación clara entre planificación y construcción.
image: https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80
author: Lorenzo GM
---

# El Ciclo de Vida del Desarrollo de Software Agéntico

El error más común que veo cuando los equipos empiezan a usar IA en su flujo de trabajo es tratarla como un autocompletado más inteligente. Abres un chat, describes lo que quieres y esperas que el resultado sea suficientemente bueno. Eso funciona para tareas pequeñas. Para el desarrollo real de producto, se rompe.

La pregunta que yo me seguía haciendo: ¿cómo es el ciclo de desarrollo completo cuando los agentes de IA son participantes de primera clase, no simples asistentes?

## La Alternativa Ligera a la Transformación Agéntica Completa

Ya he escrito sobre el [Desarrollo Agéntico para Equipos de Software](/agentic-development-for-software-teams) — un modelo estructurado basado en BMAD que cubre el ciclo de entrega completo entre roles: Business Analyst, Project Manager, Arquitecto, Diseñador, Desarrollador y Tester. Ese enfoque es potente, pero también implica un compromiso significativo. Funciona mejor cuando todo el equipo se alinea y reestructura cómo opera cada fase.

La mayoría de los equipos todavía no están ahí. Y está bien.

Este artículo describe un punto de entrada diferente: un flujo de trabajo ligero construido sobre la [librería de skills de Matt Pocock](https://github.com/mattpocock/skills) que cualquier sub-equipo puede adoptar sin pedirle al resto de la organización que cambie nada. Un equipo de desarrollo, por ejemplo, puede seguir cogiendo tickets del backlog existente exactamente como lo hace hoy — y simplemente aplicar las skills que les resulten útiles: planificar una implementación, transferir contexto entre sesiones, escribir tests primero, verificar en el navegador.

Sin revisión de procesos. Sin matriz RACI. Sin plan de implantación. Solo un conjunto de skills componibles que encajas en los momentos donde más ayudan.

Este artículo describe el flujo de trabajo que utilizo — un Ciclo de Vida del Desarrollo de Software Agéntico (ASDLC, por sus siglas en inglés) construido sobre tres capas: **Planificación**, **Backlog** y **Construcción**.

## Las Tres Capas

La mayoría de los procesos de desarrollo tienen dos modos: planificar y construir. La brecha entre ellos es donde se pierde el contexto. Los requisitos se discuten en reuniones, quizás se escriben en algún documento, y cuando un desarrollador recoge un ticket, el "por qué" detrás de él se ha evaporado.

El ASDLC resuelve esto convirtiendo el backlog en la capa intermedia explícita — no un efecto secundario de la planificación, sino su principal producto.

```
Planificación → Backlog → Construcción
```

Cada capa tiene su propio conjunto de skills, su propio objetivo y su propio criterio de calidad.

## Planificación: Negocio Primero, Técnica Después

La fase de planificación tiene un único objetivo: llenar el backlog con información de negocio, no con detalles de implementación técnica.

Esta es una restricción deliberada. Cuando mezclas requisitos de negocio con decisiones técnicas demasiado pronto, terminas con tickets que son demasiado específicos en la dirección equivocada — prescriben la implementación antes de que el problema esté completamente comprendido.

### Paso 1: Definir el Épico con `/grill-with-docs`

La primera skill es `/grill-with-docs`. Te interroga sobre lo que intentas hacer, usando tu documentación existente como contexto. El resultado es un entendimiento compartido del objetivo.

Las preguntas son incómodas a propósito: *¿Por qué importa esto? ¿Quién se beneficia? ¿Cómo es el éxito? ¿Qué estamos explícitamente dejando fuera?*

Aquí es donde el equipo se alinea sobre el problema antes de que nadie piense en la solución.

### Paso 2: Crear el PRD con `/to-prd`

Una vez que la sesión de interrogatorio ha sacado a la luz las decisiones clave, `/to-prd` convierte esa conversación en un Documento de Requisitos de Producto (PRD). El PRD captura el "por qué", el alcance, las restricciones y los criterios de éxito — todo en forma estructurada.

Este no es un documento técnico. Es un documento de negocio al que las decisiones técnicas harán referencia más adelante.

### Paso 3: Desglosar con `/to-issues`

El último paso de la planificación es `/to-issues`, que lee el PRD y genera un conjunto de tickets accionables de forma independiente. Cada ticket es un corte vertical: lo suficientemente pequeño para implementarse en una sesión, lo suficientemente grande para ser significativo.

El resultado es un backlog listo para el desarrollo.

## Backlog: La Capa Intermedia

El backlog no es una lista de tareas. Es el contrato entre el negocio y el equipo de ingeniería — escrito en lenguaje de negocio, estructurado para la implementación.

Cada ticket en el backlog lleva:

- El contexto de la sesión de interrogatorio
- Los requisitos del PRD
- Criterios de aceptación verificables de extremo a extremo

Esto es lo que hace que la fase de Construcción sea fiable. Cuando un agente recoge un ticket, tiene todo lo que necesita para entender el objetivo antes de escribir una sola línea de código.

## Construcción: Del Ticket a la Funcionalidad Desplegada

La fase de construcción tiene cinco pasos, cada uno con una skill específica.

### Paso 1: Elegir un Ticket con `/triage`

`/triage` selecciona el siguiente ticket en el que trabajar. Tiene en cuenta las dependencias, la prioridad y el contexto para recomendar el ticket correcto en el momento adecuado. No se trata solo de coger el primer elemento de la cola — es una decisión de secuenciación deliberada.

### Paso 2: Plan de Implementación con `/grill-with-docs`

Sí, `/grill-with-docs` aparece de nuevo. Esta vez, el contexto es técnico. La skill te interroga sobre la implementación: *¿Qué ficheros se ven afectados? ¿Cuáles son los casos límite? ¿Qué enfoque tiene más sentido dada la arquitectura existente?*

El resultado es un plan de implementación — un briefing técnico que guía la sesión de codificación.

### Paso 3: Transferencia con `/handoff`

`/handoff` comprime el contexto de la sesión actual en un documento estructurado. Esto es lo que se carga en la siguiente sesión del agente, asegurando continuidad sin repetición.

Este paso resuelve un problema real: los agentes de IA tienen ventanas de contexto. Un documento de transferencia es una compresión deliberada y sin pérdidas de todo lo que la siguiente sesión necesita saber.

### Paso 4: Implementar con `/tdd`

`/tdd` ejecuta el bucle rojo-verde-refactorización. Los tests se escriben primero, contra los criterios de aceptación del ticket. La implementación sigue, guiada por los tests en rojo.

El enfoque test-first no es solo una buena práctica — es lo que hace que el paso final de QA sea significativo. No puedes verificar el comportamiento en el navegador si no has definido cuál es ese comportamiento.

### Paso 5: Verificar con `/qa`

El último paso es donde el ciclo se cierra. `/qa` es una skill personalizada construida sobre [`agent-browser`](https://github.com/vercel-labs/agent-browser), una herramienta de automatización de navegador nativa y rápida.

Carga los criterios de aceptación del ticket, abre el navegador y verifica cada criterio de extremo a extremo — navegando por rutas reales, rellenando formularios reales, comprobando resultados reales. Graba toda la sesión como vídeo e informa del resultado de cada criterio.

Esto no es testing unitario. Es verificación de comportamiento en el entorno real.

## Por Qué Funciona

El ASDLC funciona porque separa las responsabilidades en cada capa:

- La **Planificación** mantiene separados los contextos de negocio y técnico hasta que es útil unirlos.
- El **Backlog** lleva el contexto hacia adelante sin perderlo en los traspasos.
- La **Construcción** ejecuta con suficiente estructura para ser reproducible, pero con suficiente flexibilidad para manejar la complejidad real.

Las skills de la [librería de skills de Matt Pocock](https://github.com/mattpocock/skills) proporcionan la estructura. La skill personalizada `/qa` cierra el bucle con verificación real.

El resultado es un ciclo que puede traspasarse, reanudarse e iterarse — con agentes de IA haciendo el trabajo pesado y los humanos centrándose en las decisiones que realmente importan.

## Las Skills

| Fase | Skill | Propósito |
|------|-------|-----------|
| Planificación | `/grill-with-docs` | Definir el épico con contexto de negocio |
| Planificación | `/to-prd` | Crear el Documento de Requisitos de Producto |
| Planificación | `/to-issues` | Generar tickets de backlog a partir del PRD |
| Construcción | `/triage` | Elegir el siguiente ticket |
| Construcción | `/grill-with-docs` | Crear el plan de implementación |
| Construcción | `/handoff` | Comprimir el contexto para la siguiente sesión |
| Construcción | `/tdd` | Implementar con desarrollo guiado por tests |
| Construcción | `/qa` | Verificar criterios de aceptación de extremo a extremo |

Todas las skills excepto `/qa` son de la [librería de skills open-source de Matt Pocock](https://github.com/mattpocock/skills). `/qa` es una skill personalizada construida para este flujo de trabajo sobre `agent-browser`.

---

El ASDLC no es un framework que se adopta de golpe. Empieza con una fase. Usa `/grill-with-docs` antes de tu próxima sesión de planificación. Observa qué preguntas surgen. El resto llega de forma natural.
