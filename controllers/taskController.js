const Task = require('../models/Task');
const mongoose = require('mongoose');

// create new task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (typeof title !== 'string' ||
            typeof description !== 'string' ||
            !title.trim() ||
            !description.trim()){
            return res.status(400).json({ message: "Title and description are required"});
           }

        const task = new Task({
            title: title.trim(),
            description: description.trim(),
            userId: req.user.userId});

        const savedTask = await task.save();
        return res.status(201).json(savedTask);
      
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid task data"});
        }
           console.error("Create task error:", err.message);
            return res.status(500).json({message: "Internal server error"});
        }
};

// get all tasks 
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.user.userId});
             return res.status(200).json(tasks);

    } catch (error) {
        console.error("Get all tasks error:", error.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// get single task by id
const getTaskById = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
         return res.status(400).json({message:"Invalid ID"})}
           const task = await Task.findOne({_id: req.params.id,userId: req.user.userId});

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        return res.status(200).json(task);   
    } catch (err) {
        console.error("Get task by ID error:", err.message);

        return res.status(500).json({message: "Internal server error"});
    }
};


// update task 
const updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
           return res.status(400).json({ message: "Invalid request body" });
      }

         const { title, description, completed } = req.body;

          if( title === undefined &&
            description === undefined &&
            completed === undefined) {
            return res.status(400).json({
                message: "At least one field is required to update"
            });
        }
           if( (title !== undefined &&
            (typeof title !== 'string' || !title.trim())) ||
            (description !== undefined &&
            (typeof description !== 'string' || !description.trim())) ||
            (completed !== undefined &&
                typeof completed !== 'boolean')){
            return res.status(400).json({ message: "Invalid input" });
        }
        const updates = {};
        if (title !== undefined) {
     updates.title = title.trim();}

    if (description !== undefined) {
    updates.description = description.trim();}

   if (completed !== undefined) {
    updates.completed = completed;}

      const task = await Task.findOneAndUpdate({
        _id: req.params.id,
        userId: req.user.userId},updates,{ new: true, runValidators: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

      return res.status(200).json(task);

    }  catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).json({message: "Invalid task data"});
    }

    console.error("Update task error:", err.message);
    return res.status(500).json({message: "Internal server error"});
    }
};

// delete task 

const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const task = await Task.findOneAndDelete({_id: req.params.id,userId: req.user.userId});
        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }

        return res.status(200).json({ message: "Task deleted successfully"});

    } catch (err) {
        console.error("Delete task error:", err.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {getAllTasks,createTask,updateTask,deleteTask,getTaskById}