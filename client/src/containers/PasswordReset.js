import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/PasswordReset.css";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";

export default function PasswordReset() {

	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [errorPassword, setErrorPassword] = useState("");
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams] = useSearchParams();

	async function handleSubmit() {
		setIsLoading(true)
		const response = await fetch('http://localhost:3001/request/passwordreset', {
			credentials: "include",
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				password: password,
				passwordConfirm: passwordConfirm,
				token: searchParams.get("token"),
			})
		});
		const data = await response.json();
		if(data.status) {
			setMessageType("form_message_success");
			setMessage(data.message);
			setTimeout(() => {
				setMessage("");
			}, 3000)
		} else {
			if ("error" in data) {
				setMessageType("form_message_error");
				setMessage(data.error);
				setTimeout(() => {
					setMessage("");
				}, 3000)
			} else {
				setErrorPassword(data.errorPassword);
				setErrorPasswordConfirm(data.errorPasswordConfirm);
			}
		}
		setIsLoading(false)
	}

	return (
		<main className="password_reset_main ma">
			<form>
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
					{isLoading ?
					<LoadingSpinnerComponent
					size={30}
					/>
					:
					<button type="submit" className="form_button" onClick={handleSubmit}>Submit</button>}
				</div>
			</form>
		</main>
	);
}