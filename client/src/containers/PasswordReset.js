import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/PasswordReset.css";

export default function PasswordReset() {

	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [errorPassword, setErrorPassword] = useState("");
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	const [searchParams] = useSearchParams();

	async function handleSubmit(event) {
		event.preventDefault();

		let response = await fetch('/request/passwordreset', {
			credentials: "include",
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				password: password,
				passwordConfirm: passwordConfirm,
				token: searchParams.get("token"),
			})
		});
		response = await response.json();

		if(response.status) {
			setMessageType("form_message_success");
			setMessage(response.message);
		} else {
			if ("error" in response) {
				setMessageType("form_message_error");
				setMessage(response.error);
			} else {
				setErrorPassword(response.errorPassword);
				setErrorPasswordConfirm(response.errorPasswordConfirm);
			}
		}
	}

	return (
		<main className="password_reset_main ma">
			<form onSubmit={handleSubmit}>
				<div className="lock-image-container">
					<i className="material-icons lock-reset">lock_reset</i>
				</div>
				<h3>Matcha Password Reset</h3>
				<div className="center">
					<div className={messageType}>{message}</div>
				</div>
				<div className="form_input_group">
					<input autoFocus type="password" name="password" className="form_input" placeholder="New Password" autoComplete="off" value={password} onChange={function(e) {setPassword(e.target.value); setErrorPassword(""); setMessage("")}}/>
					<div className="form_input_error_message">{errorPassword}</div>
				</div>
				<div className="form_input_group">
					<input type="password" name="passwordConfirm" className="form_input" placeholder="Confirm Password" autoComplete="off" value={passwordConfirm} onChange={function(e) {setPasswordConfirm(e.target.value); setErrorPasswordConfirm(""); setMessage("")}}/>
					<div className="form_input_error_message">{errorPasswordConfirm}</div>
				</div>
				<div className="button_container">
					<button type="submit" className="form_button">Submit</button>
				</div>
			</form>
		</main>
	);
}