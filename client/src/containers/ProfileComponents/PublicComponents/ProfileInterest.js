import { useState } from "react";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";
import Select from "../../../components/Select";

export default function ProfileInterest(props) {

	const [promiseTracker, setPromiseTracker] = useState(false);

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