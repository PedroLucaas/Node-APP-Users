const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = require("./src/database/connect");
connectToDatabase();
require("./modules/express");