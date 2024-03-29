import React, { useState, useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';
import "./styles/Login.css";
import toast from 'react-simple-toasts';
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";

export default function Login() {
	const { user } = useContext(UserContext);
	//Input states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	//Error states
	const [errorUsername, setErrorUsername] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [error, setError] = useState("");
	//Other states
	const [popupNotVerified, setPopupNotVerified] = useState("popup hide-popup");
	const [userId, setUserId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [messageVerification, setMessageVerification] = useState("");
	const navigate = useNavigate();
	
	function fetchLogin() {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(fetch('http://localhost:3001/request/login', {
					credentials: "include",
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({
						username: username,
						password: password,
					})
				})
				.then((response) => response.json()));
			}, 1000)
		});
		return promise
	}

	async function handleSubmit(event) {
		event.preventDefault();
		var response = await trackPromise(fetchLogin());
		if(response.status) {
			if(response.profile)
				navigate("/home");
			else
				navigate("/completeprofile");
		} else {
			if("errorUsername" in response) {
				setErrorUsername("Username required!");
			}
			if("errorPassword" in response) {
				setErrorPassword("Password required!");
			}
			if("error" in response) {
				setError(response.error)
			} else if("verified" in response) {
				setUserId(response.userid)
				setPopupNotVerified("popup show-popup")
			}
		}
	}

	function naviagteForgotPassword() {
		navigate("/forgotpassword");
	}

	useEffect(() => {
		if(user.auth) {
			navigate("/home");
		}
	}, [user.auth, navigate]);

	async function handleResendEmail() {
		setIsLoading(true)
		if(userId !== "") {
			const response = await fetch('http://localhost:3001/request/resendverification', {
				credentials: "include",
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					userid: userId,
				})
			})
			const data = await response.json()
			if(data.status) {
				setMessageVerification(data.message)
				setIsLoading(false)
				setTimeout(() => {
					setMessageVerification("")
				}, 3000)
			} else {
				toast("Something went wrong! Please refresh the page!", { position: 'top-center', duration: 5000 })
				setIsLoading(false)
			}
		} else {
			setIsLoading(false)
			toast("Something went wrong! Please refresh the page!", { position: 'top-center', duration: 5000 })
		}
	}

	return (
		<main className="form-container ma main-login" id="formLogin">
			<form className="login-form" onSubmit={handleSubmit}>
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
					<div className="form__link unselectable" onClick={naviagteForgotPassword}>Forgot password?</div>
				</div>
			</form>
			<div className={popupNotVerified}>
				<div className="popup-content">
					<form className="form" id="resendVerifyForm">
						<p>Your account has not been verified! If you did not receive a link when you registered, press the button below to re-send the link.</p>
						<div className="form_message_success">{messageVerification}</div>
						<div className="flex-center flex-row">
							<button type="button" className="form_button_verify mr" onClick={() => {setPopupNotVerified("popup hide-popup")}}>Back to Login</button>
							{isLoading ?
							<LoadingSpinnerComponent
							size={30}
							/>
							:
							<button type="button" className="form_button_verify" id="resendVerificationBtn" onClick={handleResendEmail}>Re-send verification link</button>}
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}