const router = require("express").Router();
const ChatModel = require("../models/ChatModel");

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