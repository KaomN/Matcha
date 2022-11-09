const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

router.post("/register", async (req, res) => {
	const con = await require("../../db.js");
	const { firstname, surname, username, email, password } = req.body;
	console.log("firstname:",firstname, "surname:",surname, "username:",username, "email:",email, "password:",password);
});

module.exports = router;