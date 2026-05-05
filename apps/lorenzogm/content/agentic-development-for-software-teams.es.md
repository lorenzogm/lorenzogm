---
title: "Desarrollo Agentic para Equipos de Software: Fases + RACI"
date: "2026-05-04"
tag: AI, Agentic Development, Process
description: Cómo estructurar desarrollo agentic en equipos de software con fases claras, ownership por rol, una matriz RACI y un loop de calidad que mantiene la trazabilidad dentro del flujo.
image: "/agentic-development-for-software-teams-es.png"
author: Lorenzo GM
---

# Desarrollo Agentic para Equipos de Software: Fases + RACI

> **Actualización (5 de mayo de 2026):** La matriz RACI se ha revisado para reducir participantes innecesarios en cada fase. Developer y Tester ahora solo aparecen en Implementation y en el Feedback Loop. Designer y Business Analyst se eliminan de Implementation. Solutioning pasa a estar liderado principalmente por el Architect. Gracias a [Markus Klimmasch](https://www.linkedin.com/in/markus-klimmasch-33860687/) por el feedback que motivó esta revisión.

Cuando un equipo empieza a trabajar con IA, el problema no suele ser si el modelo genera código. El problema real es otro: quién debe ejecutar cada workflow, en qué orden, cuánto contexto hay que preparar antes de delegar, y en qué momentos hace falta intervención humana.

Ahí es donde el desarrollo agentic necesita un modelo operativo de verdad. BMAD encaja bien aquí no porque invente pasos nuevos, sino porque da estructura a pasos que ya existían en un desarrollo serio: discovery, requisitos, diseño, arquitectura, stories, implementación, revisión y testing.

En este artículo uso BMAD como ejemplo concreto de desarrollo agentic para seis roles habituales:

- Business Analyst
- Project Manager
- Architect
- Designer
- Developer
- Tester

La idea no es tratar el desarrollo agentic como una lista de prompts. La idea es tratarlo como un sistema operativo de trabajo compartido, con ownership claro, artefactos claros y loops de feedback claros.

## La Idea Principal

Una forma práctica de estructurar desarrollo agentic es organizar el trabajo por fases. En BMAD, ese modelo aparece como **cuatro fases**:

1. **Analysis**
2. **Planning**
3. **Solutioning**
4. **Implementation**

Además, en nuestro equipo añadimos una convención operativa propia:

5. **Feedback and Replanning Loop**

No es una quinta fase oficial del método. Es una regla de ejecución para algo que siempre ocurre en proyectos reales: el cliente cambia prioridades, aparecen nuevos requisitos o QA encuentra gaps cuando una story ya parecía terminada.

En vez de decidir a ojo si eso solo afecta a una story o si obliga a tocar PRD, UX o arquitectura, preferimos pasar siempre por `bmad-correct-course` y dejar que BMAD reevalúe el impacto con contexto.

No buscamos meter burocracia. Buscamos ganar velocidad y eficiencia sin comprometer la calidad.

## Por Qué Este Flujo Funciona

La ventaja práctica del desarrollo agentic no es solo repartir trabajo entre personas e IA. La ventaja real es que acelera decisiones y evita retrabajo cuando cada fase tiene un objetivo claro, un set de workflows reconocible y una forma explícita de volver atrás cuando aparece feedback.

Eso traduce la operación del equipo en tres beneficios concretos:

- más velocidad, porque cada fase acota mejor la decisión que toca tomar
- más eficiencia, porque el contexto no se reconstruye desde cero en cada handoff
- más calidad, porque TEA mete trazabilidad, diseño de pruebas y gates dentro del flujo en lugar de añadirlos al final

Por eso este modelo escala mejor cuando el objetivo es mover más rápido un proyecto sin degradar la calidad.

## Qué Hace Cada Fase

### 1. Analysis

Esta fase es opcional en BMAD, pero suele ser útil cuando el problema aún no está bien acotado.

Skills típicas:

- `bmad-brainstorming` para abrir opciones y ordenar hipótesis
- `bmad-market-research` para entender mercado, competidores o benchmarks
- `bmad-domain-research` para aclarar reglas del negocio y lenguaje del dominio
- `bmad-technical-research` para validar viabilidad, restricciones y tradeoffs técnicos
- `bmad-product-brief` o `bmad-prfaq` para convertir el descubrimiento en una propuesta de producto más concreta

Aquí el peso suele estar en **Business Analyst**, **Project Manager** y **Architect**, con **Designer** contribuyendo cuando el problema toca experiencia de usuario. **Developer** y **Tester** no participan en esta fase.

### 2. Planning

Aquí se define qué hay que construir.

Skills típicas:

- `bmad-create-prd` para fijar alcance, objetivos y requisitos del producto
- `bmad-create-ux-design` cuando realmente hay interfaz o cambios de diseño relevantes
- `bmad-testarch-nfr` cuando el proyecto necesita dejar claros NFRs o criterios de release desde pronto
- `bmad-testarch-trace` solo en brownfield, para sacar una baseline de cobertura antes de planificar trabajo nuevo

La responsabilidad principal recae en **Project Manager** y **Designer**, con input de **Architect** para que el PRD no nazca aislado de la realidad técnica o de calidad. Cuando entran `bmad-testarch-nfr` o `bmad-testarch-trace`, el liderazgo operativo debería pasar a **Architect**. **Developer** y **Tester** no son parte de esta fase. Solo participan los roles que dan forma directa a la definición del producto.

En TEA, `bmad-testarch-trace` no es una skill de Solutioning. Su sitio real es **Phase 2** cuando necesitas baseline en brownfield, **Phase 4** cuando refrescas trazabilidad, y **release gate** cuando cierras la decisión.

### 3. Solutioning

Aquí se decide cómo se va a construir y cómo se rompe el trabajo.

Skills típicas:

- `bmad-create-architecture` para decidir la forma técnica de la solución
- `bmad-create-epics-and-stories` para romper el trabajo en unidades ejecutables
- `bmad-testarch-test-design` una vez a nivel sistema para revisar testabilidad, riesgo y cobertura antes de ejecutar
- `bmad-check-implementation-readiness` para confirmar que el equipo ya puede empezar a construir sin lagunas graves
- `bmad-testarch-framework` una vez por proyecto, si todavía no existe una base sólida de testing
- `bmad-testarch-ci` una vez por proyecto, si todavía no existe pipeline de calidad

BMAD tiene un agente de arquitectura dedicado. Si tu equipo sí tiene rol de **Architect**, aquí es donde ese rol domina la fase. El Architect lidera arquitectura, test design, framework, CI y readiness checks. El **Project Manager** participa en el breakdown de epics y stories pero las decisiones técnicas son del Architect. **Business Analyst**, **Designer**, **Developer** y **Tester** no son parte de esta fase. Si no existe ese rol, esta responsabilidad debe recaer en un **Developer senior o Tech Lead**.

Aquí es donde viven `bmad-testarch-framework` y `bmad-testarch-ci`. Si siguen apareciendo como trabajo pendiente en Implementation, normalmente no falta delivery: falta cerrar bien Solutioning.

### 4. Implementation

Aquí empieza el loop operativo del delivery. **Developer** y **Tester** se incorporan al flujo por primera vez. **Business Analyst** y **Designer** no participan en esta fase — su trabajo quedó cerrado en Analysis y Planning.

En esta fase ya no deberían reaparecer `bmad-testarch-framework` ni `bmad-testarch-ci`. Si hacen falta aquí, en realidad se está reabriendo trabajo de Solutioning.

**Por epic** cuando necesitas refrescar estrategia, cobertura o calidad global:

- `bmad-sprint-planning` para alinear objetivo, capacidad y foco del epic o sprint
- `bmad-testarch-test-design` para revisar riesgo y cobertura a nivel epic
- `bmad-sprint-status` para revisar avance, bloqueos y desvíos
- `bmad-retrospective` para cerrar el ciclo con aprendizaje operativo

**En el cierre del epic o como checkpoint de calidad** cuando necesitas una lectura más fuerte de cobertura y calidad:

- `bmad-testarch-test-review` para auditar la calidad del set de pruebas
- `bmad-testarch-trace` para refrescar trazabilidad y detectar gaps reales

**Por story** dentro del loop normal de delivery:

- `bmad-create-story` para preparar una story clara y ejecutable
- `bmad-testarch-atdd` de forma opcional cuando conviene arrancar con acceptance tests antes de implementar
- `bmad-dev-story` para implementar la story con el contexto ya preparado
- `bmad-code-review` para validar calidad técnica y desviaciones
- `bmad-testarch-automate` para ampliar cobertura tras implementar
- `bmad-qa-generate-e2e-tests` cuando encaja con la estrategia del proyecto

**Por release o como gate** cuando el proyecto lo exige:

- `bmad-testarch-nfr` para validar NFRs con evidencia si no se hizo antes o si toca revalidarlos
- `bmad-testarch-trace` para cerrar la decisión de gate con cobertura y evidencia

El ciclo más habitual sigue siendo story por story, pero TEA añade dos capas muy útiles: una capa de diseño por epic y una capa de gate por release.

### 5. Feedback and Replanning Loop

Este loop se activa en dos situaciones:

- el cliente trae cambios o nuevos requisitos
- QA encuentra bugs o gaps cuando las stories ya estaban hechas

Nuestra regla es muy simple:

> Todo feedback entra primero por `bmad-correct-course`.

No asumimos manualmente si hay que cambiar solo una story o si el cambio afecta a PRD, UX, arquitectura, epics o backlog. Preferimos que BMAD analice el impacto primero y proponga la ruta correcta.

Después de ese análisis, lo normal es volver con stories nuevas o actualizadas y reentrar en implementación con el mismo ciclo documentado.

## Matriz RACI de BMAD por Fase

Leyenda:

- `R` Responsible
- `A` Accountable
- `C` Consulted
- `I` Informed

### Tabla 1. Analysis

| Skill / Workflow | BA | PM | Architect | Designer |
| --- | --- | --- | --- | --- |
| `bmad-brainstorming` | R | A | C | C |
| `bmad-market-research` / `bmad-domain-research` / `bmad-technical-research` | R | A | C | — |
| `bmad-product-brief` / `bmad-prfaq` | R | A | C | C |

### Tabla 2. Planning

| Skill / Workflow | BA | PM | Architect | Designer |
| --- | --- | --- | --- | --- |
| `bmad-create-prd` | C | A/R | C | C |
| `bmad-create-ux-design` | — | C | — | A/R |
| `bmad-testarch-nfr` | — | C | A/R | — |
| `bmad-testarch-trace` (baseline brownfield) | — | C | A/R | — |

### Tabla 3. Solutioning

| Skill / Workflow | PM | Architect |
| --- | --- | --- |
| `bmad-create-architecture` | C | A/R |
| `bmad-create-epics-and-stories` | A/R | C |
| `bmad-testarch-test-design` (system-level) | — | A/R |
| `bmad-testarch-framework` | — | A/R |
| `bmad-testarch-ci` | — | A/R |
| `bmad-check-implementation-readiness` | C | A/R |

### Tabla 4. Implementation

| Skill / Workflow | Cadencia | PM | Architect | Dev | Tester |
| --- | --- | --- | --- | --- | --- |
| `bmad-sprint-planning` | Por epic / sprint | A | C | R | C |
| `bmad-testarch-test-design` | Por epic | C | C | C | A/R |
| `bmad-sprint-status` | Seguimiento de sprint | A | — | R | C |
| `bmad-create-story` | Por story | A | C | R | C |
| `bmad-testarch-atdd` | Por story, opcional | — | — | C | A/R |
| `bmad-dev-story` | Por story | — | C | A/R | C |
| `bmad-code-review` | Por story | — | C | A/R | C |
| `bmad-qa-generate-e2e-tests` | Por story / según estrategia | — | — | C | A/R |
| `bmad-testarch-automate` | Por story / feature | — | C | C | A/R |
| `bmad-testarch-test-review` | Por epic o pre-release | — | C | C | A/R |
| `bmad-testarch-trace` | Refresh por epic + gate de release | C | C | C | A/R |
| `bmad-testarch-nfr` | Gate de release si no se hizo antes | C | C | C | A/R |
| `bmad-retrospective` | Cierre de sprint / epic | A | — | R | C |

### Tabla 5. Feedback and Replanning Loop

| Skill / Workflow | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- |
| `bmad-correct-course` por nuevo requisito funcional | R | A | C | — | C | — |
| `bmad-correct-course` por nuevo requisito UX/UI | — | A | — | R | C | — |
| `bmad-correct-course` por bug o hallazgo de QA | — | A | C | — | C | R |

La clave aquí es que el feedback loop no arranca siempre igual. Puede empezar desde negocio, desde diseño o desde QA, pero BMAD usa el mismo workflow para recalcular impacto y devolver el trabajo a la fase correcta.

## Cómo Leer Estas Tablas

Hay tres matices importantes:

### Designer agrupa UX y UI

BMAD tiene un agente de **UX Designer**, no uno separado de **UI Designer**. Por eso en esta versión de la matriz uso un único rol de **Designer**. Si en tu equipo UX y UI están separados, ambos pueden colaborar dentro del workflow `bmad-create-ux-design`, pero a nivel operativo conviene tratarlos como una sola responsabilidad de diseño.

### Architect debe aparecer cuando existe

En esta versión de la matriz ya aparece un rol separado de **Architect**. Si tu equipo no tiene esa figura formal, puedes absorber esa columna dentro de Development o Tech Lead, pero entonces conviene hacerlo de forma explícita y no por omisión.

### Development y Testing entran en Implementation

En este modelo, **Developer** y **Tester** no participan en Analysis, Planning ni Solutioning. Su protagonismo real empieza en **Implementation**, que es donde pasan a ejecutar, revisar y validar. De forma simétrica, **Business Analyst** y **Designer** terminan su contribución antes de Implementation y no participan en el loop de delivery.

### Testing puede quedarse corto con la QA built-in

Para muchos proyectos, `bmad-qa-generate-e2e-tests` es suficiente como punto de partida. Si necesitas trazabilidad, gates formales o estrategia de testing más fuerte, el siguiente paso natural es instalar **TEA** y repartir skills como `bmad-testarch-framework`, `bmad-testarch-ci`, `bmad-testarch-test-design`, `bmad-testarch-atdd`, `bmad-testarch-automate`, `bmad-testarch-test-review`, `bmad-testarch-trace` y `bmad-testarch-nfr` dentro del flujo normal.

## Dónde Debe Haber HITL y Dónde Dejar Más Autonomía

Aquí está uno de los tradeoffs más importantes del método.

### HITL alto

Conviene mantener mucha supervisión humana en:

- `bmad-product-brief` / `bmad-prfaq`
- `bmad-create-prd`
- `bmad-create-ux-design`
- `bmad-create-architecture`
- `bmad-testarch-test-design`
- `bmad-testarch-atdd`
- `bmad-testarch-nfr`
- `bmad-testarch-trace`
- `bmad-testarch-test-review`
- `bmad-correct-course`

En estas piezas se decide el marco del problema. Si la IA se equivoca aquí, el error contamina todo lo que viene después.

### Autonomía alta

La IA puede trabajar con bastante autonomía en:

- `bmad-create-story`
- `bmad-dev-story`
- parte de `bmad-qa-generate-e2e-tests`
- `bmad-testarch-automate`

Siempre que el contexto anterior esté bien hecho, aquí es donde más velocidad puedes ganar.

### HITL de validación

Luego vuelves a necesitar criterio humano en:

- `bmad-code-review`
- QA final del epic
- `bmad-retrospective`
- `bmad-correct-course`

La clave no es supervisar todo el tiempo. La clave es intervenir en los puntos donde una mala decisión cambia el alcance, la calidad o la dirección del trabajo.

## Un Flujo de Equipo Sencillo y Realista

Si tuviera que resumir este modelo en una secuencia práctica, sería esta:

1. BA y PM aclaran problema y contexto en Analysis.
2. PM y Designer convierten eso en PRD y diseño.
3. Si el proyecto es brownfield y necesitas baseline real, `bmad-testarch-trace` puede arrancar ya en Planning.
4. Development asume Solutioning y deja cerradas arquitectura, `bmad-testarch-test-design`, `bmad-testarch-framework`, `bmad-testarch-ci` y stories.
5. En cada epic se refresca `bmad-testarch-test-design`.
6. En cada story, Development trabaja con `bmad-create-story`, `bmad-dev-story`, `bmad-code-review` y, cuando compensa, `bmad-testarch-atdd` y `bmad-testarch-automate`.
7. Al cierre del epic, `bmad-testarch-test-review` y `bmad-testarch-trace` ayudan a medir calidad y cobertura de verdad.
8. En releases exigentes, `bmad-testarch-trace` actúa como gate y `bmad-testarch-nfr` entra si toca revalidar NFRs.
9. Todo feedback del cliente o de QA entra por `bmad-correct-course`.
10. BMAD decide si hay que tocar stories, epics, PRD, diseño o arquitectura, y el trabajo vuelve a la fase correcta sin perder trazabilidad.

## Cierre

La mejor forma de perder calidad con IA no es usar demasiada autonomía. Es usarla sin un sistema de trabajo claro.

El desarrollo agentic funciona bien para equipos cuando convierte algo difuso en algo gobernable: quién decide, quién ejecuta, qué artefacto alimenta al siguiente, y cómo se reabsorbe el feedback sin romper el hilo del proyecto. BMAD es una forma concreta de conseguirlo.

Si tuviera que resumirlo en una sola frase, sería esta:

> El desarrollo agentic no acelera porque elimine pasos; acelera porque da contexto, orden y ownership a pasos que ya deberían existir.