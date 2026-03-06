const { STATUS, LANGUAGE } = require("../utils/contants")
const { errorResponseBody } = require("../utils/responsebody");
const objectId = require('mongoose').Types.ObjectId;

const validateSubmitorRunCodeRequest = (req, res, next) => {
    
    if(!req.params.id) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody("Problem Id not found")
        );
    }

    if(!objectId.isValid(req.params.id)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody("Invalid problem Id")
        );
    }

    if(!req.body.code) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody("code NOT found")
        );
    }

    if(!req.body.language || !Object.keys(LANGUAGE).includes(req.body.language)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody("language NOT found")
        );
    }

    // everything okay
    next();
}

module.exports = {
    validateSubmitorRunCodeRequest
}