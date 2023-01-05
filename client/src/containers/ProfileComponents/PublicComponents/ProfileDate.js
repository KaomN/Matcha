import { useState, useCallback } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";
import PikadayWrap from "../../../components/PikadayWrap";
import moment from "moment";

export default function ProfileDate(props) {

	const [errorDate, setErrorDate] = useState("")
	const [promiseTracker, setPromiseTracker] = useState(false);

	const onDateSelect = useCallback((date) => {
		let newDate = moment(date).format('DD-MM-YYYY')
		props.setDateOfBirth(newDate)
		let parts = newDate.split('-')
		let dateArr = new Date(parts[2], parts[1] - 1, parts[0])
		let diff = Math.abs(new Date() - dateArr)
		props.setAge(Math.floor(diff / (1000 * 60 * 60 * 24 * 365)))
	}, [props])

	return (
		<div className="profile-component-items">
			<PikadayWrap
			value={props.profileDateOfBirth}
			page="profile"
			onSelect={onDateSelect}
			/>
			<div className="profile-input-error">{errorDate}</div>
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={ () => {
				HandleSubmit({
					...props,
					type: "dateofbirth",
					setErrorDate,
					setPromiseTracker,
				})}}>Save</button>}
		</div>
	);
}