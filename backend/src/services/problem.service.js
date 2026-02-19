const Problem = require('../models/problem.model');
const { STATUS } = require('../utils/contants');
const { getLanguageById, submitBatch } = require('../utils/problem');
const AppError = require('../utils/errorbody');

const createProblem = async (data) => {
    try {

        for(const { language, completeCode } of data.referenceCode) {

            const languageId = getLanguageById(language);
             
            // creating language wise batch of submissions
            const submissions = data.visibleTestCases.map((testcase) => ({
                source_code : completeCode,
                language_id : languageId,
                stdin : testcase.input,
                expected_output : testcase.output
            }));

            const submitResult = await submitBatch(submissions);
        }


        const exists = await Problem.findOne({ title: data.title });

        if(exists) {
            throw new AppError(
                STATUS.CONFLICT,
                'The problem you are trying to insert already exists'
            );
        }
        
        const problem = await Problem.create(data);

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

        if(error instanceof AppError) {
            throw new AppError(
                error.statusCode,
                error.details
            );
        }
        
        throw err;
    }
}

module.exports = {
    createProblem
}