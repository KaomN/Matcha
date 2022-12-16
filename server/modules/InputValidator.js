const emailValidator = require('email-validator');

const register = (req, error) => {
	const { firstname, surname, username, email, password, passwordConfirm} = req.body;
	const rePassword = /\d|[A-Z]/;
	const reUsername = /^[a-zA-Z0-9\-\_]+$/;
	if(firstname.trim().length === 0)
		Object.assign(error, {"errorFirstname": "Firstname required!"});
	else if (firstname.trim().length > 50)
		Object.assign(error, {"errorFirstname": "Firstname too long! Max 50 characters!"});
	if(surname.trim().length === 0)
		Object.assign(error, {"errorSurname": "Surname required!"});
	else if (surname.trim().length > 50)
		Object.assign(error, {"errorSurname": "Surname too long! Max 50 characters!"});
	if(username.trim().length === 0)
		Object.assign(error, {"errorUsername": "Username required!"});
	else if (username.trim().length > 20)
		Object.assign(error, {"errorUsername": "Username too long! Max 20 characters!"});
	else if(username.trim().length < 4)
		Object.assign(error, {"errorUsername": "Username minimum length of 4!"});
	else if(!reUsername.test(username))
		Object.assign(error, {"errorUsername": "Username only 'a-z', '0-9', '-' and '_'"});
	if(email.trim().length === 0)
		Object.assign(error, {"errorEmail": "Email required!"});
	else if (email.trim().length > 100)
		Object.assign(error, {"errorEmail": "Email too long! Max 100 characters!"});
	else if (!emailValidator.validate(email))
		Object.assign(error, {"errorEmail": "Invalid Email address!"});
	if(password.trim().length === 0)
		Object.assign(error, {"errorPassword": "Password required!"});
	// else if (password.length > 50)
	// 	Object.assign(error, {"errorPassword": "Password too long! Max 255 characters!"});
	// else if (password.length < 8)
	// 	Object.assign(error, {"errorPassword": "Password minimum length of 8!"});
	// else if(!rePassword.test(password))
	// 	Object.assign(error, {"errorPassword": "Password needs to include atleast an uppercase letter or number!"});
	if(passwordConfirm.length === 0)
		Object.assign(error, {"errorPasswordConfirm": "Password Confirm required!"});
	// else if (passwordConfirm.length > 50)
	// 	Object.assign(error, {"errorPasswordConfirm": "Password confirm too long! Max 255 characters!"});
	// else if (passwordConfirm.length < 8)
	// 	Object.assign(error, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
	// else if(!rePassword.test(passwordConfirm))
	// 	Object.assign(error, {"errorPasswordConfirm": "Password needs to include atleast an uppercase letter or number!"});
	// if(password !== passwordConfirm) {
	// 	Object.assign(error, {"errorPassword": "Password did not match!"});
	// 	Object.assign(error, {"errorPasswordConfirm": "Password did not match!"});
	// }
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const login = (req, error) => {
	const { username, password } = req.body;
	if(username.trim().length === 0)
		Object.assign(error, {"errorUsername": "Username required!"});
	if(password.trim().length === 0)
		Object.assign(error, {"errorPassword": "Password required!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const forgotPassword = (req, error) => {
	let email = req.body.email;
	if(email.trim().length === 0)
		Object.assign(error, {"errorEmail": "Email required!"});
	else if (email.trim().length > 100)
		Object.assign(error, {"errorEmail": "Email too long! Max 100 characters!"});
	else if (!emailValidator.validate(email))
		Object.assign(error, {"errorEmail": "Invalid Email address!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const passwordReset = (req, error) => {
	const {password, passwordConfirm, token} = req.body;
	if(password.trim().length === 0)
		Object.assign(error, {"errorPassword": "Password required!"});
	// else if (password.length > 50)
	// 	Object.assign(error, {"errorPassword": "Password too long! Max 255 characters!"});
	// else if (password.length < 8)
	// 	Object.assign(error, {"errorPassword": "Password minimum length of 8!"});
	// else if(!rePassword.test(password))
	// 	Object.assign(error, {"errorPassword": "Password needs to include atleast an uppercase letter or number!"});
	if(passwordConfirm.length === 0)
		Object.assign(error, {"errorPasswordConfirm": "Password Confirm required!"});
	// else if (passwordConfirm.length > 50)
	// 	Object.assign(error, {"errorPasswordConfirm": "Password confirm too long! Max 255 characters!"});
	// else if (passwordConfirm.length < 8)
	// 	Object.assign(error, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
	// else if(!rePassword.test(passwordConfirm))
	// 	Object.assign(error, {"errorPasswordConfirm": "Password needs to include atleast an uppercase letter or number!"});
	// if(password !== passwordConfirm) {
	// 	Object.assign(error, {"errorPassword": "Password did not match!"});
	// 	Object.assign(error, {"errorPasswordConfirm": "Password did not match!"});
	// }
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkImage = (req, error) => {
	if(!req.files) {
		return ({status:false, message:"empty"});
	} else {
		for (let imageName in req.files) {
			let ext = req.files[imageName].name.split(".").pop();
			let mime = req.files[imageName].mimetype;
			if (mime != "image/jpeg" && mime != "image/png") {
				Object.assign(error, {"mime": "Mimetype Error!"});
			}
			if (mime === "image/jpeg") {
				if(ext != "jpg" && ext != "jpeg") {
					Object.assign(error, {"extension": "Extension Error!"});
				}
			} else if (mime === "image/png") {
				if(ext != "png") {
					Object.assign(error, {"extension": "Extension Error!"});
				}
			}
		}
		if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
			return true;
		} else {
			return false;
		}
	}
	
}

module.exports = {
	register,
	login,
	forgotPassword,
	passwordReset,
	checkImage
}