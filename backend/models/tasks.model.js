const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    due_date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true,
});

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;
