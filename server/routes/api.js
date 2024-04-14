const express = require('express');

const router = express.Router();

const Task = require('../db/taskModel');

// Create a new Task
router.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            completed: req.body.completed,
            user: req.user.userId
        });

        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Unable to add this task' });
    }
});

// Get all Tasks
router.get('/tasks', (req, res) => {
    Task.find({ user: req.user.userId })
        .then(tasks => res.json(tasks))
        .catch(_err => res.status(404).json({ noTasksFound: 'No tasks found' }));
});

// Get a single Task by id
// router.get('/tasks/:id', (req, res) => {
//     Task.findOne({ _id: req.params.id, user: req.user.userId })
//         .then(task => {
//             if (!task) {
//                 return res.status(404).json({ noTaskFound: 'No task found or not authorized' });
//             }
//             res.json(task);
//         })
//         .catch(_err => res.status(404).json({ noTaskFound: 'No task found or not authorized' }));
// });

// Update Task by id
router.put('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({ _id: req.params.id, user: req.user.userId }, req.body, { new: true })
        .then(task => {
            if (!task) {
                return res.status(404).json({ error: 'No task found with that ID' });
            }
            res.json(task);
        })
        .catch(_err => res.status(400).json({ error: 'Unable to update the task' }));
});

// Delete Task by id
router.delete('/tasks/:id', (req, res) => {
    Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId })
        .then(task => {
            if (!task) {
                return res.status(404).json({ error: 'No task found or not authorized' });
            }
            res.status(200).json({ success: true, message: 'Task deleted successfully.', taskId: req.params.id });
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to delete the task', details: err.message });
        });
});

module.exports = router;
