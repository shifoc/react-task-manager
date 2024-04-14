const mongoose = require('mongoose');

// Task schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the task!']
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);
