---
title: "TypeScript Interfaces for APIs and UI: Building Type-Safe Frontend Applications"
date: "2025-06-24"
description: "Learn how to create robust TypeScript interfaces for different data sources in your frontend application, ensuring type safety across CMS, Commerce, PIM, and Search systems."
tags: ["typescript", "interfaces", "frontend", "api", "type-safety", "architecture"]
image: "https://miro.medium.com/v2/resize:fit:1024/1*ud0sEpluCXzmf9Jr7x37UA.png"
---

# TypeScript Interfaces for APIs and UI: Building Type-Safe Frontend Applications

When building modern frontend applications, you often need to integrate data from multiple sources—Content Management Systems (CMS), Commerce platforms, Product Information Management (PIM) systems, and Search services. Each system has its own data structure, and maintaining type safety across these different sources is crucial for building reliable applications.

In this guide, we'll explore how to create TypeScript interfaces that provide strong typing for your APIs and UI components, using a product detail page as our practical example.

## The Challenge: Multiple Data Sources, One UI

Consider building a product detail page that needs to display information from various systems:

- **CMS**: Marketing content, descriptions, and editorial data
- **Commerce**: Pricing, inventory, and purchase-related information
- **PIM**: Technical specifications, attributes, and product hierarchy
- **Search**: Indexed data optimized for discovery and filtering

Each system serves a specific purpose and structures data differently. Without proper TypeScript interfaces, you'll face:

- Runtime errors from unexpected data structures
- Difficult debugging when data shapes change
- Poor developer experience with no autocomplete
- Fragile code that breaks with API changes

## Creating System-Specific Interfaces

Let's start by defining interfaces for each data source. The key is to use descriptive prefixes that clearly indicate the data origin.

### CMS Product Interface

```typescript
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

### Commerce Product Interface

```typescript
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

### PIM Product Interface

```typescript
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

### Search Product Interface

```typescript
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

## Composing Interfaces for UI Components

Now that we have system-specific interfaces, we need to create UI-focused interfaces that are completely independent from the service interfaces. The UI should define its own data contracts based on what it needs to display, not on what the services provide.

### Core Product Interface for UI

The most important interface is the main `Product` interface that your UI components will use. This interface is designed purely for UI needs and has no direct dependency on service interfaces:

```typescript
// interfaces/ui/product.ts
// Note: No imports from service interfaces - UI is independent

// Main Product interface used throughout the UI
interface Product {
  // Core identifiers
  id: string;
  sku: string;
  slug: string;
  gtin?: string;
  
  // Basic information
  title: string;
  description: string;
  
  // Visual content
  image: ProductImage;
  
  // Pricing and commerce
  pricing: ProductPricing;
  availability: ProductAvailability;
  variants?: ProductVariant[];
  
  // Product information
  brand: ProductBrand;
  category: ProductCategory;
  specifications: ProductSpecification[];
  
  // SEO and metadata
  seo: ProductSeo;
  
  // Search metadata (optional)
  searchMetadata?: ProductSearchMetadata;
  
  // Timestamps
  publishedAt: string;
}

// Supporting interfaces for the unified Product
interface ProductImage {
  url: string;
  alt: string;
}

interface ProductPricing {
  current: {
    amount: number;
    currency: string;
  };
  original?: {
    amount: number;
    currency: string;
  };
  discount?: {
    percentage: number;
    amount: number;
  };
}

interface ProductAvailability {
  inStock: boolean;
  quantity: number;
}

interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  attributes: Record<string, string>;
  pricing: ProductPricing;
}

interface ProductBrand {
  id: string;
  name: string;
  logo?: string;
}

interface ProductCategory {
  id: string;
  name: string;
  path: string[];
}

interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

interface ProductSeo {
  metaTitle: string;
  metaDescription: string;
}

interface ProductSearchMetadata {
  boost: number;
  popularity: {
    views: number;
    score: number;
  };
  tags: string[];
}
```

### Product Detail Page Interface

For pages that need to work with data from multiple services, we use an adapter pattern to transform service data into UI-friendly interfaces:

```typescript
// interfaces/ui/product-detail.ts
import { Product } from './product';

// The page component only knows about UI interfaces
interface ProductDetailPageData {
  product: Product;
  relatedProducts?: Product[];
  recommendations?: Product[];
}
```

### The Adapter Pattern

The adapter layer is responsible for fetching data from multiple services and transforming it into the UI's expected format. This creates a clean separation between service contracts and UI contracts:

```typescript
// adapters/product-adapter.ts
import { CmsProduct } from '../interfaces/cms';
import { CommerceProduct } from '../interfaces/commerce';
import { PimProduct } from '../interfaces/pim';
import { SearchProduct } from '../interfaces/search';
import { Product } from '../interfaces/ui/product';

// Input interface for the adapter - this is where service types are used
interface ProductAdapterInput {
  cms: CmsProduct;
  commerce: CommerceProduct;
  pim: PimProduct;
  search?: SearchProduct;
}

// Adapter class that transforms service data to UI data
export class ProductAdapter {
  static toProduct(input: ProductAdapterInput): Product {
    const { cms, commerce, pim, search } = input;
    
    return {
      // Core identifiers
      id: cms.id,
      sku: commerce.sku,
      slug: cms.slug,
      gtin: pim.gtin,
      
      // Basic information
      title: cms.title,
      description: cms.description,
      
      // Visual content
      image: {
        url: cms.heroImage.url,
        alt: cms.heroImage.alt,
      },
      
      // Pricing and commerce
      pricing: {
        current: {
          amount: commerce.price.amount,
          currency: commerce.price.currency,
        },
        original: commerce.price.compareAtPrice ? {
          amount: commerce.price.compareAtPrice,
          currency: commerce.price.currency,
        } : undefined,
        discount: commerce.price.compareAtPrice ? {
          percentage: Math.round(((commerce.price.compareAtPrice - commerce.price.amount) / commerce.price.compareAtPrice) * 100),
          amount: commerce.price.compareAtPrice - commerce.price.amount,
        } : undefined,
      },
      
      availability: {
        inStock: commerce.inventory.inStock,
        quantity: commerce.inventory.quantity,
      },
      
      variants: commerce.variants?.map(variant => ({
        id: variant.id,
        sku: variant.sku,
        title: variant.title,
        attributes: variant.attributes,
        pricing: {
          current: {
            amount: variant.price.amount,
            currency: variant.price.currency,
          },
        },
      })),
      
      // Product information
      brand: {
        id: pim.brand.id,
        name: pim.brand.name,
        logo: pim.brand.logo,
      },
      
      category: {
        id: pim.category.id,
        name: pim.category.name,
        path: pim.category.path,
      },
      
      specifications: pim.specifications.map(spec => ({
        name: spec.name,
        value: String(spec.value) + (spec.unit ? ` ${spec.unit}` : ''),
        unit: spec.unit,
      })),
      
      // SEO and metadata
      seo: {
        metaTitle: cms.seo.metaTitle,
        metaDescription: cms.seo.metaDescription,
      },
      
      // Search metadata (if available)
      searchMetadata: search ? {
        boost: search.boost,
        popularity: search.popularity,
        tags: search.tags,
      } : undefined,
      
      // Timestamps
      publishedAt: cms.publishedAt,
    };
  }
  
  // Helper method for bulk transformation
  static toProducts(inputs: ProductAdapterInput[]): Product[] {
    return inputs.map(this.toProduct);
  }
}
```

### Benefits of the Adapter Pattern

This approach provides several key advantages:

#### 1. **Clean Separation of Concerns**
- UI interfaces are designed for optimal user experience
- Service interfaces reflect the actual API contracts
- Adapters handle the complexity of transformation

#### 2. **UI Independence**
- UI components never import service interfaces
- Changes to service APIs don't directly affect UI code
- UI can evolve independently of backend services

#### 3. **Testability**
- UI components can be tested with mock Product data
- Adapters can be tested independently
- Service integration can be tested separately

#### 4. **Maintainability**
- Clear boundaries between layers
- Easy to modify service integrations without touching UI
- Adapters centralize transformation logic

## Using Custom Prefixes for Your Services

The examples above use generic prefixes (`Cms`, `Commerce`, `Pim`, `Search`), but you should rename these to match your actual services. Here are some examples:

### Real-World Service Examples

```typescript
// For Contentful CMS
interface ContentfulProduct {
  // ... your Contentful-specific fields
}

// For Shopify Commerce
interface ShopifyProduct {
  // ... your Shopify-specific fields
}

// For Akeneo PIM
interface AkeneoProduct {
  // ... your Akeneo-specific fields
}

// For Algolia Search
interface AlgoliaProduct {
  // ... your Algolia-specific fields
}

// For custom services
interface InventoryServiceProduct {
  // ... your inventory service fields
}

interface RecommendationServiceProduct {
  // ... your recommendation service fields
}
```

## Best Practices for Interface Design

### 1. Use Descriptive Naming

```typescript
// Good: Clear service prefix
interface StripePayment {
  // ...
}

// Bad: Generic naming
interface Payment {
  // ...
}
```

### 2. Keep Interfaces Focused

Each interface should represent data from a single source and serve a specific purpose.

```typescript
// Good: Single responsibility
interface HubspotContact {
  email: string;
  firstName: string;
  lastName: string;
  // ... only HubSpot-specific fields
}

// Bad: Mixed concerns
interface ContactWithPricing {
  email: string;
  firstName: string;
  price: number; // This belongs in a different interface
}
```

### 3. Use Optional Properties Wisely

```typescript
interface SalesforceAccount {
  id: string;
  name: string;
  industry?: string; // Optional in Salesforce
  website?: string;  // May not always be provided
}
```

### 4. Leverage Union Types for Enums

```typescript
interface ZendeskTicket {
  status: 'new' | 'open' | 'pending' | 'solved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
}
```

## Conclusion

Creating well-structured TypeScript interfaces for your APIs and UI components is essential for building maintainable and reliable frontend applications. By following these patterns:

1. **Use descriptive prefixes** that clearly indicate the data source (CmsProduct, CommerceProduct, etc.)
2. **Keep service interfaces focused** on single responsibilities and specific data sources
3. **Create independent UI interfaces** that are designed for optimal user experience
4. **Use the adapter pattern** to transform service data into UI-friendly formats
5. **Maintain clear separation** between service contracts and UI contracts
6. **Write comprehensive tests** for both adapters and UI components

### Key Benefits of This Approach

- **Type Safety**: Catch errors at compile time rather than runtime
- **Developer Experience**: Excellent autocomplete and IntelliSense support
- **Maintainability**: Clear separation between service data and UI data
- **Scalability**: Easy to add new services or modify existing ones without affecting UI
- **UI Independence**: UI components remain unaware of backend service changes
- **Testing**: Clean boundaries enable isolated testing of each layer

### The Power of the Adapter Pattern

The most important aspect of this approach is using adapters to bridge service interfaces and UI interfaces:

- **Abstracts service complexity** from your UI components completely
- **Provides a stable UI contract** that doesn't change when service APIs evolve
- **Enables independent evolution** of UI and backend services
- **Centralizes transformation logic** in dedicated adapter classes
- **Facilitates testing** with clear boundaries between layers

Remember to adapt the interface names and structures to match your specific services and requirements. The key is consistency and clarity in your naming conventions and maintaining strict separation between service contracts and UI contracts. Whether you're working with Contentful and Shopify, or custom internal services, the pattern remains the same: service-specific interfaces for data fetching, adapters for transformation, and UI-specific interfaces for optimal user experience.
