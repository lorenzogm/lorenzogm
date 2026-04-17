---
title: "BMAD UI: Una Interfaz Visual para el Desarrollo con IA"
date: "2026-04-17"
tag: AI, Tooling, Development
description: El método BMAD aporta estructura al desarrollo de software con IA, pero su complejidad puede ser una barrera. BMAD UI es una interfaz de código abierto que facilita aprender, ejecutar y monitorizar todo el flujo de trabajo.
image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80
author: Lorenzo GM
---

# BMAD UI: Una Interfaz Visual para el Desarrollo con IA

Los asistentes de código con IA mejoran cada mes, pero usarlos sin estructura lleva a resultados inconsistentes. Obtienes código que funciona hoy y se rompe mañana. Sin contexto compartido entre sesiones. Sin trazabilidad de decisiones. Sin un camino claro desde la idea hasta el producto desplegado.

El [método BMAD](https://docs.bmad-method.org/) (Build More Architect Dreams) resuelve esto proporcionando un framework para el desarrollo con IA con agentes especializados, flujos de trabajo guiados y gestión progresiva del contexto a través de cuatro fases: Análisis, Planificación, Diseño de Solución e Implementación.

¿El problema? El método en sí es complejo. Entender qué skill invocar, en qué orden, con qué agente, y cómo se conecta todo no es sencillo. Esa complejidad es exactamente lo que quería eliminar.

Así que construí [BMAD UI](https://bmad.lorenzogm.com/).

## Qué Hace el Método BMAD

Antes de explicar la interfaz, conviene entender lo que proporciona el método. BMAD estructura el desarrollo con IA en cuatro fases:

1. **Análisis** (opcional) — Lluvia de ideas, investigación de mercado, investigación de dominio y creación del brief de producto
2. **Planificación** — Definir requisitos a través de un PRD (Product Requirements Document) y diseño UX
3. **Diseño de Solución** — Crear la arquitectura técnica, dividir el trabajo en epics y stories, y ejecutar una revisión de preparación para implementación
4. **Implementación** — Planificación de sprint, seguido de un ciclo de creación de story, desarrollo y revisión de código por cada story

Cada fase produce artefactos (PRD, documento de arquitectura, archivos de epics, archivos de stories) que se convierten en contexto para la siguiente fase. Esta es la idea clave: los agentes de IA toman mejores decisiones cuando tienen un contexto estructurado y progresivo en lugar de empezar desde cero.

El método usa agentes especializados (PM, Arquitecto, Desarrollador, Diseñador UX, Analista) y skills (`bmad-create-prd`, `bmad-create-architecture`, `bmad-dev-story`, etc.) que invocas en tu IDE. Cada workflow se ejecuta en un chat nuevo para evitar limitaciones de la ventana de contexto.

## El Problema: La Complejidad como Barrera

El método BMAD es potente, pero tiene una curva de aprendizaje pronunciada:

- Hay **decenas de skills** en cuatro fases, cada uno con agentes y salidas específicas
- El **orden correcto importa** — no puedes crear stories antes de la arquitectura, y no puedes empezar la implementación sin la planificación de sprint
- La **gestión del contexto** es crítica — cada workflow necesita cargar los artefactos correctos de fases anteriores
- **No hay visibilidad** sobre qué se ha completado, qué está en curso o qué viene después
- Los **miembros no técnicos** del equipo que podrían beneficiarse de flujos de trabajo guiados con IA no tienen forma de participar sin aprender comandos de CLI

Para un desarrollador que ha leído toda la documentación, esto es manejable. Para un equipo, o para alguien intentando incorporarse, es una barrera significativa.

## Qué Proporciona BMAD UI

BMAD UI es una interfaz web que se sitúa sobre los archivos locales de tu proyecto BMAD. Lee los directorios `_bmad/` y `_bmad-output/` y presenta el estado completo del proyecto de forma visual.

### Visualización del Workflow

La vista principal del workflow muestra las cuatro fases con su estado. Puedes ver de un vistazo qué fases están completadas, cuáles están en curso y cuáles vienen después. Cada fase muestra sus workflows, los artefactos que producen y descripciones claras de lo que hace cada paso.

Este es el componente de aprendizaje. En lugar de leer documentación para entender el método, puedes explorar el workflow visualmente y entender qué requiere cada fase antes de empezar.

### Seguimiento de Sesiones

Cada vez que ejecutas un skill de BMAD a través del CLI, BMAD UI registra la sesión. Puedes ver:

- Qué skill se invocó
- Qué modelo de IA se usó
- Sobre qué story se estaba trabajando
- Marcas de tiempo de inicio y fin
- Estado de la sesión (en ejecución, completada, cancelada)

Esto te da un historial claro de todas las interacciones con IA dentro del proyecto.

### Panel de Analíticas

La sección de analíticas proporciona datos de uso basados en los logs del CLI:

- **Total de peticiones y tokens** consumidos en el proyecto
- **Estimaciones de coste** basadas en tu plan de Copilot
- **Uso de tokens por modelo** — ve qué modelos se están usando y cuánto
- **Tasas de cache hit** — BMAD aprovecha el cacheo de contexto intensivamente, y puedes ver la eficiencia
- **Sesiones por skill** — entiende dónde se concentra la mayor parte del esfuerzo de IA
- **Mapas de calor de actividad** — visualiza cuándo se está desarrollando
- **Peticiones por epic** — ve la distribución de coste y esfuerzo en tu backlog de producto

En el futuro, estas analíticas pueden extenderse con métricas como la tasa de éxito por skill (con qué frecuencia un skill completa sin intervención humana), comparación de modelos (qué modelos producen mejores resultados para qué tareas), y mucho más.

### Soporte de Ejecución

BMAD UI actualmente soporta la ejecución a través del CLI de Copilot. Cuando estás en un paso del workflow, la interfaz te muestra exactamente qué comando ejecutar y proporciona contexto sobre lo que hará el skill. Esto se puede extender para soportar también Cursor CLI y Claude CLI.

La idea es simple: en lugar de memorizar comandos y consultar documentación, la interfaz te dice qué hacer ahora y qué viene después.

## Cómo Funciona Técnicamente

BMAD UI lee tus archivos locales del proyecto BMAD — no hay base de datos. Los artefactos de planificación (PRD, arquitectura, epics, stories, estado del sprint) y los logs de sesiones se almacenan como archivos en tu repositorio.

Esto significa:

- **Sin dependencias externas** — todo se ejecuta localmente junto a tu proyecto
- **Controlado por versiones** — todos los artefactos están en git, igual que tu código
- **Sin acciones de escritura en la demo** — el [despliegue en producción](https://bmad.lorenzogm.com/) es de solo lectura para exploración; para usarlo con capacidades de escritura, lo vinculas a tu propio proyecto BMAD durante el desarrollo

## El Objetivo Mayor: Capacitar a Perfiles No Técnicos

Esto conecta directamente con algo que llevo tiempo explorando: capacitar a miembros no técnicos del equipo para trabajar con herramientas de código con IA. En un [artículo anterior](/article/enabling-non-technicals-vscode-github-copilot), describí cómo un diseñador construyó un prototipo completo usando GitHub Copilot en modo agente con solo una hora de incorporación.

BMAD UI lleva esto más lejos. El objetivo es proporcionar una **interfaz de chat guiada** que permita a perfiles no técnicos — product managers, diseñadores, analistas — participar en el desarrollo con IA sin necesidad de aprender comandos de CLI ni entender la cadena de herramientas subyacente.

Un product manager podría abrir BMAD UI, navegar a la fase de Planificación y crear un PRD a través de una conversación guiada. Un diseñador podría trabajar en las especificaciones de UX. La interfaz proporciona la estructura y el contexto; la IA hace el trabajo pesado.

## Pruébalo

- **Explora la demo**: [bmad.lorenzogm.com](https://bmad.lorenzogm.com/) — navega por el workflow, las sesiones y las analíticas de un proyecto real
- **Documentación del método BMAD**: [docs.bmad-method.org](https://docs.bmad-method.org/) — aprende el framework completo
- **Código fuente**: [github.com/lorenzogm/bmad-ui](https://github.com/lorenzogm/bmad-ui) — código abierto, contribuciones bienvenidas

Si estás construyendo con IA y buscas estructura más allá de "simplemente chatea con Copilot", el método BMAD merece tu tiempo. Y si el método te resulta abrumador, BMAD UI está aquí para hacerlo accesible.
