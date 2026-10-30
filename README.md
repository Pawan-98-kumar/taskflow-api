# TaskFlow API

A Task Management REST API built using **Node.js, Express.js, and MongoDB**. It allows users to register, log in, and securely manage their personal tasks using JWT authentication.

## Features

- User registration and login
- Password hashing using bcryptjs
- JWT-based authentication
- Create, read, update, and delete tasks
- Get all tasks belonging to the logged-in user
- User-specific task management
- Input validation and error handling
- Protected task routes

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Project Structure

```text
taskflow-api/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
├── README.md
└── TaskFlow API.postman_collection.json
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Pawan-98-kumar/taskflow-api.git
```

### 2. Navigate to the project folder

```bash
cd taskflow-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own MongoDB connection string and JWT secret.

### 5. Start the server

```bash
node server.js
```

The server runs on port `3000` by default.

## API Endpoints

### Authentication Routes

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register a new user     |
| POST   | `/auth/login`    | Log in an existing user |

### Task Routes

All task routes require JWT authentication.

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| POST   | `/tasks`     | Create a new task    |
| GET    | `/tasks`     | Get all user's tasks |
| GET    | `/tasks/:id` | Get a task by ID     |
| PATCH  | `/tasks/:id` | Update a task        |
| DELETE | `/tasks/:id` | Delete a task        |

## Authentication

After successful login, the API returns a JWT token.

Include this token in the Authorization header when accessing protected task routes:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Example Request

### Create a Task

**POST** `/tasks`

Request body:

```json
{
  "title": "Learn JavaScript",
  "description": "Practice backend development",
  "completed": false
}
```

## Postman Collection

A Postman collection is included in this repository to test the API endpoints.

Import the following file into Postman:

`TaskFlow API.postman_collection.json`

The collection includes requests for user registration, login, and task management.

## Environment Variables

| Variable      | Description                          |
| ------------- | ------------------------------------ |
| `PORT`        | Port on which the server runs        |
| `MONGODB_URL` | MongoDB connection string            |
| `JWT_SECRET`  | Secret key used for JWT verification |

## Author

**Pawan Kumar**

## License

This project is currently available as a public GitHub repository.
