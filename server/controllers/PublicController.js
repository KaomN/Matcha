const router = require("express").Router();
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
// Change email request
router.put("/email", async (req, res) => {
	var error = {}
	if(Validator.checkPin(req, error)) {
		res.send(await UserModel.changeEmail(req))
	} else {
		res.send(error)
	}
});

module.exports = router;