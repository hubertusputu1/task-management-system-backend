import express from 'express'

import auth from '../auth'

import TasksController from '../../controllers/tasks.controller'

const router = express.Router();

router.route('/')
.get(auth.required, TasksController.getAllTasks)
.post(auth.required, TasksController.createTask)

router.route('/:id')
.get(auth.required, TasksController.getSingleTask)
.put(auth.required, TasksController.updateTask)
.delete(auth.required, TasksController.deleteTask)

module.exports = router;