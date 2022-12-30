import { useCallback } from "react";
import moment from "moment"
import PikadayWrap from "../../components/PikadayWrap";

export default function AgeForm(props) {

	const onDateSelect = useCallback((date) => {
		let newDate = moment(date).format('DD-MM-YYYY')
		props.setDateOfBirth(newDate)
		let parts = newDate.split('-')
		let dateArr = new Date(parts[2], parts[1] - 1, parts[0])
		let diff = Math.abs(new Date() - dateArr)
		props.setAge(Math.floor(diff / (1000 * 60 * 60 * 24 * 365)))
	}, [props])

	return (<main className="form-container main-completeprofile ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="ageForm">
							<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
								<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Date of birth</label>
								<div className="form_message_error"></div>
							</div>
							<div className="flex-column-completeprofile pb-2rem">
								<PikadayWrap
								onSelect={onDateSelect}
								value={props.date}
								/>
							</div>
							<div className="center-left">
								<button className="complete-form-button" onClick={() => {
									if(document.getElementById('date').value === "") {
										document.querySelector('.form_message_error').innerHTML = "Empty field!"
									} else {
										props.setShowForm("genderForm");
									}
									}}>Next</button>
							</div>
						</div>
					</div>
				</div>
			</main>);
}