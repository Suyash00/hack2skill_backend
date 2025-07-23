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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
