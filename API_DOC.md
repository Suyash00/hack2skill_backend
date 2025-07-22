# API Documentation

Base URL: http://localhost:5000/

## Authentication

### Register

- **POST /auth/register**
- Body:
  {
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret"
  }

- Response: `201 Created`
  { "message": "User registered successfully" }

### Login

- **POST /auth/login**
- Body:
  {
  "email": "alice@example.com",
  "password": "secret"
  }

- Response:{ "token": "<jwt_token>" }

---

## Tasks

> Authorization: header required for all endpoints below.  
> `Authorization: Bearer <your_jwt_token>`

### Get All Tasks

- **GET /tasks**
- Response:{
  "tasks": [
  {
  "\_id": "...",
  "title": "...",
  "deadline": "...",
  "status": "pending",
  "subtasks": [ ... ]
  }
  ]
  }

### Add Task

- **POST /tasks**
- Body:
  {
  "title": "Build backend",
  "deadline": "2025-07-25T16:00:00.000Z"
  }
- Response: 201, created task object

### Edit Task

- **PUT /tasks/:taskId**
- Body:
  {
  "title": "Updated",
  "status": "completed"
  }
- Response: 200, updated task object

### Delete Task

- **DELETE /tasks/:taskId**
- Response: 200, e.g.
  { "message": "Task soft-deleted" }

---

## Subtasks

### Get Subtasks

- **GET /tasks/:taskId/subtasks**

### Replace Subtasks List

- **PUT /tasks/:taskId/subtasks**
- Body:
  {
  "subtasks": [
  { "title": "Write code", "deadline": "2025-08-01T09:00:00Z" }
  ]
  }

---

## Error Example (No Auth)

- 401 Unauthorized:{ "error": "No token provided" }

---

## 📩 API Collection (Postman)

HTTP Method | Endpoint | Description | Auth Required
POST | /auth/register | Register a new user account | No
POST | /auth/login | Log in and receive a JWT token | No
GET | /tasks | Get all (non-deleted) tasks and their subtasks | Yes
POST | /tasks | Create/add a new task | Yes
PUT | /tasks/:taskId | Edit/update a task (title, deadline, status) | Yes
DELETE | /tasks/:taskId | Soft-delete a task | Yes
GET | /tasks/:taskId/subtasks | Get all subtasks of a task (excluding soft-deleted) | Yes
PUT | /tasks/:taskId/subtasks | Replace/update all subtasks of a task | Yes

You can download and import the Postman collection from [here](crud_project\backend\docs\Hack2Skill Project backend.postman_collection.json).
