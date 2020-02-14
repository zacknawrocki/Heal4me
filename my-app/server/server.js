const express = require("express");
const connectDB = require("./config/db");

// Instantiate Express
const app = express();

connectDB();