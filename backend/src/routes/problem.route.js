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
    problemMiddleware.validateRequest,
    problemController.update
);

problemRouter.delete(
    '/delete/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    problemMiddleware.validateRequest,
    problemController.deleteProblem
);

problemRouter.get(
    '/get/:id',
    authMiddleware.isAuthenticated,
    problemMiddleware.validateRequest,
    problemController.getProblem
);

problemRouter.get(
    '/all',
    authMiddleware.isAuthenticated,
    problemController.getAllProblems
);

problemRouter.get(
    '/problemSolvedByUser',
    authMiddleware.isAuthenticated,
    problemController.solvedAllProblembyUser
)

problemRouter.get(
    '/submittedProblem/:id',
    authMiddleware.isAuthenticated,
    problemController.submittedProblem
)

module.exports = problemRouter;