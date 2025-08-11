---
title: "Interfaces TypeScript para APIs y UI: Construyendo Aplicaciones Frontend Type-Safe"
date: "2025-06-24"
description: "Aprende cómo crear interfaces TypeScript robustas para diferentes fuentes de datos en tu aplicación frontend, asegurando type safety a través de sistemas CMS, Commerce, PIM y Search."
tags: ["typescript", "interfaces", "frontend", "api", "type-safety", "architecture"]
image: "https://miro.medium.com/v2/resize:fit:1024/1*ud0sEpluCXzmf9Jr7x37UA.png"
---

# Interfaces TypeScript para APIs y UI: Construyendo Aplicaciones Frontend Type-Safe

Al construir aplicaciones frontend modernas, a menudo necesitas integrar datos de múltiples fuentes—Sistemas de Gestión de Contenido (CMS), plataformas de Commerce, sistemas de Gestión de Información de Productos (PIM), y servicios de Search. Cada sistema tiene su propia estructura de datos, y mantener type safety a través de estas diferentes fuentes es crucial para construir aplicaciones confiables.

En esta guía, exploraremos cómo crear interfaces TypeScript que proporcionen tipado fuerte para tus APIs y componentes UI, usando una página de detalle de producto como nuestro ejemplo práctico.

## El Desafío: Múltiples Fuentes de Datos, Una UI

Considera construir una página de detalle de producto que necesita mostrar información de varios sistemas:

- **CMS**: Contenido de marketing, descripciones, y datos editoriales
- **Commerce**: Precios, inventario, e información relacionada con compras
- **PIM**: Especificaciones técnicas, atributos, y jerarquía de productos
- **Search**: Datos indexados optimizados para descubrimiento y filtrado

Cada sistema sirve un propósito específico y estructura los datos de manera diferente. Sin interfaces TypeScript apropiadas, enfrentarás:

- Errores de tiempo de ejecución de estructuras de datos inesperadas
- Depuración difícil cuando las formas de datos cambian
- Pobre experiencia de desarrollador sin autocompletado
- Código frágil que se rompe con cambios de API

## Creando Interfaces Específicas del Sistema

Comencemos definiendo interfaces para cada fuente de datos. La clave es usar prefijos descriptivos que indiquen claramente el origen de los datos.

### Interface de Producto CMS

```ts
// interfaces/cms.ts
interface CmsProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: CmsImage;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  publishedAt: string;
}

interface CmsImage {
  url: string;
  alt: string;
}
```

### Interface de Producto Commerce

```ts
// interfaces/commerce.ts
interface CommerceProduct {
  id: string;
  sku: string;
  price: {
    amount: number;
    currency: string;
    compareAtPrice?: number;
  };
  inventory: {
    quantity: number;
    inStock: boolean;
  };
  variants?: CommerceVariant[];
}

interface CommerceVariant {
  id: string;
  sku: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  attributes: Record<string, string>;
}
```

### Interface de Producto PIM

```ts
// interfaces/pim.ts
interface PimProduct {
  id: string;
  gtin: string;
  brand: PimBrand;
  category: PimCategory;
  specifications: PimSpecification[];
}

interface PimBrand {
  id: string;
  name: string;
  logo?: string;
}

interface PimCategory {
  id: string;
  name: string;
  path: string[];
}

interface PimSpecification {
  name: string;
  value: string | number;
  unit?: string;
}
```

### Interface de Producto Search

```ts
// interfaces/search.ts
interface SearchProduct {
  id: string;
  title: string;
  description: string;
  boost: number;
  popularity: {
    views: number;
    score: number;
  };
  tags: string[];
}
```

## Componiendo Interfaces para Componentes UI

Ahora que tenemos interfaces específicas del sistema, necesitamos crear interfaces enfocadas en UI que sean completamente independientes de las interfaces de servicio. La UI debe definir sus propios contratos de datos basados en lo que necesita mostrar, no en lo que los servicios proporcionan.

### Interface Principal de Producto para UI

La interface más importante es la interface principal `Product` que tus componentes UI usarán. Esta interface está diseñada puramente para necesidades UI y no tiene dependencia directa en interfaces de servicio:

```ts
// interfaces/ui/product.ts
// Nota: No hay imports de interfaces de servicio - UI es independiente

// Interface principal Product usada a través de la UI
interface Product {