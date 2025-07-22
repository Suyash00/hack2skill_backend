// Express router: Protects all task/subtask routes with auth, handles task endpoints.

const express = require("express");
const auth = require("../middleware/auth");
const c = require("../controllers/taskController");
const router = express.Router();

router.use(auth);

router.get("/", c.listTasks);
router.post("/", c.addTask);
router.put("/:taskId", c.editTask);
router.delete("/:taskId", c.deleteTask);
router.get("/:taskId/subtasks", c.getSubtasks);
router.put("/:taskId/subtasks", c.updateSubtasks);

module.exports = router;
