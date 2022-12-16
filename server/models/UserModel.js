const bcrypt = require('bcrypt');
const crypto = require('crypto')
const con = require("../setup").pool;
const emailTransporter =  require("../setup").emailTransporter;
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ImageProcessing = require('../modules/ImageProcessing');
// const axios = require('axios');
// const dotenv = require('dotenv');
// dotenv.config({path: __dirname + '/.env'});

// Register request
const register = async (req) => {
	const { firstname, surname, username, email, password } = req.body;
	try {
		var [rows, fields] = await con.execute('SELECT * FROM users WHERE username = ?', [username])
		if(rows[0] === undefined) {
			var [rows, fields] = await con.execute("SELECT * FROM users WHERE email = ?", [email])
			if (rows[0] === undefined) {
				const hash = await bcrypt.hash(password, 10);
				let token = crypto.createHash('md5').update(username).digest("hex") + crypto.createHash('md5').update(email).digest("hex")
				result = await con.execute(`INSERT INTO users (firstname, surname, username, email, password, token)
											VALUE (?, ?, ?, ?, ?, ?);`,
											[firstname, surname, username, email, hash, token])
				if (result) {
					const mailOptions = {
						from: 'kaom.n.92@gmail.com',
						to: email,
						subject: 'Matcha account confirmation',
						text: 'Please follow the link below to verify your account.\n' + 'http://localhost:3000?verification=' + token
					};
					result = await emailTransporter.sendMail(mailOptions);
					if (result.messageId) {
						return ({status:true});
					} else {
						return ({status: false, message: "Server connection error"});
					}
				} else {
					return ({status: false, message: "Server connection error"});
				}
			} else {
				return ({errorEmail: "Email taken!", "status": false});
			}
		} else {
			return {errorUsername: "Username taken!", "status": false};
		}
	} catch {
		return ({status: false, message: "Server connection error"});
	}
}

const login = async (req) => {
	const { username, password } = req.body;
	try {
		var [rows, fields] = await con.execute(`SELECT *
												FROM users
												WHERE username = ?`,
												[username])
		if (rows[0] === undefined) {
			return ({status: false, error: "Incorrect username/password"});
		} else {
			if(rows[0].verified === 0) {
				return ({"status": false, "verified": false});
			} else {
				const match = await bcrypt.compare(password, rows[0].password)
				if(match) {
					// Check if there is already a session.
					// if (req.session.username) {
					// 	req.sessionStore.destroy(req.session.id, function(err) {
					// 		if(err)
					// 			console.log(err)
					// 	})
					// }
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
					req.session.authenticated = true;
					// Creating User folder
					if (!fs.existsSync(__dirname.slice(0, -7) + "/uploads/" + req.session.username)){
						fs.mkdirSync(__dirname.slice(0, -7) + "/uploads/" + req.session.username);
					}
					if(rows[0].profile === 1)
						return ({status: true, profile: true});
					else
					return ({status: true, profile: false});
				} else {
					return ({status: false, error: "Incorrect username/password"});
				}
			}
		}
	} catch (err) {
		//console.log(err)
		return ({status: false, message: "Server connection error"});
	}
}

// Verify account request
const verify = async (req) => {
	try {
		var [rows, fields] = await con.execute(`SELECT *
												FROM users
												WHERE token = ?`,
												[req.body.token])
		//console.log(rows)
		if(rows[0] === undefined) {
			return ({"status": false});
		} else if (rows[0].verified === 0) {
			var result = await con.execute("UPDATE users SET users.VERIFIED = 1 WHERE token = ?;", [req.body.token])
				if (result) {
					return ({"status": true, "verified": false});
				} else {
					return ({status: false, message: "Server connection error"});
				}
		} else {
			return ({"status": true, "verified": true});
		}
	} catch(err) {
		//console.log(err)
		return ({status: false, message: "Server connection error"});
	}
};

// Forgot password request
const forgotPassword = async (req, res) => {
	let email = req.body.email;
	try {
		var [rows, fields] = await con.execute(`SELECT *
												FROM users
												WHERE email = ?`,
												[email])
		if (rows[0] !== undefined) {
			const token = crypto.createHash('md5').update(rows[0].token).digest("hex") + crypto.createHash('md5').update(String(Date.now())).digest("hex")
			var result = await con.execute(`INSERT INTO usertokens (pk_userid, passwordresettoken, passwordresetexpr)
											VALUES (?, ?, ?)
											ON DUPLICATE KEY UPDATE passwordresettoken = VALUES(passwordresettoken), passwordresetexpr = VALUES(passwordresetexpr)`,
											[rows[0].pk_userid, token, Math.floor(Date.now() / 1000)])
			if (result) {
				const mailOptions = {
					from: 'kaom.n.92@gmail.com',
					to: email,
					subject: 'Matcha password reset request',
					text: 'Please follow the link below to reset account password.\n' + 'http://localhost:3000/passwordreset?token=' + token
				};
				result = await emailTransporter.sendMail(mailOptions)
					if (result.messageId) {
						return ({"status": true, "message": "An email has been sent to " + email + ". Please follow instructions on the email to reset your password!"});
					} else {
						return ({status: false, message: "Server connection error"});
					}
			} else {
				return ({status: false, message: "Server connection error"});
			}
		} else {
			return ({"status": true, "message": "An email has been sent to " + email + ". Please follow instructions on the email to reset your password!"});
		}
	} catch {
		return ({status: false, message: "Server connection error"});
	}
};

// Password reset request
const passwordReset = async (req) => {
	const { password, token } = req.body;
	try {
		var [rows, fields] = await con.execute(`SELECT *
												FROM usertokens
												WHERE passwordresettoken = ?`,
												[token])
		if (rows[0] !== undefined) {
			if(rows[0].passwordresetexpr + 86400 > Date.now() / 1000) {
				const hash = await bcrypt.hash(password, 10);
				var result = await con.execute(`UPDATE users
												SET password = ?
												WHERE pk_userid = ?`,
												[hash, rows[0].pk_userid])
				if (result) {
					result = await con.execute(`DELETE FROM usertokens
												WHERE pk_userid = ?`,
												[rows[0].pk_userid])
					if (result) {
						return ({"status": true, "message": "Password reset!"})
					} else {
						return ({status: false, message: "Server connection error"});
					}
				} else {
					return ({status: false, message: "Server connection error1"});
				}
			} else {
				return ({"status": false, "error": "Password reset link expired!"})
			}
		} else {
			return ({"status": false, "error": "Please follow the link you received on your email to reset your account password"})
		}
	} catch (err) {
		return ({status: false, message: "Server connection error2"});
	}
};

// Complete profile on First login.
const completeProfile = async (req, res) => {
	const { age, birthDate, gender, preference, biography, locationLat, locationLng, interest} = req.body;
	var error = {};
	// Upload Other Pictures, Move to settings page
	// function uploadPictures(picture, path, picturename) {
	// 	path += picturename + ".jpg"
	// 	picture.mv(path, function(err) {
	// 		if (err)
	// 			return false;
	// 	});
	// 	return true;
	// }

	try {
		// Pictures
		var profileImageName = uuidv4() + ".jpg"
		var profileImagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + profileImageName
		// Check if user has a profile image
		var [rows, fields] = await con.execute(`SELECT imagename
												FROM images
												WHERE fk_userid = ?`,
												[req.session.userid])
		if (rows[0] !== undefined) {
			// Get old profile image name
			const targetFile = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + rows[0].imagename
			// Process image with Sharp and save it in the server
			if(ImageProcessing.uploadProfileImage(req.files['profilePicture'].data, profileImagePath, req)) {
				// Update profile image on database
				result = await con.execute(`UPDATE images
										SET imagename = ?
										WHERE imagename = ?`,
										[ profileImageName, rows[0].imagename ])
				if (!result) {
					// If database update fails delete new image
					fs.unlinkSync(profileImageName)
					Object.assign(error, {error: "Something went wrong!"});
				}
				// Delete old profile image from server
				if (fs.existsSync(targetFile)) {
					fs.unlinkSync(targetFile)
				}
			} else {
				Object.assign(error, {error: "Something went wrong!"});
			}
		// User does not have a Profile iamge set on their profile
		} else {
			if(ImageProcessing.uploadProfileImage(req.files['profilePicture'].data, profileImagePath, req)) {
				var profileId = 1;
				var result = await con.execute(`INSERT INTO images(fk_userid, profilepic, imagename)
												VALUES (?, ?, ?)`,
												[req.session.userid, profileId, profileImageName])
				if (!result) {
					Object.assign(error, {error: "Something went wrong!"});
				}
			}
			Object.assign(error, {error: "Something went wrong!"});
		}
		//Interest
		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			const interestArr = interest.split(' ')
			for (const interest of interestArr) {
				var [rows, fields] = await con.execute(`SELECT *
														FROM tag
														WHERE tag = ?`,
														[interest])
				if (!rows[0]) {
					var result = await con.execute(`INSERT INTO tag (tag)
													VALUES (?)`,
													[interest])
					var result = await con.execute(`INSERT INTO tagitem (fk_userid, fk_tagid)
													VALUES (?, ?)
													ON DUPLICATE KEY UPDATE tagitem.fk_tagid = tagitem.fk_tagid`,
													[req.session.userid, result[0].insertId])
					if (!result) {
						Object.assign(error, {error: "Something went wrong!"});
					}
				} else {
					var [rows, fields] = await con.execute(`SELECT *
															FROM tag
															WHERE tag = ?`,
															[interest])
					var result = await con.execute(`INSERT INTO tagitem (fk_userid, fk_tagid)
													VALUES (?, ?)
													ON DUPLICATE KEY UPDATE tagitem.fk_tagid = tagitem.fk_tagid`,
													[req.session.userid, rows[0].pk_tagid])
					if (!result) {
						Object.assign(error, {error: "Something went wrong!"});
					}
				}
			}
		} else {
			return (error);
		}
		// User info
		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			var result = await con.execute(`UPDATE users
											SET users.gender = ?, users.age = ?, users.dateofbirth = ?, users.genderpreference = ?, users.biography = ?, users.latitude = ?, users.longitude = ?, users.profile = 1
											WHERE users.pk_userid = ?`,
											[gender, age, birthDate, preference, biography, locationLat, locationLng, req.session.userid])
			if (!result) {
				Object.assign(error, {error: "Something went wrong!"});
			} else {
				req.session.gender = gender
				req.session.preference = preference
				req.session.latitude = locationLat
				req.session.longitude = locationLng
				req.session.age = age
				req.session.interest = interest
				return ({status:true})
			}
		} else {
			return (error);
		}
	} catch (err) {
		console.log(err)
		return ({status: false, message: "Server connection error"});
	}
};

const getUserInfo = async (req) => {
	var [rows, fields] = await con.execute(`SELECT imagename
											FROM images
											WHERE fk_userid = ?`,
											[req.session.userid])
	if (rows[0] !== undefined) { // "http://localhost:3001/images/" + req.session.username + "/" + rows[0].imagename
		var profileImagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + rows[0].imagename
			if (fs.existsSync(profileImagePath)) {
				return ({ auth: true , username: req.session.username, isLoading: false, imageSrc: profileImagePath})

			}
		return ({ auth: true , username: req.session.username, isLoading: false, imageSrc: "http://localhost:3001/images/defaultProfile.png" })
	} else {
		return ({ auth: true , username: req.session.username, isLoading: false, imageSrc: "http://localhost:3001/images/defaultProfile.png" })
	}
}

const getProfileImage = async (req) => {
	if(req.session.userid) {
		var [rows, fields] = await con.execute(`SELECT imagename
												FROM images
												WHERE fk_userid = ?`,
												[req.session.userid])
		if (rows[0] !== undefined) {
			var profileImagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + rows[0].imagename
			if (fs.existsSync(profileImagePath)) {
				return ({ imageSrc: "http://localhost:3001/images/" + req.session.username + "/" + rows[0].imagename})
			}
			return ({ imageSrc: "http://localhost:3001/images/defaultProfile.png" })
		} else {
			return ({ imageSrc: "http://localhost:3001/images/defaultProfile.png" })
		}
	} else {
		return ({ imageSrc: "http://localhost:3001/images/defaultProfile.png" })
	}
}

const test = async (req) => {
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
			var [rows, fields] = await con.execute(`SELECT username, age, firstname, surname, latitude, longitude
													FROM users
													WHERE NOT pk_userid = ? AND gender = ? AND genderpreference = ? OR genderpreference = "both" AND NOT gender = ?`,
													[req.session.userid, req.session.preference, req.session.gender, req.session.gender])
			//var [rows, fields] = await con.execute('SELECT * FROM users WHERE NOT pk_userid = ? AND gender = ?', [req.session.userid, req.session.preference])
			// calculate distance between user1 and user2
			for (const user of rows) {
				user.distance = distance(req.session.latitude, req.session.longitude, user.latitude, user.longitude) + "km away"
				console.log(distance(req.session.latitude, req.session.longitude, user.latitude, user.longitude))
			}
			console.log(rows)
		}
		return (rows)
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
};


// Updating/Inserting new Profile Picture
const uploadProfileImage = async (req) => {
	try {
		// Create new Profile Image name with UUID
		var profileImageName = uuidv4() + ".jpg"
		var profileImagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + profileImageName
		// Check if user has a profile image
		var [rows, fields] = await con.execute(`SELECT imagename
												FROM images
												WHERE fk_userid = ?`,
												[req.session.userid])
		if (rows[0] !== undefined) {
			// Get old profile image name
			const targetFile = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + rows[0].imagename
			// Process image with Sharp and save it in the server
			if(ImageProcessing.uploadProfileImage(req.files['profilePicture'].data, profileImagePath, req)) {
				// Update profile image on database
				result = await con.execute(`UPDATE images
										SET imagename = ?
										WHERE imagename = ?`,
										[ profileImageName, rows[0].imagename ])
				if (!result) {
					// If database update fails delete new image
					fs.unlinkSync(profileImageName)
					return ({ status: false, err: "Something went wrong! 1" })
				}
				// Delete old profile image from server
				if (fs.existsSync(targetFile)) {
					fs.unlinkSync(targetFile)
				}
				return ({ status: true, imageSrc: profileImageName})
			} else {
				return ({ status: false, err: "Something went wrong! 2" })
			}
		// User does not have a Profile iamge set on their profile
		} else {
			if(ImageProcessing.uploadProfileImage(req.files['profilePicture'].data, profileImagePath, req)) {
				var profileId = 1;
				var result = await con.execute(`INSERT INTO images(fk_userid, profilepic, imagename)
												VALUES (?, ?, ?)`,
												[req.session.userid, profileId, profileImageName])
				if (!result) {
					return ({ status: false, err: "Something went wrong!" });
				}
				return ({ status: true })
			}
			return ({ status: false, err: "Something went wrong! 3" })
		}
	} catch(err) {
		console.log(err)
		return ({ status: false, err: "Something went wrong! 4" })
	}
}

module.exports = {
	register,
	login,
	verify,
	forgotPassword,
	passwordReset,
	completeProfile,
	getUserInfo,
	getProfileImage,
	uploadProfileImage,
	test,
}