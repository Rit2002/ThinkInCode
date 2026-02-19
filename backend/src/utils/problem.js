const axios = require('axios');

const getLanguageById =  (lang) => {

    const language = {
        'c++' :  54,
        'javascript' : 63,
        'java' : 62,
        'python' : 70
    }

    return language[lang.toLowerCase()];
}

const submitBatch = async (submissions) => {
    // console.log(submissions);
    
    try {
        const response = await axios.post(
            "http://localhost:2358/submissions/batch?base64_encoded=false&wait=true",

            {submissions: submissions},

            { headers: {"Content-Type": "application/json"} }
        );

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Error submitting code:", error.response?.data || error.message);
    }
};

module.exports = {
    getLanguageById,
    submitBatch
}