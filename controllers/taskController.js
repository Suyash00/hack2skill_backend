const mongoose = require("mongoose");

exports.listTasks = (req, res) => {
  const tasks = req.user.tasks
    .filter((t) => !t.deleted)
    .map((task) => ({
      ...task.toObject(),
      subtasks: task.subtasks.filter((s) => !s.deleted),
    }));
  res.json({ tasks });
};

exports.addTask = async (req, res) => {
  const { title, deadline, status } = req.body;
  const task = {
    title,
    deadline,
    status: status || "pending",
    subtasks: [],
  };
  req.user.tasks.push(task);
  await req.user.save();
  res.status(201).json(req.user.tasks[req.user.tasks.length - 1]);
};

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

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = req.user.tasks.id(taskId);
  if (!task || task.deleted)
    return res.status(404).json({ error: "Not found" });
  task.deleted = true;
  await req.user.save();
  res.json({ message: "Soft deleted" });
};

exports.getSubtasks = (req, res) => {
  const { taskId } = req.params;
  const task = req.user.tasks.id(taskId);
  if (!task || task.deleted)
    return res.status(404).json({ error: "Task not found" });
  const subtasks = task.subtasks.filter((s) => !s.deleted);
  res.json({ subtasks });
};

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
