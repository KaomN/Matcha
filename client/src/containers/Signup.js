import React, { useState } from "react";
import "./Signup.css";

export default function Login() {
	//Input states
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	//Error states
	const [errorFirstname, setErrorFirstname] = useState("");
	const [errorSurname, setErrorSurname] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
	// Other states
	const [popup, setPopup] = useState("popup hide-popup");

	async function handleSubmit(event) {
		event.preventDefault();
		let response = await fetch('/request/register', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				firstname: firstname,
				surname: surname,
				username: username,
				email: email,
				password: password,
				passwordConfirm: passwordConfirm,
			})
		});
		if(response.status === 200) {
			response = await response.json();
			if (response.status) {
				// Successful signup
				setPopup("popup show-popup")
				console.log(popup)
				
			} else {
				setErrorFirstname(response.errorFirstname)
				setErrorSurname(response.errorSurname)
				setErrorUsername(response.errorUsername)
				setErrorEmail(response.errorEmail)
				setErrorPassword(response.errorPassword)
				setErrorPasswordConfirm(response.errorPasswordConfirm)
			}
		} else {
			// Server error
			console.log("Server error")
		}
	}

	return(
		<main className="form-container" id="formLogin">
			<form onSubmit={handleSubmit}>
				<h1 className="title-signup">Signup</h1>
				<div className="form_message form_message_error"></div>
				<div className="flex-row">
					<div className="form_input_group">
						<input autoFocus type="text" name="firstname" className="form_input" placeholder="Firstname" autoComplete="off" value={firstname} onChange={function(e) {setFirstname(e.target.value); setErrorFirstname("")}}/>
						<div className="form_input_error_message">{errorFirstname}</div>
					</div>
					<div className="form_input_group">
						<input type="text" name="surname" className="form_input" placeholder="Surname" autoComplete="off" value={surname} onChange={function(e) {setSurname(e.target.value); setErrorSurname("")}}/>
						<div className="form_input_error_message">{errorSurname}</div>
					</div>
				</div>
				<div className="form_input_group">
					<input type="text" name="username" className="form_input" placeholder="Username" autoComplete="off" value={username} onChange={function(e) {setUsername(e.target.value); setErrorUsername("")}}/>
					<div className="form_input_error_message">{errorUsername}</div>
				</div>
				<div className="form_input_group">
					<input type="text" name="email" className="form_input" placeholder="Email" autoComplete="off" value={email} onChange={function(e) {setEmail(e.target.value); setErrorEmail("")}}/>
					<div className="form_input_error_message">{errorEmail}</div>
				</div>
				<div className="form_input_group">
					<input type="password" name="password" className="form_input" placeholder="Password" autoComplete="off" value={password} onChange={function(e) {setPassword(e.target.value); setErrorPassword("")}}/>
					<div className="form_input_error_message">{errorPassword}</div>
				</div>
				<div className="form_input_group">
					<input type="password" name="passwordConfirm" className="form_input" placeholder="Confirm Password" autoComplete="off" value={passwordConfirm} onChange={function(e) {setPasswordConfirm(e.target.value); setErrorPasswordConfirm("")}}/>
					<div className="form_input_error_message">{errorPasswordConfirm}</div>
				</div>
				<button className="form_button" name="request" type="submit">Sign up</button>
				<div className="seperator"><div></div><div>OR</div><div></div></div>
				<div className="center">
					<a className="form__link" href="forgotpassword" draggable="false">Forgot password?</a>
				</div>
			</form>
			<div className={popup}>
				<div className="popup-content">
					<p>Thank you for signing up to Matcha! An email has been sent to you for verification!</p>
					<a href="/login" draggable="false"><button className="form_button" type="button">Login!</button></a>
				</div>
			</div>
		</main>
	);
}