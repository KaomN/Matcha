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
	try {
		req.sessionStore.destroy(req.session.id, function(err) {
			res.send({status: true});
		})
	} catch (err) {

	}
});
// Verify account request
router.post("/resendverification", async (req, res) => {
	res.send(await UserModel.resendVerification(req))
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
		res.send(response.data)
	} catch (error) {
		res.send({status: false, msg: "Error fetching API location data"})
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
		res.send({ status: false, err: "Something went wrong!" })
	}
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