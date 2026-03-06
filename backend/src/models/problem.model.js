const mongoose = require('mongoose');
const { DIFFICULTY_LEVEL, TAGS } = require('../utils/contants');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 50,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
        minLength:5
    },
    difficulty: {
        type: String,
        enum: {
            values: Object.values(DIFFICULTY_LEVEL),
            message: 'Invalid difficulty level'
        },
        required: true
    },
    tags: {
        type: String,
        enum: {
            values: Object.values(TAGS),
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
            type: String,
            required: true
        }
    }],

    referenceCode: [{
        language: {
            type: String,
            required: true
        },
        completeCode: {
            type: String,
            required: true
        }
    }],

    problemCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps : true });


const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;