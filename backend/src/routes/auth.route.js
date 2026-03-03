const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post(
    '/register',
    authMiddleware.validateUserRequestBody,
    authController.register
);

authRouter.get(
    '/signin',
    authMiddleware.validateUserSigninRequest,
    authController.signin
);

authRouter.post(
    '/signout',
    authMiddleware.isAuthenticated,
    authController.signout
);

authRouter.post(
    '/admin/register',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    authMiddleware.validateUserRequestBody,
    authController.registerAdmin
);

module.exports = authRouter;