const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

router.post("/login", (req, res) => {
});

module.exports = router;