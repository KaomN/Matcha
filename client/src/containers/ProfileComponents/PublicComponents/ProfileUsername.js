import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileUsername(props) {

	const [errorUsername, setErrorUsername] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);

	return (
		<div className="profile-component-items">
			<div>
				<input className="profile-inputs" placeholder={props.profileUsername} onChange={function(e) {props.setUsername(e.target.value); setErrorUsername(""); }}></input>
				<div className="profile-input-error">{errorUsername}</div>
			</div>
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={() => {
				HandleSubmit({
					...props,
					type: "username",
					setPromiseTracker,
					setErrorUsername,
				})}}>Save</button>}
		</div>
);
}