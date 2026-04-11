---
title: "Construyendo un Modelo de Contenido Flexible en Contentful: Guía Completa"
slug: "contentful-content-model"
date: "2025-07-07"
tags: ["Contentful", "CMS"]
excerpt: "Aprende a diseñar un modelo de contenido modular y flexible en Contentful que soporte sitios web complejos manteniendo los tipos de contenido mínimos y escalables."
image: "https://images.ctfassets.net/fo9twyrwpveg/HgNQRXmn2a670TRvz8rPd/3eeefeed0bf70c11ad628e14aeb081e6/March_Launch_Press_Release_Newsroom_1800x945.png?fm=jpg&w=666&q=90"
---

# Construyendo un Modelo de Contenido Flexible en Contentful: Guía Completa

## Resumen

Esta guía proporciona una referencia completa para diseñar un modelo de contenido flexible en Contentful. El modelo de contenido sigue una arquitectura modular diseñada para composición flexible de páginas y soporte multiidioma, permitiéndote construir sitios web complejos manteniendo el número de tipos de contenido al mínimo.

## Ventajas y Desventajas

### ✅ Ventajas

- **Modelo de Contenido Muy Flexible**: La arquitectura modular permite combinaciones infinitas de diseños y presentaciones de contenido
- **Tipos de Contenido Mínimos**: Usa solo 10 tipos de contenido para soportar funcionalidad compleja de sitios web, funciona dentro del plan gratuito de Contentful (25 tipos de contenido) y deja mucho espacio para contenido personalizado. Incluso en Contentful Pro (50 tipos de contenido), tienes 40 tipos de contenido disponibles para necesidades específicas del proyecto
- **Orientado al Contenido (No a la UI)**: La estructura del contenido es independiente de la presentación, permitiendo múltiples implementaciones de UI
- **Preparado para E-commerce**: Soporta sitios web complejos incluyendo páginas de detalle de producto, páginas de listado de productos y áreas de contenido dinámico
- **Soporte Multiidioma**: Localización incorporada para sitios web internacionales
- **Optimizado para SEO**: Controles SEO completos tanto a nivel global como de página

### ❌ Desventajas

- **Falta de Validación en Secciones de Página**: Sin restricciones incorporadas sobre qué tipos de contenido pueden usarse en áreas específicas de la página, requiriendo prácticas cuidadosas de gestión de contenido
- **Curva de Aprendizaje**: La naturaleza flexible requiere que los editores de contenido comprendan las relaciones entre los diferentes tipos de contenido
- **Potencial de Inconsistencia**: Sin validación estricta, los editores de contenido pueden crear diseños de página inconsistentes

## Arquitectura del Modelo de Contenido

El modelo de contenido está organizado en tres categorías principales:

### 🏗️ **Tipos de Contenido Estructurales**
Tipos de contenido que definen la estructura general del sitio y la configuración:
- **Config** - Configuración del sitio y slugs de URL
- **Page** - Definiciones de páginas principales con áreas de contenido
- **Layout** - Componentes de diseño de todo el sitio

### 🎨 **Tipos de Contenido de Secciones de Página**
Tipos de contenido usados para componer diseños de página:
- **Content Section** - Diseños de contenido de dos columnas
- **Content List** - Listas de elementos de contenido con varias presentaciones UI
- **Video** - Secciones de contenido de video

### 📝 **Tipos de Contenido y Componentes**
Tipos de contenido para contenido real y componentes reutilizables:
- **Article** - Artículos de blog y contenido de noticias
- **Content Item** - Bloques de contenido reutilizables
- **Image** - Recursos de imagen con metadatos
- **Link** - Enlaces y elementos de navegación

## Funcionalidades Clave

### 🌐 **Soporte Multiidioma**
- Contenido localizado en inglés (en) y francés (fr)
- Slugs de URL localizados para diferentes mercados
- Navegación y contenido localizados

### 📱 **Sistema de Diseño Flexible**
- Composición modular de páginas usando áreas de contenido
- Múltiples opciones de presentación UI para listas de contenido
- Consideraciones de diseño responsive

### 🔍 **Optimización SEO**
- Metadatos SEO completos en páginas
- Soporte de URL canónica
- Controles NoIndex/NoFollow

---

# Definiciones de Tipos de Contenido

## 1. Tipo de Contenido Article

### Detalles del Tipo de Contenido
- **ID**: `article`
- **Nombre**: 📚 [Content] Article
- **Campo de Visualización**: `internalName`
- **Descripción**: Artículos de blog y contenido de noticias con texto enriquecido

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Validaciones | Tipos de Contenido Enlazados | Descripción |
|----------|------|-----------|----------|-------------|---------------------|-------------|
| `internalName` | Symbol | No | Sí | - | - | Identificador interno para gestión de contenido |
| `title` | Symbol | No | Sí | - | - | Titular/título del artículo |
| `slug` | Symbol | No | Sí | Único | - | Slug amigable para URL generado a partir del título |
| `date` | Date | No | Sí | - | - | Fecha de publicación del artículo |
| `image` | Entry Link | No | Sí | - | `image` | Imagen destacada del artículo |
| `body` | Rich Text | No | Sí | Marks habilitados: bold, italic, underline, code, superscript, subscript, strikethrough<br>Nodos habilitados: headings (1-6), lists, hr, blockquote, embedded entries/assets, tables, links | - | Contenido principal del artículo con formato de texto enriquecido |

---

## 2. Tipo de Contenido Config

### Detalles del Tipo de Contenido
- **ID**: `config`
- **Nombre**: ⚙️ Config
- **Campo de Visualización**: `internalName`
- **Descripción**: Configuración del sitio y enrutamiento de URL

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Valores por Defecto | Descripción |
|----------|------|-----------|----------|----------------|-------------|
| `internalName` | Symbol | No | Sí | - | Identificador interno para la entrada de configuración |
| `slugProductDetailPage` | Symbol | Sí | Sí | EN: "products"<br>FR: "produits" | Slug de URL para páginas de detalle de producto |
| `slugProductListingPage` | Symbol | Sí | Sí | EN: "categories"<br>FR: "categories" | Slug de URL para páginas de listado/categoría de productos |
| `slugArticleDetailPage` | Symbol | Sí | Sí | EN: "articles"<br>FR: "articles" | Slug de URL para páginas de detalle de artículos/blog |

---

## 3. Tipo de Contenido Content Item

### Detalles del Tipo de Contenido
- **ID**: `contentItem`
- **Nombre**: 📚 [Content] Content Item
- **Campo de Visualización**: `entryField`
- **Descripción**: Bloques de contenido reutilizables con texto enriquecido y medios

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Validaciones | Max Items | Tipos de Contenido Enlazados | Descripción |
|----------|------|-----------|----------|-------------|-----------|---------------------|-------------|
| `entryField` | Symbol | No | Sí | - | - | - | Identificador/slug único del elemento de contenido (usado como campo de visualización) |
| `title` | Symbol | No | Sí | - | - | - | Título/titular del bloque de contenido |
| `description` | Text | No | No | - | - | - | Breve descripción o resumen del contenido |
| `body` | Rich Text | No | No | Marks habilitados: bold, italic, underline, code, superscript, subscript, strikethrough<br>Nodos habilitados: headings (1-6), lists, hr, blockquote, embedded entries/assets, tables, links | - | - | Contenido principal con formato de texto enriquecido |
| `image` | Entry Link | No | No | - | - | `image` | Imagen destacada opcional del bloque de contenido |
| `links` | Array of Entry Links | No | No | - | 2 | `link` | Enlaces de llamada a la acción (máximo 2) |

---

## 4. Tipo de Contenido Content List

### Detalles del Tipo de Contenido
- **ID**: `contentList`
- **Nombre**: 💎 [Page Section] Content List
- **Campo de Visualización**: `internalName`
- **Descripción**: Listas de elementos de contenido con varias presentaciones UI

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Opciones/Valores | Tipos de Contenido Enlazados | Descripción |
|----------|------|-----------|----------|----------------|---------------------|-------------|
| `internalName` | Symbol | No | Sí | - | - | Identificador interno para gestión de contenido |
| `ui` | Symbol (Dropdown) | No | Sí | "3 Cards - Landscape"<br>"3 Cards - Square"<br>"4 Cards - Square"<br>"4 Cards - Landscape"<br>"Accordion"<br>"Carousel"<br>"Timeline" | - | Define la presentación visual de la lista de contenido |
| `title` | Symbol | No | No | - | - | Título de sección opcional mostrado sobre la lista de contenido |
| `description` | Text | No | No | - | - | Texto de descripción opcional mostrado debajo del título |
| `entries` | Symbol (Dropdown) | No | Sí | "Articles" - Extraer últimos artículos automáticamente<br>"Products" - Extraer últimos productos automáticamente<br>"Collections" - Extraer colecciones de productos automáticamente<br>"Custom" - Seleccionar entradas específicas manualmente | - | Determina si usar feeds de contenido automáticos o selección personalizada |
| `customEntries` | Array of Entry Links | No | No (Requerido cuando entries = "Custom") | - | `article`, `contentItem` | Entradas seleccionadas manualmente para mostrar (usado cuando entries = "Custom") |

---

## 5. Tipo de Contenido Content Section

### Detalles del Tipo de Contenido
- **ID**: `contentSection`
- **Nombre**: 💎 [Page Section] Content Section
- **Campo de Visualización**: `internalName`
- **Descripción**: Diseños de contenido de dos columnas con posicionamiento de imagen

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Opciones | Tipos de Contenido Enlazados | Descripción |
|----------|------|-----------|----------|---------|---------------------|-------------|
| `internalName` | Symbol | No | Sí | - | - | Identificador interno para gestión de contenido |
| `ui` | Symbol (Dropdown) | No | Sí | "Teaser - Image Fullwidth"<br>"Teaser - Image Right"<br>"Two Columns - Image Left"<br>"Two Columns - Image Right" | - | Define el diseño visual y el posicionamiento de la imagen |
| `entry` | Entry Link | No | No | - | `article`, `contentItem` | El contenido a mostrar en esta sección |

---

## 6. Tipo de Contenido Image

### Detalles del Tipo de Contenido
- **ID**: `image`
- **Nombre**: 🖼 [Element] Image
- **Campo de Visualización**: `internalName`
- **Descripción**: Recursos de imagen con metadatos y funciones de accesibilidad

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Validaciones | Descripción |
|----------|------|-----------|----------|-------------|-------------|
| `internalName` | Text | No | Sí | - | Identificador interno para gestión de contenido |
| `image` | Asset Link (Image) | No | Sí | Solo tipos mime de imagen | El archivo de imagen real |
| `alternativeText` | Symbol | Sí | Sí | - | Texto alternativo para accesibilidad y SEO (localizado) |
| `caption` | Symbol | No | No | - | Pie de foto o crédito opcional |

---

## 7. Tipo de Contenido Layout

### Detalles del Tipo de Contenido
- **ID**: `layout`
- **Nombre**: ⚙️ Layout
- **Campo de Visualización**: `internalName`
- **Descripción**: Componentes de diseño de todo el sitio (cabecera, pie de página, navegación)

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Descripción |
|----------|------|-----------|----------|-------------|
| `internalName` | Text | No | Sí | Identificador interno para la configuración del layout |
| `seoTitle` | Symbol | No | No | Etiqueta de título HTML global para páginas sin título SEO específico |
| `seoDescription` | Symbol | No | No | Meta descripción global para páginas sin descripción SEO específica |
| `seoKeywords` | Array of Symbols | No | No | Palabras clave globales para optimización SEO |
| `canonicalUrl` | Symbol | No | No | URL canónica base del sitio |

---

## 8. Tipo de Contenido Link

### Detalles del Tipo de Contenido
- **ID**: `link`
- **Nombre**: 🔗 [Element] Link
- **Campo de Visualización**: `internalName`
- **Descripción**: Enlaces y elementos de navegación para botones y CTAs

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Tipos de Contenido Enlazados | Descripción |
|----------|------|-----------|----------|---------------------|-------------|
| `internalName` | Symbol | No | Sí | - | Identificador interno para gestión de contenido |
| `text` | Symbol | No | Sí | - | Texto/etiqueta del enlace mostrado a los usuarios |
| `page` | Entry Link | No | No | `page` | Enlace a página interna (usar este O URL) |
| `url` | Symbol | No | No | - | URL externo (usar este O page) |

---

## 9. Tipo de Contenido Page

### Detalles del Tipo de Contenido
- **ID**: `page`
- **Nombre**: 📜 Page
- **Campo de Visualización**: `internalName`
- **Descripción**: Definiciones de páginas principales con áreas de contenido y SEO

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Validaciones | Max Items | Por Defecto | Tipos de Contenido Enlazados | Descripción |
|----------|------|-----------|----------|-------------|-----------|---------|---------------------|-------------|
| `internalName` | Text | No | Sí | - | - | - | - | Identificador interno para gestión de contenido |
| `path` | Symbol | No | Sí | Único | - | - | - | Ruta URL de la página (ej., "/", "/products", "/about") |
| `topContentArea` | Array of Entry Links | No | No | - | 10 | - | `contentList`, `contentSection`, `video` | Módulos de contenido mostrados en la sección superior de la página |
| `bottomContentArea` | Array of Entry Links | No | No | - | 8 | - | `contentList`, `contentSection`, `video` | Módulos de contenido mostrados en la sección inferior de la página |
| `seoTitle` | Symbol | No | Sí | - | - | - | - | Etiqueta de título HTML para motores de búsqueda y pestañas del navegador |
| `seoDescription` | Symbol | No | Sí | - | - | - | - | Meta descripción para motores de búsqueda |
| `seoKeywords` | Array of Symbols | No | No | - | - | - | - | Palabras clave para optimización SEO |
| `canonicalUrl` | Symbol | No | No | - | - | - | - | URL canónica para prevenir problemas de contenido duplicado |
| `noIndex` | Boolean | No | Sí | - | - | false | - | Previene la indexación de la página por motores de búsqueda cuando es true |
| `nofollow` | Boolean | No | Sí | - | - | false | - | Agrega directiva nofollow para prevenir la transferencia de equity de enlaces |

---

## 10. Tipo de Contenido Video

### Detalles del Tipo de Contenido
- **ID**: `video`
- **Nombre**: 💎 [Page Section] Video
- **Campo de Visualización**: `internalName`
- **Descripción**: Secciones de contenido de video para diseños de página

### Campos

| ID del Campo | Tipo | Localizado | Requerido | Validaciones | Descripción |
|----------|------|-----------|----------|-------------|-------------|
| `internalName` | Symbol | No | Sí | - | Identificador interno para gestión de contenido |
| `video` | Asset Link (Video) | No | Sí | Solo tipos mime de video | El archivo de video a mostrar |
| `caption` | Symbol | No | No | - | Pie o descripción opcional del video |

---

## Relaciones del Contenido

### Composición de Páginas
- **Page** → `topContentArea` & `bottomContentArea` → **Content Section**, **Content List**, **Video**
- **Content Section** → `entry` → **Article**, **Content Item**
- **Content List** → `customEntries` → **Article**, **Content Item**

### Medios y Navegación
- **Article** → `image` → **Image**
- **Content Item** → `image` → **Image**, `links` → **Link**
- **Link** → `page` → **Page**

### Configuración del Sitio
- **Config** - Contiene slugs de URL para enrutamiento
- **Layout** - Contiene configuraciones globales de SEO y layout

Este enfoque modular permite una composición flexible de contenido manteniendo una clara separación de responsabilidades entre elementos estructurales, secciones de contenido y elementos de contenido individuales.
