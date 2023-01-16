import { useState, useEffect } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";
import Select from "../../../components/Select";

export default function ProfileInterest(props) {

	// const [errorPutInterest, setErrorPutInterest] = useState("");
	// const [errorDeleteInterest, setErrorDeleteInterest] = useState("");
	// const [interestClicked, setInterestClicked] = useState("");
	// const [promiseTracker, setPromiseTracker] = useState(false);
	const [promiseTracker, setPromiseTracker] = useState(false);

	// async function handleSubmit() {
	// 	try {
	// 		const response = await fetch('http://localhost:3001/profile/interest', {
	// 			credentials: "include",
	// 			headers: {'Content-Type': 'application/json'},
	// 			method: "PUT",
	// 			body: JSON.stringify({ interest: props.interest})
	// 	});
	// 	const data = await response.json()
	// 	if (data.status) {
	// 		props.setInterestSuccessMsg("Updated successfully!")
	// 		setTimeout(() => {
	// 			props.setInterestSuccessMsg("")
	// 		}, 3000)
	// 		props.setUser(user => ( {
	// 			...user,
	// 			interest: props.interest
	// 		}))
	// 	} else {
	// 		props.setErrorPutInterest(data.err)
	// 		setTimeout(() => {
	// 			props.setErrorPutInterest("")
	// 		}, 3000)
	// 	}
	// 	} catch (err) {
	// 		//toast("Something went wrong!", { position: 'top-center', duration: 5000 })
	// 	}
	// }

	return (
		<div className="profile-component-items">
			<Select
			multi
			options={props.tagOptions}
			onChange={(values) => {
				props.setInterest(values)
			}}
			max={5}
			className="complete_select"
			color="#2f4f4f"
			placeholder="Select Tags..."
			dropdownHeight="125px"
			separator={true}
			clearable={true}
			dropdownGap={-1}
			values={props.interest}
			/>
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent />
			:
			<button className="complete-form-button profile_save_btn" onClick={() => {
				HandleSubmit({
					...props,
					type: "interestPut",
					setPromiseTracker,
				}
			)}}>Save Tags</button>}
			
		</div>
		);
}