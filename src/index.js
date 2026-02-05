const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const main = require('./config/db')

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

main()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started at localhost:${process.env.PORT}`);
        });
    })
    .catch( err => console.log('Error : ' + err));