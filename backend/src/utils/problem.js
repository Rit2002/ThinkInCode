const axios = require('axios');

const waiting = async (timer) => {

    setTimeout(() => {
        return 1;
    }, timer);

    return new Promise(resolve => {
        setTimeout(resolve, timer);
    });
}

const submitBatch = async (submissions) => {
    // console.log(submissions);
    
    try {
        const response = await axios.post(
            `${process.env.JUDGE0_URL}/submissions/batch?base64_encoded=false`,

            {submissions: submissions},

            { headers: {"Content-Type": "application/json"} }
        );

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Error submitting code:", error.response?.data || error.message);
        throw error;
    }
};

const submitTokens = async (resultTokens) => {
    try {
        const tokenString = resultTokens.join(",");

        const response = await axios.get(
            `${process.env.JUDGE0_URL}/submissions/batch`,
            {
                params: {
                    tokens: tokenString,
                    base64_encoded: false
                }
            }
        );
        
        return response.data.submissions;
        
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}


module.exports = {
    submitBatch,
    submitTokens,
    waiting
}