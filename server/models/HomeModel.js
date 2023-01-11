const con = require("../setup").pool;
const emailTransporter =  require("../setup").emailTransporter;
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { getUserInterests, getProfilePic, getUserImages, checkConnectRequest, canConnect }  = require("../modules/HelperModules");

const getUsers = async (req, min, max) => {
	try {
		const searchRadius = 50;
		const minInterestCount = 1;
		if (req.session.preference === "both") {
			if (req.session.latitude && req.session.longitude) {
				var [rows, fields] = await con.execute(`
					SELECT username, age, firstname, surname, latitude, longitude, pk_userid as 'userid', rating, biography, genderpreference as 'preference', gender,
						(6371 * acos(cos( radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin( radians(?)) * sin(radians(latitude)))) AS distance,
						(SELECT COUNT(*) FROM tagitem WHERE fk_userid = users.pk_userid AND fk_tagid IN (SELECT fk_tagid FROM tagitem WHERE fk_userid = ?)) AS 'commonInterests',
						(SELECT COUNT(*) FROM connected WHERE (userid1 = ? AND userid2 = users.pk_userid) OR (userid2 = ? AND userid1 = users.pk_userid)) AS connected,
						(SELECT COUNT(*) FROM connect WHERE fk_userid = ? AND targetuserid = users.pk_userid) AS connectRequestSent,
						(SELECT COUNT(*) FROM connect WHERE targetuserid = ? AND fk_userid = users.pk_userid) AS connectRequest
					FROM users
					LEFT JOIN blocked
						ON users.pk_userid = blocked.fk_userid
					LEFT JOIN connect
						ON users.pk_userid = connect.fk_userid
					LEFT JOIN report
						ON users.pk_userid = report.fk_userid
					WHERE NOT pk_userid = ?
						AND genderpreference = ?
						AND blocked.targetuserid NOT IN (SELECT fk_userid FROM blocked WHERE targetuserid = users.pk_userid)
						AND connect.targetuserid NOT IN (SELECT fk_userid FROM connect WHERE targetuserid = users.pk_userid)
						AND report.targetuserid NOT IN (SELECT fk_userid FROM report WHERE targetuserid = users.pk_userid)
					HAVING distance <= ?
						AND commonInterests >= ?
					ORDER BY distance ASC, rating DESC
					LIMIT ? , ?`,
					[req.session.latitude, req.session.longitude, req.session.latitude, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.gender, searchRadius, minInterestCount, min, max])
					// If there are any rows returned from the database (i.e. users were found)
					if (rows && rows.length) {
					// Loop through each user
					for (const user of rows) {
						try {
							// Rounds the distance to the nearest whole number
							user.distance = Math.ceil(user.distance)
							// Get the user's interests
							user.interests = await getUserInterests(user)
							// Get the user's profile picture
							user.profilePic = await getProfilePic(user)
							// Get the user's images
							user.images = await getUserImages(user)
							// Check if user can connect
							user.canConnect = canConnect(req.session.preference, user.preference, req.session.gender, user.gender)
							// Remove the latitude and longitude from the user object
							
							delete user.latitude
							delete user.longitude
						} catch (err) {
							console.error(err)
						}
					}
				}
			} else {
				return({status: false, message: "Please update your location!"});
			}
		} else {
			if (req.session.latitude && req.session.longitude) {
				var [rows, fields] = await con.execute(`
					SELECT username, age, firstname, surname, latitude, longitude, pk_userid as 'userid', rating, biography, genderpreference as 'preference', gender,
						(6371 * acos(cos( radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin( radians(?)) * sin(radians(latitude)))) AS distance,
						(SELECT COUNT(*) FROM tagitem WHERE fk_userid = users.pk_userid AND fk_tagid IN (SELECT fk_tagid FROM tagitem WHERE fk_userid = ?)) AS 'commonInterests',
						(SELECT COUNT(*) FROM connected WHERE (userid1 = ? AND userid2 = users.pk_userid) OR (userid2 = ? AND userid1 = users.pk_userid)) AS connected,
						(SELECT COUNT(*) FROM connect WHERE fk_userid = ? AND targetuserid = users.pk_userid) AS connectRequestSent,
						(SELECT COUNT(*) FROM connect WHERE targetuserid = ? AND fk_userid = users.pk_userid) AS connectRequest
					FROM users
					LEFT JOIN blocked
						ON users.pk_userid = blocked.fk_userid
					LEFT JOIN connect
						ON users.pk_userid = connect.fk_userid
					LEFT JOIN report
						ON users.pk_userid = report.fk_userid
					WHERE NOT pk_userid = ?
						AND gender = ?
						AND (genderpreference = ? OR (genderpreference = "both" AND NOT gender = ?))
						AND blocked.targetuserid NOT IN (SELECT fk_userid FROM blocked WHERE targetuserid = users.pk_userid)
						AND connect.targetuserid NOT IN (SELECT fk_userid FROM connect WHERE targetuserid = users.pk_userid)
						AND report.targetuserid NOT IN (SELECT fk_userid FROM report WHERE targetuserid = users.pk_userid)
					HAVING distance <= ?
						AND commonInterests >= ?
					ORDER BY distance ASC, rating DESC
					LIMIT ? , ?`,
					[req.session.latitude, req.session.longitude, req.session.latitude, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.preference, req.session.gender, req.session.gender, searchRadius, minInterestCount, min, max])
				// If there are any rows returned from the database (i.e. users were found)
				if (rows && rows.length) {
					// Loop through each user
					for (const user of rows) {
						try {
							// Rounds the distance to the nearest whole number
							user.distance = Math.ceil(user.distance)
							// Get the user's interests
							user.interests = await getUserInterests(user)
							// Get the user's profile picture
							user.profilePic = await getProfilePic(user)
							// Get the user's images
							user.images = await getUserImages(user)
							// Check if user can connect
							user.canConnect = canConnect(req.session.preference, user.preference, req.session.gender, user.gender)
							// Remove the latitude and longitude from the user object
							delete user.latitude
							delete user.longitude
						} catch (err) {
							console.error(err)
						}
					}
				}
			} else {
				return({status: false, message: "Please update your location!"});
			}
		}
		//console.log(rows)
		return (rows)
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

const getUsersAdvanced = async (req) => {

	try {
		if (req.session.preference === "both") {
			return ({status: true, message: "Fetching users"})
		} else {
			var [rows, fields] = await con.execute(`
				SELECT username, age, firstname, surname, latitude, longitude, pk_userid as 'userid'
				FROM users
				WHERE NOT pk_userid = ? AND gender = ? AND genderpreference = ? OR genderpreference = "both" AND NOT gender = ?`,
				[req.session.userid, req.session.preference, req.session.gender, req.session.gender])
			for (const user of rows) {
				user.distance = calcDistance(req.session.latitude, req.session.longitude, user.latitude, user.longitude)
				user.interests = await getUserInterests(user)
			}
		}
		console.log(rows)
		// Ascendig Distance rows.sort((a,b) => a.distance - b.distance)
		// Descending Distance rows.sort((a,b) => b.distance - a.distance)
		return (rows)
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

const blockUser = async (req) => {
	// Block user
	try {
		const [block, fields] = await con.execute(`
			INSERT INTO blocked (fk_userid, targetuserid)
			VALUES (?, ?)`,
			[req.session.userid, req.body.userid])
		return ({status: true, message: "User blocked"})
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

const reportUser = async (req) => {
	// Report user and block them
	try {
		const [report, fields] = await con.execute(`
			INSERT INTO report (fk_userid, targetuserid)
			VALUES (?, ?)`,
			[req.session.userid, req.body.userid])
		return ({status: true, message: "User reported"})
	} catch (err) {
		//console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

const  connectUser = async (req) => {
	try {
		// Create a new connect row with the two users
		const [connect, fields] = await con.execute(`
			INSERT INTO connect (fk_userid, targetuserid)
			VALUES (?, ?)`,
			[req.session.userid, req.body.userid])
			// Check if the target user has already sent a connect request to the current user
		if(await checkConnectRequest(req.body.userid, req.session.userid)) {
			// If so, create a new connected row with the two users
			const pk_id =  uuidv4() + "-" + uuidv4()
			const [connect, fields] = await con.execute(`
				INSERT INTO connected (pk_id, userid1, userid2)
				VALUES (?, ?, ?)`,
				[pk_id, req.session.userid, req.body.userid])
			return ({status: true, message: "You are now connected with " + req.body.username + "!"})
		}
		return ({status: true, message: "Connect request sent to " + req.body.username + "!"})
	} catch(err) {
		//console.log(err)
		return ({ status: false, err: "Something went wrong!" })
	}
}

module.exports = {
	getUsers,
	getUsersAdvanced,
	blockUser,
	reportUser,
	connectUser,
}