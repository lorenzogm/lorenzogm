---
title: MCP Servers Cheatsheet
date: 2025-06-04
tag: Development Tools, Configuration
description: Complete guide and cheatsheet for setting up Model Context Protocol (MCP) servers in VS Code with detailed configuration examples
image: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RyV23VMOd1BpympBxpsvjg.png
author: Lorenzo GM
---

# MCP Servers Cheatsheet

*Source: [Descope - MCP Guide](https://www.descope.com/learn/post/mcp?ref=jeffreybowdoin.com)*

This article serves as a comprehensive cheatsheet for setting up Model Context Protocol (MCP) servers in VS Code. MCP servers extend your development environment with powerful integrations for design tools, project management, browser automation, and more.

## Summary of Available MCP Servers

| Server | Category | Description |
|--------|----------|-------------|
| **Figma** | Design & Prototyping | Access Figma files, components, and design tokens |
| **Playwright** | Browser Automation | Browser automation and testing capabilities |
| **Lighthouse** | Performance Audits | Web performance and quality audits |
| **Atlassian** | Project Management | Jira and Confluence integration |
| **Fetch** | Development Utilities | HTTP requests and web scraping |
| **Firecrawl** | Development Utilities | Advanced web scraping and content extraction |
| **Filesystem** | Development Utilities | File system operations for specific directories |
| **Git** | Development Utilities | Git repository operations and version control |
| **Memory** | AI & Memory | Persistent memory and knowledge graph |
| **Sequential Thinking** | AI & Memory | Advanced reasoning and problem-solving |
| **Terraform** | Infrastructure | Infrastructure as Code management |

## Benefits of MCP Servers

- **Unified Workflow**: Access all tools from within VS Code
- **Enhanced Productivity**: Reduce context switching between applications
- **AI Integration**: Leverage AI capabilities across different platforms
- **Consistent API**: Standardized interface for all integrations
- **Secure Configuration**: Encrypted storage of sensitive credentials

## Configuration Overview

All MCP server configurations go in your VS Code `settings.json` file under the `mcp` section. The configuration consists of two main parts:

1. **Inputs**: Reusable variables for API keys, URLs, and other credentials
2. **Servers**: Individual MCP server configurations

## Required Inputs Configuration

Add these inputs to your `settings.json` to support the various MCP servers:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "FIRECRAWL_API_KEY",
        "description": "Firecrawl API Key - API key for web scraping and content extraction service at firecrawl.dev",
        "password": true
      },
      {
        "type": "promptString",
        "id": "FIGMA_API_KEY",
        "description": "Figma API Key - Personal access token from Figma account settings for accessing design files and components",
        "password": true
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_API_KEY",
        "description": "Atlassian API Token - Personal access token for Jira and Confluence integration (create at id.atlassian.com)",
        "password": true
      },
      {
        "type": "promptString",
        "id": "EMAIL",
        "description": "Email address used for Atlassian authentication and API access",
        "default": "your.email@company.com",
        "password": false
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_URL",
        "description": "Atlassian instance URL - Base URL for your organization's Jira and Confluence workspace",
        "default": "https://your-organization.atlassian.net",
        "password": false
      }
    ]
  }
}
```

## MCP Servers Configuration

### Design & Prototyping

#### Figma Developer MCP Server
**Purpose**: Access Figma files, components, and design tokens directly from your development environment.

```json
"figma": {
  "command": "npx",
  "args": ["-y", "figma-developer-mcp", "--stdio"],
  "env": {
    "FIGMA_API_KEY": "${input:FIGMA_API_KEY}"
  }
}
```

**Setup Requirements**:
1. Get your Figma API key from [Figma Account Settings](https://www.figma.com/developers/api#access-tokens)
2. Generate a personal access token
3. Add it to your VS Code inputs when prompted

**Repository**: https://github.com/figma/figma-developer-mcp

---

### Browser Automation & Testing

#### Playwright MCP Server
**Purpose**: Browser automation and testing capabilities for web development.

```json
"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp@latest"]
}
```

**Setup Requirements**:
- No additional configuration needed
- Automatically installs latest Playwright MCP package

**Repository**: https://github.com/microsoft/playwright

#### Lighthouse MCP Server
**Purpose**: Web performance and quality audits directly from your development environment.

```json
"lighthouse": {
  "command": "npx",
  "args": ["lighthouse-mcp"]
}
```

**Setup Requirements**:
- No additional configuration needed
- Provides performance, accessibility, SEO, and best practices audits

**Repository**: https://github.com/GoogleChrome/lighthouse

---

### Project Management

#### Atlassian MCP Server
**Purpose**: Jira and Confluence integration for project management and documentation.

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

**Setup Requirements**:
1. Create API token at [id.atlassian.com](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Requires Docker to be installed and running
3. Configure your Atlassian instance URL

**Repository**: https://github.com/sooperset/mcp-atlassian

---

### Development Utilities

#### Fetch MCP Server
**Purpose**: HTTP request capabilities for web scraping and API calls.

```json
"fetch": {
  "command": "uvx",
  "args": ["mcp-server-fetch"]
}
```

**Setup Requirements**:
- Requires `uvx` (Python package runner)
- Install with: `pip install uvx` or use pipx

**Repository**: https://github.com/modelcontextprotocol/servers/tree/main/src/fetch

#### Firecrawl MCP Server
**Purpose**: Advanced web scraping and content extraction service with intelligent crawling capabilities.

```json
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp"],
  "env": {
    "FIRECRAWL_API_KEY": "${input:FIRECRAWL_API_KEY}"
  }
}
```

**Setup Requirements**:
- Get your Firecrawl API key from [firecrawl.dev](https://firecrawl.dev)
- Create an account and generate an API token
- More advanced than basic fetch with smart content extraction

**Repository**: https://github.com/mendableai/firecrawl

#### Filesystem MCP Server
**Purpose**: File system operations and management for specific directories.

```json
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/path/to/your/project"
  ]
}
```

**Setup Requirements**:
- Update the path to point to your specific project directory
- Provides secure file system access within the specified directory

**Repository**: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem

#### Git MCP Server
**Purpose**: Git repository operations and version control integration.

```json
"git": {
  "command": "uvx",
  "args": ["mcp-server-git"]
}
```

**Setup Requirements**:
- Requires `uvx` (Python package runner)
- Works with any Git repository in your workspace

**Repository**: https://github.com/modelcontextprotocol/servers/tree/main/src/git

---

### AI & Memory

#### Memory MCP Server
**Purpose**: Persistent memory and knowledge graph capabilities for AI interactions.

```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}
```

**Setup Requirements**:
- No additional configuration needed
- Provides persistent memory across AI sessions

**Repository**: https://github.com/modelcontextprotocol/servers/tree/main/src/memory

#### Sequential Thinking MCP Server
**Purpose**: Advanced reasoning and problem-solving capabilities for complex tasks.

```json
"sequentialthinking": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}
```

**Setup Requirements**:
- No additional configuration needed
- Enhances AI reasoning with step-by-step thinking processes

**Repository**: https://github.com/modelcontextprotocol/servers/tree/main/src/sequential-thinking

---

### Infrastructure

#### Terraform MCP Server
**Purpose**: Infrastructure as Code management and operations.

```json
"terraform": {
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "hashicorp/terraform-mcp-server"
  ]
}
```

**Setup Requirements**:
- Requires Docker to be installed and running
- Provides Terraform operations and state management

**Repository**: https://github.com/hashicorp/terraform-mcp-server

---

## Complete Configuration Example

Here's a complete example of how your `settings.json` should look with all MCP servers configured:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "FIRECRAWL_API_KEY",
        "description": "Firecrawl API Key - API key for web scraping and content extraction service at firecrawl.dev",
        "password": true
      },
      {
        "type": "promptString",
        "id": "FIGMA_API_KEY",
        "description": "Figma API Key - Personal access token from Figma account settings for accessing design files and components",
        "password": true
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_API_KEY",
        "description": "Atlassian API Token - Personal access token for Jira and Confluence integration (create at id.atlassian.com)",
        "password": true
      },
      {
        "type": "promptString",
        "id": "EMAIL",
        "description": "Email address used for Atlassian authentication and API access",
        "default": "your.email@company.com",
        "password": false
      },
      {
        "type": "promptString",
        "id": "ATLASSIAN_URL",
        "description": "Atlassian instance URL - Base URL for your organization's Jira and Confluence workspace",
        "default": "https://your-organization.atlassian.net",
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
          "/path/to/your/project"
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

This setup provides a powerful development environment that integrates design tools, project management, browser automation, advanced web scraping, and infrastructure management all within VS Code.
