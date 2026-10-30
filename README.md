# TaskFlow API

A Task Management REST API built using Node.js, Express.js, and MongoDB. It allows users to register, log in, and manage their personal tasks securely using JWT authentication.

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Create new tasks
- Get all tasks
- Get a task by ID
- Update tasks
- Delete tasks
- User-specific task management
- Input validation and error handling

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
└── server.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Pawan-98-kumar/taskflow-api.git
```

2. Open the project folder:

```bash
cd taskflow-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and add:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Start the server:

```bash
node server.js
```

The server will run on port 3000 by default.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in a user |

### Tasks

All task endpoints require a valid JWT Bearer token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create a task |
| GET | `/tasks` | Get all user's tasks |
| GET | `/tasks/:id` | Get a task by ID |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Authentication

After logging in, use the received JWT token in the Authorization header for task requests:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Environment Variables

| Variable | Description |
|---|---|
| PORT | Server port |
| MONGODB_URL | MongoDB connection string |
| JWT_SECRET | Secret key used to verify JWT tokens |

## Author

Pawan Kumar

## License

This project is currently available as a public GitHub repository.