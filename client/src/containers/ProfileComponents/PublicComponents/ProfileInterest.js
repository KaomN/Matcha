import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileInterest(props) {

	const [errorPutInterest, setErrorPutInterest] = useState("");
	const [errorDeleteInterest, setErrorDeleteInterest] = useState("");
	const [interestClicked, setInterestClicked] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);
	const [promiseTracker2, setPromiseTracker2] = useState(false);

	return (
		<div className="profile-component-items">
			<div style={{border: "0px", marginBottom: "0.5rem"}}>
				{promiseTracker ?
				<LoadingSpinnerPromiseComponent/>
				:
				<input type="text" onKeyDown={(e) => {
					HandleSubmit({
						...props,
						type: "interestPut",
						setErrorDeleteInterest,
						setErrorPutInterest,
						event: e,
						value: e.target.value,
						setPromiseTracker,
					});
					setErrorPutInterest("");
					setErrorDeleteInterest("");
					}} autoComplete="off" className="profile-interest-input"/>
					}
			</div>
			<div>Interests added:</div>
			<div style={{border: "0px", marginBottom: "0.5rem"}} >
				<select multiple id="interestSelect" className="text-align-center profile-interest-select">
					{props.interest.map(interest => (
					<option key={interest.id} onClick={() => { setInterestClicked({id:interest.id, tag:interest.tag})}}>{interest.tag}</option>
					))}
				</select>
			</div>
			<div className="profile-input-error">{errorPutInterest}</div>
			<div className="profile-input-error">{errorDeleteInterest}</div>
			{promiseTracker2 ?
			<LoadingSpinnerPromiseComponent/>
			:
			interestClicked !== "" ?
			<button className="complete-form-button delete-btn" onClick={() => {
				HandleSubmit({
					...props,
					type: "interestDelete",
					setErrorDeleteInterest,
					interestClicked,
					setInterestClicked,
					setPromiseTracker2,
				}
				)}}>Delete Interest</button>
			:
			null
			}
		</div>
		);
}