const con = require("../setup").pool;
const calculate = require('../modules/CalculateDistance');

// Get user profile
const getProfile = async (userID, req) => {
	//const { firstname, surname, username, email, password } = req.body;
	try {
		var [rows, fields] = await con.execute(`SELECT username, firstname, surname, gender, age, dateofbirth, biography, latitude, longitude, pk_userid as 'userid', rating
												FROM users
												WHERE pk_userid = ?`,
												[userID])
		console.log(rows[0])
		if(rows[0] !== undefined) {
			if(rows[0].userid === req.session.userid) {
				Object.assign(rows[0], {isOwn: true})
				Object.assign(rows[0], {status: true})
				return (rows[0]);
			}
			Object.assign(rows[0], {distance: calculate.distance(req.session.latitude, req.session.longitude, rows[0].latitude, rows[0].longitude)})
			Object.assign(rows[0], {isOwn:false})
			console.log(rows[0])
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