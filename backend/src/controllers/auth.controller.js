const userService = require('../services/user.service');
const { STATUS } = require('../utils/contants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/errorbody');

const register = async (req, res) => {
    try {
        const response = await userService.registerUser(req.body);

        const token = jwt.sign(
            {id : response.id, email : response.email},
            process.env.AUTH_KEY,
            { expiresIn : '4h' }
        );

       return res
                .cookie('token', token, { maxAge : 240*60*1000 })
                .status(STATUS.CREATED)
                .json(successResponseBody(response, 'Successfully resgistered the user'));

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                errorResponseBody(error.details)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const signin = async (req, res) => {
   try {
        const user = await userService.getUserByEmail(req.body.email);

        const isValidPassword = await user.isValidPassword(req.body.password);

        if(!isValidPassword) {
            throw new AppError(
                'Invalid password',
                STATUS.UNAUTHORISED
            )
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.AUTH_KEY,
            {expiresIn : '4h'}
        );

        let response = {
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            role : user.role
        }

        return res
                .cookie('token',token, { maxAge : 240*60*1000 })
                .status(STATUS.OK)
                .json(successResponseBody(response,'Successfully logged in the user'));

   } catch (error) {
        console.log(error);
        
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                errorResponseBody(error.details)
            );
        }
        
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }

}

module.exports = {
    register,
    signin
}