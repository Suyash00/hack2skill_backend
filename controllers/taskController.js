// Handles CRUD operations for tasks and subtasks, all scoped to current user.

const mongoose = require("mongoose");
const Task = require("../models/TaskSchema");

// Lists all non-deleted tasks with their non-deleted subtasks.
exports.listTasks = (req, res) => {
  const tasks = req.user.tasks
    .filter((t) => !t.deleted)
    .map((task) => ({
      ...task.toObject(),
      subtasks: task.subtasks.filter((s) => !s.deleted),
    }));
  res.json({ tasks });
};

// Adds a new task to the user's task list.
exports.addTask = async (req, res) => {
  const { title, deadline, status } = req.body;

  const newTask = new Task({
    title,
    deadline,
    status: status || "pending",
    subtasks: [],
    user: req.user.id, // required since Task is now a separate model
  });

  await newTask.save();
  res.status(201).json(newTask);
};

// Updates task fields (title, deadline, status) for a specific task.
exports.editTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, deadline, status } = req.body;
  const task = req.user.tasks.id(taskId);
  if (!task || task.deleted)
    return res.status(404).json({ error: "Not found" });
  if (title) task.title = title;
  if (deadline) task.deadline = deadline;
  if (status) task.status = status;
  await req.user.save();
  res.json(task);
};

// Soft-deletes a task by setting its isDeleted flag.
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = req.user.tasks.id(taskId);
  if (!task || task.deleted)
    return res.status(404).json({ error: "Not found" });
  task.deleted = true;
  await req.user.save();
  res.json({ message: "Soft deleted" });
};

// Returns all non-deleted subtasks of a task.
exports.getSubtasks = (req, res) => {
  const { taskId } = req.params;
  const task = req.user.tasks.id(taskId);
  if (!task || task.deleted)
    return res.status(404).json({ error: "Task not found" });
  const subtasks = task.subtasks.filter((s) => !s.deleted);
  res.json({ subtasks });
};

// Replaces the subtask list for a task, preserving soft-deleted subtasks.
exports.updateSubtasks = async (req, res) => {
  const { taskId } = req.params;
  const { subtasks } = req.body;
  const task = req.user.tasks.id(taskId);
  if (!task || task.deleted)
    return res.status(404).json({ error: "Task not found" });

  // Retain deleted
  const deleted = task.subtasks.filter((s) => s.deleted);
  task.subtasks = [
    ...subtasks.map((s) => ({
      ...s,
      _id: s._id ? new mongoose.Types.ObjectId(s._id) : undefined, // for editing existing
      deleted: false,
    })),
    ...deleted,
  ];
  await req.user.save();
  res.json({ subtasks: task.subtasks.filter((s) => !s.deleted) });
};
