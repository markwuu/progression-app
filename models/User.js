const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    score: {
        type: Number
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: "Goal"
    }]
}, {
    timestamps: true,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
