---
title: "El Ciclo de Vida de Desarrollo de Software Agéntico v2"
date: "2026-08-25"
tag: AI, Agentic Development, Process, Software Factory
description: La versión 2 del ASDLC — el Diseño de Experiencia entra en el flujo, cada paso se convierte en un comando con nombre, y cinco puertas de aprobación explícitas deciden qué firma todavía un humano antes de que la Software Factory tome el relevo.
image: "/agentic-software-development-life-cycle-v2-es.png"
author: Lorenzo GM
---

# El Ciclo de Vida de Desarrollo de Software Agéntico v2

Érase una vez un ciclo de vida de desarrollo con dos modos: planificar y construir. Todo lo interesante pasaba en el hueco entre ambos, y ese hueco era donde el contexto iba a morir.

Cada día parcheábamos ese hueco con documentos, reuniones y memoria tribal. Entonces escribí [El Ciclo de Vida de Desarrollo de Software Agéntico](/agentic-software-development-life-cycle) — tres capas, Planificación → Backlog → Build, con el backlog ascendido a capa intermedia de primer nivel en lugar de ser un efecto secundario de la planificación. Esa versión funcionaba. Un equipo podía adoptarla sin reorganizarse, sin matriz RACI y sin pedirle permiso a nadie.

Hasta que un día dejó de ser suficiente.

Se rompió por dos sitios. Primero, el diseño seguía fuera del bucle: el flujo asumía que alguien ya había decidido cómo debía ser la experiencia. Segundo, cuanto más podían hacer los agentes de verdad, menos obvio era *dónde se suponía que un humano todavía tenía que decir que sí*. "Mantener a un humano en el bucle" no es un proceso. Es un eslogan.

Y por eso existe la v2. La misma columna vertebral, tres añadidos: el **Diseño de Experiencia** como una rama real hacia el backlog, **cada paso con nombre de comando**, y **cinco puertas de aprobación explícitas** — no intuiciones, puertas.

![El Ciclo de Vida de Desarrollo de Software Agéntico v2](/agentic-software-development-life-cycle-v2-es.png)

## Cómo Leer el Mapa

Dos símbolos cargan con casi todo el significado:

- 🤖 — el paso **puede ejecutarse sin supervisión en la Software Factory**. Sin sesión, sin nadie mirando. Lo disparas tú, o lo dispara un evento, y produce su artefacto.
- ✋ — el paso **necesita aprobación humana antes de continuar**. El agente hace el trabajo; una persona decide si avanza.

Un paso puede ser las dos cosas. `/plan-tickets` se ejecuta sin supervisión *y* espera aprobación: la Factory redacta los tickets de madrugada y tú los apruebas con el café. Esa combinación es el sentido entero de la v2.

Los pasos sin ningún símbolo son conversaciones. Te necesitan en la sala.

## Planificación: De la Idea a los Tickets

El grupo de Planificación convierte algo difuso en algo que el backlog pueda sostener.

### `/plan-idea`

La IA te hace preguntas de negocio para desarrollar tu idea hasta que los dos compartís el mismo entendimiento. Sin código, sin arquitectura, sin formato de ticket. Solo: qué estamos haciendo, para quién, cómo es el éxito y qué estamos explícitamente decidiendo no hacer.

Este paso no lleva 🤖 a propósito. Una idea no se puede desarrollar sin supervisión, porque la información que falta vive en tu cabeza. Es el único paso de todo el ciclo que es irreduciblemente una conversación.

### `/plan-spec` 🤖

La conversación se sintetiza en una spec — el **epic** — y se publica en el gestor de incidencias.

Este es el primer paso que la Software Factory puede asumir. Una vez que la conversación existe, convertirla en una spec estructurada es una transformación, no una decisión. Le das la transcripción y devuelve un epic en el tracker.

### `/plan-tickets` 🤖 ✋

La spec se divide en tickets — las **historias** — y cada ticket declara qué tickets lo bloquean.

Esa última parte importa más de lo que parece. Las dependencias declaradas son lo que después permite a la Factory coger trabajo de forma autónoma: un agente puede preguntar "¿qué está desbloqueado ahora mismo?" y obtener una respuesta real en vez de adivinar prioridades.

Esta es la primera puerta de aprobación. Un desglose mal hecho no falla en voz alta: falla tres días después, en forma de retrabajo.

## Diseño de Experiencia: La Rama Que Faltaba en la v1

El grupo de Planificación asume que sabes qué estás construyendo. El Diseño de Experiencia es para cuando no lo sabes.

Corre **en paralelo** con Planificación, ni antes ni después, y converge en el mismo backlog.

### `/xd-discover`

Recogida de información e inspiración. Divergir sobre el espacio del problema: qué existe, qué hace la competencia, con qué sufren de verdad los usuarios, qué restricciones son reales y cuáles son suposiciones heredadas.

### `/xd-frame`

Narrativa, estrategia y principios. Converger en una dirección. Aquí es donde el equipo decide de qué *trata* la experiencia antes de decidir qué aspecto tiene.

### `/xd-define`

Define la experiencia que entrará en prototipado. Lo bastante concreta para poder construir un prototipo, lo bastante abierta para que el prototipo todavía te sorprenda.

Ninguno de estos tres lleva 🤖 tampoco. El diseño es criterio, y el criterio no se ejecuta sin supervisión.

### Prototipo

El resultado del Diseño de Experiencia no es un documento. Son **artefactos de diseño y prototipos que aterrizan la experiencia antes de planificar**: algo que puedes clicar, con lo que puedes reaccionar y sobre lo que puedes discutir.

### `/plan-prototype-to-tickets` 🤖 ✋

Entonces la rama vuelve a unirse con Planificación. El prototipo se convierte en tickets — las historias — listos para el backlog.

Segunda puerta de aprobación. Aquí el prototipo es la fuente de la verdad, y si los tickets se desvían de él, el producto construido se desviará también.

## Backlog: Sigue Siendo la Capa Intermedia

Las specs (epics) y los tickets (historias) viven en el gestor de incidencias. Nada más.

El backlog se quedó exactamente donde lo puso la v1, porque es la parte que ya estaba bien. Es el contrato entre negocio e ingeniería: escrito en lenguaje de negocio, estructurado para implementarse y cargando su propio contexto.

Lo que cambió es que ahora **llegan dos caminos hasta él**. Planificación lo alimenta directamente cuando la forma de la solución ya se conoce. Diseño de Experiencia lo alimenta a través de un prototipo cuando no. En cualquier caso, al grupo de Desarrollo aguas abajo le da igual por qué camino llegó un ticket: lee el mismo contrato.

## Desarrollo: Del Ticket a la PR Mergeada

Cinco pasos, y aquí es donde la Software Factory se gana el sueldo: todos y cada uno llevan 🤖.

### `/dev-implementation-plan` 🤖 ✋

La IA te hace preguntas técnicas para definir el plan de implementación: qué ficheros se ven afectados, qué costuras llevan tests, cuáles son los casos límite y cuál es el enfoque dada la arquitectura existente.

Tercera puerta de aprobación, y la de mayor apalancamiento de todo el ciclo. Este es el último momento en el que cambiar de opinión sale barato. Después de aquí, cambiar de opinión cuesta una reescritura.

### `/dev-implement` 🤖

Implementa los tickets del plan, con TDD en las costuras acordadas.

"En las costuras acordadas" está haciendo trabajo real en esa frase. No todo merece un test, y el TDD indiscriminado produce suites de tests en las que nadie confía. El plan decide dónde van los tests; este paso respeta esa decisión. Sin puerta de aprobación: el plan ya se aprobó y la revisión viene después.

### `/dev-code-review` 🤖 ✋

Revisa la implementación contra el plan y los estándares del código.

Cuarta puerta. Fíjate contra qué revisa: **el plan**, no solo el gusto personal. La pregunta no es "¿lo habría escrito yo así?" sino "¿hizo esto lo que acordamos, como lo acordamos?". Los agentes derivan, y la deriva respecto a un plan aprobado es el modo de fallo concreto que esto detecta.

### `/dev-qa` 🤖

Prueba la funcionalidad contra los criterios de aceptación de las historias y los quality gates definidos.

No son tests unitarios. Es verificación de comportamiento contra los criterios de aceptación que se escribieron allá en `/plan-tickets` — que es exactamente el motivo por el que esos criterios tenían que ser lo bastante buenos como para sobrevivir a una puerta de aprobación.

Aquí no hay ✋, y es deliberado: un paso de QA que necesita aprobación humana para *reportar un fallo* no es un quality gate, es un trámite. Pasa o no pasa, y si no pasa, el trabajo vuelve atrás.

### `/dev-ship` 🤖 ✋

Abre la PR, añade revisores y comprueba que los pipelines pasan.

Quinta y última puerta. El agente puede abrir la PR, asignarla y vigilar el pipeline, pero mergear en una rama compartida es una decisión humana. Esta es la frontera entre tu trabajo y el de todos los demás.

## Las Puertas de Aprobación

Cinco puertas en todo el ciclo. Ese número es una decisión de diseño, no un accidente.

| Puerta | Paso | Qué está decidiendo el humano |
| --- | --- | --- |
| 1 | `/plan-tickets` | ¿Está bien desglosado el trabajo? |
| 2 | `/plan-prototype-to-tickets` | ¿Los tickets se corresponden con el prototipo? |
| 3 | `/dev-implementation-plan` | ¿Es este el enfoque técnico correcto? |
| 4 | `/dev-code-review` | ¿La implementación siguió el plan? |
| 5 | `/dev-ship` | ¿Está listo para mergear? |

El patrón es consistente: **las aprobaciones se colocan donde una decisión equivocada se propaga, o donde el radio de impacto sale de tu propio espacio de trabajo.**

Tres de las cinco puertas (1, 2, 3) son puertas de *alcance y enfoque*: los errores que se multiplican en silencio. Las otras dos (4, 5) son puertas de *salida*: los momentos en que el trabajo abandona las manos del agente y pasa a ser problema del equipo.

Igual de importante es dónde **no** hay aprobaciones. `/plan-spec`, `/dev-implement` y `/dev-qa` corren sin ellas, porque son transformaciones fieles de algo ya aprobado. Añadir una puerta ahí no añade seguridad. Añade una cola.

Si te tienta añadir una sexta puerta, hazte primero la pregunta de verdad: ¿el paso es realmente arriesgado, o es que el artefacto de *aguas arriba* no es lo bastante bueno como para confiar en él? La mayoría de las peticiones de más aprobaciones son peticiones de una spec mejor disfrazadas.

## Dónde Entra la Software Factory

Cuenta las marcas 🤖: ocho de los doce pasos pueden ejecutarse sin supervisión.

Eso es lo que hace posible la **Software Factory**: un entorno donde los pasos agénticos se ejecutan sin una sesión abierta, disparados por eventos en vez de por ti sentado delante del editor. Aterriza una spec y corre `/plan-spec`. Se aprueban los tickets y se encola `/dev-implementation-plan`. Se aprueba un plan y arranca `/dev-implement`. Tu trabajo pasa de *hacer los pasos* a *abrir las puertas*.

Las cinco puertas ✋ son lo que hace que eso sea seguro. Autonomía sin puertas es un becario sin supervisión con permisos de commit; puertas sin autonomía es el proceso que ya tienes. La Factory necesita las dos cosas.

Estoy escribiendo un artículo dedicado a la Software Factory: cómo funcionan los disparadores, cómo se transporta el estado entre ejecuciones sin supervisión y qué se rompe cuando intentas montar esto sobre infraestructura real. De momento, lee cada 🤖 del diagrama como "este paso no te necesita en la sala".

## El Ciclo Completo

| Grupo | Paso | Factory | Aprobación |
| --- | --- | --- | --- |
| Planificación | `/plan-idea` | — | — |
| Planificación | `/plan-spec` | 🤖 | — |
| Planificación | `/plan-tickets` | 🤖 | ✋ |
| Diseño de Experiencia | `/xd-discover` | — | — |
| Diseño de Experiencia | `/xd-frame` | — | — |
| Diseño de Experiencia | `/xd-define` | — | — |
| Planificación | `/plan-prototype-to-tickets` | 🤖 | ✋ |
| Desarrollo | `/dev-implementation-plan` | 🤖 | ✋ |
| Desarrollo | `/dev-implement` | 🤖 | — |
| Desarrollo | `/dev-code-review` | 🤖 | ✋ |
| Desarrollo | `/dev-qa` | 🤖 | — |
| Desarrollo | `/dev-ship` | 🤖 | ✋ |

## Qué Cambió Respecto a la v1

Si adoptaste la v1, este es el delta:

- **El Diseño de Experiencia ya está en el ciclo.** La v1 partía de una idea ya moldeada. La v2 tiene un camino real para problemas todavía difusos, y converge en el mismo backlog a través de un prototipo.
- **Cada paso es un comando con nombre.** La v1 reutilizaba habilidades genéricas en contextos distintos, lo cual funcionaba pero hacía el mapa más difícil de leer. En la v2, `/plan-idea` y `/dev-implementation-plan` son comandos separados precisamente porque uno es una conversación de negocio y el otro es técnica.
- **Las aprobaciones son explícitas.** La v1 tenía intervención humana en todas partes y en ninguna. La v2 nombra cinco puertas y defiende la ausencia del resto.
- **La autonomía está marcada.** Ocho pasos llevan 🤖 y pueden delegarse a la Software Factory. Eso era algo que la v1 no podía ni expresar.

Las tres capas no cambiaron. Planificación → Backlog → Build sigue siendo la columna vertebral, y si quieres el razonamiento detrás de esa estructura, está en [el artículo original](/agentic-software-development-life-cycle). Si lo que quieres es el modelo operativo completo y más pesado, con propiedad por rol y matriz RACI, eso es [Agentic Development for Software Teams](/agentic-development-for-software-teams).

## Reflexión Final

La pregunta interesante en desarrollo agéntico dejó de ser "¿puede el agente hacer este paso?". Hace tiempo que la respuesta es sí para casi todos los pasos.

La pregunta interesante ahora es la que intenta responder la v2:

> ¿Qué pasos merecen todavía una firma humana, y cuáles solo lo parecen?

Equivócate en una dirección y lo aprobarás todo, que es la v1 con más ceremonia. Equivócate en la otra y te despertarás con una PR mergeada que resuelve un problema que nadie tenía.

Cinco puertas. Ocho pasos sin supervisión. Esa es toda la apuesta.
