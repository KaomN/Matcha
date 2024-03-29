const Moment = require('moment');

const register = (req, error) => {
	const { firstname, surname, username, email, password, passwordConfirm} = req.body;
	const reUsername = /^[a-zA-Z0-9\-\_]+$/;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumbers = /\d/.test(password);
	const hasUpperCaseConfirm = /[A-Z]/.test(passwordConfirm);
	const hasLowerCaseConfirm = /[a-z]/.test(passwordConfirm);
	const hasNumbersConfirm = /\d/.test(passwordConfirm);
	//  RFC 5322 Official Standard
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(firstname.trim().length === 0)
		Object.assign(error, {"errorFirstname": "Firstname required!"});
	else if (firstname.trim().length > 20)
		Object.assign(error, {"errorFirstname": "Firstname too long! Max 20 characters!"});
	if(surname.trim().length === 0)
		Object.assign(error, {"errorSurname": "Surname required!"});
	else if (surname.trim().length > 20)
		Object.assign(error, {"errorSurname": "Surname too long! Max 20 characters!"});
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
	else if (!reEmail.test(email))
		Object.assign(error, {"errorEmail": "Invalid Email address!"});
	if(password.trim().length === 0)
		Object.assign(error, {"errorPassword": "Password required!"});
	else if (password.length > 50)
		Object.assign(error, {"errorPassword": "Password too long! Max 50 characters!"});
	else if (password.length < 8)
		Object.assign(error, {"errorPassword": "Password minimum length of 8!"});
	else if(!hasUpperCase || !hasLowerCase || !hasNumbers)
		Object.assign(error, {"errorPassword": "Password needs to include atleast upper-case letter, lower-case letter and number!"});
	if(passwordConfirm.length === 0)
		Object.assign(error, {"errorPasswordConfirm": "Password Confirm required!"});
	else if (passwordConfirm.length > 50)
		Object.assign(error, {"errorPasswordConfirm": "Password confirm too long! Max 50 characters!"});
	else if (passwordConfirm.length < 8)
		Object.assign(error, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
	else if(!hasUpperCaseConfirm || !hasLowerCaseConfirm || !hasNumbersConfirm)
		Object.assign(error, {"errorPasswordConfirm": "Password needs to include atleast upper-case letter, lower-case letter and number!"});
	if(password !== passwordConfirm) {
		Object.assign(error, {"errorPassword": "Password did not match!"});
		Object.assign(error, {"errorPasswordConfirm": "Password did not match!"});
	}
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
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(email.trim().length === 0)
		Object.assign(error, {"errorEmail": "Email required!"});
	else if (email.trim().length > 100)
		Object.assign(error, {"errorEmail": "Email too long! Max 100 characters!"});
	else if (!reEmail.test(email))
		Object.assign(error, {"errorEmail": "Invalid Email address!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const passwordReset = (req, error) => {
	const { password, passwordConfirm } = req.body;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumbers = /\d/.test(password);
	const hasUpperCaseConfirm = /[A-Z]/.test(passwordConfirm);
	const hasLowerCaseConfirm = /[a-z]/.test(passwordConfirm);
	const hasNumbersConfirm = /\d/.test(passwordConfirm);


	if(password.trim().length === 0)
		Object.assign(error, {"errorPassword": "Password required!"});
	else if (password.length > 50)
		Object.assign(error, {"errorPassword": "Password too long! Max 50 characters!"});
	else if (password.length < 8)
		Object.assign(error, {"errorPassword": "Password minimum length of 8!"});
	else if(!hasUpperCase || !hasLowerCase || !hasNumbers)
		Object.assign(error, {"errorPassword": "Password needs to include atleast upper-case letter, lower-case letter and number!"});
	if(passwordConfirm.length === 0)
		Object.assign(error, {"errorPasswordConfirm": "Password Confirm required!"});
	else if (passwordConfirm.length > 50)
		Object.assign(error, {"errorPasswordConfirm": "Password confirm too long! Max 50 characters!"});
	else if (passwordConfirm.length < 8)
		Object.assign(error, {"errorPasswordConfirm": "Password confirm minimum length of 8!"});
	else if(!hasUpperCaseConfirm || !hasLowerCaseConfirm || !hasNumbersConfirm)
		Object.assign(error, {"errorPasswordConfirm": "Password needs to include atleast upper-case letter, lower-case letter and number!"});
	if(password !== passwordConfirm) {
		Object.assign(error, {"errorPassword": "Password did not match!"});
		Object.assign(error, {"errorPasswordConfirm": "Password did not match!"});
	}
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
				Object.assign(error, {"err": "Mimetype Error!"});
			}
			if (mime === "image/jpeg") {
				if(ext != "jpg" && ext != "jpeg") {
					Object.assign(error, {"err": "Extension Error!"});
				}
			} else if (mime === "image/png") {
				if(ext != "png") {
					Object.assign(error, {"err": "Extension Error!"});
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

const checkName = (req, error) => {
	const { firstname, surname } = req.body;
	if(firstname.trim().length === 0)
		Object.assign(error, {"errorFirstname": "Firstname required!"});
	else if (firstname.trim().length > 20)
		Object.assign(error, {"errorFirstname": "Firstname too long! Max 20 characters!"});
	if(surname.trim().length === 0)
		Object.assign(error, {"errorSurname": "Surname required!"});
	else if (surname.trim().length > 20)
		Object.assign(error, {"errorSurname": "Surname too long! Max 20 characters!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkUsername = (req, error) => {
	const { username } = req.body;
	const reUsername = /^[a-zA-Z0-9\-\_]+$/;
	if(username.trim().length === 0)
		Object.assign(error, {"err": "Username required!"});
	else if (username.trim().length > 20)
		Object.assign(error, {"err": "Username too long! Max 20 characters!"});
	else if(username.trim().length < 4)
		Object.assign(error, {"err": "Username minimum length of 4!"});
	else if(!reUsername.test(username))
		Object.assign(error, {"err": "Username only 'a-z', '0-9', '-' and '_'"});
	else if(username.trim() === req.session.username)
		Object.assign(error, {"err": "Same as old username!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkDate = (req, error) => {
	const { dateofbirth, age } = req.body;
	if(!Moment(dateofbirth, "DD-MM-YYYY", true).isValid())
		Object.assign(error, {"err": "Incorrect date format!"});
	else if (typeof age !== "number")
		Object.assign(error, {"err": "Incorrect date format!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkGender = (req, error) => {
	const { gender } = req.body;
	if(gender !== "male" && gender !== "female")
		Object.assign(error, {"err": "Incorrect gender value!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkPreference = (req, error) => {
	const { preference } = req.body;
	if(preference !== "male" && preference !== "female" && preference !== "both")
		Object.assign(error, {"err": "Incorrect preference value!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkBiography = (req, error) => {
	const { biography } = req.body;
	if(biography.length > 2000) {
		Object.assign(error, {"err": "Biography max 2000 characters"});
	}
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkEmail = (req, error) => {
	const { email } = req.body;
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(email.trim().length === 0)
		Object.assign(error, {"err": "Email required!"});
	else if (email.trim().length > 100)
		Object.assign(error, {"err": "Email too long! Max 100 characters!"});
	else if (!reEmail.test(email))
		Object.assign(error, {"err": "Invalid Email address!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkPassword = (req, error) => {
	const { currentPassword, newPassword, confirmNewPassword } = req.body;
	const hasUpperCase = /[A-Z]/.test(newPassword);
	const hasLowerCase = /[a-z]/.test(newPassword);
	const hasNumbers = /\d/.test(newPassword);
	const hasUpperCaseConfirm = /[A-Z]/.test(confirmNewPassword);
	const hasLowerCaseConfirm = /[a-z]/.test(confirmNewPassword);
	const hasNumbersConfirm = /\d/.test(confirmNewPassword);

	if(currentPassword.length === 0)
		Object.assign(error, {"errorPassword": "Password required!"});
	if(newPassword.length === 0)
		Object.assign(error, {"errorNewPassword": "Password required!"});
	else if (newPassword.length > 50)
		Object.assign(error, {"errorNewPassword": "Password too long! Max 50 characters!"});
	else if (newPassword.length < 8)
		Object.assign(error, {"errorNewPassword": "Password minimum length of 8!"});
	else if(!hasUpperCase || !hasLowerCase || !hasNumbers)
		Object.assign(error, {"errorNewPassword": "Password needs to include atleast upper-case letter, lower-case letter and number!"});
	if(confirmNewPassword.length === 0)
		Object.assign(error, {"errorConfirmNewPassword": "Password Confirm required!"});
	else if (confirmNewPassword.length > 50)
		Object.assign(error, {"errorConfirmNewPassword": "Password confirm too long! Max 50 characters!"});
	else if (confirmNewPassword.length < 8)
		Object.assign(error, {"errorConfirmNewPassword": "Password confirm minimum length of 8!"});
	else if(!hasUpperCaseConfirm || !hasLowerCaseConfirm || !hasNumbersConfirm)
		Object.assign(error, {"errorConfirmNewPassword": "Password needs to include atleast upper-case letter, lower-case letter and number!"});
	if(newPassword !== confirmNewPassword) {
		Object.assign(error, {"errorNewPassword": "Password did not match!"});
		Object.assign(error, {"errorConfirmNewPassword": "Password did not match!"});
	}
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkPosition = (req, error) => {
	const { lat, lng } = req.body;
	if(lat === undefined || lng === undefined)
		Object.assign(error, {"err": "Undefined Position!"});
	else if(lat >= 85.05112874 || lat <= -85.05112874)
		Object.assign(error, {"err": "Out of bounds!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

const checkPin = (req, error) => {
	const pin = req.body.pin;
	if(pin.length != 6)
		Object.assign(error, {"err": "Pin needs to be 6 numbers!"});
	if(error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	register,
	login,
	forgotPassword,
	passwordReset,
	checkImage,
	checkName,
	checkUsername,
	checkDate,
	checkGender,
	checkPreference,
	checkBiography,
	checkEmail,
	checkPassword,
	checkPosition,
	checkPin,
}