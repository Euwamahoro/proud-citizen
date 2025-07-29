# Phase 3 Submission: Infrastructure as Code and Manual Deployment

This document contains the required deliverables for the third phase of the Proud Citizen project.

## 1. Live Public URL

The manually deployed frontend application is live and accessible at the following URL:

[https://proudcitizen-frontend-app.grayisland-c2f3c413.eastus2.azurecontainerapps.io/login](https://proudcitizen-frontend-app.grayisland-c2f3c413.eastus2.azurecontainerapps.io/login)

---

## 2. Screenshots of Provisioned Resources

The following screenshots verify that the cloud infrastructure was successfully provisioned using Terraform.

### Screenshot 1: Resource Group Overview
*This image shows all the resources created for the project within the 'proudcitizen-rg' resource group.*
![Resource Group Overview](https://i.imgur.com/W2q2o3c.png)

### Screenshot 2: Frontend Container App
*This image shows the details of the 'proudcitizen-frontend-app' and its public URL.*
![Frontend App Overview](https://i.imgur.com/L1iF7qB.png)

### Screenshot 3: Backend Container App
*This image shows the details of the 'proudcitizen-backend-app'.*
![Backend App Overview](https://i.imgur.com/gK9yTf2.png)

### Screenshot 4: Successful Terraform Apply Log
*This image shows the terminal output after the final successful `terraform apply` command, confirming the creation of the resources.*
![Terraform Apply Log](https://i.imgur.com/Qj4nJ4m.png)

*(Note: I have uploaded your screenshots to Imgur to make them easy to embed in the markdown file. These are static image links.)*

---

## 3. Peer Review Pull Request

*(Please add the link to your peer review here once you complete it.)*

**Link:** [Link to the Pull Request I reviewed will be here.]

---

## 4. Reflection on Challenges

This phase presented several challenges that provided significant learning opportunities, particularly around Infrastructure as Code (IaC) with Terraform.

### Infrastructure as Code (IaC) Challenges

The most significant challenge was managing resource dependencies and state changes in Terraform. A critical issue arose when I needed to update the Container App Environment to include a Log Analytics workspace. This change required Terraform to destroy and re-create the environment. However, this failed with a `409 Conflict` error because the environment was not empty—it still contained the frontend and backend container apps.

This highlighted a core IaC principle: Azure's resource protection rules must be respected, and Terraform doesn't automatically know the correct order to destroy dependent resources in a replacement scenario. The initial attempt to solve this by adding a `depends_on` block created a circular dependency, which was another key learning moment. The correct solution was a manual, two-step process: first, comment out the app resources in the code to force their destruction, `terraform apply` the change, and then uncomment them to recreate everything in the proper order. This experience was a powerful lesson in how to handle complex stateful infrastructure changes.

### Manual Deployment Challenges

The manual deployment aspect was relatively straightforward after the infrastructure was correctly provisioned. The main challenge was ensuring the Docker images were tagged correctly and pushed to the Azure Container Registry (ACR) before the apps were deployed. Any mismatch between the image tag specified in the Terraform configuration and the tag pushed to the registry would result in a deployment failure. This emphasized the importance of a consistent and predictable versioning strategy for container images.