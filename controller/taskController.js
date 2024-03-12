const Task = require('../models/task');
const {params, body} = require("express/lib/request");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
//test
const createTask = async (req, res) => {
    const {title, description, status} = req.body;
    const task = new Task({title, description, status});

    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateTask = async (req, res) => {
    console.log('back');
    const { title, description, status } = req.body;
    const { taskId } = req.params;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteTask = async (req, res) => {
    const {taskId} = req.params;

    try {
        await Task.findByIdAndDelete(taskId);
        res.json({message: '------'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
const getTaskById = async (req, res) => {
    console.log('id')
    const {taskId} = req.params;

    try {

        const response = await Task.findById(taskId);
        res.json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    getTaskById
};
