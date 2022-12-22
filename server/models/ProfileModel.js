const con = require("../setup").pool;
const calculate = require('../modules/CalculateDistance');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ImageProcessing = require('../modules/ImageProcessing');


// Get user profile
const getProfile = async (userID, req) => {
	try {
		// Fetch user info
		var [rows, fields] = await con.execute(`SELECT username, firstname, surname, gender, age, dateofbirth, biography, latitude, longitude, pk_userid as 'userid', rating, genderpreference as 'preference', email
												FROM users
												WHERE pk_userid = ?`,
												[userID])
		if(rows[0] !== undefined) {
			// Fetch images
			var result = await con.execute(`SELECT *
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
			var result = await con.execute(`SELECT tag, pk_tagid as 'id'
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
			Object.assign(rows[0], {distance: calculate.distance(req.session.latitude, req.session.longitude, rows[0].latitude, rows[0].longitude)})
			Object.assign(rows[0], {isOwn:false})
			Object.assign(rows[0], {status: true})
			delete rows[0].email
			return (rows[0]);
		} else {
			return ({status: false});
		}
	} catch (err) {
		console.log(err)
	}
}

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
			let imageSize = {};
			imageSize.x = req.body.x
			imageSize.y = req.body.y
			imageSize.width = req.body.cropWidth
			imageSize.height = req.body.cropHeight
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, imageSize)) {
				// Update profile image on database
				var result = await con.execute(`UPDATE images
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
				return ({ status: true, imageSrc: profileImageName})
			} else {
				return ({ status: false, err: "Something went wrong!" })
			}
		// User does not have a Profile iamge set on their profile
		} else {
			if(await ImageProcessing.uploadImage(req.files['profilePicture'].data, profileImagePath, req)) {
				var profileId = 1;
				var result = await con.execute(`INSERT
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
		console.log(err)
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
			var result = await con.execute(`INSERT
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
		console.log(err)
		return ({ status: false, err: "Something went wrong!" })
	}
}

const deleteImage = async (req) => {
	try {
		const split = req.body.imageSrc.split("/")
		const targetFile = __dirname.slice(0, -6) + "uploads/" + req.session.username + "/" + split[split.length - 1]
		var result = await con.execute(`DELETE 
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
		console.log(err)
		return ({ status: false, err: "Something went wrong!" })
	}
}

module.exports = {
	getProfile,
	uploadProfileImage,
	uploadProfileImages,
	deleteImage,
}