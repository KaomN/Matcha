const con = require("../setup").pool;
const { getProfilePic, getMessages}  = require("../modules/HelperModules");

const getConnectedUsers = async (req) => {
	try {
		var [rows, fields] = await con.execute(
			`SELECT users.username, users.pk_userid as 'userid', connected.pk_id as 'room'
			FROM users
			LEFT JOIN connected
				ON users.pk_userid = connected.userid1 OR users.pk_userid = connected.userid2
			WHERE (connected.userid1 = ? OR connected.userid2 = ?) AND users.pk_userid != ?`,
			[req.session.userid, req.session.userid, req.session.userid])
		for (const user of rows) {
			try {
				user.profilePic = await getProfilePic(user)
				user.messages = await getMessages(user)
			} catch (err) {
				return({status: false, message: "Server connection error"});
			}
		}
		return { status: true, connectedUsers: rows }
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}
const markMessageRead = async (req) => {
	try {
		var result = await con.execute(
			`UPDATE messages
			SET isread = 1
			WHERE fk_connected = ? AND userid != ?`,
			[ req.body.channel, req.session.userid ])
		return { status: true}
	} catch (err) {
		return({status: false, message: "Server connection error"});
	}
}

module.exports = {
	getConnectedUsers,
	markMessageRead,
}