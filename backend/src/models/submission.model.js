const mongoose = require('mongoose');
const { LANGUAGE, JUDGE0_STATUS } = require('../utils/contants');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },

    problemId: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'Problem',
        required: true
    },

    code: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true,
        enum: {
            values: Object.values(LANGUAGE),
            message: 'language not available'
        }
    },

    runTime: {
        type: Number,
        default: 0
    },

    memory: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: {
            values: Object.values(JUDGE0_STATUS)
        }
    },

    errorMessage: {
        type: String,
        default: ''
    },

    testCasesPassed: {
        type: Number,
        default: 0
    },

    totalTestCases: {
        type: Number,
        default: 0
    }

}, { timestamps : true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;