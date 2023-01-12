import { useState } from "react";

export default function InterestForm(props) {

	const [interestError, setInterestError] = useState("");
	const [interestClicked, setInterestClicked] = useState("");
	const reInterest = /^[A-Za-z-]+$/;
	function interestKeydown(event) {
		if(event.key === " ")
			event.preventDefault()
		else if(event.key === "Enter") {
			if(event.target.value.length > 25) {
				setInterestError("Error! Interest tags max length 25!")
			} else if(event.target.value.trim().length === 0) {
				setInterestError("Error! Interest tags cant be empty!")
			} else if(!reInterest.test(event.target.value.trim())) {
				setInterestError("Error! Interest tags can only contain '-' and letters!")
			} else {
				let interestValue = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase().trim()
				props.setInterest([...props.interest, {id:props.interest.length, name:interestValue} ]);
				event.target.value = "";
			}
		}
		document.querySelector('.form_message_error').innerHTML = ""
	}

	function deleteInterest() {
		props.setInterest(
			props.interest.filter(a =>
			a.id !== parseInt(interestClicked)
			)
		);
	}

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
							<div className="flex-column-completeprofile align-center p-1rem">
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="text" id="interest" onKeyDown={interestKeydown} autoComplete="off" className="text-align-center"/>
								</div>
								<div>Interests added:</div>
								<div style={{border: "0px", marginBottom: "0.5rem"}} >
									<select multiple id="interestSelect" className="text-align-center completeprofile_select">
									{props.interest.map(interest => (<option key={interest.id} onClick={() => {setInterestClicked(interest.id)}}>{interest.name}</option>))} 
									</select>
								</div>
								<button className="complete-form-button delete-btn" onClick={deleteInterest}>Delete Interest</button>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {document.querySelector('.form_message_error').innerHTML = ""; props.setShowForm("biographyForm");;}}>Previous</button>
								<button className="complete-form-button" onClick={() => {
										if(document.getElementById('interestSelect').firstChild === null) {
											document.querySelector('.form_message_error').innerHTML = "Empty field!"
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