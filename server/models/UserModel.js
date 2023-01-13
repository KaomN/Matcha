const bcrypt = require('bcrypt');
const con = require("../setup").pool;
const emailTransporter =  require("../setup").emailTransporter;
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ImageProcessing = require('../modules/ImageProcessing');

// Register request
const register = async (req) => {
	const { firstname, surname, username, email, password } = req.body;
	try {
		var [rows, fields] = await con.execute('SELECT * FROM users WHERE username = ?', [username])
		if(rows[0] === undefined) {
			var [rows, fields] = await con.execute("SELECT * FROM users WHERE email = ?", [email])
			if (rows[0] === undefined) {
				const hash = await bcrypt.hash(password, 10);
				let token = uuidv4() + "-" + uuidv4()
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
					result = await con.execute(`INSERT INTO usertokens (pk_userid)
												VALUE (?);`,
												[result[0].insertId])
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
	} catch(err) {
		console.log(err)
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
					var [result, fields] = await con.execute(`SELECT tag
															FROM tag
															INNER JOIN tagitem ON tagitem.fk_tagid = tag.pk_tagid
															WHERE tagitem.fk_userid = ?`,
															[rows[0].pk_userid])
					req.session.username = rows[0].username;
					req.session.userid = rows[0].pk_userid;
					req.session.firstname = rows[0].firstname;
					req.session.surname = rows[0].surname;
					req.session.email = rows[0].email;
					req.session.rating = rows[0].rating;
					req.session.token = rows[0].token;
					req.session.verified = rows[0].verified;
					req.session.gender = rows[0].gender
					req.session.biography = rows[0].biography
					req.session.birthdate = rows[0].dateofbirth
					req.session.age = rows[0].age
					req.session.preference = rows[0].genderpreference
					req.session.latitude = rows[0].latitude
					req.session.longitude = rows[0].longitude
					req.session.interest = result
					if(rows[0].profile === 1) {
						req.session.profile = true;
					} else {
						req.session.profile = false;
					}
					//req.session.profile = rows[0].profile
					req.session.authenticated = true;
					// Creating User folder
					if (!fs.existsSync(__dirname.slice(0, -7) + "/uploads/" + req.session.username)){
						fs.mkdirSync(__dirname.slice(0, -7) + "/uploads/" + req.session.username);
					}
					if(rows[0].profile === 1){
						return ({status: true, profile: true});
					} else {
						return ({status: true, profile: false});
					}
				} else {
					return ({status: false, error: "Incorrect username/password"});
				}
			}
		}
	} catch (err) {
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
			const token = uuidv4() + "-" + uuidv4() + "-" + uuidv4() + "-" + uuidv4()
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
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, req.body)) {
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
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, req.body)) {
				var profileId = 1;
				var result = await con.execute(`INSERT INTO images(fk_userid, profilepic, imagename)
												VALUES (?, ?, ?)`,
												[req.session.userid, profileId, profileImageName])
				if (!result) {
					Object.assign(error, {error: "Something went wrong!"});
				}
			} else {
				Object.assign(error, {error: "Something went wrong!"});
			}
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
					req.session.interest.push({tag: interest})
					if (!result) {
						Object.assign(error, {error: "Something went wrong!"});
					}
				} else {
					var [check,fields] = await con.execute(`SELECT tag, pk_tagid as 'id'
															FROM tag
															INNER JOIN tagitem ON tagitem.fk_tagid = tag.pk_tagid
															WHERE tagitem.fk_userid = ?
															AND tag.tag = ?`,
															[req.session.userid, interest])
					if(!check[0]) {
						var result = await con.execute(`INSERT INTO tagitem (fk_userid, fk_tagid)
														VALUES (?, ?)`,
														[req.session.userid, rows[0].pk_tagid])
						req.session.interest.push({tag: interest})
						if (!result) {
							Object.assign(error, {error: "Something went wrong!"});
						} 
					}
				}
			}
		} else {
			return (error);
		}
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
				req.session.biography = biography
				req.session.birthdate = birthDate
				req.session.profile = true;
				return ({status:true, imageSrc: "http://localhost:3001/images/" + req.session.username + "/" + profileImageName})
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
	try {
		var [rows, fields] = await con.execute(
			`SELECT imagename
			FROM images
			WHERE fk_userid = ?`,
			[req.session.userid])
		if (rows[0] !== undefined) {
			var profileImagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + rows[0].imagename
				if (fs.existsSync(profileImagePath)) {
					return ({ auth: true , username: req.session.username, isLoading: false, imageSrc: "http://localhost:3001/images/" + req.session.username + "/" + rows[0].imagename, firstname: req.session.firstname, surname: req.session.surname, gender: req.session.gender, age: req.session.age, birthdate: req.session.birthdate, interest:req.session.interest, latitude: req.session.latitude, longitude: req.session.longitude, preference: req.session.preference, biography: req.session.biography, rating: req.session.rating, userid: req.session.userid, profile: req.session.profile })
				}
		}
		return ({ auth: true , username: req.session.username, isLoading: false, imageSrc: "http://localhost:3001/images/defaultProfile.png", firstname: req.session.firstname, surname: req.session.surname, gender: req.session.gender, age: req.session.age, birthdate: req.session.birthdate, interest:req.session.interest, latitude: req.session.latitude, longitude: req.session.longitude, preference: req.session.preference, biography: req.session.biography, rating: req.session.rating, userid: req.session.userid, profile: req.session.profile })
	} catch(err) {
		
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

const changeEmail = async (req) => {
	try {
		const pin = parseInt(req.body.pin);
		const token = req.body.token;
		var [rows, fields] = await con.execute(`SELECT emailexpr as 'expiration', emailpin as 'pin', emailrequest as 'email', pk_userid as 'userid'
												FROM usertokens
												WHERE emailchangetoken = ?`,
												[req.body.token])
		if(rows[0]) {
			const expiration = Math.floor((Date.now()/1000) - 86400)
			if(expiration > rows[0].expiration) {
				return ({status: false, err: "Link has expired!"});
			} else {
				if(pin === parseInt(rows[0].pin)) {
					const res = await con.execute(`	UPDATE users
													SET email = ?
													WHERE pk_userid = ?`,
													[rows[0].email, rows[0].userid])
					if(res) {
						const res = await con.execute(`	UPDATE usertokens
													SET emailchangetoken = NULL, emailexpr = NULL, emailpin = NULL, emailrequest = NULL
													WHERE pk_userid = ?`,
													[rows[0].userid])
						if(res) {
							if(req.session.userid){
								req.sessionStore.destroy(req.session.id, function(err) {})
							}
							return ({ status: true, msg: "Email updated! Please login again to update changes!" })
						} else {
							return ({ status: false, err: "Something went wrong!" })
						}
					} else {
						return ({ status: false, err: "Something went wrong!" })
					}
				} else {
					return ({status: false, err: "Incorrect Pin!"});
				}
			}
		} else {
			return ({status: false, err: "Please follow the link you received on the email!"});
		}
					
	} catch (err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const logout = async (req) => {
	const lastActive = new Date();
	var result = await con.execute(
		`UPDATE users
		SET lastactive = ?
		WHERE pk_userid = ?`,
		[lastActive, req.session.userid])
	if(req.session.userid){
		req.sessionStore.destroy(req.session.id, function(err) {})
	}
	return ({ status: true })
}

const markNotificationRead = async (req) => {
	try {
		const res = await con.execute(`	UPDATE notifications
										SET isread = 1
										WHERE pk_id = ?`,
										[req.body.notificationid])
		if(res) {
			return ({ status: true })
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch (err) {
		return ({ status: false, err: "Something went wrong!" })
	}
};

const getNotification = async (req) => {
	try {
		const [notification, fields] = await con.execute(
			`SELECT *
			FROM notifications
			WHERE fk_userid = ?
			ORDER BY date DESC`,
			[req.session.userid])
		return ({status: true, notification})
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

const deleteNotification = async (req) => {
	try {
		const res = await con.execute(
			`DELETE
			FROM notifications
			WHERE fk_userid = ?`,
			[req.session.userid])
		return ({status: true, message: "Notification deleted!"})
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

const getHistory = async (req) => {
	try {
		const [history, fields] = await con.execute(
			`SELECT history.pk_id as 'id', users.username, users.pk_userid,
				(SELECT imagename FROM images WHERE images.fk_userid = users.pk_userid AND images.profilepic = 1) as 'image'
			FROM history
			INNER JOIN users ON history.targetuserid = users.pk_userid
			WHERE fk_userid = ?
			ORDER BY date DESC`,
			[req.session.userid])
		return ({status: true, history})
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

const deleteHistory = async (req) => {
	try {
		const res = await con.execute(
			`DELETE
			FROM history
			WHERE pk_id = ?`,
			[req.body.id])
		return ({status: true, message: "History deleted!"})
	} catch (err) {
		return({status: false, message: "Server connection error"});
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
	changeEmail,
	logout,
	markNotificationRead,
	getNotification,
	deleteNotification,
	getHistory,
	deleteHistory,
}