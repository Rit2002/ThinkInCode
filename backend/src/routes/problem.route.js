const express = require('express');
const problemRouter = express.Router();
const problemController = require('../controllers/problem.controller');
const problemMiddleware = require('../middlewares/problem.middleware');
const authMiddleware = require('../middlewares/auth.middleware')

problemRouter.post(
    '/create',
    authMiddleware.isAuthenticated,
    problemMiddleware.validateProblemCreateRequest,
    problemController.createProblem
);

module.exports = problemRouter;