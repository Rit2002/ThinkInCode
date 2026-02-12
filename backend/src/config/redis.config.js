const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('error', err => console.log(`Redis Client Error : ${err}`));

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Successfully connected to redis DB');
        
    } catch (error) {
        console.log('Failed to connect : ' + error);        
    }
}


module.exports = {
    redisClient,
    connectRedis
};