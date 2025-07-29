resource "azurerm_application_insights" "proudcitizen" {
  name                = "proudcitizen-insights"
  location            = azurerm_resource_group.proudcitizen.location
  resource_group_name = azurerm_resource_group.proudcitizen.name
  application_type    = "web"
}

resource "azurerm_monitor_action_group" "proudcitizen_alerts" {
  name                = "ProudCitizenAlerts"
  resource_group_name = azurerm_resource_group.proudcitizen.name
  short_name          = "proudalert"

  email_receiver {
    name          = "admin-email"
    email_address = "e.uwamahoro@alustudent.com"
  }
}

resource "azurerm_monitor_metric_alert" "frontend_5xx_errors" {
  name                = "frontend-5xx-errors"
  resource_group_name = azurerm_resource_group.proudcitizen.name
  scopes             = [azurerm_container_app.frontend.id]
  description        = "Alert when 5xx errors exceed threshold"

  criteria {
    metric_namespace = "Microsoft.App/containerApps"
    metric_name      = "Http5xx"
    aggregation      = "Total"
    operator         = "GreaterThan"
    threshold        = 5
    time_aggregation = "PT5M"
  }

  action {
    action_group_id = azurerm_monitor_action_group.proudcitizen_alerts.id
  }
}