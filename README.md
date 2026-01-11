# 🔐 User Management API System

A robust, production-ready RESTful API built as part of the **Backend Developer Internship (Week 1)**. This project demonstrates a complete User Management System featuring secure authentication, role-based access control, server-side caching, and database optimizations.

## 📖 Project Overview

This API serves as a backend foundation for user-centric applications. It handles the entire lifecycle of a user account—from secure registration and login to profile management and admin-level deletion. It is built using the **MVC (Model-View-Controller)** architecture to ensure code scalability and maintainability.

### 🚀 Key Features

*   **Secure Authentication:** User registration and login using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
*   **🛡️ Protected Routes:** Middleware ensures only authenticated users with valid tokens can access data.
*   **⚡ Performance Optimization:**
    *   **Pagination:** Efficiently fetches large datasets (e.g., `?page=1&limit=10`) using SQL `OFFSET/LIMIT`.
    *   **Caching:** Implemented `node-cache` to serve repeated read requests instantly from memory (TTL: 60s).
*   **👤 CRUD Operations:** Full Create, Read, Update, and Delete capabilities.
*   **Validated Data:** Input validation for required fields and duplicate email checks.
*   **Centralized Error Handling:** Consistent JSON error responses (400, 401, 404, 500).

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Fast, unopinionated web framework |
| **Database** | PostgreSQL | Relational database for structured user data |
| **Authentication** | JWT (jsonwebtoken) | Stateless authentication mechanism |
| **Security** | Bcrypt.js | Password hashing and salting |
| **Caching** | Node-Cache | In-memory caching strategy |
| **Testing** | Postman | API endpoint testing and automation |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone <your-repo-link-here>
cd user-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following credentials:
```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_management_db
JWT_SECRET=your_super_secret_key_here
```

### 4. Database Setup (PostgreSQL)
Open pgAdmin 4 or your terminal and execute the following SQL to create the table:
```sql
CREATE DATABASE user_management_db;

-- Switch to the database and run:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Run the Server
```bash
# Run in development mode (with nodemon)
npm run dev

# Run in production mode
node server.js
```
Server will start at `http://localhost:3000`

---

## 🔗 API Documentation

### 🟢 Public Routes (No Auth Required)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | `{ "name": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/auth/login` | Login & receive JWT | `{ "email": "...", "password": "..." }` |

### 🔒 Protected Routes (Header: `Authorization: Bearer <token>`)

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Get all users | `?page=1&limit=10` |
| `PUT` | `/api/users/:id` | Update profile | N/A |
| `DELETE` | `/api/users/:id` | Delete account | N/A |

---

## 📂 Folder Structure (MVC)
```plaintext
/user-management-api
  ├── src
  │   ├── config        # Database connection logic (db.js)
  │   ├── controllers   # Business logic (authController, userController)
  │   ├── middleware    # Authentication checks (authMiddleware)
  │   ├── models        # Database queries & SQL (userModel)
  │   └── routes        # API URL definitions (authRoutes, userRoutes)
  ├── postman           # Postman collection for testing
  ├── .env              # Environment secrets (git-ignored)
  ├── server.js         # Entry point
  └── README.md         # Documentation
```

---

## 📸 Screenshots
1. **Secure Login (JWT Generation)**
2. **Pagination & Caching (Performance)**
   (Notice the "Serving from Cache" log indicating optimization)

---

## 🧪 Testing with Postman
A complete Postman Collection is included in the repo.
1. Navigate to the `postman/` folder.
2. Import `User_Management_Collection.json` into Postman.
3. Run the **Collection Runner** to simulate bulk user registration.
3. Check the **Tests** tab in Postman to see automated status code verification.

---

**Author:** Divyansh Kumar Gupta 
**Internship:** Backend Developer Intern (Week 1)
