const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;