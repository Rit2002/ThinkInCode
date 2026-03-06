const express = require('express');
const submissionRouter = express.Router();
const submissionController = require('../controllers/submission.controller');
const authMiddleware = require('../middlewares/auth.middleware');

submissionRouter.post(
    '/submit/:id',
    authMiddleware.isAuthenticated,
    submissionController.submit
)

module.exports = submissionRouter;