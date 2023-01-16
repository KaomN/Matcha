import { useState, useEffect } from "react";
// Public components
import ProfileName from "../PublicComponents/ProfileName";
import ProfileUsername from "../PublicComponents/ProfileUsername";
import ProfileBiography from "../PublicComponents/ProfileBiography";
import ProfileInterest from "../PublicComponents/ProfileInterest";
import ProfilePreference from "../PublicComponents/ProfilePreference";
import ProfileGender from "../PublicComponents/ProfileGender";
import ProfileDate from "../PublicComponents/ProfileDate";
// Private components
import ProfileEmail from "../PrivateComponents/ProfileEmail";
import ProfilePassword from "../PrivateComponents/ProfilePassword";
import ProfileMaps from "../PrivateComponents/ProfileMaps";

export default function EditProfilePopup(props) {

	// Profile Settings States
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [username, setUsername] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [preference, setPreference] = useState("");
	const [interest, setInterest] = useState([]);
	const [biography, setBiography] = useState("");
	const [newBiography, setNewBiography] = useState("");
	// Success states for Profile Settings
	const [nameSuccessMsg, setNameSuccessMsg] = useState("");
	const [usernameSuccessMsg, setUsernameSuccessMsg] = useState("");
	const [dateOfBirthSuccessMsg, setDateOfBirthSuccessMsg] = useState("");
	const [genderSuccessMsg, setGenderSuccessMsg] = useState("");
	const [preferenceSuccessMsg, setPreferenceSuccessMsg] = useState("");
	const [biographySuccessMsg, setBiographySuccessMsg] = useState("");
	const [interestSuccessMsg, setInterestSuccessMsg] = useState([]);
	const [emailSuccessMsg, setEmailSuccessMsg] = useState("");
	const [passwordSuccessMsg, setPasswordSuccessMsg] = useState([]);
	const [positionSuccessMsg, setPositionSuccessMsg] = useState("");

	// Visibility states for Profile Settings
	const [isPublicProfileSettingsVisible, setIsPublicProfileSettingsVisible] = useState(false);
	const [isPrivateProfileSettingsVisible, setIsPrivateProfileSettingsVisible] = useState(false);
	const [isNameVisible, setIsNameVisible] = useState(false);
	const [isUsernameVisible, setIsUsernameVisible] = useState(false);
	const [isDateVisible, setIsDateVisible] = useState(false);
	const [isGenderVisible, setIsGenderVisible] = useState(false);
	const [isPreferenceVisible, setIsPreferenceVisible] = useState(false);
	const [isInterestsVisible, setIsInterestsVisible] = useState(false);
	const [isBiographyVisible, setIsBiographyVisible] = useState(false);
	const [isEmailVisible, setIsEmailVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLocationVisible, setIsLocationVisible] = useState(false);



	useEffect(() => {
		setFirstname(props.profile.firstname)
		setSurname(props.profile.surname)
		setUsername(props.profile.username)
		setDateOfBirth(props.profile.dateofbirth)
		setAge(props.profile.age)
		setGender(props.profile.gender)
		setPreference(props.profile.preference)
		setInterest(props.profile.interest)
		setBiography(props.profile.biography)
		setNewBiography(props.profile.biography)
	}, [props.profile]);

	function hidePublicItems(show) {
		setIsNameVisible(false)
		setIsUsernameVisible(false)
		setIsDateVisible(false)
		setIsGenderVisible(false)
		setIsPreferenceVisible(false)
		setIsInterestsVisible(false)
		setIsBiographyVisible(false)
		clearStates()
		show(true)
	}
	
	function hidePrivateItems(show) {
		setIsEmailVisible(false)
		setIsPasswordVisible(false)
		setIsLocationVisible(false)
		clearStates()
		show(true)
	}
	
	function hideSettings(show) {
		setIsPublicProfileSettingsVisible(false)
		setIsPrivateProfileSettingsVisible(false)
		clearStates()
		show(true)
	}
	
	function clearStates() {
		setFirstname("")
		setSurname("")
		setUsername("")
		setDateOfBirth("")
		resetBiographyState()
	}
	
	function resetBiographyState() {
		setBiography(newBiography)
	}

	return (
		<div className="popup-profile">
			<div ref={props.refEditProfile} className="popup-content-profile-edit pos-relative">
				<h1 className="profile-popup-title">Edit Profile</h1>
				<i className="material-icons pos-absolute-top-right" draggable="false" onClick={ () => props.setIsEditProfileVisible(false)} >close</i>
				<div className="wh-100p">
					<div className="flex-center wh-100p flex-col flex-justify-content-start">
						<div className="form-container1">
							<div className={!isPublicProfileSettingsVisible ? "form-show-container1 border360": "form-show-container1"}>
								<b className="profile-hover" onClick={() => {
									isPublicProfileSettingsVisible ? setIsPublicProfileSettingsVisible(false) : hideSettings(setIsPublicProfileSettingsVisible)
								}}>Public Profile Settings</b>
							</div>
							{isPublicProfileSettingsVisible ?
							<div className="profile-edit-container">
								<div className="profile-edit-components" onClick={() => { isNameVisible ? setIsNameVisible(false) : hidePublicItems(setIsNameVisible) }}>
									<div>Name</div>
									<div className="profile-items-success-msg">{nameSuccessMsg}</div>
								</div>
								{isNameVisible ?
								<ProfileName
								user={props.user}
								setUser={props.setUser}
								profileFirstname={props.profile.firstname}
								profileSurname={props.profile.surname}
								setNameSuccessMsg={setNameSuccessMsg}
								setFirstname={setFirstname}
								setSurname={setSurname}
								firstname={firstname}
								surname={surname}
								setProfile={props.setProfile}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isUsernameVisible ? setIsUsernameVisible(false) : hidePublicItems(setIsUsernameVisible)}}>
									<div>Username</div>
									<div className="profile-items-success-msg">{usernameSuccessMsg}</div>
								</div>
								{isUsernameVisible ?
								<ProfileUsername
								user={props.user}
								setUser={props.setUser}
								username={username}
								setUsername={setUsername}
								setUsernameSuccessMsg={setUsernameSuccessMsg}
								profileUsername={props.profile.username}
								setProfile={props.setProfile}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => { isDateVisible ? setIsDateVisible(false) : hidePublicItems(setIsDateVisible) }}>
									<div>Date of birth</div>
									<div className="profile-items-success-msg">{dateOfBirthSuccessMsg}</div>
								</div>
								{isDateVisible ?
								<ProfileDate
								user={props.user}
								setUser={props.setUser}
								profileDateOfBirth={props.profile.dateofbirth}
								setDateOfBirthSuccessMsg={setDateOfBirthSuccessMsg}
								age={age}
								setAge={setAge}
								dateOfBirth={dateOfBirth}
								setDateOfBirth={setDateOfBirth}
								setProfile={props.setProfile}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isGenderVisible ? setIsGenderVisible(false) : hidePublicItems(setIsGenderVisible)}}>
									<div>Gender</div>
									<div className="profile-items-success-msg">{genderSuccessMsg}</div>
								</div>
								{isGenderVisible ?
								<ProfileGender
								user={props.user}
								setUser={props.setUser}
								gender={gender}
								setGender={setGender}
								setGenderSuccessMsg={setGenderSuccessMsg}
								setProfile={props.setProfile}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isPreferenceVisible ? setIsPreferenceVisible(false) : hidePublicItems(setIsPreferenceVisible)}}>
									<div>Preference</div>
									<div className="profile-items-success-msg">{preferenceSuccessMsg}</div>
								</div>
								{isPreferenceVisible ?
								<ProfilePreference
								user={props.user}
								setUser={props.setUser}
								preference={preference}
								setPreference={setPreference}
								setPreferenceSuccessMsg={setPreferenceSuccessMsg}
								setProfile={props.setProfile}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isInterestsVisible ? setIsInterestsVisible(false) : hidePublicItems(setIsInterestsVisible)}}>
									<div>Interests</div>
									<div className="profile-items-success-msg">{interestSuccessMsg}</div>
								</div>
								{isInterestsVisible ?
								<ProfileInterest
								user={props.user}
								setUser={props.setUser}
								setInterestSuccessMsg={setInterestSuccessMsg}
								interest={interest}
								setInterest={setInterest}
								tagOptions={props.tagOptions}
								setProfile={props.setProfile}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isBiographyVisible ? setIsBiographyVisible(false) : hidePublicItems(setIsBiographyVisible)}}>
									<div>Biography</div>
									<div className="profile-items-success-msg">{biographySuccessMsg}</div>
								</div>
								{isBiographyVisible ?
								<ProfileBiography
								biography={biography}
								setBiography={setBiography}
								setNewBiography={setNewBiography}
								setBiographySuccessMsg={setBiographySuccessMsg}
								setUser={props.setUser}
								setProfile={props.setProfile}
								/>
								:
								null
								}
							</div>
							:
							null}
							{/* Private Profile Settings */}
							<div className={!isPrivateProfileSettingsVisible ? "form-show-container1 border360 mt-05rem": "form-show-container1 mt-05rem"}>
								<b className="profile-hover" onClick={() => {
									isPrivateProfileSettingsVisible ? setIsPrivateProfileSettingsVisible(false) : hideSettings(setIsPrivateProfileSettingsVisible)
								}}>Private Profile Settings</b>
							</div>
							{isPrivateProfileSettingsVisible ?
							<div className="profile-edit-container">
								<div className="profile-edit-components" onClick={() => {isEmailVisible ? setIsEmailVisible(false) : hidePrivateItems(setIsEmailVisible)}}>
									<div>Email</div>
									<div className="profile-items-success-msg">{emailSuccessMsg}</div>
								</div>
								{isEmailVisible ?
								<ProfileEmail
								emailSuccessMsg={emailSuccessMsg}
								setEmailSuccessMsg={setEmailSuccessMsg}
								email={props.profile.email}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isPasswordVisible ? setIsPasswordVisible(false) : hidePrivateItems(setIsPasswordVisible)}}>
									<div>Password</div>
									<div className="profile-items-success-msg">{passwordSuccessMsg}</div>
								</div>
								{isPasswordVisible ?
								<ProfilePassword
								passwordSuccessMsg={passwordSuccessMsg}
								setPasswordSuccessMsg={setPasswordSuccessMsg}
								/>
								:
								null
								}
								<div className="profile-edit-components" onClick={() => {isLocationVisible ? setIsLocationVisible(false) : hidePrivateItems(setIsLocationVisible)}}>
									<div>Location</div>
									<div className="profile-items-success-msg">{positionSuccessMsg}</div>
								</div>
								{isLocationVisible ?
								<ProfileMaps
								setUser={props.setUser}
								latitude={props.user.latitude}
								longitude={props.user.longitude}
								setPositionSuccessMsg={setPositionSuccessMsg}
								/>
								:
								null
								}
							</div>
							:
							null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}