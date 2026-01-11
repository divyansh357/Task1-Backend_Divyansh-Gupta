# User Management API System

## Project Overview
This is a backend project for a **User Management System** built with **Node.js, Express, and PostgreSQL**. It is designed to demonstrate core backend concepts including CRUD operations, authentication, database integration, and API architecture.

## Tech Stack
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** PostgreSQL (using `pg` library)
*   **Authentication:** JWT (JSON Web Tokens) *[Pending]*
*   **Security:** Password Hashing (Bcrypt) *[Pending]*

## Project Structure
```
user-management-api/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request logic (validation, using models)
│   ├── models/         # Database queries and data structure
│   ├── routes/         # API Route definitions
│   └── server.js       # App entry point
├── package.json        # Dependencies and scripts
└── .env                # Environment variables (not committed)
```

## Setup Instructions

1.  **Clone the repository**
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    DB_USER=your_postgres_user
    DB_HOST=localhost
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret_key
    ```
4.  **Database Setup**
    Ensure you have PostgreSQL installed and run the following SQL to create the users table:
    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```
5.  **Run the Server**
    ```bash
    # For development (using nodemon)
    npm run dev
    # OR standard start
    node src/server.js
    ```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | 🚧 Partially Implemented |
| `POST` | `/api/auth/login` | Login user & return JWT | ⏳ Pending |

### User Management (Protected Routes)
| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Get all users (with pagination) | ⏳ Pending |
| `GET` | `/api/users/:id` | Get single user profile | ⏳ Pending |
| `PUT` | `/api/users/:id` | Update user details | ⏳ Pending |
| `DELETE` | `/api/users/:id` | Delete a user | ⏳ Pending |

## Current Progress Checklists
- [x] **Project Scaffolding**: Folder structure created.
- [x] **Database Config**: PostgreSQL connection pool setup `db.js`.
- [x] **Routing Setup**: Basic Express router in place.
- [~] **User Registration**: Route exists, but controller logic is currently a placeholder.
- [ ] **Password Hashing**: Need to install and implement `bcrypt`.
- [ ] **JWT Implementation**: Need to install and implement `jsonwebtoken`.
- [ ] **CRUD Operations**: Fetch, Update, and Delete endpoints are yet to be created.

