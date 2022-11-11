const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

router.post("/register", (req, res) => {
	function validateInput(error) {
		const { firstname, surname, username, email, password, passwordConfirm} = req.body;
		const rePassword = /\d|[A-Z]/;
		const reUsername = /^[a-zA-Z0-9\-\_]+$/;
		if(firstname.trim().length === 0)
			Object.assign(error, {"errorFirstname": "Firstname required!"});
		else if (firstname.trim().length > 50)
			Object.assign(error, {"errorFirstname": "Firstname too long! Max 50 characters!"});
		if(surname.trim().length === 0)
			Object.assign(error, {"errorSurname": "Surname required!"});
		else if (surname.trim().length > 50)
			Object.assign(error, {"errorSurname": "Surname too long! Max 50 characters!"});
		if(username.trim().length === 0)
			Object.assign(error, {"errorUsername": "Username required!"});
		else if (username.trim().length > 20)
			Object.assign(error, {"errorUsername": "Username too long! Max 20 characters!"});
		else if(username.trim().length < 4)
			Object.assign(error, {"errorUsername": "Username minimum length of 4!"});
		else if(!reUsername.test(username))
			Object.assign(error, {"errorUsername": "Username only 'a-z', '0-9', '-' and '_'"});
		if(email.trim().length === 0)
			Object.assign(error, {"errorEmail": "Email required!"});
		else if (email.trim().length > 50)
			Object.assign(error, {"errorEmail": "Email too long! Max 50 characters!"});
		else if (!emailValidator.validate(email))
			Object.assign(error, {"errorEmail": "Invalid Email address!"});
		if(password.trim().length === 0)
			Object.assign(error, {"errorPassword": "Password required!"});
		else if (password.length > 50)
			Object.assign(error, {"errorPassword": "Password too long! Max 255 characters!"});
		else if (password.length < 8)
			Object.assign(error, {"errorPassword": "Password minimum length of 8!"});
		else if(!rePassword.test(password))
			Object.assign(error, {"errorPassword": "Password needs to include atleast an uppercase letter or number!"});
		if(passwordConfirm.length === 0)
			Object.assign(error, {"errorPasswordConfirm": "Password Confirm required!"});
		else if (passwordConfirm.length > 50)
			Object.assign(error, {"errorPasswordConfirm": "Password confirm too long! Max 255 characters!"});
		else if (passwordConfirm.length < 8)
			Object.assign(error, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
		else if(!rePassword.test(passwordConfirm))
			Object.assign(error, {"errorPasswordConfirm": "Password needs to include atleast an uppercase letter or number!"});
		if(password !== passwordConfirm) {
			Object.assign(error, {"errorPassword": "Password did not match!"});
			Object.assign(error, {"errorPasswordConfirm": "Password did not match!"});
		}
		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			Object.assign(error, {"status": true});
			return true;
		} else {
			Object.assign(error, {"status": false});
			return false;
		}
	}
	
	var status = {};
	if(validateInput(status)) {
		const con =  require("../db").pool;
		const { firstname, surname, username, email, password, passwordConfirm} = req.body;
		con.getConnection(function(err, dbconn) {
			dbconn.execute('SELECT * FROM users WHERE username = ?', [username], function(err, result) {
				if (result.length == 0) {
					dbconn.execute("SELECT * FROM users WHERE email = ?", [email], function(err, result) {
						if (result.length === 0) {
							bcrypt.hash(password, 10, function(err, hash) {
								console.log(hash)
								dbconn.execute("INSERT INTO users (firstname, surname, username, email, password) VALUE (?, ?, ?, ?, ?);", [firstname, surname, username, email, hash], function(err, result) {
									if(result) {
										const transporter = nodemailer.createTransport({
											service: 'Gmail',
											auth: {
												user: process.env.APP_EMAIL,
												pass: process.env.APP_PASSWORD,
											}
										});
										const mailOptions = {
											from: 'kaom.n.92@gmail.com',
											to: email,
											subject: 'Matcha account confirmation',
											text: 'Email content'
										};
										transporter.sendMail(mailOptions, function(error, info){
											if (error) {
												console.log(error);
											} else {
												res.send(status)
											}
										});
									} else {
										console.log("error")
									}
								});
							});
						} else {
							res.send({"errorEmail": "Email taken!", "status": false});
						}
					});
				} else {
					res.send({"errorUsername": "Username taken!", "status": false});
				}
				con.releaseConnection(dbconn);
			});
		});
	} else {
		res.send(status);
	}
});

module.exports = router;