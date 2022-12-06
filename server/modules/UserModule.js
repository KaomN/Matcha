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
router.post("/register", async (req, res) => {
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
		try {
			var result = await con.execute('SELECT * FROM users WHERE username = ?', [username])
			if(result[0].length === 0) {
				result = await con.execute("SELECT * FROM users WHERE email = ?", [email])
				if (result[0].length === 0) {
					const hash = await bcrypt.hash(password, 10);
					let token = crypto.createHash('md5').update(username).digest("hex") + crypto.createHash('md5').update(email).digest("hex")
					result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token) VALUE (?, ?, ?, ?, ?, ?);", [firstname, surname, username, email, hash, token])
					if (result) {
						const mailOptions = {
							from: 'kaom.n.92@gmail.com',
							to: email,
							subject: 'Matcha account confirmation',
							text: 'Please follow the link below to verify your account.\n' + 'http://localhost:3000?verification=' + token
						};
						result = await emailTransporter.sendMail(mailOptions);
						if (result.messageId) {
							res.send(status);
						} else {
							res.send({status: false, message: "Server connection error"});
						}
					} else {
						res.send({status: false, message: "Server connection error"});
					}
				} else {
					res.send({errorEmail: "Email taken!", "status": false});
				}
			} else {
				res.send({errorUsername: "Username taken!", "status": false});
			}
		} catch {
			res.send({status: false, message: "Server connection error"});
		}
	} else {
		res.send(status);
	}
});

// Login request
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	let status = {};
	try {
		var [rows, fields] = await con.execute('SELECT * FROM users WHERE username = ?', [username])
		if(rows[0].length !== 0) {
			if(rows[0].verified === 0) {
				res.send({"status": false, "verified": false});
			} else {
				const match = await bcrypt.compare(password, rows[0].password)
				if(match) {
					req.session.username = rows[0].username;
					req.session.userid = rows[0].pk_userid;
					req.session.firstname = rows[0].firstname;
					req.session.surname = rows[0].surname;
					req.session.email = rows[0].email;
					req.session.rating = rows[0].rating;
					req.session.token = rows[0].token;
					req.session.verified = rows[0].verified;
					req.session.gender = rows[0].gender
					req.session.preference = rows[0].genderpreference
					req.session.latitude = rows[0].latitude
					req.session.longitude = rows[0].longitude
					// Creating User folder
					if (!fs.existsSync(__dirname.slice(0, -8) + "/uploads/" + req.session.username)){
						fs.mkdirSync(__dirname.slice(0, -8) + "/uploads/" + req.session.username);
					}
					if(rows[0].profile === 1)
						Object.assign(status, {status: true, profile: true});
					else
						Object.assign(status, {status: true, profile: false});
					// res.cookie("sessionId", req.session.id, {
					// 	secure: true,
					// 	httpOnly: true,
					// 	sameSite: "none",
					// }).send(status);
					res.send(status)
					//res.send(status)
				} else {
					res.send({status: false, error: "Incorrect username/password"});
				}
			}
		} else {
			res.send({status: false, error: "Incorrect username/password"});
		}
	} catch {
		res.send({status: false, message: "Server connection error"});
	}
});

// Get login status
router.get("/getloginstatus", async (req, res) => {
	// Testing Session cookies
	// Add maxAge to session cookies? to persists login even if browser is closed.
	// How long should session cookies be kept? 1day 1week 1month?
	//console.log("Cookies", req.cookies)
	//console.log(req.session.username)
	if (req.session.username != undefined)
		res.send({username:req.session.username, auth:true})
	else
		res.send({ auth:false })
});


// Logout
router.get("/logout", (req, res) => {
	try {
		req.sessionStore.destroy(req.session.id, function(err) {
			res.send({status: true});
		})
	} catch {
		res.send({status: false, message: "Server connection error"});
	}
});

router.get("/test", async (req, res) => {
	//console.log(req.session.preference)

	function distance(lat1, lng1, lat2, lng2) {
		lng1 =  lng1 * Math.PI / 180;
		lng2 = lng2 * Math.PI / 180;
		lat1 = lat1 * Math.PI / 180;
		lat2 = lat2 * Math.PI / 180;

		let dlon = lng2 - lng1;
		let dlat = lat2 - lat1;
		 // Haversine formula
		let a = Math.pow(Math.sin(dlat / 2), 2)
				+ Math.cos(lat1) * Math.cos(lat2)
				* Math.pow(Math.sin(dlon / 2),2);
			
		let c = 2 * Math.asin(Math.sqrt(a));

		// Radius of earth in kilometers. Use 3956 for miles
		let r = 6371;

		// calculate the result
		return(parseInt(c * r));
	}

	try {
		if (req.session.preference === "both") {
			
		} else {
			// Get all users that match with users gender preference
			var [rows, fields] = await con.execute('SELECT username, age, firstname, surname, latitude, longitude FROM users WHERE NOT pk_userid = ? AND gender = ? AND genderpreference = ? OR genderpreference = "both" AND NOT gender = ?', [req.session.userid, req.session.preference, req.session.gender, req.session.gender])
			//var [rows, fields] = await con.execute('SELECT * FROM users WHERE NOT pk_userid = ? AND gender = ?', [req.session.userid, req.session.preference])
			// calculate distance between user1 and user2
			for (const user of rows) {
				user.distance = distance(req.session.latitude, req.session.longitude, user.latitude, user.longitude) + " km away"
				console.log(distance(req.session.latitude, req.session.longitude, user.latitude, user.longitude))
			}
			console.log(rows)
		}
		res.send(rows)
	} catch (err) {
		console.log(err)
		res.send({status: false, message: "Server connection error"});
	}
});

// Verify account request
router.post("/verify", async (req, res) => {
	try {
		var [rows, fields] = await con.execute('SELECT * FROM users WHERE token = ?', [req.body.token])
		console.log(rows)
		if(rows[0].length === 0) {
			res.send({"status": false});
		} else if (rows[0].verified === 0) {
			var result = await con.execute("UPDATE users SET users.VERIFIED = 1 WHERE token = ?;", [req.body.token])
				if (result) {
					res.send({"status": true, "verified": false});
				} else {
					res.send({status: false, message: "Server connection error"});
				}
		} else {
			res.send({"status": true, "verified": true});
		}
	} catch {
		res.send({status: false, message: "Server connection error"});
	}
});

// Forgot password request
router.post("/forgotpassword", async (req, res) => {
	let status = {};
	let email = req.body.email;
	if(email.trim().length === 0)
		Object.assign(status, {"errorEmail": "Email required!"});
	else if (email.trim().length > 100)
		Object.assign(status, {"errorEmail": "Email too long! Max 100 characters!"});
	else if (!emailValidator.validate(email))
		Object.assign(status, {"errorEmail": "Invalid Email address!"});
	if(status && Object.keys(status).length === 0 && Object.getPrototypeOf(status) === Object.prototype) {
		try {
			var [rows, fields] = await con.execute('SELECT * FROM users WHERE email = ?', [email])
			if (rows[0].length !== 0) {
				const token = crypto.createHash('md5').update(rows[0].token).digest("hex") + crypto.createHash('md5').update(String(Date.now())).digest("hex")
				var result = await con.execute('INSERT INTO usertokens (pk_userid, passwordresettoken, passwordresetexpr) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE passwordresettoken = VALUES(passwordresettoken), passwordresetexpr = VALUES(passwordresetexpr)', [rows[0].pk_userid, token, Math.floor(Date.now() / 1000)])
				if (result) {
					const mailOptions = {
						from: 'kaom.n.92@gmail.com',
						to: email,
						subject: 'Matcha password reset request',
						text: 'Please follow the link below to reset account password.\n' + 'http://localhost:3000/passwordreset?token=' + token
					};
					result = await emailTransporter.sendMail(mailOptions)
						if (result.messageId) {
							res.send({"status": true, "message": "An email has been sent to " + email + ". Please follow instructions on the email to reset your password!"});
						} else {
							res.send({status: false, message: "Server connection error"});
						}
				} else {
					res.send({status: false, message: "Server connection error"});
				}
			} else {
				res.send({"status": true, "message": "An email has been sent to " + email + ". Please follow instructions on the email to reset your password!"});
			}
		} catch {
			res.send({status: false, message: "Server connection error"});
		}
	} else {
		Object.assign(status, {"status": false});
		res.send(status)
	}
});

// Password reset request
router.post("/passwordreset", async (req, res) => {
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
		try {
			var [rows, fields] = await con.execute('SELECT * FROM usertokens WHERE passwordresettoken = ?', [token])
			if (rows[0].length !== 0) {
				if(rows[0].passwordresetexpr + 86400 > Date.now() / 1000) {
					const hash = await bcrypt.hash(password, 10);
					var result = await con.execute('UPDATE users SET password = ? WHERE pk_userid = ?', [hash, rows[0].pk_userid])
					if (result) {
						result = await con.execute('DELETE FROM usertokens WHERE pk_userid = ?', [rows[0].pk_userid])
						if (result) {
							res.send({"status": true, "message": "Password reset!"})
						} else {
							res.send({status: false, message: "Server connection error"});
						}
					} else {
						res.send({status: false, message: "Server connection error"});
					}
				} else {
					res.send({"status": false, "error": "Password reset link expired!"})
				}
			} else {
				res.send({"status": false, "error": "Please follow the link you received on your email to reset your account password"})
			}
		} catch {
			res.send({status: false, message: "Server connection error"});
		}
	} else {
		Object.assign(status, {"status": false});
		res.send(status)
	}
});

// Google Location API
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

// Complete profile on First login.
router.post("/completeprofile", async (req, res) => {
	//console.log(__dirname.slice(0, -7) + "uploads")
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
			try {
				// Pictures
				var uploadPath = __dirname.slice(0, -7) + "uploads" + "/kaom/" // Change to username later
				for (let imageName in req.files) {
					if (imageName === "profilePicture") {
						// Uploads Profile picture to server.
						if(uploadProfilePicture(req.files[imageName], uploadPath)) {
							var profileId = 1;
							var profileName = "profile.jpg"
							var result = await con.execute('INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, ?, ?)', [req.session.userid, profileId, profileName])
							//console.log(result)
							if (!result) {
								Object.assign(error, {error: "Something went wrong!"});
							}
						}
					} else {
						if(uploadPictures(req.files[imageName], uploadPath, imageName)) {
								var profileName = imageName + ".jpg"
								var result = await con.execute('INSERT INTO images (fk_userid, imagename) VALUES (?, ?)', [req.session.userid, profileName])
								if (!result) {
									Object.assign(error, {error: "Something went wrong!"});
								}
						}
					}
				}
				// Interest
				if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
					const interestArr = interest.split(' ')
					for (const interest of interestArr) {
						var [rows, fields] = await con.execute('SELECT * FROM tag WHERE tag = ?', [interest])
						if (!rows[0]) {
							var result = await con.execute('INSERT INTO tag (tag) VALUES (?)', [interest])
							var result = await con.execute('INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, ?) ON DUPLICATE KEY UPDATE tagitem.fk_tagid = tagitem.fk_tagid', [req.session.userid, result[0].insertId])
							if (!result) {
								Object.assign(error, {error: "Something went wrong!"});
							}
						} else {
							var [rows, fields] = await con.execute('SELECT * FROM tag WHERE tag = ?', [interest])
							var result = await con.execute('INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, ?) ON DUPLICATE KEY UPDATE tagitem.fk_tagid = tagitem.fk_tagid', [req.session.userid, rows[0].pk_tagid])
							if (!result) {
								Object.assign(error, {error: "Something went wrong!"});
							}
						}
					}
				} else {
					res.send(error);
				}
				// User info
				if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
					var result = await con.execute('UPDATE users SET users.gender = ?, users.age = ?, users.dateofbirth = ?, users.genderpreference = ?, users.biography = ?, users.latitude = ?, users.longitude = ?, users.profile = 1 WHERE users.pk_userid = ?', [gender, age, birthDate, preference, biography, locationLat, locationLng, req.session.userid])
					if (!result) {
						Object.assign(error, {error: "Something went wrong!"});
					} else {
						req.session.gender = gender
						req.session.preference = preference
						res.send({status:true})
					}
				} else {
					res.send(error);
				}
			} catch (err) {
				console.log(err)
				res.send({status: false, message: "Server connection error"});
			}
		}
	} else {
		res.send(error);
	}
});

module.exports = router;