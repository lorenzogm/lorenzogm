---
title: "Desarrollo agéntico en la nube con colas"
date: "2026-07-14"
tag: AI, Agentic Development, GitHub Actions, Automation
description: Cuatro flujos de principio a fin que se ejecutan en la nube sin nadie en el teclado — entrega de funcionalidades, actualizaciones de Dependabot, alertas de seguridad y pipelines rotos — cada uno disparado por un evento, conducido por un agente y validado por controles de calidad antes del merge.
image: "/cloud-agentic-development-with-queues-es.png"
author: Lorenzo GM
---

# Desarrollo agéntico en la nube con colas

Ejecutar un agente desde el editor es útil, pero sigue necesitándote ahí: abrir una sesión, invocar una skill, esperar, revisar, repetir. El siguiente paso es llevar ese trabajo a la nube, donde un **evento** arranca al agente en lugar de una persona.

GitHub ya te da todas las piezas: Actions para los disparadores, el [agente de programación de GitHub Copilot](https://github.com/features/ai/github-app) para hacer el trabajo, y un panel que muestra cada tarea abierta que los agentes están gestionando. El desarrollador deja de ser la cinta transportadora y pasa a ser quien aprueba.

Cuatro flujos cubren casi todo lo que un equipo hace en su día a día. Todos comparten la misma forma:

```
evento ──▶ agente ──▶ pull request ──▶ controles de calidad ──▶ merge
                                              │
                                     (un humano aprueba)
```

La diferencia está solo en qué dispara el evento y cuánto permanece un humano en el proceso. Veámoslos uno a uno.

## Las colas son la clave

Antes de los flujos, la idea que hace que todos funcionen: las **colas**. El desarrollo agéntico autónomo no es un gran cerebro que decide todo — es una serie de colas, donde cada elemento espera a ser recogido, procesado y movido a la siguiente cola. Un agente (o un humano) toma un elemento de una cola, hace un trabajo y deja el resultado en la siguiente. El sistema avanza de un traspaso en un traspaso.

Tres colas transportan todo el ciclo de vida:

```
Tickets de Jira       GitHub Issues           GitHub Pull Requests
(requisitos de        (planes de              (soluciones
 negocio)              implementación)         implementadas)

   qué construir  ──▶  cómo construirlo  ──▶  el cambio construido
```

1. **Tickets de Jira — la cola de requisitos.** Esto es *qué* quiere el negocio. Cada ticket es una unidad de intención de negocio esperando a convertirse en un plan. Nada se construye directamente desde un ticket; primero tiene que convertirse en un plan.
2. **GitHub Issues — la cola de planes.** Esto es *cómo* se hará el trabajo. Un ticket que está listo se convierte en un plan de implementación capturado como un GitHub Issue. El plan espera aquí a ser revisado y aprobado antes de escribir una sola línea de código.
3. **GitHub Pull Requests — la cola de soluciones.** Esto es el *cambio construido*. Un plan aprobado produce un pull request con la implementación y sus tests. El PR espera aquí hasta que los controles de calidad pasan y está listo para el merge.

Cada cola es un punto de control. El trabajo solo avanza cuando la etapa anterior está realmente terminada — un ticket listo se convierte en plan, un plan aprobado se convierte en PR, un PR en verde se convierte en merge. Como cada etapa es una cola con un estado visible, todo el sistema es inspeccionable: en cualquier momento puedes ver qué está esperando a ser planificado, qué está esperando aprobación y qué está esperando el merge. Los flujos de abajo son simplemente distintas formas de alimentar y vaciar estas tres colas.

## Flujo #1 — Entrega de funcionalidades

```
Ticket de Jira (listo para el sprint)
        │
        ▼
El workflow genera un plan de implementación  ──▶  GitHub Issue
        │
        ▼
El desarrollador revisa el plan     ◀── panel de la app de Copilot
        │
        ▼
El desarrollador asigna el issue a un agente
        │
        ▼
El agente abre un PR (TDD: tests unitarios + E2E)
        │   gates: build · lint · test · format · E2E · contract · Lighthouse · axe
        ▼
El desarrollador revisa la preview + el código
        │
        ▼
Merge
```

Este es el único flujo donde un humano mantiene el control en dos puntos: al aprobar el plan y al aprobar el resultado.

1. **Un ticket está listo.** El trabajo empieza en Jira. Cuando un ticket se asigna al sprint y se marca como listo para desarrollo, se convierte en la entrada de la automatización. No pasa nada hasta que el ticket está realmente listo — así se mantienen fuera del pipeline las ideas a medio formar.
2. **Un workflow genera un plan de implementación.** Un workflow de GitHub recoge el ticket y produce un plan como **GitHub Issue**: el enfoque, los ficheros que espera tocar, los tests que pretende escribir y los compromisos. El plan es un artefacto que puedes leer y cuestionar antes de que exista una sola línea de código.
3. **Un desarrollador revisa el plan.** Este es el primer punto de control. Usando el panel de la app de GitHub Copilot, el desarrollador ve todos los planes abiertos de un vistazo y repasa el enfoque propuesto. Corregir un plan flojo aquí es barato; descubrirlo después de escribir el código, no.
4. **El desarrollador asigna el issue a un agente.** Una vez que el plan es sólido, el desarrollador entrega el issue al agente de programación. Esa asignación es la señal de "adelante" — la decisión humana deliberada que convierte un plan en trabajo.
5. **El agente produce un PR siguiendo TDD.** El agente escribe primero los tests que fallan — nuevos **tests unitarios** y nuevos **tests E2E** — y luego la implementación que los hace pasar. Al abrir el PR se disparan todos los controles de calidad: **build, lint, test, format, testing E2E, contract testing con Playwright, rendimiento con Lighthouse y accesibilidad con axe-core**. Cada gate es un muro que el cambio debe superar. El desarrollador abre el **enlace de preview** para ver el resultado en marcha y revisa el código.
6. **El desarrollador hace merge.** Con el plan aprobado, los gates en verde y la preview validada, el merge es lo fácil. Todo lo arriesgado ya ocurrió antes.

El patrón: automatizar el trabajo mecánico y mantener al humano en las dos decisiones que de verdad requieren criterio — *¿es este el plan correcto?* y *¿es este el resultado correcto?*

## Flujo #2 — Actualizaciones de seguridad de Dependabot

```
Dependabot abre un PR
        │
        ▼
Se ejecutan los controles de calidad
        │
   ┌────┴─────┐
   ▼          ▼
todos ok   algunos fallan
   │          │
   ▼          ▼
auto-merge  el agente arregla ──▶ gates ok ──▶ auto-merge
```

Las actualizaciones de dependencias son frecuentes, casi siempre aburridas y de vez en cuando rompen algo. Este flujo las mantiene en movimiento sin un humano salvo que algo lo necesite de verdad.

1. **Dependabot abre un pull request.** Una nueva versión — a menudo un parche de seguridad — llega como un PR, exactamente igual que cualquier otro colaborador.
2. **Los gates deciden.** Si todos los controles de calidad pasan, el PR se **fusiona automáticamente**. Sin revisión, sin esperas: un bump de dependencia en verde no merece la atención de una persona.
3. **Un fallo entrega el trabajo a un agente.** Si un gate falla, se dispara un agente para arreglar la rotura — adaptar el código a la nueva API, actualizar un snapshot, resolver un error de tipos — y empuja el arreglo a la misma rama. Cuando los gates se ponen en verde, la regla de auto-merge del paso 2 toma el control y el PR se fusiona.

El resultado es un pipeline de dependencias que solo aparece ante un humano cuando el propio agente no puede cerrar la brecha.

## Flujo #3 — Monitorización de seguridad avanzada

```
Aparece una alerta de seguridad
        │
        ▼
La alerta dispara un agente
        │
        ▼
El agente abre un PR con el arreglo
        │
        ▼
Controles de calidad ──▶ ok ──▶ merge
```

Las alertas de seguridad son una cola que tiende a crecer más rápido de lo que nadie la vacía. Este flujo la vacía de forma automática.

1. **Se detecta una alerta.** El análisis de seguridad avanzada vigila el repositorio. Una alerta nueva — un patrón vulnerable, un riesgo expuesto — es el disparador.
2. **Un agente trabaja en un arreglo.** La alerta despierta a un agente, que investiga el hallazgo e implementa una remediación: parchear el código vulnerable, reforzar una comprobación, eliminar el camino peligroso — y abre un **pull request** con el cambio.
3. **El PR se fusiona cuando pasan los pipelines.** Se aplican los mismos controles de calidad. Cuando están en verde, el arreglo se fusiona. La alerta se cierra porque el problema de fondo ya no existe, no porque alguien la haya descartado.

## Flujo #4 — Monitorización de pipelines

```
Un pipeline se rompe (código nuevo)
        │
        ▼
El fallo dispara un agente
        │
        ▼
El agente abre un PR con el arreglo
        │
        ▼
Controles de calidad ──▶ ok ──▶ merge
```

Un pipeline en rojo bloquea a todo el que va detrás. En lugar de esperar a que alguien se dé cuenta, el propio fallo inicia la reparación.

1. **Un pipeline se rompe.** Entra código nuevo y un pipeline se pone en rojo — un test que falla, un build roto, una violación de lint que se coló.
2. **Un agente trabaja en el arreglo.** El fallo dispara un agente, que lee los logs, reproduce el problema e implementa una corrección en una rama nueva, y abre un **pull request**.
3. **El PR se fusiona cuando pasan los pipelines.** El arreglo pasa por los gates como cualquier otro cambio. Cuando están en verde, se fusiona y el pipeline vuelve a estar sano — a menudo antes de que el equipo haya terminado de leer la notificación del fallo.

## El hilo común

Pon los cuatro diagramas uno al lado del otro y aparece el mismo esqueleto cada vez: un **evento** arranca el trabajo, un **agente** lo hace, un **pull request** lo transporta y unos **controles de calidad** deciden si se permite entrar. Los gates son lo que hace que esto sea seguro — nada se fusiona porque un agente lo diga; se fusiona porque hizo build, pasó el lint, los tests y todo lo demás.

La entrega de funcionalidades mantiene a un humano en las dos decisiones de criterio. Los otros tres se ejecutan sin supervisión y solo piden un humano cuando el agente no puede terminar el trabajo. Ese es el cambio de verdad: dejas de hacer el trabajo y empiezas a fijar el estándar que el trabajo debe cumplir.
