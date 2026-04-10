---
title: Cheatsheet de Servidores MCP
date: 2025-06-04
tag: MCP, Tooling
description: Guía completa y cheatsheet para configurar servidores del Model Context Protocol (MCP) en VS Code con ejemplos detallados de configuración
image: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RyV23VMOd1BpympBxpsvjg.png
author: Lorenzo GM
---

# Cheatsheet de Servidores MCP

*Fuente: [Descope - Guía MCP](https://www.descope.com/learn/post/mcp?ref=jeffreybowdoin.com)*

Este artículo sirve como un cheatsheet completo para configurar servidores del Model Context Protocol (MCP) en VS Code. Los servidores MCP extienden tu entorno de desarrollo con potentes integraciones para herramientas de diseño, gestión de proyectos, automatización de navegadores y más.

## Resumen de Servidores MCP Disponibles

### Servidores MCP Básicos
Utilidades de desarrollo esenciales que proporcionan funcionalidad central para la mayoría de proyectos.

| Servidor | Categoría | Descripción |
|--------|----------|-------------|
| **Fetch** | Utilidades de Desarrollo | Solicitudes HTTP y web scraping |
| **Filesystem** | Utilidades de Desarrollo | Operaciones del sistema de archivos para directorios específicos |
| **Git** | Utilidades de Desarrollo | Operaciones del repositorio Git y control de versiones |
| **Memory** | IA y Memoria | Memoria persistente y grafo de conocimiento |
| **Sequential Thinking** | IA y Memoria | Razonamiento avanzado y resolución de problemas |

### Servidores MCP Específicos
Integraciones especializadas para herramientas, plataformas y casos de uso particulares.

| Servidor | Categoría | Descripción |
|--------|----------|-------------|
| **Figma** | Diseño y Prototipado | Acceso a archivos, componentes y tokens de diseño de Figma |
| **Playwright** | Automatización de Navegadores | Capacidades de automatización y testing de navegadores |
| **Lighthouse** | Auditorías de Rendimiento | Auditorías de rendimiento y calidad web |
| **Atlassian** | Gestión de Proyectos | Integración con Jira y Confluence |
| **Firecrawl** | Utilidades de Desarrollo | Web scraping avanzado y extracción de contenido |
| **Terraform** | Infraestructura | Gestión de Infraestructura como Código |

> **Configuración Rápida**: Para un archivo de configuración listo para usar, consulta [.vscode/mcp.json](https://github.com/lorenzogm/lorenzogm/blob/main/.vscode/mcp.json).

## Beneficios de los Servidores MCP

- **Flujo de Trabajo Unificado**: Accede a todas las herramientas desde VS Code
- **Productividad Mejorada**: Reduce el cambio de contexto entre aplicaciones
- **Integración con IA**: Aprovecha las capacidades de IA en diferentes plataformas
- **API Consistente**: Interfaz estandarizada para todas las integraciones
- **Configuración Segura**: Almacenamiento cifrado de credenciales sensibles

## Resumen de Configuración

Todas las configuraciones de servidores MCP van en tu archivo `settings.json` de VS Code bajo la sección `mcp`. La configuración consta de dos partes principales:

1. **Inputs**: Variables reutilizables para claves API, URLs y otras credenciales
2. **Servers**: Configuraciones individuales de servidores MCP

## Configuración de Inputs Requeridos

Agrega estos inputs a tu `settings.json` para dar soporte a los distintos servidores MCP:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "FIRECRAWL_API_KEY",
        "description": "Clave API de Firecrawl - Clave API para el servicio de web scraping y extracción de contenido en firecrawl.dev",
        "password": true
      },
      {
        "type": "promptString",
        "id": "FIGMA_API_KEY",
        "description": "Clave API de Figma - Token de acceso personal de la configuración de tu cuenta de Figma para acceder a archivos y componentes de diseño",
        "password": true
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_API_KEY",
        "description": "Token API de Atlassian - Token de acceso personal para la integración con Jira y Confluence (crear en id.atlassian.com)",
        "password": true
      },
      {
        "type": "promptString",
        "id": "EMAIL",
        "description": "Dirección de correo electrónico usada para la autenticación de Atlassian y acceso a la API",
        "default": "tu.email@empresa.com",
        "password": false
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_URL",
        "description": "URL de la instancia de Atlassian - URL base del espacio de trabajo de Jira y Confluence de tu organización",
        "default": "https://tu-organizacion.atlassian.net",
        "password": false
      }
    ]
  }
}
```

## Configuración de Servidores MCP

### Diseño y Prototipado

#### Servidor MCP de Figma Developer
**Propósito**: Accede a archivos, componentes y tokens de diseño de Figma directamente desde tu entorno de desarrollo.

```json
"figma": {
  "command": "npx",
  "args": ["-y", "figma-developer-mcp", "--stdio"],
  "env": {
    "FIGMA_API_KEY": "${input:FIGMA_API_KEY}"
  }
}
```

**Requisitos de Configuración**:
1. Obtén tu clave API de Figma desde [Configuración de cuenta de Figma](https://www.figma.com/developers/api#access-tokens)
2. Genera un token de acceso personal
3. Agrégalo a tus inputs de VS Code cuando se te solicite

**Repositorio**: https://github.com/figma/figma-developer-mcp

---

### Automatización y Testing de Navegadores

#### Servidor MCP de Playwright
**Propósito**: Automatización de navegadores y capacidades de testing para desarrollo web.

```json
"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp@latest"]
}
```

**Requisitos de Configuración**:
- No se necesita configuración adicional
- Instala automáticamente el último paquete MCP de Playwright

**Repositorio**: https://github.com/microsoft/playwright

#### Servidor MCP de Lighthouse
**Propósito**: Auditorías de rendimiento y calidad web directamente desde tu entorno de desarrollo.

```json
"lighthouse": {
  "command": "npx",
  "args": ["lighthouse-mcp"]
}
```

**Requisitos de Configuración**:
- No se necesita configuración adicional
- Proporciona auditorías de rendimiento, accesibilidad, SEO y mejores prácticas

**Repositorio**: https://github.com/GoogleChrome/lighthouse

---

### Gestión de Proyectos

#### Servidor MCP de Atlassian
**Propósito**: Integración con Jira y Confluence para gestión de proyectos y documentación.

```json
"atlassian": {
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "-e", "CONFLUENCE_URL",
    "-e", "CONFLUENCE_USERNAME",
    "-e", "CONFLUENCE_API_TOKEN",
    "-e", "JIRA_URL",
    "-e", "JIRA_USERNAME",
    "-e", "JIRA_API_TOKEN",
    "ghcr.io/sooperset/mcp-atlassian:latest"
  ],
  "env": {
    "CONFLUENCE_URL": "${input:ATLASSIAN_URL}/wiki",
    "CONFLUENCE_USERNAME": "${input:EMAIL}",
    "CONFLUENCE_API_TOKEN": "${input:ATLASSIAN_API_KEY}",
    "JIRA_URL": "${input:ATLASSIAN_URL}",
    "JIRA_USERNAME": "${input:EMAIL}",
    "JIRA_API_TOKEN": "${input:ATLASSIAN_API_KEY}"
  }
}
```

**Requisitos de Configuración**:
1. Crea un token API en [id.atlassian.com](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Requiere que Docker esté instalado y en ejecución
3. Configura la URL de tu instancia de Atlassian

**Repositorio**: https://github.com/sooperset/mcp-atlassian

---

### Utilidades de Desarrollo

#### Servidor MCP de Fetch
**Propósito**: Capacidades de solicitudes HTTP para web scraping y llamadas a API.

```json
"fetch": {
  "command": "uvx",
  "args": ["mcp-server-fetch"]
}
```

**Requisitos de Configuración**:
- Requiere `uvx` (ejecutador de paquetes Python)
- Instalar con: `pip install uvx` o usar pipx

**Repositorio**: https://github.com/modelcontextprotocol/servers/tree/main/src/fetch

#### Servidor MCP de Firecrawl
**Propósito**: Servicio avanzado de web scraping y extracción de contenido con capacidades de rastreo inteligente.

```json
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp"],
  "env": {
    "FIRECRAWL_API_KEY": "${input:FIRECRAWL_API_KEY}"
  }
}
```

**Requisitos de Configuración**:
- Obtén tu clave API de Firecrawl en [firecrawl.dev](https://firecrawl.dev)
- Crea una cuenta y genera un token API
- Más avanzado que fetch básico con extracción inteligente de contenido

**Repositorio**: https://github.com/mendableai/firecrawl

#### Servidor MCP de Filesystem
**Propósito**: Operaciones y gestión del sistema de archivos para directorios específicos.

```json
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/ruta/a/tu/proyecto"
  ]
}
```

**Requisitos de Configuración**:
- Actualiza la ruta para que apunte a tu directorio de proyecto específico
- Proporciona acceso seguro al sistema de archivos dentro del directorio especificado

**Repositorio**: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem

#### Servidor MCP de Git
**Propósito**: Operaciones del repositorio Git e integración de control de versiones.

```json
"git": {
  "command": "uvx",
  "args": ["mcp-server-git"]
}
```

**Requisitos de Configuración**:
- Requiere `uvx` (ejecutador de paquetes Python)
- Funciona con cualquier repositorio Git en tu espacio de trabajo

**Repositorio**: https://github.com/modelcontextprotocol/servers/tree/main/src/git

---

### IA y Memoria

#### Servidor MCP de Memory
**Propósito**: Memoria persistente y capacidades de grafo de conocimiento para interacciones con IA.

```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}
```

**Requisitos de Configuración**:
- No se necesita configuración adicional
- Proporciona memoria persistente entre sesiones de IA

**Repositorio**: https://github.com/modelcontextprotocol/servers/tree/main/src/memory

#### Servidor MCP de Sequential Thinking
**Propósito**: Capacidades de razonamiento avanzado y resolución de problemas para tareas complejas.

```json
"sequentialthinking": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}
```

**Requisitos de Configuración**:
- No se necesita configuración adicional
- Mejora el razonamiento de la IA con procesos de pensamiento paso a paso

**Repositorio**: https://github.com/modelcontextprotocol/servers/tree/main/src/sequential-thinking

---

### Infraestructura

#### Servidor MCP de Terraform
**Propósito**: Gestión y operaciones de Infraestructura como Código.

```json
"terraform": {
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "hashicorp/terraform-mcp-server"
  ]
}
```

**Requisitos de Configuración**:
- Requiere que Docker esté instalado y en ejecución
- Proporciona operaciones y gestión de estado de Terraform

**Repositorio**: https://github.com/hashicorp/terraform-mcp-server

---

## Ejemplo de Configuración Completa

Aquí tienes un ejemplo completo de cómo debería verse tu `settings.json` con todos los servidores MCP configurados:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "FIRECRAWL_API_KEY",
        "description": "Clave API de Firecrawl - Clave API para el servicio de web scraping y extracción de contenido en firecrawl.dev",
        "password": true
      },
      {
        "type": "promptString",
        "id": "FIGMA_API_KEY",
        "description": "Clave API de Figma - Token de acceso personal de la configuración de tu cuenta de Figma para acceder a archivos y componentes de diseño",
        "password": true
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_API_KEY",
        "description": "Token API de Atlassian - Token de acceso personal para la integración con Jira y Confluence (crear en id.atlassian.com)",
        "password": true
      },
      {
        "type": "promptString",
        "id": "EMAIL",
        "description": "Dirección de correo electrónico usada para la autenticación de Atlassian y acceso a la API",
        "default": "tu.email@empresa.com",
        "password": false
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_URL",
        "description": "URL de la instancia de Atlassian - URL base del espacio de trabajo de Jira y Confluence de tu organización",
        "default": "https://tu-organizacion.atlassian.net",
        "password": false
      }
    ],
    "servers": {
      "figma": {
        "command": "npx",
        "args": ["-y", "figma-developer-mcp", "--stdio"],
        "env": {
          "FIGMA_API_KEY": "${input:FIGMA_API_KEY}"
        }
      },
      "playwright": {
        "command": "npx",
        "args": ["-y", "@playwright/mcp@latest"]
      },
      "lighthouse": {
        "command": "npx",
        "args": ["lighthouse-mcp"]
      },
      "atlassian": {
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "-e", "CONFLUENCE_URL",
          "-e", "CONFLUENCE_USERNAME",
          "-e", "CONFLUENCE_API_TOKEN",
          "-e", "JIRA_URL",
          "-e", "JIRA_USERNAME",
          "-e", "JIRA_API_TOKEN",
          "ghcr.io/sooperset/mcp-atlassian:latest"
        ],
        "env": {
          "CONFLUENCE_URL": "${input:ATLASSIAN_URL}/wiki",
          "CONFLUENCE_USERNAME": "${input:EMAIL}",
          "CONFLUENCE_API_TOKEN": "${input:ATLASSIAN_API_KEY}",
          "JIRA_URL": "${input:ATLASSIAN_URL}",
          "JIRA_USERNAME": "${input:EMAIL}",
          "JIRA_API_TOKEN": "${input:ATLASSIAN_API_KEY}"
        }
      },
      "fetch": {
        "command": "uvx",
        "args": ["mcp-server-fetch"]
      },
      "firecrawl": {
        "command": "npx",
        "args": ["-y", "firecrawl-mcp"],
        "env": {
          "FIRECRAWL_API_KEY": "${input:FIRECRAWL_API_KEY}"
        }
      },
      "filesystem": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "/ruta/a/tu/proyecto"
        ]
      },
      "git": {
        "command": "uvx",
        "args": ["mcp-server-git"]
      },
      "memory": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-memory"]
      },
      "sequentialthinking": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
      },
      "terraform": {
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "hashicorp/terraform-mcp-server"
        ]
      }
    }
  }
}
```

Esta configuración proporciona un potente entorno de desarrollo que integra herramientas de diseño, gestión de proyectos, automatización de navegadores, web scraping avanzado y gestión de infraestructura, todo dentro de VS Code.
