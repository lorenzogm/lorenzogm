---
title: Arquitectura Next.js - Separación API SDK + UI
date: 2025-06-04
tag: Next.js, Architecture, TypeScript
description: Un patrón de arquitectura limpia para separar la lógica API/SDK de los componentes UI usando interfaces TypeScript y adaptadores
image: https://www.0xkishan.com/_next/image?url=%2Fblogs%2Fnextjs%2Fhero.png&w=3840&q=75
---

# Arquitectura Next.js: Separación API SDK + UI

Un patrón de arquitectura limpia para separar la lógica API/SDK de los componentes UI usando interfaces TypeScript y adaptadores. Este enfoque ayuda a mantener una separación limpia de responsabilidades mientras asegura la seguridad de tipos en toda la aplicación.

## El Problema

En muchas aplicaciones Next.js, la lógica de obtención de datos y los componentes UI se acoplan estrechamente, haciendo difícil:

- Mantener estructuras de datos consistentes entre componentes
- Probar componentes de manera aislada
- Reutilizar lógica de negocio entre diferentes páginas
- Actualizar APIs sin romper el código UI

## La Solución: Arquitectura en Capas

Esta arquitectura introduce una separación clara entre tu capa de datos (API SDK) y capa de presentación (componentes UI), conectadas a través de interfaces TypeScript bien definidas.

## Estructura de Carpetas

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── articles/
│       └── page.tsx
│
├── api/              # Capa SDK - Datos y Lógica de Negocio
│   ├── apiSdk.ts     # Punto de entrada SDK centralizado
│   ├── articles.ts   # Datos y tipos de artículos
│   ├── home.ts       # Datos y tipos de página de inicio
│   └── layout.ts     # Datos de layout compartido y tipos
│
└── ui/               # Capa UI - Lógica de Presentación
    ├── elements/     # Componentes atómicos (Button, Text)
    ├── patterns/     # Patrones reutilizables
    ├── pages/        # Componentes específicos de página
    │   ├── home-page/
    │   └── article-detail-page/
    └── layout/       # Componentes de layout (Header, Footer)
```

## Patrón de Interfaces TypeScript

### Tipos de Capa API (Enfocados en Datos)
Define interfaces que coincidan con tu estructura de datos cruda y necesidades de lógica de negocio. Estos tipos deben reflejar la forma real de los datos que vienen de tus APIs o fuentes de datos.

### Tipos de Capa UI (Enfocados en Componentes)
Crea interfaces optimizadas para renderizado de componentes con datos procesados. Estos tipos deben estar adaptados a lo que tus componentes realmente necesitan para renderizar, no necesariamente coincidiendo con la estructura de datos cruda.

### Implementación del Patrón Adaptador
Transforma estructuras de datos API en formatos optimizados para UI usando funciones adaptadoras. Estas funciones actúan como un puente entre tus datos crudos y el formato que tus componentes UI esperan.

## Patrón SDK Centralizado

### Punto de Entrada SDK
Crea un objeto SDK único que organice todas las funciones de acceso a contenido por categoría. Este enfoque centralizado hace fácil administrar y mantener tus patrones de acceso a datos.

### Uso en Componentes
Importa el SDK y accede al contenido a través de métodos limpios y centralizados. Esto mantiene tus componentes enfocados en la presentación mientras delega las preocupaciones de datos a la capa SDK.

## Beneficios

**Seguridad de Tipos**: Cobertura completa de TypeScript desde API hasta UI asegura que los errores de tiempo de ejecución se capturen en tiempo de compilación.

**Responsabilidad Única**: La capa API maneja la obtención de datos y lógica de negocio, mientras que la capa UI se enfoca puramente en la presentación.

**Patrón Adaptador**: Transformación limpia de datos entre capas te permite optimizar estructuras de datos para las necesidades específicas de cada capa.

**Acceso Centralizado**: Todo el acceso a contenido va a través de una interfaz SDK única, haciendo fácil mockear para pruebas y mantener consistencia.

**Mantenible**: Fácil de actualizar APIs sin tocar código UI, y viceversa. Los cambios están aislados a sus capas respectivas.

**Testeable**: Los componentes pueden ser probados con datos mock fácilmente, y la lógica de negocio puede ser probada independientemente.

## Pasos de Implementación

### 1. Crear capa API
Comienza definiendo tus tipos de datos y funciones API con interfaces TypeScript apropiadas.

### 2. Construir SDK centralizado
Crea un punto de entrada único que exporte todos tus módulos API en una estructura organizada.

### 3. Diseñar interfaces UI
Define interfaces específicas de componentes que estén optimizadas para renderizado, no para almacenamiento de datos.

### 4. Implementar adaptadores
Crea funciones de transformación que conviertan datos API en formatos amigables para UI.

### 5. Usar SDK en componentes
Importa el SDK en tus páginas y componentes Next.js para acceso a datos limpio y seguro en tipos.

## Conclusión

Este patrón de arquitectura escala bien para aplicaciones complejas mientras mantiene una separación limpia de responsabilidades. Proporciona la flexibilidad para evolucionar tus capas API y UI independientemente mientras asegura la seguridad de tipos en toda tu aplicación.

La clave es pensar en tu capa API como un servicio que proporciona datos, y tu capa UI como un consumidor que presenta esos datos de la mejor manera posible para los usuarios.