const router = require("express").Router();
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const SearchModel = require('../models/SearchModel');

router.get("/tags", async (req, res) => {
	try {
		res.send(await SearchModel.getTags(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

router.post("/search", async (req, res) => {
	try {
		res.send(await SearchModel.getSearch(req))
	} catch (e) {
		res.send({ status: false, err: "Something went wrong!" })
	}
});

module.exports = router;