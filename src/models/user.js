const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        immutable: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    problemSolved: {
        type:[String]
    }
}, { timestamps : true });

const User = mongoose.model('user', userSchema);

module.exports = User;