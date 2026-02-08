# 01-Blog-- "AuraWeb"

A modern, full-stack blog application designed for personal branding and sharing experiences. Built with a robust **Spring Boot** backend and a dynamic **Angular** frontend, this project demonstrates a complete web application architecture with authentication, content management, and social interactions.

## 🌟 Key Features

*   **User Authentication**: Secure login and registration using JWT (JSON Web Tokens) and Spring Security.
*   **Rich Content Creation**:
    *   Create and edit Blogs using a rich text editor (**ngx-markdown**).
    *   Markdown support for technical content.
    *   Image/Video uploads and management.
*   **Social Interactions**:
    *   **Follow System**: Follow other users to see their posts in your feed.
    *   **Explore**: Discover new users and content.
    *   **Likes & Comments** (Implied feature based on blog architecture).

*   **Security**:
    *   Role-based access control.
    *   Input validation and sanitization.
*   **Modern UI/UX**: Responsive design using **Bootsrap5** and **SCSS**.

## 🛠 Tech Stack

### Backend
*   **Framework**: [Spring Boot 4.0.2](https://spring.io/projects/spring-boot)
*   **Language**: Java 17
*   **Database**: PostgreSQL 15
*   **Security**: Spring Security, JWT (jjwt 0.11.5)
*   **ORM**: Spring Data JPA (Hibernate)
*   **Utilities**: Lombok

### Frontend
*   **Framework**: [Angular 20](https://angular.io/)
*   **CSS Framework**: Bootsrap5
*   **Styling**: SCSS
*   **Markdown**: ngx-markdown
*   **State Management**: RxJS

### Infrastructure
*   **Containerization**: Docker & Docker Compose


## ⚙️ Environment Configuration

To ensure the application runs correctly, you **must** create three separate `.env` files in the following locations. These files manage your database credentials, security keys, and API endpoints.

### 1. Root Directory
Create a `.env` file in the project root (`01blog/`):
```env
POSTGRES_USER=isayen
POSTGRES_PASSWORD=@1234
POSTGRES_DB=01BlogDb
POSTGRES_URL=jdbc:postgresql://localhost:5432/01BlogDb
SECRET_KEY=NcV5R21p8sJQ2b5RfXH3Lxzl8cgaG9E1iN9V4vtCOwk=
```
### 2. backend Directory
```env
POSTGRES_USER=isayen
POSTGRES_PASSWORD=@1234
POSTGRES_DB=01BlogDb
POSTGRES_URL=jdbc:postgresql://localhost:5432/01BlogDb
SECRET_KEY=NcV5R21p8sJQ2b5RfXH3Lxzl8cgaG9E1iN9V4vtCOwk=
CLOUDINARY_URL=cloudinary://996837543846933:Hi4f_4Q46W3536vF4q52FrW7tRo@dyhvb6vto
```

### 3. frontend Directory
```env
export NG_APP_BACKENDURL=http://localhost:8080/api
```

## 🚀 Getting Started

### Prerequisites
*   **Docker** and **Docker Compose** (Recommended for easiest setup)
*   *Alternatively for manual setup*:
    *   PostgreSQL


### Option 1: Quick Start with Docker (Recommended)

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd 01blog
    ```

2.  **Run with Docker Compose**:
    This command will build both the backend and frontend images, and start the PostgreSQL database.
    ```bash
    docker-compose up --build
    ```

3.  **Access the Application**:
    *   Frontend: `http://localhost:4200`
    *   Backend API: `http://localhost:8080`

### Option 2: Manual Setup

#### 1. Database Setup
Ensure you have a PostgreSQL instance running. Create a database and user matching the configuration (or update `src/main/resources/application.properties`):
*   **Database**: `01BlogDb`
*   **Username**: `isayen`
*   **Password**: `@1234`

#### 2. Backend Setup
Navigate to the backend directory and run the application:
```bash
cd backend
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:8080`.

#### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm intall -g @angular/cli
ng serve
```
The application will be available at `http://localhost:4200`.

## 📂 Project Structure

```
01blog/
├── backend/            # Spring Boot application source code
├── frontend/           # Angular application source code
├── docker-compose.yml  # Docker orchestration configuration
└── README.md           # Project documentation
```

## 🔐 Credentials (Dev Environment)

If you are running the seeded database (via Docker), you can use the configured users or register a new one.
*   **Database**: `01BlogDb`
*   **Username**: `isayen`
*   **Password**: `@1234`

Or if you don't have Docker on your Machine You can use a distant database on acceding to this path `src/main/resources/application.properties`:

```bash
# spring.datasource.url=${POSTGRES_URL}
# spring.datasource.username=${POSTGRES_USER}
# spring.datasource.password=${POSTGRES_PASSWORD}

spring.datasource.url=jdbc:postgresql://ep-steep-leaf-a4vkzbms-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
spring.datasource.username=neondb_owner
spring.datasource.password=npg_ASBnq32uURcs
```
