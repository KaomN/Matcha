const router = require("express").Router();
const ProfileModel = require('../models/ProfileModel');
const Validator = require('../modules/InputValidator');


router.get("/profile", async (req, res) => {
	res.send(await ProfileModel.getProfile(req.query['id'], req))
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

router.put("/name", async (req, res) => {
	var error = {}
	if(Validator.checkName(req, error)) {
		res.send(await ProfileModel.updateName(req))
	} else {
		res.send(error)
	}
});

router.put("/username", async (req, res) => {
	var error = {}
	if(Validator.checkUsername(req, error)) {
		res.send(await ProfileModel.updateUsername(req))
	} else {
		res.send(error)
	}
});

router.put("/dateofbirth", async (req, res) => {
	var error = {}
	
	if(Validator.checkDate(req, error)) {
		res.send(await ProfileModel.updateDate(req))
	} else {
		res.send(error)
	}
});

router.put("/gender", async (req, res) => {
	var error = {}
	if(Validator.checkGender(req, error)) {
		res.send(await ProfileModel.updateGender(req))
	} else {
		res.send(error)
	}
});

router.put("/preference", async (req, res) => {
	var error = {}
	if(Validator.checkPreference(req, error)) {
		res.send(await ProfileModel.updatePreference(req))
	} else {
		res.send(error)
	}
});

router.put("/interest", async (req, res) => {
	res.send(await ProfileModel.updateInterest(req))
});

router.put("/biography", async (req, res) => {
	var error = {}
	if(Validator.checkBiography(req, error)) {
		res.send(await ProfileModel.updateBiography(req))
	} else {
		res.send(error)
	}
});

router.put("/email", async (req, res) => {
	var error = {}
	if(Validator.checkEmail(req, error)) {
		res.send(await ProfileModel.sendEmailChangeRequest(req))
	} else {
		res.send(error)
	}
});

router.put("/password", async (req, res) => {
	var error = {}
	if(Validator.checkPassword(req, error)) {
		res.send(await ProfileModel.updatePassword(req))
	} else {
		res.send(error)
	}
});

router.put("/position", async (req, res) => {
	var error = {}
	if(Validator.checkPosition(req, error)) {
		res.send(await ProfileModel.updatePosition(req))
	} else {
		res.send(error)
	}
});

router.post("/connect", async (req, res) => {
	try {
		res.send(await ProfileModel.connect(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.delete("/disconnect", async (req, res) => {
	try {
		res.send(await ProfileModel.disconnect(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.post("/report", async (req, res) => {
	try {
		res.send(await ProfileModel.report(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.delete("/report", async (req, res) => {
	try {
		res.send(await ProfileModel.unreport(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.post("/block", async (req, res) => {
	try {
		res.send(await ProfileModel.block(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.delete("/block", async (req, res) => {
	try {
		res.send(await ProfileModel.unblock(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.get("/disconnect", async (req, res) => {
	try {
		res.send(await ProfileModel.checkDisconnect(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

module.exports = router;

