variable "location" {
  type        = string
  description = "The Azure region to deploy resources"
  default     = "eastus" # Lowercase for consistency with Azure's naming
}

variable "project_name" {
  type        = string
  description = "Unique name prefix for resources"
  default     = "proudcitizen"
  validation {
    condition     = length(var.project_name) <= 24
    error_message = "Project name must be 24 characters or less for Azure naming compatibility."
  }
}

variable "mongo_uri" {
  type        = string
  description = "MongoDB Atlas connection URI"
  sensitive   = true
}

variable "jwt_secret" {
  type        = string
  description = "Secret key for JWT signing (min 32 chars)"
  sensitive   = true
  validation {
    condition     = length(var.jwt_secret) >= 32
    error_message = "JWT secret must be at least 32 characters."
  }
}