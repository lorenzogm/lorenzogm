---
title: "Building Azure Monitoring Dashboards with MCP and Terraform"
date: "2025-06-25"
description: "Learn how to create comprehensive Azure monitoring dashboards using Infrastructure as Code with Terraform, enhanced by the Model Context Protocol (MCP) for real-time Azure provider documentation access."
tags: ["azure", "terraform", "monitoring", "mcp", "infrastructure-as-code", "dashboards", "container-apps"]
image: "https://www.digitalclassworld.com/blog/wp-content/uploads/2023/02/What-is-Terraform-.png"
---

# Building Azure Monitoring Dashboards with MCP and Terraform

## Overview

This guide demonstrates how to create comprehensive Azure monitoring dashboards using Infrastructure as Code (IaC) with Terraform, enhanced by the Model Context Protocol (MCP) for Azure provider documentation. We'll walk through building a complete Container App monitoring solution with dashboards, alerts, and log analytics integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Setting Up MCP for Azure](#setting-up-mcp-for-azure)
4. [Terraform Dashboard Configuration](#terraform-dashboard-configuration)
5. [Dashboard Template Design](#dashboard-template-design)
6. [Monitoring Components](#monitoring-components)
7. [Deployment Process](#deployment-process)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

- Azure subscription with appropriate permissions
- Terraform >= 1.4.0
- Azure CLI configured
- VS Code with MCP support
- Understanding of Azure Container Apps, Log Analytics, and Azure Monitor

## Architecture Overview

Our monitoring infrastructure consists of:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Container App │────│  Log Analytics   │────│ Azure Monitor   │
│                 │    │   Workspace      │    │    Alerts       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                       │
         └────────────────────────┼───────────────────────┘
                                  │
                         ┌─────────────────┐
                         │ Azure Portal    │
                         │   Dashboard     │
                         └─────────────────┘
```

## Setting Up MCP for Azure

### 1. Configure Azure Provider Documentation Access

The Model Context Protocol (MCP) provides real-time access to Azure provider documentation, ensuring we use the latest syntax and best practices.

```typescript
// Example MCP configuration for Azure Terraform provider
const azureProviderMCP = {
  provider: "hashicorp/azurerm",
  version: "~> 4.0",
  namespace: "hashicorp",
  capabilities: ["resources", "data-sources", "guides"]
};
```

### 2. Key MCP Benefits

- **Real-time Documentation**: Access latest Azure provider syntax
- **Resource Discovery**: Find available metrics and properties
- **Version Compatibility**: Ensure correct provider versions
- **Best Practices**: Get recommendations for resource configuration

## Terraform Dashboard Configuration

### 1. Provider Setup

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

### 2. Core Dashboard Resource

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

### 3. Variables Configuration

```hcl
variable "enable_monitoring_alerts" {
  description = "Enable monitoring alerts for the container app"
  type        = bool
  default     = true
}

variable "cpu_threshold_nanocores" {
  description = "CPU threshold in nanocores for alerting"
  type        = number
  default     = 500000000  # 50% of 1 vCPU
}

variable "memory_threshold_bytes" {
  description = "Memory threshold in bytes for alerting"
  type        = number
  default     = 536870912  # 512MB
}
```

## Dashboard Template Design

### 1. Template Structure

Create a separate `dashboard.tpl` file for maintainability:

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
                  "content": "# 📊 Container App Monitoring Dashboard\n\n**Container App**: ${container_app_name}",
                  "title": "Container App Monitoring"
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

### 2. Layout Strategy

Our dashboard uses a structured layout:

1. **Header Panel** (rowSpan: 4) - Overview and navigation links
2. **Error Metrics** (full width) - Priority monitoring
3. **Performance Metrics** (2x2 grid) - CPU, Memory, Requests, Replicas

### 3. Navigation Integration

```markdown
**Monitoring Features:**
- ❌ **Error Metrics** → 🔍 **[View Error Logs](https://portal.azure.com/#@${log_analytics_workspace_id}/blade/Microsoft_Azure_Monitoring_Logs/LogsBlade)**
- 📈 **CPU Usage** - Real-time processor performance metrics
- 💾 **Memory Usage** - RAM consumption monitoring
- 🌐 **Request Rate** - Traffic patterns
- 🔄 **Replica Count** - Auto-scaling behavior
- ⚠️ **Automated Alerts** → 🚨 **[View Alerts](https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/alerts)**
```

## Monitoring Components

### 1. Metric Alerts

```hcl
resource "azurerm_monitor_metric_alert" "cpu_usage" {
  count               = var.enable_monitoring_alerts ? 1 : 0
  name                = "${azurerm_container_app.main.name}-cpu-usage-alert"
  resource_group_name = local.resource_group_name
  scopes              = [azurerm_container_app.main.id]
  description         = "Alert when CPU usage is high"
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

### 2. Log-Based Alerts

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

### 3. Diagnostic Settings

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

## Deployment Process

### 1. Environment Configuration

Create environment-specific configuration in `env.development.json`:

```json
{
  "enable_monitoring_alerts": true,
  "cpu_threshold_nanocores": 500000000,
  "memory_threshold_bytes": 536870912,
  "request_rate_threshold": 5000,
  "error_log_threshold": 1
}
```

### 2. Deployment Commands

```bash
# Initialize Terraform
terraform init

# Plan the deployment
terraform plan -var-file=env.development.json

# Apply the changes
terraform apply -var-file=env.development.json
```

### 3. Verification

After deployment, verify:
- Dashboard appears in Azure Portal
- All panels display data correctly
- Navigation links work properly
- Alerts are configured and active

## Best Practices

### 1. Template Organization

- **Separate Templates**: Use external `.tpl` files for complex dashboard JSON
- **Parameterization**: Use variables for all configurable values
- **Validation**: Include template validation in CI/CD pipeline

### 2. Monitoring Configuration

- **Environment-Specific Thresholds**: Different alerts for dev/staging/production
- **Auto-Mitigation**: Enable automatic alert resolution
- **Comprehensive Coverage**: Monitor both infrastructure and application metrics

### 3. Dashboard Design

- **Logical Layout**: Group related metrics together
- **Priority Placement**: Put critical metrics (errors) at the top
- **Navigation**: Include direct links to relevant Azure services
- **Documentation**: Provide KQL queries for manual investigation

### 4. Infrastructure as Code

- **Version Control**: All dashboard configurations in Git
- **Modular Design**: Reusable modules for different applications
- **State Management**: Proper Terraform state management
- **Documentation**: Comprehensive README and inline comments

## Troubleshooting

### Common Issues

1. **Dashboard Not Appearing**
   ```bash
   # Check resource group and tags
   az portal dashboard list --resource-group <rg-name>
   ```

2. **Links Not Working**
   - Verify URL format: `#@${workspace_id}/blade/...`
   - Check workspace ID format and permissions

3. **Metrics Not Displaying**
   - Verify diagnostic settings are enabled
   - Check Container App is generating metrics
   - Ensure Log Analytics workspace connection

4. **Provider Version Issues**
   - Use MCP to verify latest Azure provider syntax
   - Check for breaking changes in provider updates
   - Test with specific provider versions

### Debugging Commands

```bash
# Check Terraform plan
terraform plan -detailed-exitcode

# Validate template
terraform validate

# Check Azure resources
az container app show --name <app-name> --resource-group <rg-name>
az monitor log-analytics workspace show --resource-group <rg-name> --workspace-name <workspace-name>
```

## Conclusion

This approach combines the power of Infrastructure as Code with real-time Azure documentation access through MCP. Key benefits include:

- **Consistency**: Standardized monitoring across environments
- **Maintainability**: Version-controlled dashboard configurations
- **Scalability**: Reusable templates for multiple applications
- **Best Practices**: MCP ensures latest Azure provider features
- **Automation**: Integrated deployment pipeline

The result is a professional, maintainable monitoring solution that provides comprehensive observability for Azure Container Apps with minimal manual configuration.

## Additional Resources

- [Azure Provider Documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure Monitor Metrics](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported)
- [Container Apps Monitoring](https://docs.microsoft.com/en-us/azure/container-apps/monitor)
- [Terraform Azure Portal Dashboard](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/portal_dashboard)

---

*This guide demonstrates a production-ready Container App monitoring solution, showcasing enterprise-level monitoring with Infrastructure as Code best practices.*
