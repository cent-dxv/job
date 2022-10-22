const mongoose = require("mongoose");
require("dotenv").config();

require("dotenv").config;
const connect = async () => mongoose.connect(process.env.MONGODB_JOB_URL);

module.exports = connect;
