---
title: "El Ciclo de Vida de Desarrollo Agéntico Autónomo con GitHub Actions"
date: "2026-06-03"
tag: AI, Agentic Development, GitHub Actions, Automation
description: Convertir el ciclo de vida de desarrollo agéntico en workflows de GitHub orientados a eventos — donde las issues se convierten en Epics, los Epics en tickets, y cada etapa se ejecuta de forma autónoma desde el brief hasta la verificación E2E.
image: "/autonomous-agentic-development-with-github-actions-es.png"
author: Lorenzo GM
---

# El Ciclo de Vida de Desarrollo Agéntico Autónomo con GitHub Actions

En un artículo anterior describí el [Ciclo de Vida de Desarrollo de Software Agéntico](/agentic-software-development-life-cycle) — un flujo de trabajo construido alrededor de skills como `/grill-with-docs`, `/to-prd`, `/to-issues`, `/triage`, `/tdd` y `/qa`. Funciona. Pero había un detalle con el que me topaba una y otra vez: cada una de esas skills necesita que una persona abra una sesión y la invoque.

Eso está bien cuando estás prototipando un proceso. Se convierte en el cuello de botella cuando el proceso ya está probado.

La pregunta que me llevó a este siguiente artículo fue sencilla: ¿y si el propio backlog disparara el trabajo? No una persona acordándose de ejecutar `/to-prd`, sino la plataforma reaccionando a un evento — una nueva issue, una etiqueta aprobada, un comentario nuevo — y haciendo avanzar el ticket por sí sola.

Ese es el salto de *agéntico* a *autónomo*. Y GitHub ya tiene todo lo que necesitas para construirlo.

## De Skills Invocadas a Workflows Orientados a Eventos

El ASDLC tenía a una persona al volante en cada transición. Elegías un ticket, ejecutabas la skill, revisabas el resultado, pasabas al siguiente paso. Las skills cargaban con la inteligencia; tú cargabas con la orquestación.

El desarrollo autónomo mueve la orquestación a la plataforma. Cada fase del ciclo de vida se convierte en un **workflow de GitHub** que escucha un evento y produce el siguiente artefacto. La persona deja de ser la cinta transportadora y pasa a ser lo que siempre debió ser: quien aprueba.

```
Issue creada → PRD/Epic → (aprobado) → Tickets → (refinado) → Plan → (listo) → Build
```

Cada flecha de esa cadena solía ser una persona abriendo una terminal. Ahora cada flecha es un disparador de GitHub Actions.

## El Cambio de Vocabulario: Issues, Epics y Tickets

Una pequeña decisión de nomenclatura hace que todo el sistema sea más fácil de razonar, así que vale la pena hacerla explícita desde el principio.

Un **brief** llega como una issue normal de GitHub. Una vez que el sistema la enriquece, esa misma issue se convierte en un **Epic** — un PRD capturado directamente en la descripción de la issue. El Epic luego genera **tickets**, que son a su vez issues, enlazadas de vuelta al padre.

Así que todo vive como una issue de GitHub. La diferencia es la etapa en la que está:

- **Issue (brief):** una petición en bruto, apenas estructurada.
- **Epic (PRD):** la issue enriquecida que lleva el "por qué", el alcance y los criterios de aceptación.
- **Ticket:** un corte vertical generado a partir del Epic, listo para implementar.

Llamar *Epic* a la issue enriquecida resultó ser el movimiento que aclaró todo. Señala que esa issue es un padre, que es dueña de un conjunto de hijos, y que habla en lenguaje de negocio en lugar de detalle de implementación.

## Paso 1 — De Brief a PRD: Escuchando Nuevas Issues

El primer workflow escucha `issues.opened`.

Cuando llega una nueva issue, el workflow lee el brief en bruto, incorpora la documentación relevante del proyecto como contexto, y reescribe la descripción de la issue como un PRD. La issue ahora es un Epic. Lleva el propósito, el alcance, las restricciones y un primer borrador de criterios de aceptación — todo escrito en lenguaje de negocio.

Estas son las skills `/grill-with-docs` y `/to-prd` del ASDLC, fusionadas en una única reacción autónoma. La diferencia es que nadie tuvo que acordarse de ejecutarlas. El acto de abrir una issue *es* el disparador.

El trabajo de la persona en esta etapa no es escribir el PRD. Es leerlo y decidir si es correcto.

## Paso 2 — De PRD a Tickets: Escuchando la Aprobación

El segundo workflow escucha un cambio de etiqueta — concretamente, el momento en que una persona añade una etiqueta `approved` al Epic.

Esa etiqueta es la puerta de calidad. Es la única decisión humana deliberada que dice: *este PRD captura el problema correcto, adelante, desglósalo.*

Una vez que aparece la etiqueta, el workflow lee el Epic y genera un conjunto de tickets — issues accionables de forma independiente, cada una un corte vertical, cada una enlazada de vuelta al Epic padre. Esto es `/to-issues`, ahora orientado a eventos.

La elegancia aquí es que la aprobación se expresa de la forma más nativa que ofrece GitHub: una etiqueta. Sin herramienta externa, sin panel aparte. El backlog gestiona su propio estado.

## Paso 3 — Revisión de Tickets: Escuchando Comentarios

El tercer workflow escucha `issue_comment.created`, y se aplica a *todas* las issues del sistema — tanto Epics como tickets.

Cuando una persona deja un comentario, el workflow lo trata como una petición de refinamiento. Lee el comentario, interpreta la intención y ajusta la descripción de la issue en consecuencia. Un comentario como "también deberíamos manejar el caso del usuario no autenticado" se convierte en un criterio de aceptación actualizado. Un comentario que cuestiona el alcance se convierte en un conjunto de requisitos más ajustado.

Esta es la capa conversacional del backlog. En lugar de editar las descripciones de las issues a mano, el equipo le habla a los tickets, y los tickets se actualizan solos. El hilo de discusión se convierte en la traza de auditoría; la descripción se mantiene limpia.

## Paso 4 — Dev: Escuchando el Ticket Aprobado

El cuarto workflow se dispara cuando un ticket es aprobado.

En este punto el sistema produce el **plan de implementación** — el brief técnico que el ASDLC generaba con un segundo pase de `/grill-with-docs`. Analiza los archivos afectados, los casos límite y el enfoque que encaja con la arquitectura existente.

Luego asigna una etiqueta que enruta el trabajo:

- **`ready for agent`** — cuando la implementación será gestionada de forma autónoma.
- **`ready for dev`** — cuando un desarrollador humano lo toma a partir de aquí.

Esa única etiqueta bifurcadora es lo que permite que el mismo pipeline sirva a dos formas de equipo muy diferentes. Un equipo totalmente autónomo deja que el agente lleve los tickets `ready for agent` directamente a implementación. Un equipo con desarrolladores en el bucle usa `ready for dev` como un traspaso limpio y planificado — el plan está hecho, el contexto está capturado, la persona solo construye.

## Más Allá del Plan: TDD, Revisión y QA E2E

La cadena no se detiene en el plan. Las etapas restantes del ASDLC encajan en el mismo modelo orientado a eventos:

- **Implementación con TDD** — un workflow toma un ticket `ready for agent`, ejecuta el bucle red-green-refactor contra los criterios de aceptación y abre un pull request.
- **Revisión de código** — un workflow revisa el pull request contra los requisitos del ticket y las convenciones del proyecto, dejando comentarios o solicitando cambios.
- **QA E2E** — un workflow carga los criterios de aceptación, maneja un navegador real, verifica cada criterio de extremo a extremo y registra el resultado.

Cada uno de estos es otro listener sobre otro evento: una rama empujada, un pull request abierto, un build que pasa. El mismo patrón se repite hasta llegar a una funcionalidad desplegada y verificada.

## Por Qué Funciona

El modelo autónomo funciona por la misma razón que funcionaba el ASDLC — separación de responsabilidades — pero añade algo que la versión manual no podía: **el backlog se conduce a sí mismo.**

- **Los eventos reemplazan la orquestación.** Nadie tiene que acordarse de qué skill viene después. La plataforma lo sabe.
- **Las etiquetas son las puertas de calidad.** La aprobación es una acción nativa, visible y auditable — no una conversación aparte.
- **Los comentarios son el canal de refinamiento.** El equipo le habla a los tickets en lenguaje natural, y los tickets se mantienen al día.
- **Una etiqueta bifurca el flujo.** `ready for agent` y `ready for dev` permiten que el mismísimo pipeline sirva a un equipo totalmente autónomo o a uno híbrido.

El rol humano se comprime hasta las decisiones que de verdad importan: *¿Es este el problema correcto? ¿Son estos los tickets correctos? ¿Está esto listo para construir?* Todo lo que hay entre esas decisiones se ejecuta solo.

## Los Workflows

| Disparador | Evento | Salida |
|-----------|--------|--------|
| Brief → PRD | `issues.opened` | Issue reescrita como un Epic (PRD) |
| PRD → Tickets | `issues.labeled` (`approved`) | Tickets creados a partir del Epic |
| Revisión de Ticket | `issue_comment.created` | Descripción de la issue refinada |
| Dev | ticket aprobado | Plan de implementación + `ready for agent` / `ready for dev` |
| Build | `ready for agent` | Implementación TDD + pull request |
| Revisión | pull request abierto | Comentarios de revisión de código |
| QA | build que pasa | Verificación E2E de los criterios de aceptación |

---

El ASDLC me enseñó que un conjunto claro de skills puede convertir a la IA en un participante real del desarrollo. Este modelo autónomo es el siguiente paso: conectar esas skills a eventos para que el ciclo de vida funcione sin que nadie tenga que girar la manivela. Empieza con un solo workflow. Deja que `issues.opened` convierta tu próximo brief en un Epic, y observa cómo el backlog empieza a moverse por sí solo.
