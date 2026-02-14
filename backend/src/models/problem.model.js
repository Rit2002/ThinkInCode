const mongoose = require('mongoose');
const { DIFFICULTY_LEVEL, TAGS } = require('../utils/contants');
const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        minLength:5
    },
    difficulty: {
        type: String,
        enum: {
            values: Object.keys(DIFFICULTY_LEVEL),
            message: 'Invalid difficulty level'
        },
        required: true
    },
    tags: {
        type: String,
        enum: {
            values: Object.keys(TAGS),
            message: 'Invalid tag type'
        },
        required: true
    },
    visibleTestCases: [{
        input: {
            type: String,
            required: true,
            trim: true
        },
        output: {
            type: String,
            required: true,
            trim: true
        },
        explaination: {
            type: String,
            required: true,
            trim: true
        }
    }],
    hiddenTestCases: [{
        input: {
            type: String,
            required: true,
            trim: true
        },
        output: {
            type: String,
            required: true,
            trim: true
        }
    }],
    starterCode: [{
        language: {
            type: String,
            required: true
        },
        boilerplateCode: {
            tyep: String,
            required: true
        }
    }],
    problemCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;