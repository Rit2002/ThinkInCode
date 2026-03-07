const { redisClient } = require("../config/redis.config");
const { STATUS } = require("../utils/contants");
const { successResponseBody, errorResponseBody } = require("../utils/responsebody");
const crypto = require('crypto');

// 1hr --> 60min --> 60*60 = 3600sec
const windowSize = 3600;
const maxRequest = 60;

// Sliding window rate limiter
const rateLimiter = async (req, res, next) => {
    try {
        const key = `IP:${req.ip}`;

        const currentTime = Date.now() / 1000;
        
        // currTime --> 1:00pm - 1hr = 12pm <---windowTime
        const windowTime = currentTime - windowSize;

        /**
         * zRemRangeByScore --> removes all the timestamp(at the time req was made) that is in between 0 to windowT
         * 
         * z ---> z here represent ordered set. Ordered set is used becoz data in it resides in sorted order and sorted order is needed to perform range query(basically delete data in certain range). Otherwise(non-sorted), we would need to check each element and delete it which would cost us a DB call for each rem
         * 
         * score --> Set can contain different datatype, score helps set to sort them on the basis of score.
         * Ex:- set = {'Ritesh', 6, true} --> { score: 1 value: 'Ritesh', score: 2 value: 6, score: 3 value: true }
         */
        await redisClient.zRemRangeByScore(key, 0, windowTime);       

        // Total request
        const numberOfRequest = await redisClient.zCard(key);

        const startWindow = (Date.now() / 1000) - 10;
        const endWindow = Date.now() / 1000;
        
        // Throttle check ---> Time between two request :- 10sec
        const timeBetweenRequest = await redisClient.zCount(key, startWindow, endWindow);

        if(numberOfRequest > maxRequest || timeBetweenRequest > 0) {
            return res.status(STATUS.TOOMANYREQUEST).json(
                errorResponseBody('Too many request, try after sometime')
            );
        }

        // score can be duplicate but the value should be unique
        await redisClient.zAdd(key, [{score: currentTime, value: `${currentTime}:${crypto.randomBytes(8).toString('hex')}`}]);

        await redisClient.expire(key, windowSize);

        next();

    } catch (error) {
        console.log(error);
        
        next(error)
    }
}

module.exports = rateLimiter;