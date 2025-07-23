# Output the login server name for the Azure Container Registry.
# We will need this to push our Docker images.
output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

# Output the public URL of the frontend application.
output "frontend_url" {
  value = azurerm_container_app.frontend.latest_revision_fqdn
}