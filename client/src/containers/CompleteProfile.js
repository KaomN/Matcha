import {useState} from "react";
import PikadayWrap from "../components/PikadayWrap";
import "./styles/CompleteProfile.css";
import '../../node_modules/pikaday/css/pikaday.css';

var id = 0;
var numImages = 0;

export default function FirstTimeProfile() {
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [preference, setPreference] = useState("");
	const [biography, setBiography] = useState("");
	const [interest, setInterest] = useState([]);
	const [interestClicked, setInterestClicked] = useState("");
	const [picture, setPicture] = useState([]);
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("");

	const [showAgeForm, setAgeForm] = useState(true);
	const [showGenderForm, setGenderForm] = useState(false);
	const [showPreferenceForm, setPreferenceForm] = useState(false);
	const [showBiographyForm, setBiographyForm] = useState(false);
	const [showInterestForm, setInterestForm] = useState(false);
	const [showPictureForm, setPictureForm] = useState(false);
	const [showProfileForm, setProfileForm] = useState(false);

	const [interestError, setInterestError] = useState("");
	const [location, setLocation] = useState({})

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				// Success function
				saveLocation, 
				// Error function
				getLocationAPI, 
				// Options. See MDN for details.
				{
				   enableHighAccuracy: true,
				   timeout: 5000,
				   maximumAge: 0
				});
		} else { 
			// Log not supported
			console.log("Geolocation is not supported by this browser.");
		}
	}

	function saveLocation(position) {
		setLocation({lat:position.coords.latitude, lng:position.coords.longitude})
	}

	async function getLocationAPI() {
		let response = await fetch('/request/getlocation', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
		});
		response = await response.json();
		setLocation({lat:response.location.lat, lng:response.location.lng})
	}

	if (location && Object.keys(location).length === 0 && Object.getPrototypeOf(location) === Object.prototype)
		getLocation();

	function ageForm() {
			return (<main className="form-container">
						<div className="complete-profile-form">
							<div style={{backgroundColor: ""}}>
								<h1 className="title">Complete your profile</h1>
								<div className="form_message form_message_error"></div>
							</div>
							<div className="complete-form-container">
								<div id="ageForm">
									<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
										<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Date of birth</label>
									</div>
									<div className="flex-column pb-2rem">
										<PikadayWrap />
									</div>
									<div className="center-left">
										<button className="complete-form-button" onClick={() => {
											let parts = document.getElementById("date").value.split('-');
											let date = new Date(parts[2], parts[1] - 1, parts[0]);
											let diff = Math.abs(new Date() - date);
											setAge(Math.floor(diff / (1000 * 60 * 60 * 24 * 365)));
											setAgeForm(false);
											setGenderForm(true);
											}}>Next</button>
											<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
									</div>
								</div>
								</div>
							</div>
						</main>);
	}

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
										<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="male" onClick={() => {setGender("male")}}/>
										<label style={{fontSize: "23px"}} htmlFor="male">Male</label>
									</div>
									<div style={{marginBottom: "0.5rem"}}>
										<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="female" onClick={() => {setGender("female")}}/>
										<label style={{fontSize: "23px"}} htmlFor="female">Female</label>
									</div>
								</div>
								<div className="center-gap">
									<button className="complete-form-button" onClick={() => {setGenderForm(false); setAgeForm(true)}}>Previous</button>
									<button className="complete-form-button" onClick={() => {setGenderForm(false); setPreferenceForm(true);}}>Next</button>
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
											<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceMale" onClick={function(e) {setPreference("male")}}/>
											<label style={{fontSize: "23px"}} htmlFor="preferenceMale">Female</label>
										</div>
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceFemale" onClick={function(e) {setPreference("female")}}/>
											<label style={{fontSize: "23px"}} htmlFor="preferenceFemale">Male</label>
										</div>
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceBoth" onClick={function(e) {setPreference("both")}}/>
											<label style={{fontSize: "23px"}} htmlFor="preferenceBoth">Both</label>
										</div>
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={() => {setPreferenceForm(false);setGenderForm(true);}}>Previous</button>
										<button className="complete-form-button" onClick={() => {setPreferenceForm(false);setBiographyForm(true);}}>Next</button>
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
										<button className="complete-form-button" onClick={() => {setBiographyForm(false);setPreferenceForm(true);}}>Previous</button>
										<button className="complete-form-button" onClick={() => {setBiographyForm(false);setInterestForm(true);}}>Next</button>
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

	function deleteInterest() {
		setInterest(
			interest.filter(a =>
			a.id !== parseInt(interestClicked)
			)
		);
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
											{interest.map(interest => (<option key={interest.id} onClick={() => {setInterestClicked(interest.id)}}>{interest.name}</option>))}
											</select>
										</div>
										<button className="complete-form-button delete-btn" onClick={deleteInterest}>Delete Interest</button>
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={() => {setInterestForm(false);setBiographyForm(true);}}>Previous</button>
										<button className="complete-form-button" onClick={() => {setInterestForm(false);setProfileForm(true);}}>Next</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
	}

	function saveProfilePicture(event) {
		setProfilePictureSrc(URL.createObjectURL(event.target.files[0]))
		setProfilePicture(event.target.files[0])
	}

	
	function profileForm() {
		if (profilePicture && Object.keys(profilePicture).length === 0 && Object.getPrototypeOf(profilePicture) === Object.prototype) {
			var btn = ""
			var fileInput = <div className="flex-column">
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="file" id="profilePic" accept="image/*" name="profile" onChange={saveProfilePicture}/>
									<i className="material-icons profile-file-btn" onClick={() => {document.getElementById('profilePic').click();}}>add_photo_alternate</i>
								</div>
							</div>
		} else {
			var btn = <button className="complete-form-button" onClick={() => {
				setProfilePicture({});
				setProfilePictureSrc("");
			}}>Delete</button>
			var fileInput = ""
		}
		return (<main className="form-container">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Complete your profile</h1>
							<div className="form_message form_message_error"></div>
						</div>
						<div className="complete-form-container">
							<div id="profileForm">
								<div className="flex flex-col flex-align-center pb-1rem">
									<label style={{fontSize: "23px"}}>Profile Picture</label>
								</div>
								{fileInput}
								<div className="flex-center pl-1rem pr-1rem pb-1rem complete-form-image-container">
										<div className="flex-center wh-100p">
											<img className="complete-form-img pt-1rem" src={profilePictureSrc}/>
											{btn}
										</div>
								</div>
								<div className="center-gap">
									<button className="complete-form-button" onClick={() => {setProfileForm(false);setInterestForm(true);}}>Previous</button>
									<button className="complete-form-button" onClick={() => {setProfileForm(false);setPictureForm(true);}}>Next</button>
									<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</main>);
	}

	function saveChosenPicture(event) {
		if(picture.length < 4) {
			let pictureObj = event.target.files[0]
			if (pictureObj !== undefined) {
				let pictureSrc = URL.createObjectURL(pictureObj)
				setPicture([...picture, {id:++numImages, name:pictureObj, src: pictureSrc}]);
			}
		}
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
									<div className="flex flex-col flex-align-center">
										<label style={{fontSize: "23px"}}>Pictures</label>
										<div className="flex flex-col flex-align-center">
											<p className="m-0">Choose pictures to upoad to your profile!</p>
											<p className="mt-0">Max 4 pictures!</p>
										</div>
									</div>
									<div className="flex-column">
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											<input type="file" accept="image/*" onChange={saveChosenPicture}/>
										</div>
									</div>
									<div className="flex-center pl-1rem pr-1rem pb-1rem complete-form-image-container">
										{picture.map(pictureElem => (
										<div key={pictureElem.id} data-key={pictureElem.id} className="flex-center wh-100p">
											<img className="complete-form-img pt-1rem" src={pictureElem.src}/>
											<button className="complete-form-button" onClick={() => {
												setPicture(
													picture.filter(a =>
													a.id !== parseInt(pictureElem.id)
													)
												);
											}}>Delete</button>
										</div>
										))}
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={() => {setPictureForm(false);setProfileForm(true);}}>Previous</button>
										<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		//console.log(document.getElementById('profilePic').files[0])
		const formdata = new FormData();
		formdata.append("age", age);
		// formdata.append("gender", gender);
		// formdata.append("preference", preference);
		formdata.append("biography", biography);
		// formdata.append("interest", interest);
		formdata.append("profilePicture", profilePicture);
		console.log(profilePicture)
		//formdata.append("age", age);
		let response = await fetch('/request/completeprofile', {
			method: "POST",
			body: formdata
		});
		response = await response.json();
		console.log(response);
	}

	if(showAgeForm)
		return ageForm()
	else if(showGenderForm)
		return genderForm()
	else if(showPreferenceForm)
		return preferenceForm()
	else if(showBiographyForm)
		return biographyForm()
	else if(showInterestForm)
		return interestForm()
	else if(showProfileForm)
		return profileForm()
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