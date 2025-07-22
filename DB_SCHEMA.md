# Database Schema Documentation

## User Schema

### Fields

- **name**: (String, required) - User's full name
- **email**: (String, required, unique) - User's email address (acts as identifier)
- **password**: (String, required) - Hashed password
- **tasks**: (Array of Task objects) - Embedded tasks owned by the user

---

## Task (Embedded in User)

### Fields

- **title**: (String, required) - Task title/subject
- **deadline**: (Date, required) - When the task is due
- **status**: (String, enum: ['pending', 'completed'], default: 'pending')
- **isDeleted**: (Boolean, default: false) - Marks the task as soft-deleted
- **subtasks**: (Array of Subtask objects) - Embedded subtasks

---

## Subtask (Embedded in Task)

### Fields

- **title**: (String, required) - Subtask title/subject
- **deadline**: (Date, required)
- **status**: (String, enum: ['pending', 'completed'], default: 'pending')
- **isDeleted**: (Boolean, default: false) - Soft-delete marker

---

## Soft Deletion (`isDeleted`)

- Both `Task` and `Subtask` use an `isDeleted` flag for **soft deletion**.
- Records are not removed from the database, but are filtered out of "active" API responses.
