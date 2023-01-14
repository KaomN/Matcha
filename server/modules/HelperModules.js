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
		if (connected.length > 0)
			return (true)
		return (false)
	} catch (err) {
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
		return(false);
	}
}

async function saveNotification(userid, targetuserid, message, type) {
	// Save notification to database
	try {
		const [check, fields] = await con.execute(
			`SELECT *
			FROM notifications
			WHERE fk_userid = ? AND targetuserid = ? AND notification = ? AND type = ?`,
			[userid, targetuserid, message, type])
		if (check.length > 0){
			const [update, fields] = await con.execute(
				`UPDATE notifications
				SET date = NOW(), isread = 0
				WHERE fk_userid = ? AND targetuserid = ? AND notification = ? AND type = ?`,
				[userid, targetuserid, message, type])
				return (check[0].pk_id)
		} else {
			const [notification, fields] = await con.execute(
				`INSERT INTO notifications (fk_userid, targetuserid, notification, type)
				VALUES (?, ?, ?, ?)`,
				[userid, targetuserid, message, type])
				return (notification.insertId)
		}
	} catch (err) {
		return(false);
	}
}

function createTagsSearchQuery(tags) {
	// Create query for tags
	if(tags.length === 0)
		var query = "NOT pk_userid = ?"
	else
		var query = "pk_userid IN (SELECT fk_userid FROM tagitem INNER JOIN tag ON tagitem.fk_tagid = tag.pk_tagid WHERE tag.tag IN ("
	for (let i = 0; i < tags.length; i++) {
		if (i < tags.length - 1)
			query += "'" + tags[i].label + "'" + ", "
		if(i === tags.length - 1)
			query += "'" + tags[i].label + "'"
	}
	if(tags.length !== 0)
	query += ") GROUP BY fk_userid HAVING COUNT(*) = " + tags.length + ") AND NOT pk_userid = ?"
	return (query)
}

function canConnect(sessionPreference, userPreference, sessionGender, userGender) {
	// Check if user can connect
	if (sessionPreference === "both" && userPreference === "both"
		|| sessionPreference === "both" && userPreference === "male" && sessionGender === "male"
		|| sessionPreference === "both" && userPreference === "female" && sessionGender === "female"
		|| sessionPreference === userGender && (userPreference === sessionGender || userPreference === "both")) {
		return (true)
	} else {
		return (false)
	}
}

async function getUserTagsArray(user) {
	// Get all interests for a user as an array
	try {
		const [interests, fields] = await con.execute(`
			SELECT tag
			FROM tag
			INNER JOIN tagitem ON fk_tagid = pk_tagid
			INNER JOIN users ON fk_userid = pk_userid
			WHERE pk_userid = ?`,
			[user.userid])
		return (interests.map(function (obj) {
				return obj.tag
			})
		)
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

async function getMessages(user) {
	// Get all messages for a user
	try {
		const [messages, fields] = await con.execute(`
			SELECT messagedate, userid, message, isread
			FROM messages
			WHERE fk_connected = ?
			ORDER BY messagedate DESC`,
			[user.room])
		return messages
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

async function saveMessage(message, userid, room) {
	// Save message to database
	try {
		const [save, fields] = await con.execute(`
			INSERT INTO messages (fk_connected, userid, message)
			VALUES (?, ?, ?)`,
			[room, userid, message])

		return (true)
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}

}

async function addRating(userid, fromUserId, type) {
	// Check and add rating
	try {
		const [res, fields] = await con.execute(
			`SELECT *
			FROM rating
			WHERE fk_userid = ? AND fk_fromuserid = ? AND type = ?`,
			[userid, fromUserId, type])
		if (res.length > 0) {
			if(type === "connected") {
				await con.execute(
					`UPDATE rating
					SET date = NOW()
					WHERE (fk_userid = ? AND fk_fromuserid = ? AND type = ?) OR (fk_userid = ? AND fk_fromuserid = ? AND type = ?)`,
					[userid, fromUserId, type, fromUserId, userid, type])
			} else {
				await con.execute(
					`UPDATE rating
					SET date = NOW()
					WHERE fk_userid = ? AND fk_fromuserid = ? AND type = ?`,
					[userid, fromUserId, type])
			}
		} else {
			if(type === "connected") {
				await con.execute(
					`INSERT into rating (fk_userid, fk_fromuserid, type)
					VALUES (?, ?, ?), (?, ?, ?)`,
					[userid, fromUserId, type, fromUserId, userid, type])
			} else {
			await con.execute(
				`INSERT into rating (fk_userid, fk_fromuserid, type)
				VALUES (?, ?, ?)`,
				[userid, fromUserId, type])
			}
		}
		return true
	} catch (err) {
		return false;
	}
}

async function amIBlocked(userid, targetUserId) {
	const [res, fields] = await con.execute(
		`SELECT COUNT(*) AS count
		FROM blocked
		WHERE fk_userid = ? AND targetuserid = ?`,
		[userid, targetUserId])
	if (res[0].count > 0) {
		return true
	} else {
		return false
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
	createTagsSearchQuery,
	canConnect,
	getUserTagsArray,
	getMessages,
	saveMessage,
	addRating,
	amIBlocked,
};
