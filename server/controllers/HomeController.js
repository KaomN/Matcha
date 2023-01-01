const router = require("express").Router();
const HomeModel = require("../models/HomeModel");

router.get("/getusers", (req, res) => {
	
	res.send(HomeModel.getUsers(req));
	//res.send({ status: true })
	// if (req.session.username != undefined)
	// 	res.send({ username:req.session.username, userid:req.session.userid, auth:true })
	// else
	// 	res.send({ auth:false })
});

module.exports = router;