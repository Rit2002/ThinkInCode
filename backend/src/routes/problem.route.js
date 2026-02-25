const express = require('express');
const problemRouter = express.Router();
const problemController = require('../controllers/problem.controller');
const problemMiddleware = require('../middlewares/problem.middleware');
const authMiddleware = require('../middlewares/auth.middleware')

problemRouter.post(
    '/create',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    problemMiddleware.validateProblemCreateRequest,
    problemController.create
);

problemRouter.put(
    '/update/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    problemMiddleware.validateProblemUpdateRequest,
    problemController.update
);

module.exports = problemRouter;