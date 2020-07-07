const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    success: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Tasks"
    }]
}, {
    timestamps: true,
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
