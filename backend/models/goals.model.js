const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalsSchema = new Schema({
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
}, {
    timestamps: true,
});

const Goals = mongoose.model('Goals', goalsSchema);

module.exports = Goals;
