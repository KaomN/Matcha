const router = require("express").Router();
const ProfileModel = require('../models/ProfileModel');

router.post("/getprofile", async (req, res) => {
	//console.log(req.body)
	if(req.body && Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype) {
		profileID = req.session.userid
	} else {
		profileID = req.body.profileID
	}
	//console.log(await ProfileModel.getProfile(profileID))
	res.send(await ProfileModel.getProfile(profileID, req))
});

module.exports = router;