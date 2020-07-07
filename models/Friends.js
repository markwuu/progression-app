const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;
