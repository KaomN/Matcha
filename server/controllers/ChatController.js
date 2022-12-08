const router = require("express").Router();

router.get("/getlogininfo", (req, res) => {
	if (req.session.username != undefined)
		res.send({ username:req.session.username, userid:req.session.userid, auth:true })
	else
		res.send({ auth:false })
});

module.exports = router;