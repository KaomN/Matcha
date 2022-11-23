import React, { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
	const { user, login} = useContext(UserContext);
	console.log(user.auth)
	//Input states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	//Error states
	const [errorUsername, setErrorUsername] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [error, setError] = useState("");
	//Other states
	const [popupNotVerified, setPopupNotVerified] = useState("popup hide-popup");
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		let response = await fetch('/request/login', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				username: username,
				password: password,
			})
		});
		response = await response.json();
		if(response.status) {
			login(username);
			if(response.profile)
				navigate("/Home");
			else
				navigate("/completeprofile");
			// Route to app page
			console.log(response);
		} else {
			if("error" in response) {
				setError(response.error)
			} else if("verified" in response) {
				setPopupNotVerified("popup show-popup")
				// TODO add user not verified error
				console.log("not verified")
			} else {
				setErrorUsername(response.errorUsername);
				setErrorPassword(response.errorPassword);
			} 
		}
	}

	return (
		<main className="form-container" id="formLogin">
			<form onSubmit={handleSubmit}>
				<h1 className="title-login">Matcha</h1>
				<div className="form_message form_message_error">{error}</div>
				<div className="form_input_group">
					<input type="text" name="username" className="form_input" autoFocus placeholder="Username" autoComplete="off" value={username} onChange={function(e) {setUsername(e.target.value); setErrorUsername(""); setError("")}}/>
					<div className="form_input_error_message">{errorUsername}</div>
				</div>
				<div className="form_input_group">
					<input type="password" name="password" className="form_input" placeholder="Password" autoComplete="off" value={password} onChange={function(e) {setPassword(e.target.value); setErrorPassword(""); setError("")}}/>
					<div className="form_input_error_message">{errorPassword}</div>
				</div>
				<button className="form_button" type="submit">Login</button>
				<div className="seperator"><div></div><div>OR</div><div></div></div>
				<div className="center">
					<a className="form__link" href="forgotpassword">Forgot password?</a>
				</div>
			</form>
			<div className={popupNotVerified}>
				<div className="popup-content">
					<form className="form" id="resendVerifyForm">
						<p>Your account has not been verified! If you did not receive a link when you registered, press the button below to re-send the link.</p>
						<div className="form_message"></div>
						<div className="button_container">
							<button type="button" className="form_button_verify mr" onClick={() => {setPopupNotVerified("popup hide-popup")}}>Back to Login</button>
							<button type="button" className="form_button_verify" id="resendVerificationBtn">Re-send verification link</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}