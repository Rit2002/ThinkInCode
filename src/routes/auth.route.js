const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRoute = express.Router();

authRoute.post(
    '/auth/register',
    authMiddleware.validateUserRequestBody,
    authController.register
);

module.exports = authRoute;