import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfilePreference(props) {

	const [promiseTracker, setPromiseTracker] = useState(false);
	const [errorPreference, setErrorPreference] = useState("");

	return (
		<div className="profile-component-items">
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<div className="flex-col">
				<div className="flex-row">
					<label htmlFor ="preferencerMale" className="profile-gender-label">Male:</label>
					<input name="preference" value="male" type="radio" id="preferencerMale" defaultChecked={props.preference === "male" ? true : false} onChange={(e) => {
						HandleSubmit({
							...props,
							value: e.target.value,
							setErrorPreference,
							setPromiseTracker,
							type: "preference",
						})}} ></input>
				</div>
				<div className="flex-row">
					<label htmlFor="preferenceFemale" className="profile-gender-label" >Female:</label>
					<input name="preference" value="female" type="radio" id="preferenceFemale" defaultChecked={props.preference === "female" ? true : false} onChange={(e) => {
						HandleSubmit({
							...props,
							value: e.target.value,
							setErrorPreference,
							setPromiseTracker,
							type: "preference",
						})}} ></input>
				</div>
				<div className="flex-row">
					<label htmlFor="preferenceBoth" className="profile-gender-label" >Both:</label>
					<input name="preference" value="both" type="radio" id="preferenceBoth" defaultChecked={props.preference === "both" ? true : false} onChange={(e) => {
						HandleSubmit({
							...props,
							value: e.target.value,
							setErrorPreference,
							setPromiseTracker,
							type: "preference",
						})}} ></input>
				</div>
				<div className="profile-input-error">{errorPreference}</div>
			</div>
			}
		</div>
	);
}