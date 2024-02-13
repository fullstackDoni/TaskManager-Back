const taskController = require('../controller/taskController');
const express = require('express');
const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.get('/tasks/:taskId', taskController.getTaskById)
router.post('/tasks', taskController.createTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;
