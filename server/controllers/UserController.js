const router = require("express").Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const UserModel = require('../models/UserModel');
const Validator = require('../modules/InputValidator');

// Register request
router.post("/register", async (req, res) => {
	var error = {}
	if(Validator.register(req, error)) {
		res.send(await UserModel.register(req))
	} else {
		res.send(error)
	}
});

//Login request
router.post("/login", async (req, res) => {
	var error = {}
	if(Validator.login(req, error)) {
		res.send(await UserModel.login(req))
	} else {
		res.send(error)
	}
});

// Get login status
router.get("/getuserinfo", async (req, res) => {
	if (req.session.username !== undefined) {
		res.send(await UserModel.getUserInfo(req))
	}
	else
		res.send({ auth: false, username: "", isLoading: false, imageSrc: "http://localhost:3001/images/defaultProfile.png"})
});


// Logout
router.get("/logout", (req, res) => {
	console.log(req.sessionStore)
	try {
		req.sessionStore.destroy(req.session.id, function(err) {
			
		})
		res.send({status: true});
	} catch (err) {
		console.log(err)
	}
});

// Verify account request
router.post("/verify", async (req, res) => {
	res.send(await UserModel.verify(req))
});

// Forgot password request
router.post("/forgotpassword", async (req, res) => {
	var error = {}
	if(Validator.forgotPassword(req, error)) {
		res.send(await UserModel.forgotPassword(req))
	} else {
		res.send(error)
	}
});

// Password reset request
router.post("/passwordreset", async (req, res) => {
	var error = {}
	if(Validator.passwordReset(req, error)) {
		res.send(await UserModel.passwordReset(req))
	} else {
		res.send(error)
	}
});

// Google Location API
router.post("/getlocation", async (req, res) => {
	try {
		const response = await axios({
			method: 'post',
			url:'https://www.googleapis.com/geolocation/v1/geolocate?key=' + process.env.API_KEY
		});
		Object.assign(response.data, {"status": true});
		//console.log(response.data)
		res.send(response.data)
	} catch (error) {
		res.send({status: false, msg: "Error fetching API location data"})
	}
});

// Complete profile on First login.
router.post("/completeprofile", async (req, res) => {
	var error = {}
	if(Validator.checkImage(req, error)) {
		res.send(await UserModel.completeProfile(req))
	} else {
		res.send(error)
	}
});

router.get("/getprofileimage", async (req, res) => {
	res.send(await UserModel.getProfileImage(req))
});


router.put("/email", async (req, res) => {
	var error = {}
	if(Validator.checkPin(req, error)) {
		res.send(await UserModel.changeEmail(req))
	} else {
		res.send(error)
	}
	
	//res.send({status:true})
});


router.get("/notification", async (req, res) => {
	try {
		res.send(await UserModel.getNotification(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.put("/notification", async (req, res) => {
	res.send(await UserModel.markNotificationRead(req))
});

router.delete("/notification", async (req, res) => {
	try {
		res.send(await UserModel.deleteNotification(req))
	} catch (e) {
		//console.log(e)
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.get("/test", async (req, res) => {
	res.send(await UserModel.test(req))
});

router.get("/history", async (req, res) => {
	if(req.session.userid !== undefined) {
		res.send(await UserModel.getHistory(req))
	} else {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.delete("/history", async (req, res) => {
	res.send(await UserModel.deleteHistory(req))
});

module.exports = router;