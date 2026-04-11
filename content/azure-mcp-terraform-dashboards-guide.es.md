---
title: "Creación de Dashboards de Monitorización en Azure con MCP y Terraform"
date: "2025-06-25"
description: "Aprende a crear dashboards de monitorización completos en Azure usando Infraestructura como Código con Terraform, potenciados por el Model Context Protocol (MCP) para acceso en tiempo real a la documentación del proveedor de Azure."
tags: ["Azure", "Terraform", "MCP"]
image: "https://www.digitalclassworld.com/blog/wp-content/uploads/2023/02/What-is-Terraform-.png"
---

# Creación de Dashboards de Monitorización en Azure con MCP y Terraform

## Resumen

Esta guía demuestra cómo crear dashboards de monitorización completos en Azure usando Infraestructura como Código (IaC) con Terraform, potenciados por el Model Context Protocol (MCP) para la documentación del proveedor de Azure. Recorreremos la construcción de una solución completa de monitorización de Container Apps con dashboards, alertas e integración con Log Analytics.

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Visión General de la Arquitectura](#visión-general-de-la-arquitectura)
3. [Configuración de MCP para Azure](#configuración-de-mcp-para-azure)
4. [Configuración del Dashboard con Terraform](#configuración-del-dashboard-con-terraform)
5. [Diseño de la Plantilla del Dashboard](#diseño-de-la-plantilla-del-dashboard)
6. [Componentes de Monitorización](#componentes-de-monitorización)
7. [Proceso de Despliegue](#proceso-de-despliegue)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Resolución de Problemas](#resolución-de-problemas)

## Requisitos Previos

- Suscripción de Azure con los permisos apropiados
- Terraform >= 1.4.0
- Azure CLI configurado
- VS Code con soporte para MCP
- Conocimiento de Azure Container Apps, Log Analytics y Azure Monitor

## Visión General de la Arquitectura

Nuestra infraestructura de monitorización consiste en:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Container App │────│  Log Analytics   │────│ Azure Monitor   │
│                 │    │   Workspace      │    │    Alertas      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                       │
         └────────────────────────┼───────────────────────┘
                                  │
                         ┌─────────────────┐
                         │ Azure Portal    │
                         │   Dashboard     │
                         └─────────────────┘
```

## Configuración de MCP para Azure

### 1. Configurar el Acceso a la Documentación del Proveedor de Azure

El Model Context Protocol (MCP) proporciona acceso en tiempo real a la documentación del proveedor de Azure, asegurando que usemos la sintaxis más reciente y las mejores prácticas.

```typescript
// Ejemplo de configuración MCP para el proveedor Azure de Terraform
const azureProviderMCP = {
  provider: "hashicorp/azurerm",
  version: "~> 4.0",
  namespace: "hashicorp",
  capabilities: ["resources", "data-sources", "guides"]
};
```

### 2. Beneficios Clave de MCP

- **Documentación en Tiempo Real**: Acceso a la sintaxis más reciente del proveedor de Azure
- **Descubrimiento de Recursos**: Encontrar métricas y propiedades disponibles
- **Compatibilidad de Versiones**: Asegurar versiones correctas del proveedor
- **Mejores Prácticas**: Obtener recomendaciones para la configuración de recursos

## Configuración del Dashboard con Terraform

### 1. Configuración del Proveedor

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}
```

### 2. Recurso Principal del Dashboard

```hcl
resource "azurerm_portal_dashboard" "container_app_monitoring" {
  name                = local.dashboard_name
  resource_group_name = local.resource_group_name
  location            = data.terraform_remote_state.base.outputs.location
  
  tags = merge(local.tags, {
    "hidden-title" = "Container App Monitoring - ${title(var.ENVIRONMENT)}"
    "monitoring"   = "enabled"
  })

  dashboard_properties = templatefile("${path.module}/dashboard.tpl", {
    container_app_id             = azurerm_container_app.main.id
    container_app_name           = azurerm_container_app.main.name
    log_analytics_workspace_id   = local.log_analytics_workspace_id
  })
}
```

### 3. Configuración de Variables

```hcl
variable "enable_monitoring_alerts" {
  description = "Habilitar alertas de monitorización para la container app"
  type        = bool
  default     = true
}

variable "cpu_threshold_nanocores" {
  description = "Umbral de CPU en nanocores para alertas"
  type        = number
  default     = 500000000  # 50% de 1 vCPU
}

variable "memory_threshold_bytes" {
  description = "Umbral de memoria en bytes para alertas"
  type        = number
  default     = 536870912  # 512MB
}
```

## Diseño de la Plantilla del Dashboard

### 1. Estructura de la Plantilla

Crear un archivo separado `dashboard.tpl` para facilitar el mantenimiento:

```json
{
  "lenses": {
    "0": {
      "order": 0,
      "parts": {
        "0": {
          "position": {
            "x": 0, "y": 0,
            "rowSpan": 4, "colSpan": 12
          },
          "metadata": {
            "type": "Extension/HubsExtension/PartType/MarkdownPart",
            "settings": {
              "content": {
                "settings": {
                  "content": "# 📊 Dashboard de Monitorización de Container App\n\n**Container App**: ${container_app_name}",
                  "title": "Monitorización de Container App"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### 2. Estrategia de Disposición

Nuestro dashboard usa una disposición estructurada:

1. **Panel de Cabecera** (rowSpan: 4) - Vista general y enlaces de navegación
2. **Métricas de Errores** (ancho completo) - Monitorización prioritaria
3. **Métricas de Rendimiento** (cuadrícula 2x2) - CPU, Memoria, Solicitudes, Réplicas

### 3. Integración de Navegación

```markdown
**Funcionalidades de Monitorización:**
- ❌ **Métricas de Errores** → 🔍 **[Ver Logs de Errores](https://portal.azure.com/#@${log_analytics_workspace_id}/blade/Microsoft_Azure_Monitoring_Logs/LogsBlade)**
- 📈 **Uso de CPU** - Métricas de rendimiento del procesador en tiempo real
- 💾 **Uso de Memoria** - Monitorización del consumo de RAM
- 🌐 **Tasa de Solicitudes** - Patrones de tráfico
- 🔄 **Conteo de Réplicas** - Comportamiento de auto-escalado
- ⚠️ **Alertas Automatizadas** → 🚨 **[Ver Alertas](https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/alerts)**
```

## Componentes de Monitorización

### 1. Alertas de Métricas

```hcl
resource "azurerm_monitor_metric_alert" "cpu_usage" {
  count               = var.enable_monitoring_alerts ? 1 : 0
  name                = "${azurerm_container_app.main.name}-cpu-usage-alert"
  resource_group_name = local.resource_group_name
  scopes              = [azurerm_container_app.main.id]
  description         = "Alerta cuando el uso de CPU es alto"
  severity            = 2
  frequency           = "PT5M"
  window_size         = "PT5M"
  enabled             = true
  auto_mitigate       = true

  criteria {
    metric_namespace = "Microsoft.App/containerApps"
    metric_name      = "UsageNanoCores"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = var.cpu_threshold_nanocores
  }
}
```

### 2. Alertas Basadas en Logs

```hcl
resource "azurerm_monitor_scheduled_query_rules_alert_v2" "application_errors" {
  count               = var.enable_monitoring_alerts ? 1 : 0
  name                = "${azurerm_container_app.main.name}-application-errors"
  resource_group_name = local.resource_group_name
  location            = data.terraform_remote_state.base.outputs.location

  evaluation_frequency = "PT5M"
  window_duration      = "PT10M"
  scopes               = [local.log_analytics_workspace_id]
  severity             = 1
  enabled              = true
  auto_mitigation_enabled = true

  criteria {
    query = <<-QUERY
      ContainerAppConsoleLogs_CL
      | where ContainerAppName_s == "${azurerm_container_app.main.name}"
      | where TimeGenerated > ago(10m)
      | where Log_s contains "ERROR" or Log_s contains "Exception"
      | summarize count()
    QUERY
    time_aggregation_method = "Count"
    threshold               = var.error_log_threshold
    operator                = "GreaterThan"
  }
}
```

### 3. Configuración de Diagnósticos

```hcl
resource "azurerm_monitor_diagnostic_setting" "container_app" {
  name                       = "${azurerm_container_app.main.name}-diagnostics"
  target_resource_id         = azurerm_container_app.main.id
  log_analytics_workspace_id = local.log_analytics_workspace_id

  enabled_metric {
    category = "AllMetrics"
  }
}
```

## Proceso de Despliegue

### 1. Configuración del Entorno

Crear configuración específica por entorno en `env.development.json`:

```json
{
  "enable_monitoring_alerts": true,
  "cpu_threshold_nanocores": 500000000,
  "memory_threshold_bytes": 536870912,
  "request_rate_threshold": 5000,
  "error_log_threshold": 1
}
```

### 2. Comandos de Despliegue

```bash
# Inicializar Terraform
terraform init

# Planificar el despliegue
terraform plan -var-file=env.development.json

# Aplicar los cambios
terraform apply -var-file=env.development.json
```

### 3. Verificación

Después del despliegue, verificar:
- El dashboard aparece en el Portal de Azure
- Todos los paneles muestran datos correctamente
- Los enlaces de navegación funcionan correctamente
- Las alertas están configuradas y activas
