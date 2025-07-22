const mongoose = require("mongoose");

// SubtaskSchema: Represents a subtask within a Task.
const SubtaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// TaskSchema: Represents a task, embeds subtasks, belongs to a user.
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    deleted: { type: Boolean, default: false },
    subtasks: [SubtaskSchema],
  },
  { timestamps: true }
);

// Defines User schema with embedded Task and Subtask schemas.
// UserSchema: Represents an application user, embeds tasks.
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tasks: [TaskSchema],
});

module.exports = mongoose.model("User", UserSchema);
