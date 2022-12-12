const con = require("../setup").pool;


const getProfile = async (userID) => {
	//const { firstname, surname, username, email, password } = req.body;
	try {
		var [rows, fields] = await con.execute(`SELECT username, firstname, surname, gender, age, dateofbirth, biography, latitude, longitude
												FROM users
												WHERE pk_userid = ?`,
												[userID])
		console.log(rows)
		return ({status: true, profile: userID});
	} catch (err) {

	}

}

module.exports = {
	getProfile,
}