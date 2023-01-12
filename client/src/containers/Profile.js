import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import "./styles/Profile.css";
import { useEditProfileVisible } from "./ProfileComponents/UsePopupVisibility";
import ProfileButtons from "./ProfileComponents/ProfileButtons";
import { SocketContext } from "../context/SocketContext";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";


// Popups Components
import EditProfilePopup from "./ProfileComponents/Popups/EditProfilePopup";
// Other Components
import ProfileNotFound from "./ProfileComponents/ProfileNotFound";
import ProfileStatusFalse from "./ProfileComponents/ProfileStatusFalse";

// Container Components
import ProfileRightContainer from "./ProfileComponents/ProfileRightContainer/ProfileRightContainer";
import ProfileLeftContainer from "./ProfileComponents/ProfileLeftContainer/ProfileLeftContainer";


export default function Profile() {
	const socket = useContext(SocketContext);
	const navigate = useNavigate();
	// Custom States for popups
	const { refEditProfile, isEditProfileVisible, setIsEditProfileVisible } = useEditProfileVisible(false);
	// User context
	const { user, setUser } = useContext(UserContext);
	// Profile states
	const [profile, setProfile] = useState("loading");
	// states for Uploading images
	const [loading, setLoading] = useState(false);
	const [onlineStatus, setOnlineStatus] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		if(!user.profile) {
			navigate("/completeprofile");
		}
	}, [user, navigate]);

	let params = useParams()

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				let response = await fetch(`/profile/profile/?id=${params.profileID === undefined ? user.userid : params.profileID}`)
				response = await response.json()
				if(response.status) {
					socket.emit("online_query", { queryId: response.userid, path: pathname });
					if(params.profileID) {
						socket.emit("join_profile_room", { room: params.profileID, path: pathname });
					}
					socket.emit("send_notification", { username: response.username, userid: response.userid, type: "profile" });
					setProfile(response);
				}
			})();
		}
		return () => {mounted = false};
	}, [user, params, socket, pathname]);

	useEffect(() => {
		socket.on("online_response", data => {
			setOnlineStatus(data.onlineStatus)
		});
		return () => {socket.off("online_response");};
	}, [socket]);

	if (profile === "loading") {
		return <LoadingSpinner />
	} else if (profile.status) {
		return (
			<main className={!profile.isOwn ? "flex-col padding1 padding_top2rem ma profile-background" : "flex-col padding1 ma profile-background"}>
				{loading ?
				<LoadingSpinnerComponent
				class="profile_loader_component"
				size={100}
				/>
				: null}
				{profile.isOwn ?
				null
				:
				<ProfileButtons
				profile={profile}
				setProfile={setProfile}
				setLoading={setLoading}
				user={user}
				userProfileIsArray={false}
				/>
				}
				<div className="profile-top-container pb05">
					<ProfileLeftContainer
					profile={profile}
					setProfile={setProfile}
					onlineStatus={onlineStatus}
					user={user}
					setUser={setUser}
					/>
					<ProfileRightContainer
					profile={profile}
					setProfile={setProfile}
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
