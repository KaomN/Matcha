import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileName(props) {

	const [errorFirstname, setErrorFirstname] = useState("");
	const [errorSurname, setErrorSurname] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);

	return (
		<div className="profile-component-items">
			<div className="flex-row">
				<div className="flex-col">
					<input className="profile-inputs" placeholder={props.profileFirstname} onChange={function(e) {props.setFirstname(e.target.value); setErrorFirstname(""); }}></input>
					<div className="profile-input-error">{errorFirstname}</div>
				</div>
				<div className="flex-col">
					<input className="profile-inputs" placeholder={props.profileSurname} onChange={function(e) {props.setSurname(e.target.value); setErrorSurname(""); }}></input>
					<div className="profile-input-error">{errorSurname}</div>
				</div>
			</div>
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={ () => {
				HandleSubmit({
					...props,
					type: "name",
					setPromiseTracker,
					setErrorFirstname,
					setErrorSurname,
				})}}>Save</button>}
		</div>
);
}