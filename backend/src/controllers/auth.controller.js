// installed modules
const jwt = require('jsonwebtoken');
// custom modules
const userService = require('../services/user.service');
const { STATUS, USER_ROLE } = require('../utils/contants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const AppError = require('../utils/errorbody');


const register = async (req, res) => {
    try {
        req.body.role = USER_ROLE.user;
        const response = await userService.registerUser(req.body);

        const token = jwt.sign(
            {id : response.id, email : response.email, role : response.role},
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
                errorResponseBody(error.message)
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
                STATUS.UNAUTHORISED,
                null,
                'Invalid credentials'
            )
        }

        const token = jwt.sign(
            {id: user.id, email: user.email, role : user.role},
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
                .cookie('token', token, { maxAge : 240*60*1000 })
                .status(STATUS.OK)
                .json(successResponseBody(response,'Successfully logged in the user'));

   } catch (error) {
        console.log(error);
        
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                errorResponseBody(error.message)
            );
        }
        
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }

}

const signout = async (req, res) => {
    try {
        const { token } = req.cookies;
        const response = await userService.logout(token);

        return res
                .cookie('token',null, { expires: new Date(0), httpOnly: true })
                .status(STATUS.OK)
                .json(successResponseBody(response));

    } catch (error) {
        console.log(error);
        
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody(error));
    }
}

const registerAdmin = async (req, res) => {
    try {
        req.body.role = USER_ROLE.admin;
        const response = await userService.registerUser(req.body);

        const token = jwt.sign(
            { id : response.id, email : response.email, role : response.role },
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
                errorResponseBody(error.message)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const deleteProfile = async (req, res) => {
    try {
        const response = await userService.deleteUser(req.user);

        return res.status(STATUS.OK).json(
            successResponseBody(response, "successfully deleted user profile")
        );

    } catch (error) {
        
        if(error instanceof AppError) {
            return res.status(error.statusCode).json(
                errorResponseBody(error.message)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const sendUserInfo = (req, res) => {
    const response = {
        _id :       req.user._id,
        firstName : req.user.firstName,
        email :     req.user.email,
    }

    return res.status(STATUS.OK).json(
        successResponseBody(response)
    );
}

module.exports = {
    register,
    signin,
    signout,
    registerAdmin,
    deleteProfile,
    sendUserInfo
}