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
			[user, userid])
		if (connectRequest.length > 0)
			return (true)
		return (false)
	} catch (err) {
		//console.log(err)
		return({status: false, message: "Server connection error"});
	}
	
}

async function checkConnected(user, userid) {
	// Check if users ar connected
	try {
		const [connected, fields] = await con.execute(`
			SELECT *
			FROM connected
			WHERE userid1 = ? AND userid2= ?
			OR userid2 = ? AND userid1= ?`,
			[user, userid, userid, user])
			//console.log(connected.length > 0)
		if (connected.length > 0)
			return (true)
		return (false)
	} catch (err) {
		//console.log(err)
		return({status: false, message: "Server connection error"});
	}
	
}

async function updateHistory(user, userid) {
	try {
		// Check if user has visited userid before
		const [history, fieldsHistory] = await con.execute(
			` SELECT * FROM history WHERE fk_userid = ? AND targetuserid = ?`,
			[user, userid])
		if (history.length > 0) {
			// If so, update date
			const [updateHistory, fields] = await con.execute(
				`UPDATE history SET date = NOW() WHERE fk_userid = ? AND targetuserid = ?`,
				[user, userid])
			return (true)
		}
		// If not, insert into history
		const [insertHistory, fieldsInsertHistory] = await con.execute(
			`INSERT INTO history (fk_userid, targetuserid) VALUES (?, ?)`,
			[user, userid])
		return (true)
	} catch (err) {
		console.log(err)
		return(false);
	}
}

async function updateLastActive(userid) {
	try {
		// Update last active time
		const [updateLastactive, fields] = await con.execute(
			`UPDATE users SET lastactive = NOW() WHERE pk_userid = ?`,
			[userid])
		return (true)
	} catch (err) {
		console.log(err)
		return(false);
	}
}

async function getUserToken(userid) {
	try {
		// Get user token
		const [token, fields] = await con.execute(
			`SELECT token FROM users WHERE pk_userid = ?`,
			[userid])
		return (token[0].token)
	} catch (err) {
		console.log(err)
		return(false);
	}
}

async function saveNotification(userid, targetuserid, message) {
	// Save notification to database
	try {
		const [check, fields] = await con.execute(
			`SELECT *
			FROM notifications
			WHERE fk_userid = ? AND targetuserid = ? AND notification = ?`,
			[userid, targetuserid, message ])
		if (check.length > 0){
			const [update, fields] = await con.execute(
				`UPDATE notifications
				SET date = NOW(), isread = 0
				WHERE fk_userid = ? AND targetuserid = ? AND notification = ?`,
				[userid, targetuserid, message])
				return (check[0].pk_id)
		} else {
			const [notification, fields] = await con.execute(
				`INSERT INTO notifications (fk_userid, targetuserid, notification)
				VALUES (?, ?, ?)`,
				[userid, targetuserid, message])
				return (notification.insertId)
		}
	} catch (err) {
		console.log(err)
		return(false);
	}
}

module.exports = {
	getUserInterests,
	getProfilePic,
	getUserImages,
	checkConnectRequest,
	checkConnected,
	updateHistory,
	updateLastActive,
	getUserToken,
	saveNotification,
};
