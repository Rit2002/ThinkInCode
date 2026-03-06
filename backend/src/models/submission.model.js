const mongoose = require('mongoose');
const { LANGUAGE } = require('../utils/contants');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
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
            values: Object.keys(LANGUAGE),
            message: 'language not available'
        },
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
            values: ['Accepted', 'Pending', 'Wrong', 'Error'],
            message: "Invalid status"
        },
        default: "Pending"
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


/**
 * Why on userId & problemId? --> Becoz, user will frequenty be checking(querying) the submission tab in problem section(which shows no of submission for a problem)
 */

submissionSchema.index({ userId : 1, problemId : 1 });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;