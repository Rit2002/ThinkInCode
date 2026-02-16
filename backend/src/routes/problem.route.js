const express = require('express');
const problemRouter = express.Router();
const problemController = require('../controllers/problem.controller');
const problemMiddleware = require('../middlewares/problem.middleware');

problemRouter.post(
    '/create',
    problemMiddleware.validateProblemCreateRequest,
    problemController.createProblem
);

module.exports = problemRouter;