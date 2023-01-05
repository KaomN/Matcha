const con = require("../setup").pool;

async function getUserInterests(user) {
	// Get all interests for a user
	try {
		const [interests, fields] = await con.execute(`
			SELECT tag, pk_tagid as id
			FROM tag
			INNER JOIN tagitem ON fk_tagid = pk_tagid
			INNER JOIN users ON fk_userid = pk_userid
			WHERE pk_userid = ?`,
			[user.userid])
		return (interests)
	} catch (err) {
		//console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

async function getProfilePic(user) {
	// Get Profile pic of user
	const path = "http://localhost:3001/images/"
	try {
		const [profilepic, fields] = await con.execute(`
			SELECT imagename
			FROM images
			WHERE fk_userid = ? AND profilepic = 1`,
			[user.userid])
		return (path + user.username + "/" + profilepic[0].imagename)
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

async function getUserImages(user) {
	// Get all images of user
	try {
		const [images, fields] = await con.execute(`
			SELECT imagename
			FROM images
			WHERE fk_userid = ? AND profilepic = 0`,
			[user.userid])
		// loop through images and add path
		for (let i = 0; i < images.length; i++) {
			images[i].imagename = "http://localhost:3001/images/" + user.username + "/" + images[i].imagename
		}
		return (images)
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

async function checkConnectRequest(user, userid) {
	// Check if user has sent a connect request to userid
	try {
		const [connectRequest, fields] = await con.execute(`
			SELECT *
			FROM connect
			WHERE fk_userid = ? AND targetuserid= ?`,
			[user.userid, userid])
		if (connectRequest.length > 0)
			return (true)
		return (false)
	} catch (err) {
		//console.log(err)
		return({status: false, message: "Server connection error"});
	}
	
}

module.exports = {
	getUserInterests,
	getProfilePic,
	getUserImages,
	checkConnectRequest,
};
