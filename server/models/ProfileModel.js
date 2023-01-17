const con = require("../setup").pool;
const bcrypt = require('bcrypt');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ImageProcessing = require('../modules/ImageProcessing');
const emailTransporter =  require("../setup").emailTransporter;
const { checkConnectRequest, updateHistory, canConnect, addRating } = require("../modules/HelperModules");

// Get user profile
const getProfile = async (userID, req) => {
	try {
		var [rows, fields] = await con.execute(
			`SELECT username, firstname, surname, gender, age, dateofbirth, biography, latitude, longitude, pk_userid as 'userid', genderpreference as 'preference', email, lastactive,
				(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance,
				(SELECT COUNT(*) FROM connect WHERE targetuserid = ? AND fk_userid = pk_userid) AS connectRequest,
				(SELECT COUNT(*) FROM connect WHERE fk_userid = ? AND targetuserid = pk_userid) AS connectRequestSent,
				(SELECT COUNT(*) FROM blocked WHERE fk_userid = ? AND targetuserid = pk_userid) AS blocked,
				(SELECT COUNT(*) FROM blocked WHERE fk_userid = pk_userid AND targetuserid = ?) AS amiblocked,
				(SELECT COUNT(*) FROM report WHERE fk_userid = ? AND targetuserid = pk_userid) AS reported,
				(SELECT COUNT(*) FROM connected WHERE (userid1 = ? AND userid2 = pk_userid) OR (userid2 = ? AND userid1 = pk_userid)) AS connected,
				(SELECT COUNT(*) FROM (SELECT * FROM rating WHERE fk_userid = ? LIMIT 100) AS ratings) AS rating
			FROM users
			WHERE pk_userid = ?`,
			[req.session.latitude, req.session.longitude, req.session.latitude, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid , req.session.userid, req.session.userid, userID, userID])
		if(rows[0] !== undefined) {
			// Fetch images
			var result = await con.execute(
				`SELECT *
				FROM images
				WHERE fk_userid = ?`,
				[userID])
			if (result[0] !== undefined) {
				var imageCount = 0
				var imagesArr = []
				Object.assign(rows[0], {profile: false})
				for (const images of result[0]) {
					if (images.profilepic === 1) {
						Object.assign(rows[0], {profile: true})
						if (fs.existsSync(__dirname.slice(0, -6) + "uploads/" + rows[0].username + "/" + images.imagename)) {
							Object.assign(rows[0], {profileSrc: "http://localhost:3001/images/" + rows[0].username + "/" + images.imagename})
						} else {
							Object.assign(rows[0], {profileSrc: "http://localhost:3001/images/defaultProfile.png"})
						}
					} else {
						if (fs.existsSync(__dirname.slice(0, -6) + "uploads/" + rows[0].username + "/" + images.imagename)) {
							imagesArr.push({ id: imageCount, imageSrc: "http://localhost:3001/images/" + rows[0].username + "/" + images.imagename, imageid: images.imageid})
							imageCount++;
						}
					}
				}
			}
			Object.assign(rows[0], {images: imagesArr})
			// Fetch Interests
			var result = await con.execute(
				`SELECT pk_tagid as 'value', tag as 'label'
				FROM tag
				INNER JOIN tagitem ON tagitem.fk_tagid = tag.pk_tagid
				WHERE tagitem.fk_userid = ?`,
				[userID])
			if(result) {
				Object.assign(rows[0], {interest: result[0]})
			}
			if(rows[0].userid === req.session.userid) {
				Object.assign(rows[0], {isOwn: true})
				Object.assign(rows[0], {status: true})
				return (rows[0]);
			}
			rows[0].distance = Math.ceil(rows[0].distance)
			Object.assign(rows[0], {isOwn:false})
			Object.assign(rows[0], {status: true})
			Object.assign(rows[0], {canConnect: canConnect(req.session.preference, rows[0].preference, req.session.gender, rows[0].gender)})
			delete rows[0].email
			delete rows[0].latitude
			delete rows[0].longitude
			// Update History
			await updateHistory(req.session.userid, rows[0].userid)
			return (rows[0]);
		} else {
			return ({status: false, msg: "usernotfound"});
		}
	} catch (err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

// Updating/Inserting new Profile Picture
const uploadProfileImage = async (req) => {
	try {
		// Create new Profile Image name with UUID
		var profileImageName = uuidv4() + ".jpg"
		var profileImagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + profileImageName
		// Check if user has a profile image
		var [rows, fields] = await con.execute(
			`SELECT imagename
			FROM images
			WHERE fk_userid = ?`,
			[req.session.userid])
		if (rows[0] !== undefined) {
			// Get old profile image name
			const targetFile = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + rows[0].imagename
			// Process image with Sharp and save it in the server
			let imageSize = {};
			imageSize.x = req.body.x
			imageSize.y = req.body.y
			imageSize.width = req.body.cropWidth
			imageSize.height = req.body.cropHeight
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, imageSize)) {
				// Update profile image on database
				var result = await con.execute(
					`UPDATE images
					SET imagename = ?
					WHERE imagename = ?`,
					[ profileImageName, rows[0].imagename ])
				if (!result) {
					// If database update fails delete new image
					fs.unlinkSync(profileImagePath)
					return ({ status: false, err: "Something went wrong!" })
				}
				// Delete old profile image from server
				if (fs.existsSync(targetFile)) {
					fs.unlinkSync(targetFile)
				}
				return ({ status: true, imageSrc: "http://localhost:3001/images/" + req.session.username + "/" + profileImageName})
			} else {
				return ({ status: false, err: "Something went wrong!" })
			}
		// User does not have a Profile iamge set on their profile
		} else {
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, req)) {
				var profileId = 1;
				var result = await con.execute(
					`INSERT
					INTO images(fk_userid, profilepic, imagename)
					VALUES (?, ?, ?)`,
					[req.session.userid, profileId, profileImageName])
				if (!result) {
					return ({ status: false, err: "Something went wrong!" });
				}
				return ({ status: true })
			}
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const uploadProfileImages = async (req) => {
	try {
		var imageName = uuidv4() + ".jpg"
		var imagePath = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + imageName
		let imageSize = {};
		imageSize.x = req.body.x
		imageSize.y = req.body.y
		imageSize.width = req.body.width
		imageSize.height = req.body.height
		if(await ImageProcessing.uploadImage(req.files["imageFile"].data, imagePath, imageSize)) {
			// Update profile image on database
			var profileId = 0;
			var result = await con.execute(
				`INSERT
				INTO images(fk_userid, profilepic, imagename)
				VALUES (?, ?, ?)`,
				[req.session.userid, profileId, imageName])
			if (!result) {
				// If database insert fails delete new image
				fs.unlinkSync(imagePath)
				return ({ status: false, err: "Something went wrong!" })
			}
			var fullImagePath = 'http://localhost:3001/images/' + req.session.username + '/' + imageName
			return ({ status: true, image:{ imageSrc: fullImagePath, imageid:result[0].insertId }})
		} else {
			return ({ status: false, err: "Invalid image file!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const deleteImage = async (req) => {
	try {
		const split = req.body.imageSrc.split("/")
		const targetFile = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + split[split.length - 1]
		var result = await con.execute(
			`DELETE 
			FROM images
			WHERE imageid = ?
			LIMIT 1`,
			[req.body.imageid])
		if(result) {
			if (fs.existsSync(targetFile)) {
				fs.unlinkSync(targetFile)
			}
			return ({ status: true})
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updateName = async (req) => {
	try {
		const firstname= req.body.firstname.trim();
		const surname= req.body.surname.trim();
		var result = await con.execute(
			`UPDATE users
			SET firstname = ?, surname = ?
			WHERE pk_userid = ?`,
			[ firstname, surname, req.session.userid ])
		if(result) {
			req.session.firstname = firstname;
			req.session.surname = surname;
			return ({ status: true })
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updateUsername = async (req) => {
	try {
		const username = req.body.username.trim();
		const currentPath = __dirname.slice(0, -6) + "uploads/" + req.session.username
		var [rows, fields] = await con.execute(
			`SELECT username
			FROM users
			WHERE username = ?`,
			[username])
		if(rows[0] === undefined) {
			var result = await con.execute(
				`UPDATE users
				SET username = ?
				WHERE pk_userid = ?`,
				[ username, req.session.userid ])
			if(result) {
				const newPath = __dirname.slice(0, -6) + "uploads/" + username
				fs.renameSync(currentPath, newPath)
				req.session.username = username;
				return ({ status: true })
			} else {
				return ({ status: false, err: "Something went wrong!" })
			}
		} else {
			return ({ status: false, err: "Username taken!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updateDate = async (req) => {
	try {
		const { dateofbirth, age } = req.body;
		var result = await con.execute(
			`UPDATE users
			SET dateofbirth = ?, age = ?
			WHERE pk_userid = ?`,
			[ dateofbirth, age, req.session.userid ])
		if(result) {
			req.session.birthdate = dateofbirth
			req.session.age = age
			return ({ status: true })
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		console.log(err)
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updateGender = async (req) => {
	try {
		const { gender } = req.body;
		var result = await con.execute(
			`UPDATE users
			SET gender = ?
			WHERE pk_userid = ?`,
			[ gender, req.session.userid ])
		if(result) {
			req.session.gender = gender
			return ({ status: true })
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updatePreference = async (req) => {
	try {
		const { preference } = req.body;
		var result = await con.execute(
			`UPDATE users
			SET genderpreference = ?
			WHERE pk_userid = ?`,
			[ preference, req.session.userid ])
		if(result) {
			req.session.preference = preference
			return ({ status: true })
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updateInterest = async (req) => {
	try {
		const { interest } = req.body;
		var result = await con.execute(
			`DELETE
			FROM tagitem
			WHERE fk_userid = ?`,
			[req.session.userid])
		if(result) {
			for (const interests of interest) {
				var result = await con.execute(
					`INSERT INTO tagitem (fk_tagid, fk_userid)
					VALUES (?, ?)`,
					[interests.value, req.session.userid])
			}
			if(result) {
				req.session.interest = interest
				return ({ status: true })
			} else {
				return ({ status: false, err: "Something went wrong!" })
			}
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updateBiography = async (req) => {
	try {
		const { biography } = req.body;
		var result = await con.execute(
			`UPDATE users
			SET biography = ?
			WHERE pk_userid = ?`,
			[ biography, req.session.userid ])
		if(result[0]) {
			req.session.biography = biography
			return({ status: true })
		} else {
			return ({status: false, err: "Interest deletion failed!"})
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const sendEmailChangeRequest = async (req) => {
	try {
		const { email } = req.body;
		const [rows, fields] = await con.execute(
			`SELECT email
			FROM users
			WHERE pk_userid = ?`,
			[req.session.userid])
		if(rows[0]) {
			const [rows, fields] = await con.execute(
				`SELECT email
				FROM users
				WHERE email = ?`,
				[email])
			if(!rows[0]) {
				const token = uuidv4() + "-" + uuidv4() + "-" + uuidv4() + "-" + uuidv4()
				const expiration = Math.floor(Date.now()/1000)
				const pin = String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10))
				const result = await con.execute(
					`UPDATE usertokens
					SET emailchangetoken = ?, emailexpr = ?, emailpin = ?, emailrequest = ?
					WHERE pk_userid = ?`,
					[token, expiration, pin, email, req.session.userid])
				if(result) {
					const mailOptions1 = {
						from: 'kaom.n.92@gmail.com',
						to: email,
						subject: 'Matcha email address change request',
						text: 'Please follow the link that was sent to your original email and type in the pin code below to change your email address.\n' + 'Pin: ' + pin
					};
					resultSend1 = await emailTransporter.sendMail(mailOptions1);
					const mailOptions2 = {
						from: 'kaom.n.92@gmail.com',
						to: req.session.email,
						subject: 'Matcha email address change request',
						text: 'Please follow the link below to change the email address on your account.\n' + 'http://localhost:3000?emailchangerequest=' + token
					};
					resultSend2 = await emailTransporter.sendMail(mailOptions2);
					if(resultSend1.messageId && resultSend2.messageId) {
						return ({ status: true, msg: 'An email has been sent to ' + req.session.email + " and " + email + ". Please follow the link on the first email!"})
					} else {
						return ({ status: false, err: "Something went wrong!" })
					}
				} else {
					return ({ status: false, err: "Something went wrong!" })
				}
			} else {
				return ({ status: false, err: "Email address already in use" })
			}
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
	} catch(err) {
		console.log(err)
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updatePassword = async (req) => {
	try {
		const { currentPassword, newPassword } = req.body;
		const [rows, fields] = await con.execute(
			`SELECT password
			FROM users
			WHERE pk_userid = ?`,
			[req.session.userid ])
		if(rows[0]) {
			match = await bcrypt.compare(currentPassword, rows[0].password)
			if(match) {
				const hash = await bcrypt.hash(newPassword, 10);
				result = await con.execute(
					`UPDATE users
					SET users.password = ?
					WHERE pk_userid = ?`,
					[hash, req.session.userid])
				return({ status: true })
			} else {
				return({status: false, errorPassword: "Incorrect password!"})
			}
		} else {
			return ({status: false, err: "Something went wrong!"})
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const updatePosition = async (req) => {
	try {
		const lat = parseFloat(req.body.lat)
		const lng = parseFloat(req.body.lng)

		result = await con.execute(
			`UPDATE users
			SET users.latitude = ?, users.longitude = ?
			WHERE pk_userid = ?`,
			[lat, lng, req.session.userid])
		if(result) {
			req.session.latitude = lat
			req.session.longitude = lng
			return ({status: true})
		} else {
			return ({status: false, err: "Something went wrong!"})
		}
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const connect = async (req) => {
	try {
		//Check that the users can connect with each other
		const [rows, fieldRows] = await con.execute(
			`SELECT genderpreference as 'preference', gender
			FROM users
			WHERE pk_userid = ?`,
			[req.body.userid])
		if(rows) {
			if(canConnect(req.session.preference, rows[0].preference, req.session.gender, rows[0].gender)) {
				// Create a new connect row with the two users
				await con.execute(`
					INSERT INTO connect (fk_userid, targetuserid)
					VALUES (?, ?)`,
					[req.session.userid, req.body.userid])
				await addRating( req.body.userid, req.session.userid, "connect")
					// Check if the target user has already sent a connect request to the current user
				if(await checkConnectRequest(req.body.userid, req.session.userid)) {
					// If so, create a new connected row with the two users
					const pk_id =  uuidv4() + "-" + uuidv4()
					await con.execute(`
						INSERT INTO connected (pk_id, userid1, userid2)
						VALUES (?, ?, ?)`,
						[pk_id, req.session.userid, req.body.userid])
					await addRating( req.body.userid, req.session.userid, "connected")
					return ({status: true, message: "You are now connected with " + req.body.username + "!", connected: true})
				}
			return ({status: true, message: "Connect request sent to " + req.body.username + "!"})
			} else {
				return ({ status: false, err: "Something went wrong!" })
			}
		} else {
			return ({ status: false, err: "Something went wrong!" })
		}
		return ({ status: false, err: "Something went wrong!" })
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const disconnect = async (req) => {
	try {
		//Create a new connect row with the two users
		const res = await con.execute(
			`DELETE 
			FROM connect
			WHERE fk_userid = ?
			AND targetuserid = ?`,
			[req.session.userid, req.body.userid])
		const res2 = await con.execute(
			`DELETE 
			FROM connected
			WHERE (userid1 = ? AND userid2 = ?) OR (userid1 = ? AND userid2 = ?)`,
			[req.session.userid, req.body.userid, req.body.userid, req.session.userid])
		const res3 = await con.execute(
			`DELETE
			FROM notifications
			WHERE fk_userid = ?
			AND targetuserid = ?
			AND notification = ?`,
			[req.body.userid, req.session.userid, req.body.message])
		return ({status: true, message: "You are now disconnected with " + req.body.username + "!", connectRequest: await checkConnectRequest(req.body.userid, req.session.userid)})
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const report = async (req) => {
	try {
		// Create a new connect row with the two users
		const [report, fields] = await con.execute(`
				INSERT INTO report (fk_userid, targetuserid)
				VALUES (?, ?)`,
				[req.session.userid, req.body.userid])
		const res = await con.execute(
			`DELETE 
			FROM connect
			WHERE fk_userid = ?
			AND targetuserid = ?`,
			[req.session.userid, req.body.userid])
		const res2 = await con.execute(
			`DELETE 
			FROM connected
			WHERE (userid1 = ? AND userid2 = ?) OR (userid1 = ? AND userid2 = ?)`,
			[req.session.userid, req.body.userid, req.body.userid, req.session.userid])
		return ({status: true, message: req.body.username + " reported!"})
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const unreport = async (req) => {
	try {
		// Create a new connect row with the two users
		const res = await con.execute(
			`DELETE 
			FROM report
			WHERE fk_userid = ?
			AND targetuserid = ?`,
			[req.session.userid, req.body.userid])
		return ({status: true, message: req.body.username + " report deleted!"})
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const block = async (req) => {
	try {
		await con.execute(`
			INSERT INTO blocked (fk_userid, targetuserid)
			VALUES (?, ?)`,
			[req.session.userid, req.body.userid])
		 await con.execute(
			`DELETE 
			FROM connect
			WHERE (fk_userid = ? AND targetuserid = ?)
			OR (fk_userid = ? AND targetuserid = ?)`,
			[req.session.userid, req.body.userid, req.body.userid, req.session.userid])
		await con.execute(
			`DELETE 
			FROM connected
			WHERE (userid1 = ? AND userid2 = ?) OR (userid1 = ? AND userid2 = ?)`,
			[req.session.userid, req.body.userid, req.body.userid, req.session.userid])
		return ({status: true, message: req.body.username + " blocked"})
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

const unblock = async (req) => {
	try {
		// Create a new connect row with the two users
		const res = await con.execute(
			`DELETE 
			FROM blocked
			WHERE fk_userid = ?
			AND targetuserid = ?`,
			[req.session.userid, req.body.userid])
		return ({status: true, message: req.body.username + " unblocked!"})
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

const checkDisconnect = async (req) => {
	try {
		const res = await con.execute(
			`SELECT *
			FROM connected
			WHERE (userid1 = ? AND userid2 = ?) OR (userid2 = ? AND userid1 = ?)`,
			[req.query['userid1'], req.query['userid2'], req.query['userid1'], req.query['userid2']])
		return ({status: res[0].length > 0})
	} catch(err) {
		return ({ status: false, err: "Something went wrong!" })
	}
}

module.exports = {
	getProfile,
	uploadProfileImage,
	uploadProfileImages,
	deleteImage,
	updateName,
	updateUsername,
	updateDate,
	updateGender,
	updatePreference,
	updateInterest,
	updateBiography,
	sendEmailChangeRequest,
	updatePassword,
	updatePosition,
	connect,
	disconnect,
	report,
	unreport,
	block,
	unblock,
	checkDisconnect,
}