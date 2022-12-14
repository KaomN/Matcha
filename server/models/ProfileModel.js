const con = require("../setup").pool;
const calculate = require('../modules/CalculateDistance');

// Get user profile
const getProfile = async (userID, req) => {
	//const { firstname, surname, username, email, password } = req.body;
	try {
		var imageCount = 0
		// Fetch user info
		var [rows, fields] = await con.execute(`SELECT username, firstname, surname, gender, age, dateofbirth, biography, latitude, longitude, pk_userid as 'userid', rating
												FROM users
												WHERE pk_userid = ?`,
												[userID])
		if(rows[0] !== undefined) {
			// Fetch images
			var result = await con.execute(`SELECT *
											FROM images
											WHERE fk_userid = ?`,
											[userID])
											console.log(rows[0])
			if (result[0] !== undefined) {
				Object.assign(rows[0], {profile: false})
				for (const images of result[0]) {
					if (images.profilepic === 1) {
						Object.assign(rows[0], {profile: true})
						Object.assign(rows[0], {profileSrc: "http://localhost:3001/images/" + req.session.username + "/profile.jpg"})
					} else {
						imageCount++;
					}
				}
			}
			if(rows[0].userid === req.session.userid) {
				Object.assign(rows[0], {isOwn: true})
				Object.assign(rows[0], {status: true})
				return (rows[0]);
			}
			Object.assign(rows[0], {distance: calculate.distance(req.session.latitude, req.session.longitude, rows[0].latitude, rows[0].longitude)})
			Object.assign(rows[0], {isOwn:false})
			//console.log(rows[0])
			Object.assign(rows[0], {status: true})
			
			return (rows[0]);
		} else {
			return ({status: false});
		}
	} catch (err) {

	}

}

module.exports = {
	getProfile,
}