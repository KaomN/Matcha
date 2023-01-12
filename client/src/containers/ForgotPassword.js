import React, { useState } from "react";
import "./styles/ForgotPassword.css";

export default function Login() {
	//Input states
	const [email, setEmail] = useState("");
	//Error/Success states
	const [messageEmail, setMessageEmail] = useState("");
	const [formInputClass, setFormInputClass] = useState("form_message_error");

	async function handleSubmit(event) {
		event.preventDefault();
		let response = await fetch('/request/forgotpassword', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				email: email
			})
		});
		response = await response.json();
		if(response.status) {
			setFormInputClass("form_message_success")
			setMessageEmail(response.message)
		} else {
			setFormInputClass("form_message_error")
			setMessageEmail(response.errorEmail)
		}
	}

	return (
		<main className="form-container ma" id="formLogin">
			<form className="forgotpassword-form" onSubmit={handleSubmit}>
				<div className="lock-image-container">
					<i className="material-icons lock">lock</i>
				</div>
				<h3 className="title">Trouble Logging in?</h3>
				<p>Enter your email and we'll send you a link to get back into your account.</p>
				<div className={formInputClass}>{messageEmail}</div>
				<div className="form_input_group">
					<input name="email" type="text" id="forgotPasswordEmail" className="form_input" placeholder="Email" autoComplete="off" value={email} onChange={function(e) {setEmail(e.target.value); setMessageEmail("")}}/>
					<div></div>
				</div>
				<div className="button_container">
					<button type="submit" className="form_button2">Send Link</button>
				</div>
				<div className="seperator"><div></div><div>OR</div><div></div></div>
				<div className="center">
					<a className="form__link" href="login" draggable="false"><span>Back To Login</span></a>
					<a className="form__link" href="/signup" draggable="false"><span>Create New Account</span></a>
				</div>
			</form>
		</main>
	);
}