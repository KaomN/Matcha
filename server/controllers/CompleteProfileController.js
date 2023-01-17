const router = require("express").Router();
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const CompleteProfileModel = require('../models/CompleteProfileModel');
const Validator = require('../modules/InputValidator');

router.post("/saveprofilepicture", async (req, res) => {
	var error = {}
	if(Validator.checkImage(req, error)) {
		res.send(await CompleteProfileModel.saveProfilePicture(req))
	} else {
		res.send(error)
	}
});

router.post("/saveinterests", async (req, res) => {
	res.send(await CompleteProfileModel.saveInterests(req))
});

router.post("/saveuserinfo", async (req, res) => {
	res.send(await CompleteProfileModel.saveUserInfo(req))
});

module.exports = router;