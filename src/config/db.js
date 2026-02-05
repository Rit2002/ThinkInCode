const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Successfully Connected to mongoDB Compass`);    
}

module.exports = main;