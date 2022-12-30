import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfilePassword(props) {

	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorNewPassword, setErrorNewPassword] = useState("");
	const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);


	return (
		<div className="profile-component-items">
			<input className="profile-inputs" type="password" placeholder="Current Password" onChange={(e) => {setPassword(e.target.value); setErrorPassword("")}}></input>
			<div className="profile-input-error">{errorPassword}</div>
			<input className="profile-inputs" type="password" placeholder="New Password" onChange={(e) => {setNewPassword(e.target.value); setErrorNewPassword("")}}></input>
			<div className="profile-input-error">{errorNewPassword}</div>
			<input className="profile-inputs" type="password" placeholder="Confirm New Password" onChange={(e) => {setConfirmNewPassword(e.target.value); setErrorConfirmNewPassword("");}}></input>
			<div className="profile-input-error">{errorConfirmNewPassword}</div>
			{ promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={() => {
				HandleSubmit({
				...props,
				password,
				newPassword,
				confirmNewPassword,
				setErrorPassword,
				setErrorNewPassword,
				setErrorConfirmNewPassword,
				setPromiseTracker,
				type: "password",
				})}}>Save</button>
			}
		</div>
	);
}