# hack2skill_backend

Backend application demonstrating CRUD operations in MERN stack

# MERN Backend for Task/Subtask Management

<!-- Project: Node/Express API for managing users, tasks, and subtasks with soft delete and JWT authentication. -->

## Overview

This is a Node.js/Express backend with MongoDB for managing users, tasks, and subtasks, featuring:

- User auth with JWT
- Embedded tasks/subtasks (per user)
- Soft deletion (isDeleted)
- REST API

## Folder Structure

backend/
app.js
models/
controllers/
middleware/
routes/
.env.example
package.json

## Setup & Usage

### Prerequisites

- Node.js (v14+)
- MongoDB running (local or Atlas)

### Environment

Create a `.env` in `backend/`:
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=<your secret here>

### Install Dependencies

cd backend/
npm install

### Start the Server

npm start

---

# API Endpoints

See `API_DOC.md`

# Testing

Use Postman or VSCode REST client to verify each endpoint.

---

# Contact

Your Name (your.email@example.com)
