const express = require("express");
// const app = express();
// const session = require('express-session')
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const emailValidator = require('email-validator');
const con =  require("../setup").pool;
const emailTransporter =  require("../setup").emailTransporter;
const dotenv = require('dotenv');
const { MemoryStore } = require("express-session");
dotenv.config({path: __dirname + '/.env'});
// app.use(session({
// 	secret: process.env.SESSION_SECRET,
// 	resave: true,
// 	saveUninitialized: true
// }));

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
		const { firstname, surname, username, email, password} = req.body;
		con.getConnection(function(err, dbconn) {
			dbconn.execute('SELECT * FROM users WHERE username = ?', [username], function(err, result) {
				if(err) {
					// TODO Log error message
					console.log(err);
				} else {
					if (result.length == 0) {
						dbconn.execute("SELECT * FROM users WHERE email = ?", [email], function(err, result) {
							if (err) {
								// TODO Log error message
								console.log(err);
							} else {
								if (result.length === 0) {
									bcrypt.hash(password, 10, function(err, password) {
										if (err) {
											// TODO Log error message
											console.log(err);
										} else {
											// TODO create a token and insert it to database.
											let token = crypto.createHash('md5').update(username).digest("hex") + crypto.createHash('md5').update(email).digest("hex")
											console.log(token);
											dbconn.execute("INSERT INTO users (firstname, surname, username, email, password, token) VALUE (?, ?, ?, ?, ?, ?);", [firstname, surname, username, email, password, token], function(err, result) {
												if (err) {
													// TODO Log error message
													console.log(err);
												} else {
													if(result) {
														const mailOptions = {
															from: 'kaom.n.92@gmail.com',
															to: email,
															subject: 'Matcha account confirmation',
															text: 'Email content'
														};
														emailTransporter.sendMail(mailOptions, function(error, info){
															if (error) {
																// TODO Log error message
																console.log(error);
															} else {
																res.send(status);
															}
														});
													} else {
														console.log("error");
													}
												}
											});
										}
									});
								} else {
									res.send({"errorEmail": "Email taken!", "status": false});
								}
							}
						});
					} else {
						res.send({"errorUsername": "Username taken!", "status": false});
					}
				}
				con.releaseConnection(dbconn);
			});
		});
	} else {
		res.send(status);
	}
});

router.post("/login", (req, res) => {
	// Get all Session variables
	// req.sessionStore.all(function(error, session) {
	// 	console.log(session)
	// })

	const { username, password } = req.body;
	var status = {};
	if(username.trim().length === 0)
		Object.assign(status, {"errorUsername": "Username required!"});
	if(password.length === 0)
		Object.assign(status, {"errorPassword": "Password required!"});
	if(!("errorUsername" in status) && !("errorPassword" in status)) {
		con.getConnection(function(err, dbconn) {
			if (err) {
				// TODO Log error message
				console.log(err);
			} else {
				dbconn.execute('SELECT * FROM users WHERE username = ?', [username], function(err, result) {
					if (err) {
						// TODO Log error message
						console.log(err);
					} else {
						if(result.length === 0) {
							Object.assign(status, {"status": false, "error": "Wrong username/password"});
							res.send(status);
						} else {
							bcrypt.compare(password, result[0].password, function(err, bool) {
								if (err) {
									// TODO Log error message
									console.log(err);
								} else {
									if(bool) {
										req.session.username = result[0].username;
										req.session.id = result[0].pk_userid;
										req.session.firstname = result[0].firstname;
										req.session.surname = result[0].surname;
										req.session.email = result[0].email;
										req.session.rating = result[0].rating;
										req.session.verified = result[0].verified;
										Object.assign(status, {"status": true});
										res.send(status);
									} else {
										Object.assign(status, {"status": false, "error": "Wrong username/password"});
										res.send(status);
									}
								}
							});
						}
					}
				});
			}
		});
	} else {
		Object.assign(status, {"status": false});
		res.send(status);
	}
});

module.exports = router;