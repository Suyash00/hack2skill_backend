const mongoose = require("mongoose");

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

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tasks: [TaskSchema],
});

module.exports = mongoose.model("User", UserSchema);
