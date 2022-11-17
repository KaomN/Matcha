import {useState, useEffect} from "react";
import "./styles/CompleteProfile.css";

var id = 0;

export default function FirstTimeProfile() {
	const [gender, setGender] = useState("");
	const [preference, setPreference] = useState("");
	const [biography, setBiography] = useState("");
	const [interest, setInterest] = useState([]);
	const [interestClicked, setInterestClicked] = useState("");
	const [picture, setPicture] = useState("");

	const [showGenderForm, setGenderForm] = useState(true);
	const [showPreferenceForm, setPreferenceForm] = useState(false);
	const [showBiographyForm, setBiographyForm] = useState(false);
	const [showInterestForm, setInterestForm] = useState(false);
	const [showPictureForm, setPictureForm] = useState(false);

	const [interestError, setInterestError] = useState("");

	function genderForm() {
		return (<main className="form-container">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Complete your profile</h1>
							<div className="form_message form_message_error"></div>
						</div>
						<div className="complete-form-container">
							<div id="genderForm">
								<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
									<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Gender</label>
								</div>
								<div className="flex-column">
									<div style={{marginBottom: "0.5rem"}}>
										<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="male" value="male" onClick={function(e) {setGender(e.target.value)}}/>
										<label style={{fontSize: "23px"}} htmlFor="male">Male</label>
									</div>
									<div style={{marginBottom: "0.5rem"}}>
										<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="female" value="female" onClick={function(e) {setGender(e.target.value)}}/>
										<label style={{fontSize: "23px"}} htmlFor="female">Female</label>
									</div>
								</div>
								<div className="center-left">
									<button className="next_button" onClick={genderNext}>Next</button>
								</div>
							</div>
							</div>
						</div>
					</main>);
	}

	function preferenceForm() {
		return (<main className="form-container">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Complete your profile</h1>
							<div className="form_message form_message_error"></div>
						</div>
							<div className="complete-form-container">
								<div id="preferenceForm">
									<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
										<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Preference</label>
									</div>
									<div className="flex-column">
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceMale" value="Female" onClick={function(e) {setPreference(e.target.value)}}/>
											<label style={{fontSize: "23px"}} htmlFor="preferenceMale">Female</label>
										</div>
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceFemale" value="Male" onClick={function(e) {setGender(e.target.value)}}/>
											<label style={{fontSize: "23px"}} htmlFor="preferenceFemale">Male</label>
										</div>
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceBoth" value="Both" onClick={function(e) {setGender(e.target.value)}}/>
											<label style={{fontSize: "23px"}} htmlFor="preferenceBoth">Both</label>
										</div>
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={preferencePrevious}>Previous</button>
										<button className="complete-form-button" onClick={preferenceNext}>Next</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
	}

	function biographyForm() {
		return (<main className="form-container">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Complete your profile</h1>
							<div className="form_message form_message_error"></div>
						</div>
							<div className="complete-form-container">
								<div id="biographyForm">
									<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
										<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Biography</label>
									</div>
									<div className="flex-column">
										<textarea cols={35} rows={10} onChange={function(e) {setBiography(e.target.value)}}></textarea>
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={biographyPrevious}>Previous</button>
										<button className="complete-form-button" onClick={biographyNext}>Next</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
	}

	function interestKeydown(event) {
		if(event.key === "Enter") {
			if(event.target.value.length > 25) {
				setInterestError("Error! Interest tags max length 25!")
			} else if(event.target.value.trim().length === 0) {
				setInterestError("Error! Interest tags cant be empty!")
			} else {
				let interestValue = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase().trim()
				setInterest([...interest, {id:id++, name:interestValue} ]);
			}
		}
	}

	function selectedInterest(event) {
		setInterestClicked(event.target.dataset.key);
	}

	function deleteInterest() {
		const option = document.querySelector(`[data-key="${interestClicked}"]`)
		if(option != null) {
			setInterest(
				interest.filter(a =>
				a.id !== parseInt(interestClicked)
				)
			);
		}
	}

	function interestForm() {
		return (<main className="form-container">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Complete your profile</h1>
						</div>
							<div className="complete-form-container">
								<div id="interestForm">
									<div className="center">
										<label style={{fontSize: "23px"}}>Interests</label>
										<div className="center">
											<div className="form_message_error">{interestError}</div>
										</div>
									</div>
									<div className="flex-column align-center p-1rem">
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="text" id="interest" onKeyDown={interestKeydown} autoComplete="off" className="text-align-center"/>
										</div>
										<div>Interests added:</div>
										<div style={{border: "0px", marginBottom: "0.5rem"}} >
											<select multiple id="interestSelect" className="text-align-center">
											{interest.map(interest => (
												<option key={interest.id} data-key={interest.id} onClick={selectedInterest}>{interest.name}</option>
												))}
											</select>
											
										</div>
										<button className="complete-form-button" onClick={deleteInterest}>Delete Interest</button>
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={interestPrevious}>Previous</button>
										<button className="complete-form-button" onClick={interestNext}>Next</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
	}

	function pictureForm() {
		return (<main className="form-container">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Complete your profile</h1>
							<div className="form_message form_message_error"></div>
						</div>
							<div className="complete-form-container">
								<div id="pictureForm">
									<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
										<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Pictures</label>
									</div>
									<div className="flex-column">
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}}/>
											<label style={{fontSize: "23px"}} htmlFor="male">Male</label>
										</div>
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}}/>
											<label style={{fontSize: "23px"}} htmlFor="female">Female</label>
										</div>
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={picturePrevious}>Previous</button>
										<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
	}

	async function handleSubmit(event) {
		event.preventDefault();
	}

	function genderNext() {
		setGenderForm(false)
		setPreferenceForm(true);
	}

	function preferenceNext() {
		setPreferenceForm(false);
		setBiographyForm(true)
	}

	function preferencePrevious() {
		setPreferenceForm(false);
		setGenderForm(true)
	}

	function biographyNext() {
		setBiographyForm(false)
		setInterestForm(true);
	}

	function biographyPrevious() {
		setBiographyForm(false)
		setPreferenceForm(true);
	}

	function interestNext() {
		setInterestForm(false);
		setPictureForm(true)
	}

	function interestPrevious() {
		setInterestForm(false);
		setBiographyForm(true);
	}

	function picturePrevious() {
		setPictureForm(false);
		setInterestForm(true);
	}

	if(showGenderForm)
		return genderForm()
	else if(showPreferenceForm)
		return preferenceForm()
	else if(showBiographyForm)
		return biographyForm()
	else if(showInterestForm)
		return interestForm()
	else if(showPictureForm)
		return pictureForm()
}


/*
	Male hetero = 1
	Female hetero = 2
	Male homo = 3
	Female homo = 4
	Male bi = 5
	Femaile bi = 6
*/