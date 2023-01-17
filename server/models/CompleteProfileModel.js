const con = require("../setup").pool;
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ImageProcessing = require('../modules/ImageProcessing');

const saveProfilePicture= async (req) => {
	try {
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
					return ({status: false, message: "Something went wrong!"});
				}
				// Delete old profile image from server
				if (fs.existsSync(targetFile)) {
					fs.unlinkSync(targetFile)
				}
			} else {
				return ({status: false, message: "Something went wrong!"});
			}
		// User does not have a Profile image set on their profile
		} else {
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, req.body)) {
				var profileId = 1;
				var result = await con.execute(`INSERT INTO images(fk_userid, profilepic, imagename)
												VALUES (?, ?, ?)`,
												[req.session.userid, profileId, profileImageName])
				if (!result) {
					return ({status: false, message: "Something went wrong!"});
				}
			} else {
				return ({status: false, message: "Something went wrong!"});
			}
		}
		return ({status:true, imageSrc: "http://localhost:3001/images/" + req.session.username + "/" + profileImageName})
	} catch (err) {
		return ({status: false, message: "Server connection error"});
	}
}

const saveInterests = async (req) => {
	try {
		const { interest } = req.body;
		await con.execute(
			`DELETE
			FROM tagitem
			WHERE fk_userid = ?`,
			[req.session.userid])
		for (const interests of interest) {
			await con.execute(
				`INSERT INTO tagitem (fk_tagid, fk_userid)
				VALUES (?, ?)`,
				[interests.value, req.session.userid])
		}
		req.session.interest = interest;
		return ({status: true});
	} catch (err) {
		return ({status: false, message: "Server connection error"});
	}
}

const saveUserInfo = async (req) => {
	try {
		const { age, birthDate, gender, preference, biography, locationLat, locationLng } = req.body;
		var result = await con.execute(`
			UPDATE users
			SET users.gender = ?, users.age = ?, users.dateofbirth = ?, users.genderpreference = ?, users.biography = ?, users.latitude = ?, users.longitude = ?, users.profile = 1
			WHERE users.pk_userid = ?`,
			[gender, age, birthDate, preference, biography, locationLat, locationLng, req.session.userid])
		if (!result) {
			return ({status: false, message: "Server connection error"});
		} else {
			req.session.gender = gender
			req.session.preference = preference
			req.session.latitude = locationLat
			req.session.longitude = locationLng
			req.session.age = age
			req.session.biography = biography
			req.session.birthdate = birthDate
			req.session.profile = true;
			return ({status:true})
		}
	} catch (err) {
		return ({status: false, message: "Server connection error"});
	}
}

module.exports = {
	saveProfilePicture,
	saveInterests,
	saveUserInfo,
}