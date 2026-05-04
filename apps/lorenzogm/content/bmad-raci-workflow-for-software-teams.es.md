---
title: "BMAD para Equipos de Software: RACI, Fases, TEA y Feedback Loop"
date: "2026-05-04"
tag: AI, BMAD, Process
description: Cómo repartir las skills de BMAD entre project manager, business analyst, architect, designer, development y testing con una matriz RACI clara y una forma práctica de incorporar TEA sin perder trazabilidad.
author: Lorenzo GM
---

# BMAD para Equipos de Software: RACI, Fases, TEA y Feedback Loop

Cuando un equipo empieza a trabajar con IA, el problema no suele ser si el modelo genera código. El problema real es otro: quién debe ejecutar cada workflow, en qué orden, cuánto contexto hay que preparar antes de delegar, y en qué momentos hace falta intervención humana.

Ahí es donde BMAD encaja bien. No porque invente pasos nuevos, sino porque da estructura a pasos que ya existían en un desarrollo serio: discovery, requisitos, diseño, arquitectura, stories, implementación, revisión y testing.

En este artículo explico cómo usar BMAD como flujo de equipo para seis roles habituales:

- Business Analyst
- Project Manager
- Architect
- Designer
- Developer
- Tester

La idea no es tratar BMAD como una lista de prompts. La idea es tratarlo como un sistema operativo de trabajo compartido.

## La Idea Principal

BMAD oficial organiza el trabajo en **cuatro fases**:

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

La ventaja práctica de BMAD no es solo ordenar roles. La ventaja real es que acelera decisiones y evita retrabajo porque cada fase tiene un objetivo claro, un set de workflows reconocible y una forma explícita de volver atrás cuando aparece feedback.

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

Aquí el peso suele estar en **Business Analyst**, **Project Manager**, **Architect** y Design. En muchos equipos, **Developer** y **Tester** todavía no están onboarded aquí y se mantienen solo informados hasta que el trabajo entra en Implementation.

### 2. Planning

Aquí se define qué hay que construir.

Skills típicas:

- `bmad-create-prd` para fijar alcance, objetivos y requisitos del producto
- `bmad-create-ux-design` cuando realmente hay interfaz o cambios de diseño relevantes
- `bmad-testarch-nfr` cuando el proyecto necesita dejar claros NFRs o criterios de release desde pronto
- `bmad-testarch-trace` solo en brownfield, para sacar una baseline de cobertura antes de planificar trabajo nuevo

La responsabilidad principal recae en **Project Manager** y **Designer**, con input de **Architect** para que el PRD no nazca aislado de la realidad técnica o de calidad. Cuando entran `bmad-testarch-nfr` o `bmad-testarch-trace`, el liderazgo operativo debería pasar a **Architect**. En este modelo, **Developer** y **Tester** siguen solo informados hasta la fase de Implementation.

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

BMAD tiene un agente de arquitectura dedicado. Si tu equipo sí tiene rol de **Architect**, aquí debe aparecer como dueño explícito de las decisiones transversales y también de las `bmad-testarch-*` estructurales de esta fase. En este esquema, **Developer** y **Tester** pueden seguir fuera del circuito principal incluso en Solutioning y quedar solo como `I`. Si no existe ese rol, esta responsabilidad debe recaer en un **Developer senior o Tech Lead**.

Aquí es donde viven `bmad-testarch-framework` y `bmad-testarch-ci`. Si siguen apareciendo como trabajo pendiente en Implementation, normalmente no falta delivery: falta cerrar bien Solutioning.

### 4. Implementation

Aquí empieza el loop operativo del delivery.

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

| Skill / Workflow | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- |
| `bmad-brainstorming` | R | A | C | C | I | I |
| `bmad-market-research` / `bmad-domain-research` / `bmad-technical-research` | R | A | C | I | I | I |
| `bmad-product-brief` / `bmad-prfaq` | R | A | C | C | I | I |

### Tabla 2. Planning

| Skill / Workflow | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- |
| `bmad-create-prd` | C | A/R | C | C | I | I |
| `bmad-create-ux-design` | I | C | I | A/R | I | I |
| `bmad-testarch-nfr` | I | C | A/R | I | I | I |
| `bmad-testarch-trace` (baseline brownfield) | I | C | A/R | I | I | I |

### Tabla 3. Solutioning

| Skill / Workflow | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- |
| `bmad-create-architecture` | I | C | A/R | I | I | I |
| `bmad-create-epics-and-stories` | C | A/R | C | I | I | I |
| `bmad-testarch-test-design` (system-level) | I | C | A/R | I | I | I |
| `bmad-testarch-framework` | I | I | A/R | I | I | I |
| `bmad-testarch-ci` | I | I | A/R | I | I | I |
| `bmad-check-implementation-readiness` | I | C | A/R | I | I | I |

### Tabla 4. Implementation

| Skill / Workflow | Cadencia | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `bmad-sprint-planning` | Por epic / sprint | I | A | C | I | R | C |
| `bmad-testarch-test-design` | Por epic | I | C | C | I | C | A/R |
| `bmad-sprint-status` | Seguimiento de sprint | I | A | I | I | R | C |
| `bmad-create-story` | Por story | I | A | C | I | R | C |
| `bmad-testarch-atdd` | Por story, opcional | I | C | I | I | C | A/R |
| `bmad-dev-story` | Por story | I | I | C | I | A/R | C |
| `bmad-code-review` | Por story | I | I | C | I | A/R | C |
| `bmad-qa-generate-e2e-tests` | Por story / según estrategia | I | I | I | I | C | A/R |
| `bmad-testarch-automate` | Por story / feature | I | I | C | I | C | A/R |
| `bmad-testarch-test-review` | Por epic o pre-release | I | I | C | I | C | A/R |
| `bmad-testarch-trace` | Refresh por epic + gate de release | I | C | C | I | C | A/R |
| `bmad-testarch-nfr` | Gate de release si no se hizo antes | I | C | C | I | C | A/R |
| `bmad-retrospective` | Cierre de sprint / epic | I | A | I | I | R | C |

### Tabla 5. Feedback and Replanning Loop

| Skill / Workflow | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- |
| `bmad-correct-course` por nuevo requisito funcional | R | A | C | C | C | C |
| `bmad-correct-course` por nuevo requisito UX/UI | C | A | I | R | C | C |
| `bmad-correct-course` por bug o hallazgo de QA | I | A | C | I | C | R |

La clave aquí es que el feedback loop no arranca siempre igual. Puede empezar desde negocio, desde diseño o desde QA, pero BMAD usa el mismo workflow para recalcular impacto y devolver el trabajo a la fase correcta.

## Cómo Leer Estas Tablas

Hay tres matices importantes:

### Designer agrupa UX y UI

BMAD tiene un agente de **UX Designer**, no uno separado de **UI Designer**. Por eso en esta versión de la matriz uso un único rol de **Designer**. Si en tu equipo UX y UI están separados, ambos pueden colaborar dentro del workflow `bmad-create-ux-design`, pero a nivel operativo conviene tratarlos como una sola responsabilidad de diseño.

### Architect debe aparecer cuando existe

En esta versión de la matriz ya aparece un rol separado de **Architect**. Si tu equipo no tiene esa figura formal, puedes absorber esa columna dentro de Development o Tech Lead, pero entonces conviene hacerlo de forma explícita y no por omisión.

### Development y Testing pueden entrar más tarde

En este modelo, **Developer** y **Tester** no necesitan estar onboarded desde Analysis ni Planning, y pueden seguir solo como `I` incluso en Solutioning. Su protagonismo real empieza en **Implementation**, que es donde pasan a ejecutar, revisar y validar.

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

BMAD funciona bien para equipos porque convierte algo difuso en algo gobernable: quién decide, quién ejecuta, qué artefacto alimenta al siguiente, y cómo se reabsorbe el feedback sin romper el hilo del proyecto.

Si tuviera que resumirlo en una sola frase, sería esta:

> BMAD no acelera porque elimine pasos; acelera porque da contexto, orden y ownership a pasos que ya deberían existir.