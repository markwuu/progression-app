const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    due_date: {
        type: Date
    },
    goal: {
        type: Schema.Types.ObjectId,
        ref: "Goal"
    },
}, {
    timestamps: true,
});

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;
