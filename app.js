// app.js
const express = require("express");
const cors = require("cors");
const xssMiddleware = require("./middleware/xssMiddleware");
const path = require("path");
const helmet = require("helmet");
const router = require("./routes/router");
require('dotenv').config();

const app = express();


//
const PORT = process.env.PORT || 3999;
const HOST = process.env.HOST || 'http://localhost';
const URL = process.env.URL || 'http://localhost';
const STATIC_DIR = process.env.STATIC_DIR || 'public';
const API_PREFIX = process.env.API_PREFIX || '/api';

///
app.disable('x-powered-by');
// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(STATIC_DIR));
// Input sanitization
app.use(xssMiddleware);
app.set("view engine", "ejs");
// CORS config
// app.use(
//   cors({
//     origin: URL,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// Tool Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use(API_PREFIX, router);

//server listien
app.listen(PORT, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});
