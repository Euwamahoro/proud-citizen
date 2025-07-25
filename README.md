# Proud Citizen 🇷🇼

[![Node.js CI](https://github.com/your-username/proud-citizen/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/proud-citizen/actions)
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
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)

**Frontend**  
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

**DevOps**  
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## 🚀 Local Development

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Euwamahoro/proud-citizen.git
   cd proud-citizen

### 🐳 Docker-Based Local Setup

This is the recommended way to run the project locally.

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