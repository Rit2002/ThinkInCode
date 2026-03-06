const express = require('express');
const submissionRouter = express.Router();
const submissionController = require('../controllers/submission.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const submissionMiddleware = require('../middlewares/submission.middleware');

submissionRouter.post(
    '/submit/:id',
    authMiddleware.isAuthenticated,
    submissionMiddleware.validateSubmitorRunCodeRequest,
    submissionController.submit
);

submissionRouter.post(
    '/run/:id',
    authMiddleware.isAuthenticated,
    submissionMiddleware.validateSubmitorRunCodeRequest,
    submissionController.runCode
);

module.exports = submissionRouter;