import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import "./styles/Profile.css";
import { useEditProfileVisible } from "./ProfileComponents/UsePopupVisibility";

// Popups Components
import EditProfilePopup from "./ProfileComponents/Popups/EditProfilePopup";
// Other Components
import ProfileNotFound from "./ProfileComponents/ProfileNotFound";
import ProfileStatusFalse from "./ProfileComponents/ProfileStatusFalse";

// Container Components
import ProfileRightContainer from "./ProfileComponents/ProfileRightContainer/ProfileRightContainer";
import ProfileLeftContainer from "./ProfileComponents/ProfileLeftContainer/ProfileLeftContainer";


export default function Profile() {

	const navigate = useNavigate();
	// Custom States for popups
	const { refEditProfile, isEditProfileVisible, setIsEditProfileVisible } = useEditProfileVisible(false);
	// User context
	const { user, setUser, userContextLoading } = useContext(UserContext);
	// Profile states
	const [profile, setProfile] = useState("loading");
	// states for Uploading images
	const [successMessage, setSucessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if(!user.profile) {
			navigate("/completeprofile");
		}
	}, [user, userContextLoading]);

	let params = useParams()
	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				let response = await fetch(`/profile/profile/?id=${params.profileID === undefined ? user.userid : params.profileID}`)
				response = await response.json()
				setProfile(response)
				console.log(response)
			})();
		}
		return () => mounted = false;
	}, [user]);

	if (profile === "loading") {
		return <LoadingSpinner />
	} else if (profile.status) {
		return (
			<main className="flex-col padding1 ma profile-background">
				<div className="profile-update-success flex-center">{successMessage}</div>
				<div className="profile-update-error flex-center">{errorMessage}</div>
				<div className="profile-top-container pb05">
					{/* ----------------------------------------- */}
					<ProfileLeftContainer
					profile={profile}
					setProfile={setProfile}
					setSucessMessage={setSucessMessage}
					setErrorMessage={setErrorMessage}
					/>

					<ProfileRightContainer
					profile={profile}
					setErrorMessage={setErrorMessage}
					setSucessMessage={setSucessMessage}
					user={user}
					setUser={setUser}
					/>
				</div>
				<div className="flex-center flex-col">
					<div className="flex-col profile-biography-container">
						<div className="profile-view-font">About</div>
						<div className="margin-auto profile-biography">{profile.biography}</div>
					</div>
					{(profile.isOwn === true)
					?
					<button className="form_button_verify mt-05rem" onClick={ () => {setIsEditProfileVisible(true);} }>Edit Profile</button>
					:
					null
					}
				</div>
				{/* EditProfile Popup */}
				{!isEditProfileVisible ?
					null
					:
					<EditProfilePopup
						profile={profile}
						setProfile={setProfile}
						user={user}
						setUser={setUser}
						setIsEditProfileVisible={setIsEditProfileVisible}
						isEditProfileVisible={isEditProfileVisible}
						refEditProfile={refEditProfile}
					/>
				}
			</main>
		);
	} else if (profile.status === false && profile.msg === "usernotfound") {
		return (
			<ProfileNotFound />
		);
	} else {
		return (
			<ProfileStatusFalse />
		);
	}
}
