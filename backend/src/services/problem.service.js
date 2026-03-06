const Problem = require('../models/problem.model');
const { STATUS, LANGUAGE } = require('../utils/contants');
const { submitBatch, submitTokens, waiting } = require('../utils/problem');
const AppError = require('../utils/errorbody');

const allowedFields = [
    "title",
    "description",
    "difficulty",
    "tags",
    "visibleTestCases",
    "hiddenTestCases",
    "starterCode",
    "referenceCode"
];

const filterAllowedFields = (data) => {
    filteredData = {};

    for(const field of allowedFields) {

        if(data[field] != undefined) {
            filteredData[field] = data[field];
        }
    }

    return filteredData;
}

const validateReferenceSolutions = async (data) => {
    for(const { language, completeCode } of data.referenceCode) {

        const languageId = LANGUAGE[language.toLowerCase()];
            
        // creating language wise batch of submissions
        const submissions = data.visibleTestCases.map((testcase) => ({
            source_code : completeCode,
            language_id : languageId,
            stdin : testcase.input,
            expected_output : testcase.output
        }));

        const submitResult = await submitBatch(submissions);

        const resultTokens = submitResult.map( value => value.token);
        
        
        let testResult;
        const MAX_ATTEMPTS = 10;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {

            testResult = await submitTokens(resultTokens);
            testResult.forEach( key => console.log(key));
            if (testResult.every((res) => res.status.id > 2)) break;

            if (attempt === MAX_ATTEMPTS - 1) {

                throw new AppError(STATUS.BAD_REQUEST, 'Judging timed out');
            }

            await waiting(1000);
        }

        for(const result of testResult) {
            
            if(result.status.id != 3){

                throw new AppError(
                    result.status.description,
                    STATUS.BAD_REQUEST
                );
            }
        }
    }

}

const createProblem = async (data, user) => {
    try {

        const exists = await Problem.findOne({ title: data.title });

        if(exists) {
            throw new AppError(
                STATUS.CONFLICT,
                'The problem you are trying to insert already exists'
            );
        }
        
        await validateReferenceSolutions(data);
        
        const problem = await Problem.create({
            ...data,
            problemCreator: user.id
        });

        return problem;

    } catch (error) {
        console.log(error);

        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }
        
        throw error;
    }
}

const updateProblem = async (problemId, data) => {
    try {
        // ignores fields like problemCreator, createdAt, problemId inside the update object and prevents from updating any of this fields
       const updateObject = filterAllowedFields(data);

        const exists = await Problem.findById(problemId);

        if(!exists) {

            throw new AppError(
                STATUS.NOT_FOUND,
                'Problem do not exits in DB for given id'
            );
        }

        await validateReferenceSolutions(updateObject);

        const response = await Problem.findByIdAndUpdate(
            problemId, 
            updateObject, 
            { new : true, runValidators : true }
        );

        return response;

    } catch (error) {
        console.log(error);

        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }

        throw error;
        
    }
}

const deleteProblem = async (problemId) => {
    try {
        const response = await Problem.findByIdAndDelete(problemId);

        if(!response) {
            throw new AppError(
                STATUS.NOT_FOUND,
                'Problem not found for given id'
            );
        }

        return response;

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

const getProblemById = async (problemId) => {
    try {
        const response = await Problem.findById(problemId);

        if(!response) {
            throw new AppError(
                STATUS.NOT_FOUND,
                'problem NOT found for given id'
            );
        }

        return {
            _id: response._id,
            title: response.title,
            description: response.description,
            difficulty: response.difficulty,
            tags: response.tags,
            visibleTestCases: response.visibleTestCases,
            starterCode: response.starterCode,
            referenceCode: response.referenceCode
        };

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

const getAllProblems = async (data) => {
    try {
        let filter = {};
        
        let limit = parseInt(data.limit);
        let page = parseInt(data.page);

        if(isNaN(limit) || limit < 10) limit = 10;
        if(isNaN(page) || page < 0) page = 1;

        limit = Math.min(limit, 50);

        const skip = (page - 1) * limit;
        
        if(data.difficulty) {
            filter.difficulty = data.difficulty;
        }

        if(data.tags) {
            filter.tags = data.tags
        }

        const response = await Problem.find(filter).select('_id title difficulty tags').skip(skip).limit(limit);

        const total = await Problem.countDocuments(filter);

        return {
            totalProblems : total,
            totalPages : Math.ceil(total / limit),
            problems : response
        }

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

module.exports = {
    createProblem,
    updateProblem,
    deleteProblem,
    getProblemById,
    getAllProblems
}