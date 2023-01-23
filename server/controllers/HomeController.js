const router = require("express").Router();
const HomeModel = require("../models/HomeModel");

router.get("/getusers", async (req, res) => {
	res.send(await HomeModel.getUsers(req));
});

router.post("/blockuser", async (req, res) => {
	res.send(await HomeModel.blockUser(req));

});

router.post("/reportuser", async (req, res) => {
	res.send(await HomeModel.reportUser(req))
});

router.post("/connectuser", async (req, res) => {
	res.send(await HomeModel.connectUser(req))
});

module.exports = router;