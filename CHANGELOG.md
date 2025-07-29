# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Your next feature here...

## [2.0.0] - 2025-07-29

### Added
- **CI/CD Pipeline**: Implemented a complete Continuous Integration and Continuous Deployment pipeline using GitHub Actions.
- **Automated Deployments**: The pipeline automatically builds, tests, and deploys the frontend and backend applications to Azure Container Apps on every merge to the `main` branch.
- **DevSecOps**: Integrated robust security scanning directly into the deployment workflow.
- **Dependency Scanning**: The pipeline now uses `npm audit` to check for vulnerabilities in Node.js packages.
- **Container Image Scanning**: Integrated `Trivy` to scan the final Docker images for OS and application-level vulnerabilities before deployment.
- **Monitoring Foundation**: Deployed resources to Azure include a Log Analytics Workspace for future observability configuration.

### Fixed
- Remediated a critical security vulnerability in the `form-data` package by updating the dependency.

## [1.0.0] - 2023-11-15
### Added
- Initial project setup.
- Basic frontend and backend services.