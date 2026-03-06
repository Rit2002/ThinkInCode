// core modules
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// custom modules
const main = require('./config/db.config');
const { connectRedis } = require('./config/redis.config');
const authRoutes = require('./routes/auth.route');
const problemRoutes = require('./routes/problem.route');
const submissionRoutes = require('./routes/submission.route');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/tic/api/v1/auth', authRoutes);
app.use('/tic/api/v1/problem', problemRoutes);
app.use('/tic/api/v1/', submissionRoutes)


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