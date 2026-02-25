const { STATUS } = require("../utils/contants")
const { errorResponseBody } = require("../utils/responsebody")
const objectId = require('mongoose').Types.ObjectId;

const validateProblemCreateRequest = (req, res, next) => {

    if(!req.body.title) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Problem title NOT found')
        );
    }

    if(!req.body.description) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('description title NOT found')
        );
    }

    if(!req.body.difficulty) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Problem difficulty NOT found')
        );
    }

    if(!req.body.tags) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Problem tags NOT found')
        );
    }

    if( !req.body.visibleTestCases || 
        !(req.body.visibleTestCases instanceof Array) || 
        req.body.visibleTestCases.length == 0
    ) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Problem visibleTestCases NOT found')
        );
    }

    for(let i=0;i<req.body.visibleTestCases.length;i++) {

        // validating every field for each and every object inside visibleTestCases
        if(!req.body.visibleTestCases[i].input){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('input inside visibleTestCases NOT found')
            );
        }

        if(!req.body.visibleTestCases[i].output){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('output inside visibleTestCases NOT found')
            );
        }

        if(!req.body.visibleTestCases[i].explaination){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('explaination inside visibleTestCases NOT found')
            );
        }
    }

    if( !req.body.hiddenTestCases || 
        !(req.body.hiddenTestCases instanceof Array) || 
        req.body.hiddenTestCases.length == 0
    ) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Problem hiddenTestCases NOT found')
        );
    }

    for(let i=0;i<req.body.hiddenTestCases.length;i++) {

        // validating every field for each and every object inside hiddenTestCases
        if(!req.body.hiddenTestCases[i].input){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('input inside hiddenTestCases NOT found')
            );
        }

        if(!req.body.hiddenTestCases[i].output){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('output inside hiddenTestCases NOT found')
            );
        }
    }

    if( !req.body.starterCode || 
        !(req.body.starterCode instanceof Array) || 
        req.body.starterCode.length == 0
    ) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Problem starterCode NOT found')
        );
    }

    for(let i=0;i<req.body.starterCode.length;i++) {

        // validating every field for each and every object inside hiddenTestCases
        if(!req.body.starterCode[i].language){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('language inside starterCode NOT found')
            );
        }

        if(!req.body.starterCode[i].boilerplateCode){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('boilerplateCode inside starterCode NOT found')
            );
        }
    }


    if(!req.body.referenceCode) {
        res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Reference code not found')
        );
    }

    for(let i=0;i<req.body.referenceCode.length;i++) {

        // validating every field for each and every object inside hiddenTestCases
        if(!req.body.referenceCode[i].language){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('language inside referenceCode NOT found')
            );
        }

        if(!req.body.referenceCode[i].completeCode){
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody('completeCode inside referenceCode NOT found')
            );
        }
    }

    // everything ok
    next();
}

const validateProblemUpdateRequest = (req, res, next) => {

    if(!req.params.id) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('problem id NOT Found')
        );
    }

    if(!objectId.isValid(req.params.id)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid problem id')
        );
    }

    next();
}

module.exports = {
    validateProblemCreateRequest,
    validateProblemUpdateRequest
}