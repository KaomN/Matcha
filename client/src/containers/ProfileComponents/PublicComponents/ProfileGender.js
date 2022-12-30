import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileGender(props) {

	const [errorGender, setErrorGender] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);

	return (
		<div className="profile-component-items">
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<div className="flex-col">
				<div className="flex-row">
					<label htmlFor ="genderMale" className="profile-gender-label">Male:</label>
					<input name="gender" value="male" type="radio" id="genderMale" defaultChecked={props.gender === "male" ? true : false} onChange={(e) => {
						HandleSubmit({
							...props,
							type: "gender",
							value: e.target.value,
							setErrorGender,
							setPromiseTracker,
						})}}></input>
				</div>
				<div className="flex-row">
					<label htmlFor="genderFemale" className="profile-gender-label" >Female:</label>
					<input name="gender" value="female" type="radio" id="genderFemale" defaultChecked={props.gender === "female" ? true : false} onChange={(e) => {
						HandleSubmit({
							...props,
							type: "gender",
							value: e.target.value,
							setErrorGender,
							setPromiseTracker
						})}}></input>
				</div>
				<div className="profile-input-error">{errorGender}</div>
			</div>
			}
		</div>
	);
}