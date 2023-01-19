const router = require("express").Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const UserModel = require('../models/UserModel');

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

router.get("/checkauth", (req, res) => {
	if(req.session.userid) {
		res.send({status:true})
	} else {
		res.send({status:false})
	}
});

module.exports = router;