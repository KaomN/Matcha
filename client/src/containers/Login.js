import React, { useState } from "react";
import "./Login.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// function validateForm() {
	// 	return username.length > 0 && password.length > 0;
	// }

	async function handleSubmit(event) {
		event.preventDefault();
		let response = await fetch('/login/request', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				username: username,
				password: password,
			})
		});
		console.log(response);
	}

	return (
		<main className="form-container" id="formLogin">
			<form onSubmit={handleSubmit}>
				<h1 className="title-signup">Matcha</h1>
				<div className="form_message form_message_error"></div>
				<div className="form_input_group">
					<input type="text" name="username" className="form_input" autoFocus placeholder="Username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
					<div className="form_input_error_message"></div>
				</div>
				<div className="form_input_group">
					<input type="password" name="password" className="form_input" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<div className="form_input_error_message"></div>
				</div>
				<button className="form_button" name="request" value="loginAction" type="submit">Login</button>
				<div className="seperator"><div></div><div>OR</div><div></div></div>
				<div className="center">
					<a className="form__link" href="forgotpassword">Forgot password?</a>
				</div>
			</form>
		</main>
	);
}