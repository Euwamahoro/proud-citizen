
# Proud Citizen 🇷🇼

[![ProudCitizen CI/CD Pipeline](https://github.com/Euwamahoro/proud-citizen/actions/workflows/cd.yml/badge.svg)](https://github.com/Euwamahoro/proud-citizen/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A virtual platform connecting Rwandan youth with elders to preserve and share national history, cultural values, and future aspirations.

## 🌟 Features

- **User Authentication**: Secure signup/login for elders and youth
- **Discussion Hubs**: Join topic-based virtual communities
- **Intergenerational Chat**: Real-time messaging between generations
- **Virtual Workshops**: Scheduled video meetings with elders
- **Sponsorship System**: Support foundation activities (optional)

## 🛠️ Tech Stack

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)

**Frontend**  
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

**DevOps & Cloud**  
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)![Azure](https://img.shields.io/badge/Microsoft_Azure-0078D4?logo=microsoft-azure&logoColor=white)

## 🛡️ DevSecOps Integration

This project integrates security scanning directly into the CI/CD pipeline to ensure the application is secure before it reaches production. Our DevSecOps strategy includes two mandatory checks on every deployment:

1.  **Dependency Vulnerability Scanning**: The pipeline uses `npm audit --production` to scan the project's dependencies for known vulnerabilities. This prevents insecure third-party packages from being included in the build.
2.  **Container Image Security Scanning**: After the Docker images are built, the pipeline uses **Trivy** to scan them for vulnerabilities within the base image and application layers. The workflow is configured to fail (`--exit-code 1`) if any `CRITICAL` severity vulnerabilities are discovered, preventing a compromised container from being deployed.

**Remediation Example**: During the development of the CD pipeline, a critical vulnerability was detected by `npm audit` in the `form-data` package. The vulnerability was immediately remediated by running `npm audit fix`, and the updated `package-lock.json` was committed to the repository, resolving the issue and allowing the pipeline to proceed. This process demonstrates our commitment to actively identifying and fixing security flaws.

## 🚀 Local Development

There are two ways to run the project locally. The Docker-based setup is recommended for its consistency and ease of use.

### 🐳 Docker-Based Setup (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Running the Application
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Euwamahoro/proud-citizen.git
    cd proud-citizen
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the following, filling in your actual values:
    ```
    # Backend environment variables
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    PORT=5000
    ```

3.  **Build and Run with Docker Compose:**
    From the root directory, run:
    ```bash
    docker-compose up --build
    ```
    The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Manually with Node.js

#### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Git

#### Installation & Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Euwamahoro/proud-citizen.git
    cd proud-citizen
    ```
2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```
3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```
4.  **Set up Backend Environment:**
    In the `backend` directory, create a `.env` file with the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    PORT=5000
    ```
5.  **Run the Applications:**
    You will need two separate terminals.
    
    *In terminal 1 (from the `backend` directory):*
    ```bash
    npm start
    ```
    *In terminal 2 (from the `frontend` directory):*
    ```bash
    npm run dev
    ```