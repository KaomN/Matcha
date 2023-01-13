const con = require("../setup").pool;
const { getUserTagsArray, getProfilePic, getUserImages, createTagsSearchQuery, canConnect }  = require("../modules/HelperModules");

const getTags = async (req) => {
	try {
		const [rows, fields] = await con.query("SELECT pk_tagid as 'value', tag as 'label' FROM tag");
		return { status: true, tags: rows };
	} catch (e) {
		return { status: false, err: "Something went wrong!" };
	}
}

const getSearch = async (req) => {
	try {
		const distance = 50;
		var tagsQuery =  createTagsSearchQuery(req.body.tags)
		var [rows, fields] = await con.execute(`
			SELECT username, age, firstname, surname, latitude, longitude, pk_userid as 'userid', biography, genderpreference as 'preference', gender,
				(6371 * acos(cos( radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin( radians(?)) * sin(radians(latitude)))) AS distance,
				(SELECT COUNT(*) FROM blocked WHERE fk_userid = ? AND targetuserid = users.pk_userid) AS blocked,
				(SELECT COUNT(*) FROM report WHERE fk_userid = ? AND targetuserid = users.pk_userid) AS reported,
				(SELECT COUNT(*) FROM connected WHERE (userid1 = ? AND userid2 = users.pk_userid) OR (userid2 = ? AND userid1 = users.pk_userid)) AS connected,
				(SELECT COUNT(*) FROM connect WHERE fk_userid = ? AND targetuserid = users.pk_userid) AS connectRequestSent,
				(SELECT COUNT(*) FROM connect WHERE targetuserid = ? AND fk_userid = users.pk_userid) AS connectRequest,
				(SELECT COUNT(*) FROM (SELECT * FROM rating WHERE fk_userid = pk_userid LIMIT 100) AS ratings) AS rating
			FROM users
			WHERE ${tagsQuery}
			HAVING distance <= ?
				AND rating BETWEEN ? AND ?
				AND age BETWEEN ? AND ?
				AND blocked = 0
				AND reported = 0
			ORDER BY distance ASC, rating DESC`,
			[req.body.location.lat, req.body.location.lng, req.body.location.lat, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, req.session.userid, distance, req.body.rating.min, req.body.rating.max, req.body.age.min, req.body.age.max])
		if (rows && rows.length) {
			// Loop through each user
			for (const user of rows) {
				try {
					// Rounds the distance to the nearest whole number
					user.distance = Math.ceil(user.distance)
					// Get the user's interests
					user.interests = await getUserTagsArray(user)
					// Get the number of interests
					user.tagsCount = user.interests.length
					// Get the user's profile picture
					user.profilePic = await getProfilePic(user)
					// Get the user's images
					user.images = await getUserImages(user)
					// Check if the user can connect with the current user
					user.canConnect = canConnect(req.session.preference, user.preference, req.session.gender, user.gender)
					// Remove the latitude and longitude from the user object
					delete user.latitude
					delete user.longitude
				} catch (err) {
					console.error(err)
				}
			}
		}
		return { status: true, users: rows };
	} catch (e) {
		return { status: false, err: "Something went wrong!" };
	}
}

module.exports = {
	getTags,
	getSearch,
}