const express = require('express');
const router = express.Router();

const {getAllTasks,createTask,updateTask,deleteTask,getTaskById} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/:id', getTaskById);
module.exports = router;