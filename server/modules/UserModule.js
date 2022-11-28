const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const emailValidator = require('email-validator');
const con = require("../setup").pool;
const emailTransporter =  require("../setup").emailTransporter;
var fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

// Register request
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
		else if (email.trim().length > 100)
			Object.assign(error, {"errorEmail": "Email too long! Max 100 characters!"});
		else if (!emailValidator.validate(email))
			Object.assign(error, {"errorEmail": "Invalid Email address!"});
		if(password.trim().length === 0)
			Object.assign(error, {"errorPassword": "Password required!"});
		// else if (password.length > 50)
		// 	Object.assign(error, {"errorPassword": "Password too long! Max 255 characters!"});
		// else if (password.length < 8)
		// 	Object.assign(error, {"errorPassword": "Password minimum length of 8!"});
		// else if(!rePassword.test(password))
		// 	Object.assign(error, {"errorPassword": "Password needs to include atleast an uppercase letter or number!"});
		if(passwordConfirm.length === 0)
			Object.assign(error, {"errorPasswordConfirm": "Password Confirm required!"});
		// else if (passwordConfirm.length > 50)
		// 	Object.assign(error, {"errorPasswordConfirm": "Password confirm too long! Max 255 characters!"});
		// else if (passwordConfirm.length < 8)
		// 	Object.assign(error, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
		// else if(!rePassword.test(passwordConfirm))
		// 	Object.assign(error, {"errorPasswordConfirm": "Password needs to include atleast an uppercase letter or number!"});
		// if(password !== passwordConfirm) {
		// 	Object.assign(error, {"errorPassword": "Password did not match!"});
		// 	Object.assign(error, {"errorPasswordConfirm": "Password did not match!"});
		// }
		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			Object.assign(error, {"status": true});
			return true;
		} else {
			Object.assign(error, {"status": false});
			return false;
		}
	}
	let status = {};
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
															text: 'Please follow the link below to verify your account.\n' + 'http://localhost:3000?verification=' + token
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

// Login request
router.post("/login", (req, res) => {
	// Get all Session variables
	// req.sessionStore.all(function(error, session) {
	// 	console.log(session)
	// })

	const { username, password } = req.body;
	let status = {};
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
						res.send({"status": false, "error": "Incorrect username/password"});
					} else {
						if(result[0].verified === 0) {
							res.send({"status": false, "verified": false});
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
										req.session.token = result[0].token;
										req.session.verified = result[0].verified;
										// Creating User folder
										if (!fs.existsSync(__dirname.slice(0, -8) + "/uploads/" + req.session.username)){
											fs.mkdirSync(__dirname.slice(0, -8) + "/uploads/" + req.session.username);
										}
										if(result[0].profile === 1)
											Object.assign(status, {status: true, profile: true, auth: result[0].token});
										else
											Object.assign(status, {status: true, profile: false, auth: result[0].token});
										res.send(status);
									} else {
										res.send({"status": false, "error": "Incorrect username/password"});
									}
								}
							});
						}
					}
				}
			});
		}
		con.releaseConnection(dbconn);
	});
});

router.post("/verify", (req, res) => {
	con.getConnection(function(err, dbconn) {
		if (err) {
			// TODO Log error message
			console.log(err);
		} else {
			dbconn.execute('SELECT * FROM users WHERE token = ?', [req.body.token], function(err, result) {
				if (err) {
					// TODO Log error message
					console.log(err);
				} else {
					if(result.length === 0) {
						res.send({"status": false});
					} else if (result[0].verified === 0) {
						dbconn.execute("UPDATE users SET users.VERIFIED = 1 WHERE token = ?;", [req.body.token], function(err, result) {
							if (err) {
								// TODO Log error message
								console.log(err);
							} else {
								res.send({"status": true, "verified": false});
							}
						});
						
					} else {
						res.send({"status": true, "verified": true});
					}
				}
			});
		}
		con.releaseConnection(dbconn);
	});
});

// Forgot password request
router.post("/forgotpassword", (req, res) => {
	let status = {};
	let email = req.body.email;
	if(email.trim().length === 0)
		Object.assign(status, {"errorEmail": "Email required!"});
	else if (email.trim().length > 100)
		Object.assign(status, {"errorEmail": "Email too long! Max 100 characters!"});
	else if (!emailValidator.validate(email))
		Object.assign(status, {"errorEmail": "Invalid Email address!"});
	if(status && Object.keys(status).length === 0 && Object.getPrototypeOf(status) === Object.prototype) {
		con.getConnection(function(err, dbconn) {
			if (err) {
				// TODO Log error message
				console.log(err);
			} else {
				dbconn.execute('SELECT * FROM users WHERE email = ?', [email], function(err, result) {
					if (err) {
						// TODO Log error message
						console.log(err);
					} else {
						if (result.length === 0) {
							res.send({"status": true, "message": "An email has been sent to " + email + ". Please follow instructions on the email to reset your password!"});
						} else {
							var token = crypto.createHash('md5').update(result[0].token).digest("hex") + crypto.createHash('md5').update(String(Date.now())).digest("hex")
							dbconn.execute('INSERT INTO usertokens (pk_userid, passwordresettoken, passwordresetexpr) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE passwordresettoken = VALUES(passwordresettoken), passwordresetexpr = VALUES(passwordresetexpr)', [result[0].pk_userid, token, Math.floor(Date.now() / 1000)], function(err, result) {
								if (err) {
									// TODO Log error message
									console.log(err);
								} else {
									const mailOptions = {
										from: 'kaom.n.92@gmail.com',
										to: email,
										subject: 'Matcha password reset request',
										text: 'Please follow the link below to reset account password.\n' + 'http://localhost:3000/passwordreset?token=' + token
									};
									emailTransporter.sendMail(mailOptions, function(error, info){
										if (error) {
											// TODO Log error message
											console.log(error);
										} else {
											res.send({"status": true, "message": "An email has been sent to " + email + ". Please follow instructions on the email to reset your password!"});
										}
									});
								}
							});
						}
					}
				});
			}
			con.releaseConnection(dbconn);
		});
	} else {
		Object.assign(status, {"status": false});
		res.send(status)
	}
});

// Password reset request
router.post("/passwordreset", (req, res) => {
	let status = {};
	const {password, passwordConfirm, token} = req.body;
	if(password.trim().length === 0)
		Object.assign(status, {"errorPassword": "Password required!"});
	// else if (password.length > 50)
	// 	Object.assign(status, {"errorPassword": "Password too long! Max 255 characters!"});
	// else if (password.length < 8)
	// 	Object.assign(status, {"errorPassword": "Password minimum length of 8!"});
	// else if(!rePassword.test(password))
	// 	Object.assign(status, {"errorPassword": "Password needs to include atleast an uppercase letter or number!"});
	if(passwordConfirm.length === 0)
		Object.assign(status, {"errorPasswordConfirm": "Password Confirm required!"});
	// else if (passwordConfirm.length > 50)
	// 	Object.assign(status, {"errorPasswordConfirm": "Password confirm too long! Max 255 characters!"});
	// else if (passwordConfirm.length < 8)
	// 	Object.assign(status, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
	// else if(!rePassword.test(passwordConfirm))
	// 	Object.assign(status, {"errorPasswordConfirm": "Password needs to include atleast an uppercase letter or number!"});
	// if(password !== passwordConfirm) {
	// 	Object.assign(status, {"errorPassword": "Password did not match!"});
	// 	Object.assign(status, {"errorPasswordConfirm": "Password did not match!"});
	// }
	if(status && Object.keys(status).length === 0 && Object.getPrototypeOf(status) === Object.prototype) {
		con.getConnection(function(err, dbconn) {
			if (err) {
				// TODO Log error message
				console.log(err);
			} else {
				dbconn.execute('SELECT * FROM usertokens WHERE passwordresettoken = ?', [token], function(err, result) {
					if(result.length === 0) {
						res.send({"status": false, "error": "Please follow the link you received on your email to reset your account password"})
					} else {
						if(result[0].passwordresetexpr + 86400 > Date.now() / 1000) {
							var id = result[0].pk_userid
							bcrypt.hash(password, 10, function(err, password) {
								dbconn.execute('UPDATE users SET password = ? WHERE pk_userid = ?', [password, id], function(err, result) {
									if (err) {
										// TODO Log error message
										console.log(err);
									} else {
										dbconn.execute('DELETE FROM usertokens WHERE pk_userid = ?', [id], function(err, result) {
											if (err) {
												// TODO Log error message
												console.log(err);
											} else {
												res.send({"status": true, "message": "Password reset!"})
											}
										});
									}
								});
							});
						} else {
							res.send({"status": false, "error": "Password reset link expired!"})
						}
					}
				});
			}
			con.releaseConnection(dbconn);
		});
	} else {
		Object.assign(status, {"status": false});
		res.send(status)
	}
});

router.post("/getlocation", async (req, res) => {
	try {
		const response = await axios({
			method: 'post',
			url:'https://www.googleapis.com/geolocation/v1/geolocate?key=' + process.env.API_KEY
		});
		Object.assign(response.data, {"status": true});
		console.log(response.data)
		res.send(response.data)
	} catch (error) {
		res.send({status: false, msg: "Error fetching API location data"})
	}
});

router.post("/getloginstatus", async (req, res) => {
	if (req.session.username != undefined)
		res.send({username:req.session.username, auth:true})
	else
		res.send({username:"", auth:false})
});

router.post("/completeprofile", async (req, res) => {
	//console.log(req.files);
	//console.log(req.body);
	const {age, birthDate, gender, preference, biography, locationLat, locationLng, interest} = req.body;
	var error = {};
	function uploadProfilePicture(profilePic, path) {
		path += "profile.jpg"
		profilePic.mv(path, function(err) {
			if (err)
				return false;
		});
		return true;
	}

	function uploadPictures(picture, path, picturename) {
		path += picturename + ".jpg"
		picture.mv(path, function(err) {
			if (err)
				return false;
		});
		return true;
	}
	// Check Images
	for (let imageName in req.files) {
		let ext = req.files[imageName].name.split(".").pop();
		let mime = req.files[imageName].mimetype;
		if (mime != "image/jpeg" && mime != "image/png") {
			Object.assign(error, {"mime": "Mimetype Error!"});
		}
		if (mime === "image/jpeg") {
			if(ext != "jpg" && ext != "jpeg") {
				Object.assign(error, {"extension": "Extension Error!"});
			}
		} else if (mime === "image/png") {
			if(ext != "png") {
				Object.assign(error, {"extension": "Extension Error!"});
			}
		}
	}

	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		if(!req.files) {
			res.send({status:false, message:"empty"});
		} else {
			var uploadPath = dir + "/kaom/"
			for (let imageName in req.files) {
				if (imageName === "profilePicture") {
					if(uploadProfilePicture(req.files[imageName], uploadPath)) {
						con.getConnection(function(err, dbconn) {
							if (err) {
								Object.assign(error, {error: "Something went wrong!"});
							} else {
								// change ID to session id
								var id = 1;
								dbconn.execute('SELECT * FROM images WHERE images.imagename = "profile.jpg" AND images.fk_userid = ?', [id], function(err, result) {
									if (err) {
										Object.assign(error, {error: "Something went wrong!"});
									} else if(!result[0]) {
										var id = 1;
										var profileId = 1;
										var profileName = "profile.jpg"
										dbconn.execute('INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, ?, ?)', [id, profileId, profileName], function(err, result) {
											if (err) {
												Object.assign(error, {error: "Something went wrong!"});
											}
										});
									}
								});
							}
							con.releaseConnection(dbconn);
						});
					}
				} else {
					if(uploadPictures(req.files[imageName], uploadPath, imageName)) {
						con.getConnection(function(err, dbconn) {
							if (err) {
								Object.assign(error, {error: "Something went wrong!"});
							} else {
								dbconn.execute('SELECT * FROM images WHERE images.imagename = ? AND images.fk_userid = ?', [imageName, id], function(err, result) {
									if (err) {
										Object.assign(error, {error: "Something went wrong!"});
									} else if(!result[0]) {
										// change ID to session id
										var id = 1;
										var profileName = imageName + ".jpg"
										dbconn.execute('INSERT INTO images (fk_userid, imagename) VALUES (?, ?)', [id, profileName], function(err, result) {
											if (err) {
												Object.assign(error, {error: "Something went wrong!"});
											}
										});
									}
								});
							}
							con.releaseConnection(dbconn);
						});
					}
				}
			}
		}

		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			const interestArr = interest.split(' ')
			for (const interest of interestArr) {
				con.getConnection(function(err, dbconn) {
					if (err) {
						Object.assign(error, {error: "Something went wrong!"});
					} else {
						dbconn.execute('SELECT * FROM tag WHERE tag = ?', [interest], function(err, result) {
							if(err) {
								Object.assign(error, {error: "Something went wrong!"});
							} else if(!result[0]) {
								dbconn.execute('INSERT INTO tag (tag) VALUES (?)', [interest], function(err, result) {
										if(err) {
											Object.assign(error, {error: "Something went wrong!"});
										} else {
											var tagId = result.insertId
											dbconn.execute('SELECT * FROM tagitem WHERE fk_userid = ? AND fk_tagid = ?', [1, tagId], function(err, result) {
												if (err) {
													Object.assign(error, {error: "Something went wrong!"});
												} else if(!result[0]) {
													dbconn.execute('INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, ?) ON DUPLICATE KEY UPDATE tagitem.fk_tagid = tagitem.fk_tagid', [1, tagId], function(err, result) {
														if (err) {
															Object.assign(error, {error: "Something went wrong!"});
														}
													});
												}
											});
										}
									});
							} else {
								var tagId = result[0].pk_tagid
								dbconn.execute('SELECT * FROM tagitem WHERE fk_userid = ? AND fk_tagid = ?', [1, tagId], function(err, result) {
									if (err) {
										Object.assign(error, {error: "Something went wrong!"});
									} else if(!result[0]) {
										dbconn.execute('INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, ?) ON DUPLICATE KEY UPDATE tagitem.fk_tagid = tagitem.fk_tagid', [1, tagId], function(err, result) {
											if (err) {
												Object.assign(error, {error: "Something went wrong!"});
											}
										});
									}
								});
							}
						});
					}
					con.releaseConnection(dbconn);
				});
			}
		} else {
			res.send(error);
		}

		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			con.getConnection(function(err, dbconn) {
				if (err) {
					Object.assign(error, {error: "Something went wrong!"});
				} else {
					// TODO change ID to session id
					var id = 1;
					dbconn.execute('UPDATE users SET users.gender = ?, users.age = ?, users.dateofbirth = ?, users.genderpreference = ?, users.biography = ?, users.latitude = ?, users.longitude = ?, users.profile = 1 WHERE users.pk_userid = ?', [gender, age, birthDate, preference, biography, locationLat, locationLng, id], function(err, result) {
						if(err) {
							Object.assign(error, {error: "Something went wrong!"});
						} else {
							res.send({"status":true});
						}
					});
				}
				con.releaseConnection(dbconn);
			});
		} else {
			res.send(error);
		}
	} else {
		res.send(error);
	}
});

module.exports = router;