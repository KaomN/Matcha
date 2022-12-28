const router = require("express").Router();
const ProfileModel = require('../models/ProfileModel');
const Validator = require('../modules/InputValidator');
const Moment = require('moment');


router.get("/profile", async (req, res) => {
	res.send(await ProfileModel.getProfile(req.query['id'], req))
}); 


// ADD BELOW TO POSTS
// router.post("/getprofile/:id", async (req, res) => {
// 	console.log(req.params.id)
// 	//res.send(await ProfileModel.getProfile(req.query['id'], req))
// }); 

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
	console.log(req.body)
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
	var error = {}
	if(Validator.checkInterest(req, error)) {
		res.send(await ProfileModel.updateInterest(req))
	} else {
		res.send(error)
	}
});

router.delete("/interest", async (req, res) => {
	var error = {}
	if(Validator.checkInterest(req, error)) {
		res.send(await ProfileModel.deleteInterest(req))
	} else {
		res.send(error)
	}
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

module.exports = router;

