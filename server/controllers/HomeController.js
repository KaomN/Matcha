const router = require("express").Router();
const HomeModel = require("../models/HomeModel");

router.get("/getusers", async (req, res) => {
	res.send(await HomeModel.getUsers(req, req.query['min'], req.query['max']));
	//res.send({ status: true })
	// if (req.session.username != undefined)
	// 	res.send({ username:req.session.username, userid:req.session.userid, auth:true })
	// else
	// 	res.send({ auth:false })
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