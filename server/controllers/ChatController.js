const router = require("express").Router();
const ChatModel = require("../models/ChatModel");

// router.get("/getlogininfo", (req, res) => {
// 	if (req.session.username != undefined)
// 		res.send({ username:req.session.username, userid:req.session.userid, auth:true })
// 	else
// 		res.send({ status:false })
// });

// router.get("/connectedusers", async (req, res) => {
// 	if (req.session.username != undefined)
// 		res.send(await ChatModel.getConnectedUsers(req))
// 	else
// 		res.send({ status:false })
// });

router.get("/chat", async (req, res) => {
	if (req.session.username != undefined)
		res.send(await ChatModel.getConnectedUsers(req))
	else
		res.send({ status:false })
});

router.put("/markread", async (req, res) => {
	if (req.session.username != undefined)
		res.send(await ChatModel.markMessageRead(req))
	else
		res.send({ status:false })
});

module.exports = router;