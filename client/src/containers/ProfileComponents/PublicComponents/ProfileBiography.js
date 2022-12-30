import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileBiography(props) {

	const [errorBiography, setErrorBiography] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);

	return (
		<div className="profile-component-items">
			<textarea className="profile-biography-textarea" onChange={function(e) {props.setBiography(e.target.value)}} defaultValue={props.biography}></textarea>
			<div className="profile-input-error">{errorBiography}</div>
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={() => {
				HandleSubmit({
					...props,
					setErrorBiography,
					setPromiseTracker,
					type: "biography",
				})}}>Save</button>
			}
		</div>
	);
}