import mongoose from 'mongoose'

import { STATUS_NEW, STATUS_ARCHIVED, STATUS_COMPLETED, STATUS_IN_PROGRESS } from '../utils/constants'

const Users = mongoose.model('Users');
const Tasks = mongoose.model('Tasks');
const Comments = mongoose.model('Comments');

class TasksController {
    static createTask(req, res, next) {
        const { body: { task } } = req;

        if(!task.title) {
            return res.status(422).json({
                errors: {
                    title: 'is required',
                },
            });
        }
        
        if(!task.createdBy) {
            return res.status(422).json({
                errors: {
                    createdBy: 'is required',
                },
            });
        }
        
        const newTask = new Tasks(task);

        return newTask.save()
        .then(() => res.json({ task: newTask.showData() }));
    }

    static updateTask(req, res, next) {
        const { params: { id } } = req
        const update = { $set: req.body.task }
        
        return Tasks.findByIdAndUpdate(id, update, { new: true })
        .then(task => res.status(200).json({task: task}))
    }

    static getAllTasks(req, res, next) {
        return Tasks.find({})
        .then(tasks => res.status(200).json({tasks: tasks}))
    }

    static deleteTask(req, res, next) {
        const { params: { id } } = req
    
        return Tasks.findByIdAndRemove(id)
        .then(_ => Comments.deleteMany({taskId: id})
        .then(_ => res.status(200).json({message: 'task deleted'})))
    }

    static getSingleTask(req, res, next) {
        const { params: { id } } = req
    
        return Tasks.findById(id)
        .then(task => res.status(200).json({task: task}))
    }
}

export default TasksController