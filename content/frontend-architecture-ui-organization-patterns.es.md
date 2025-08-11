---
title: "Organización UI en Monorepo: Eligiendo Entre Patrones de Colocalización y Workspace"
date: "2025-06-24"
description: "Navegando decisiones arquitectónicas en monorepos con múltiples workspaces: cuándo colocar componentes UI en tu aplicación web versus separarlos en librerías UI dedicadas."
tags: ["frontend", "architecture", "monorepo", "ui", "patterns", "storybook", "workspaces"]
image: "https://miro.medium.com/v2/resize:fit:1200/1*e_Aq_GnUvYTFhel0tDT_OQ.jpeg"
---

# Organización UI en Monorepo: Eligiendo Entre Patrones de Colocalización y Workspace

En un entorno de monorepo con múltiples workspaces—típicamente incluyendo una aplicación web, aplicación Storybook, y librería UI—organizar tus componentes UI se convierte en una decisión arquitectónica crítica. La elección entre diferentes patrones depende de la escala de tu proyecto, estructura del equipo, y objetivos a largo plazo. Exploremos dos enfoques principales y sus implicaciones.

## La Pregunta Fundamental

En un monorepo con workspaces separados para tu aplicación web, Storybook, y librería UI, hay múltiples maneras de estructurar tus componentes, y no hay un enfoque universalmente correcto o incorrecto. La clave es entender las compensaciones y elegir el patrón que mejor se ajuste a tu contexto específico y necesidades del equipo.

## Patrón 1: Componentes Colocalizados (Workspace de Aplicación Web)

Para aplicaciones más pequeñas, mantener bloques UI colocalizados con adaptadores directamente en el workspace de la aplicación web proporciona una excelente experiencia de desarrollador.

### Beneficios
- **Mejor Experiencia de Desarrollador**: Todo está en un workspace, haciendo más fácil navegar y entender
- **Desarrollo Más Rápido**: Menos capas de abstracción significan implementación más rápida
- **Modelo Mental Más Simple**: Los desarrolladores pueden ver el panorama completo sin saltar entre workspaces
- **Complejidad Reducida de Monorepo**: Menos dependencias inter-workspace que gestionar

### Consideraciones
- **Historias de Storybook**: En este patrón, crear historias de Storybook podría ser sobrecarga innecesaria
- **Pregunta de Valor de Negocio**: ¿Son las historias de Storybook un requisito del cliente? ¿Proporcionan valor tangible de negocio?
- **Reutilización Limitada**: Los componentes están vinculados a la aplicación web específica

## Patrón 2: Patrón de Workspace de Librería UI (Workspace UI Dedicado)

Para proyectos más grandes, especialmente aquellos con requisitos multi-marca o múltiples aplicaciones, separar toda la UI en su propio workspace dentro del monorepo puede ser beneficioso.

### Estructura de Monorepo
```
monorepo/
├── packages/
│   ├── web-app/           # Aplicación principal
│   ├── ui-library/        # Componentes UI compartidos
│   └── storybook/         # Documentación de componentes
```

### Capas de Arquitectura
1. **Page** (en el workspace web-app)
2. **Adapter** (en el workspace web-app)
3. **Block** (en el workspace ui-library)

### Beneficios
- **Mejor Escalabilidad**: Los componentes UI pueden ser compartidos entre múltiples aplicaciones dentro del monorepo
- **Separación Clara de Responsabilidades**: La librería UI permanece simple, aceptando props y exponiendo manejadores de eventos
- **Soporte Multi-marca**: Diferentes marcas pueden usar los mismos componentes UI con estilos diferentes
- **Integración con Storybook**: El workspace UI dedicado funciona sin problemas con el workspace Storybook
- **Gestión de Versiones**: La librería UI puede ser versionada independientemente

### Desafíos
- **Peor Experiencia de Desarrollador**: Más capas y complejidad de navegación entre workspaces
- **Tiempo de Desarrollo Aumentado**: Múltiples capas de abstracción ralentizan el desarrollo de características
- **Complejidad de Manejadores de Eventos**: Determinar dónde colocar manejadores de eventos se vuelve desafiante
- **Dependencias de Workspace**: Gestionar dependencias entre workspaces añade complejidad

## El Dilema del Manejador de Eventos

Uno de los aspectos más complejos del patrón de workspace de librería UI es determinar dónde deben vivir los manejadores de eventos en el monorepo:

- **Deben estar en el workspace web-app** (no en el workspace ui-library)
- **Nivel de Página vs. Nivel de Adaptador**: ¿Dónde exactamente deben ser colocados dentro de la aplicación web?
- **Problemas de Límite Servidor/Cliente**: Cuando necesitas componentes tanto de servidor como de cliente entre workspaces

### Estructura de Solución Potencial
```
web-app/
├── page.controller.ts (use server)
└── page.view.ts (use client)
```

Sin embargo, esto crea un nuevo problema: el `page.view.ts` del lado del cliente no puede llamar directamente adaptadores de bloques que usan código del lado del servidor, especialmente cuando esos bloques están en un workspace de librería UI separado.

## Tomando la Decisión Correcta

### Elige Patrón Colocalizado (Workspace de Aplicación Web) Cuando:
- Construyes una sola aplicación dentro del monorepo
- El equipo prefiere ciclos de desarrollo más rápidos
- No hay requisitos multi-marca o multi-app
- Storybook no es un requisito de negocio
- Quieres minimizar dependencias de workspace

### Elige Patrón de Workspace de Librería UI Cuando:
- Planeas construir múltiples aplicaciones en el monorepo
- La escalabilidad a largo plazo es una prioridad
- El compartir componentes UI entre diferentes apps es esencial
- El equipo puede manejar la complejidad aumentada de workspace
- La documentación de Storybook proporciona valor claro de negocio

## Consideraciones de Storybook en Monorepos

La presencia de un workspace dedicado de Storybook en tu monorepo plantea preguntas importantes:

- **¿Es Storybook un requisito del cliente?** Si no es obligatorio, evalúa su valor de negocio
- **Documentación vs. Driver de Desarrollo**: Storybook debe documentar tu UI, no dirigir tu arquitectura
- **Acoplamiento de Workspace**: Un workspace de librería UI se empareja naturalmente con Storybook para documentación de componentes

## Preguntas Clave a Hacer

Antes de decidir sobre un patrón arquitectónico para tu monorepo, considera estas preguntas:

1. **¿Tienes requisitos multi-marca?**
2. **¿Estás planeando múltiples apps que compartan componentes UI dentro del monorepo?**
3. **¿Es Storybook un requisito del cliente o necesidad de negocio?**
4. **¿Cuál es la tolerancia de tu equipo para complejidad de workspace vs. velocidad de desarrollo?**
5. **¿Qué tan importante es el versionado independiente de tus componentes UI?**
6. **¿Tienes las herramientas para gestionar dependencias inter-workspace efectivamente?**

## Conclusión

La elección entre componentes colocalizados en tu workspace de aplicación web y un workspace de librería UI dedicado no se trata de encontrar el enfoque "correcto"—se trata de encontrar el ajuste correcto para las necesidades específicas de tu monorepo. Considera la escala de tu proyecto, estructura del equipo, y objetivos a largo plazo al tomar esta decisión arquitectónica.

En entornos de monorepo, la presencia de múltiples workspaces (aplicación web, librería UI, Storybook) añade otra capa de complejidad a considerar. Mientras que un workspace de librería UI escala mejor y se empareja naturalmente con documentación de Storybook, también introduce dependencias de workspace y sobrecarga de desarrollo que puede no estar justificada para aplicaciones más simples.

Recuerda, Storybook debe ser tratado como documentación y no debe dirigir la arquitectura de tu aplicación principal a menos que proporcione valor claro de negocio o sea explícitamente requerido por tu cliente.

La clave es ser intencional sobre tu elección y entender las compensaciones que estás haciendo. Ambos patrones tienen su lugar en arquitecturas de monorepo, y la mejor decisión depende de tu contexto específico y restricciones.

---

*Créditos de imagen de portada: [Creating a Design System with Monorepo](https://medium.com/loftbr/creating-a-design-system-with-monorepo-bc18e055fb3c)*