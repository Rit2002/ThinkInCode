// core modules
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// custom modules
const main = require('./config/db.config');
const authRouter = require('./routes/auth.route');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/TIC/api/v1', authRouter);

main()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started at localhost:${process.env.PORT}`);
        });
    })
    .catch( err => console.log('Error : ' + err));