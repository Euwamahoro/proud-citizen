# 1. Create a Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "${var.project_name}-rg"
  location = var.location
  tags = {
    Environment = "Production"
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

# 2. Create Azure Container Registry (ACR)
resource "azurerm_container_registry" "acr" {
  name                = "${replace(var.project_name, "-", "")}acr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
  tags                = azurerm_resource_group.rg.tags
}

# 3. Create Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "logs" {
  name                = "${var.project_name}-logs"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = azurerm_resource_group.rg.tags
}

# 4. Create Container Apps Environment
resource "azurerm_container_app_environment" "cae" {
  name                       = "${var.project_name}-cae"
  resource_group_name        = azurerm_resource_group.rg.name
  location                   = azurerm_resource_group.rg.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.logs.id
  tags                       = azurerm_resource_group.rg.tags
}

# 5. Backend Container App
resource "azurerm_container_app" "backend" {
  name                         = "${var.project_name}-backend-app"
  container_app_environment_id = azurerm_container_app_environment.cae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"
  tags                         = azurerm_resource_group.rg.tags

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password-secret"
  }

  template {
    container {
      name   = "backend-container"
      image  = "proudcitizenacr.azurecr.io/backend:1.0.1"
      cpu    = 1.0
      memory = "2Gi"

      env {
        name        = "MONGO_URI"
        secret_name = "mongo-uri-secret"
      }
      env {
        name        = "JWT_SECRET"
        secret_name = "jwt-secret-secret"
      }
      env {
        name  = "PORT"
        value = "5000"
      }

      liveness_probe {
        transport = "HTTP"
        port      = 5000
        path      = "/healthz"
        initial_delay = 30
        timeout     = 5
      }

       startup_probe {
        transport = "HTTP"
        path        = "/healthz"
        port        = 5000
      }
      readiness_probe {
        transport = "HTTP"
        port      = 5000
        path      = "/readyz"
        timeout     = 5
      }
    }

    min_replicas = 1
    max_replicas = 3
  }

  ingress {
    target_port      = 5000
    transport        = "http"
    external_enabled = true

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  secret {
    name  = "mongo-uri-secret"
    value = var.mongo_uri
  }

  secret {
    name  = "jwt-secret-secret"
    value = var.jwt_secret
  }

  secret {
    name  = "acr-password-secret"
    value = azurerm_container_registry.acr.admin_password
  }
}

# 6. Frontend Container App
resource "azurerm_container_app" "frontend" {
  name                         = "${var.project_name}-frontend-app"
  container_app_environment_id = azurerm_container_app_environment.cae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"
  tags                         = azurerm_resource_group.rg.tags

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password-secret"
  }

  template {
    container {
      name   = "frontend-container"
      image  = "proudcitizenacr.azurecr.io/frontend:1.0.0"
      cpu    = 0.25
      memory = "0.5Gi"

      liveness_probe {
        transport = "HTTP"
        port      = 80
        path      = "/"
      }
    }

    min_replicas = 1
    max_replicas = 3
  }

  ingress {
    target_port      = 80
    transport        = "http"
    external_enabled = true

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  secret {
    name  = "acr-password-secret"
    value = azurerm_container_registry.acr.admin_password
  }
}