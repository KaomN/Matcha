const con = require("../setup").pool;
const emailTransporter =  require("../setup").emailTransporter;
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Register request
const getUsers = async (req) => {

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
			return ({status: false, message: "Server connection error"})
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
			}
		}
		console.log(rows)
		return ({status: false, message: "Server connection error"})
	} catch (err) {
		console.log(err)
		return({status: false, message: "Server connection error"});
	}
}

module.exports = {
	getUsers,
}