const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Success");
    } catch (err) {
        console.log("Fail");
    }
}

module.exports = {connect};
