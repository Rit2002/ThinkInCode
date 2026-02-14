// core modules
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// custom modules
const main = require('./config/db.config');
const authRouter = require('./routes/auth.route');
const { connectRedis } = require('./config/redis.config');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/tic/api/v1/auth', authRouter);


const initializeConnection = async () => {
    try {
        await Promise.all([
            connectRedis(),
            main()
        ]);      

        app.listen(process.env.PORT, () => {
            console.log(`Server started at localhost:${process.env.PORT}`);
        });

    } catch (error) {
        console.log(error);        
    }
}

initializeConnection();