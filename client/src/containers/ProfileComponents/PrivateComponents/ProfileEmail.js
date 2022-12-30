import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileEmail(props) {

	const [email, setEmail] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [emailChangeMsg, setEmailChangeMsg] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);

	return (
		<div className="profile-component-items">
			<div className="flex-col">
				<input className="profile-inputs" placeholder={props.email} onChange={(e) => {setEmail(e.target.value); setErrorEmail("")}}></input>
				<div className="profile-input-error">{errorEmail}</div>
				<div className="profile-items-success-msg">{emailChangeMsg}</div>
			</div>
			{ promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={() => {
				HandleSubmit({
					...props,
					email,
					setErrorEmail,
					setEmailChangeMsg,
					setPromiseTracker,
					type: "email",
				}
			)}}>Submit</button>
			}
		</div>
	);
}