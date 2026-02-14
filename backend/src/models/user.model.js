const mongoose = require('mongoose');
const { USER_ROLE } = require('../utils/contants');
const bcrypt = require('bcrypt');

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
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        immutable: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    role: {
        type: String,
        enum: [USER_ROLE.user, USER_ROLE.admin],
        default: USER_ROLE.user
    },
    problemSolved: {
        type:[String]
    }
}, { timestamps : true });

// userSchema.pre('save', ...) --> This means: “Before saving a user document, run this function.”
userSchema.pre('save', async function() {
    // Runs this function only if password is modified inside document. If this check isn't provided any other field (other than password) changes (eg: firstName) this function will run and rehash the password.
    if (!this.isModified('password')) return;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.isValidPassword = async function (plainPassword) {
    const compare = bcrypt.compare(plainPassword, this.password);
    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;