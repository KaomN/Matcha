import { useState, useEffect } from "react";
import Select from "../../components/Select";

export default function InterestForm(props) {
	const [tagsOptions, setTagOptions] = useState(props.tagOptions);
	const [interestError, setInterestError] = useState("");

	useEffect(() => {
		setTagOptions(props.tagOptions)
	}, [props.tagOptions])

	return (<main className="form-container ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="interestForm">
							<div className="center">
								<label style={{fontSize: "23px"}}>Interests</label>
								<div className="form_message_error">{interestError}</div>
							</div>
							<div className="flex-column-completeprofile-select">
								<Select
								multi
								values={props.tags}
								options={tagsOptions}
								onChange={(values) => {
									props.setTags(values);
								}}
								max={5}
								className="complete_select"
								color="#2f4f4f"
								placeholder="Select Tags..."
								dropdownHeight="125px"
								separator={true}
								clearable={true}
								dropdownGap={-1}
								/>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {setInterestError(""); props.setShowForm("biographyForm");;}}>Previous</button>
								<button className="complete-form-button" onClick={() => {
										if(props.tags.length === 0) {
											setInterestError("Empty field!")
										} else {
											props.setShowForm("profileForm");
										}
									}}>Next</button>
							</div>
						</div>
					</div>
				</div>
			</main>);
}