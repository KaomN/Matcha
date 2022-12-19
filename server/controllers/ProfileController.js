const router = require("express").Router();
const ProfileModel = require('../models/ProfileModel');
const Validator = require('../modules/InputValidator');


router.post("/getprofile", async (req, res) => {
	//console.log(req.body)
	if(req.body && Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype) {
		profileID = req.session.userid
	} else {
		profileID = req.body.profileID
	}
	//console.log(await ProfileModel.getProfile(profileID))
	//console.log(await ProfileModel.getProfile(profileID, req))
	res.send(await ProfileModel.getProfile(profileID, req))
});

router.post("/uploadprofileimage", async (req, res) => {
	var error = {}
	if(Validator.checkImage(req, error)) {
		res.send(await ProfileModel.uploadProfileImage(req))
	} else {
		res.send(error)
	}
});

router.post("/uploadprofileimages", async (req, res) => {
	var error = {}
	if(Validator.checkImage(req, error)) {
		res.send(await ProfileModel.uploadProfileImages(req))
	} else {
		res.send(error)
	}
});

router.post("/deleteimage", async (req, res) => {
	res.send(await ProfileModel.deleteImage(req))
});

module.exports = router;