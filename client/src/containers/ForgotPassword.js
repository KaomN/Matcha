import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ForgotPassword.css";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";

export default function Login() {
	//Input states
	const [email, setEmail] = useState("");
	//Error/Success states
	const [messageEmail, setMessageEmail] = useState("");
	const [formInputClass, setFormInputClass] = useState("form_message_error");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit() {
		setIsLoading(true)
		const response = await fetch('http://localhost:3001/request/forgotpassword', {
			credentials: "include",
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				email: email
		})
		});
		const data = await response.json();
		if(data.status) {
			setFormInputClass("form_message_success")
			setMessageEmail(data.message)
			setTimeout(() => {
				setMessageEmail("")
			}, 5000)
			
		} else {
			setFormInputClass("form_message_error")
			setMessageEmail(data.errorEmail)
			setTimeout(() => {
				setMessageEmail("")
			}, 5000)
		}
		setIsLoading(false)
	}

	function naviagteLogin() {
		navigate("/login");
	}

	function naviagteSignup() {
		navigate("/signup");
	}

	return (
		<main className="form-container ma" id="formLogin">
			<form className="forgotpassword-form" >
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
					{isLoading ?
					<LoadingSpinnerComponent
					size={30}
					/>
					:
					<button type="submit" className="form_button2" onClick={handleSubmit}>Send Link</button>}
					
				</div>
				<div className="seperator"><div></div><div>OR</div><div></div></div>
				<div className="center">
					<div className="form__link unselectable" onClick={naviagteLogin}>Back To Login</div>
					<div className="form__link unselectable" onClick={naviagteSignup}><span>Create New Account</span></div>
				</div>
			</form>
		</main>
	);
}