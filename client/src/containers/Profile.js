import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import "./styles/Profile.css";
import { useEditProfileVisible } from "./ProfileComponents/UsePopupVisibility";
import ProfileButtons from "./ProfileComponents/ProfileButtons";
import { SocketContext } from "../context/SocketContext";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";
import toast from 'react-simple-toasts';
import notAuthenticated from "../components/notAuthenticated"


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
	const navigate = useNavigate()
	// Custom States for popups
	const { refEditProfile, isEditProfileVisible, setIsEditProfileVisible } = useEditProfileVisible(false);
	// User context
	const { user, setUser } = useContext(UserContext);
	// Profile states
	const [profile, setProfile] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	// states for Uploading images
	const [loading, setLoading] = useState(false);
	const [onlineStatus, setOnlineStatus] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		if(!user.profile) {
			navigate("/completeprofile");
		}
	}, [user, navigate]);
	
	useEffect(() => {
		setOnlineStatus(false)
	}, [pathname]);

	useEffect(() => {
		if(socket && socket.disconnected && user.auth) {
			socket.open()
		}
	}, [socket, user.auth]);

	let params = useParams()
	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				setIsLoading(true);
				const response = await fetch(`http://localhost:3001/profile/profile/?id=${params.profileID === undefined ? user.userid : params.profileID}`, {
					credentials: "include",
					method: 'GET'
				})
				const data = await response.json()
				if(data.status) {
					socket.emit("online_query", { queryId: data.userid, path: pathname });
					if(params.profileID) {
						socket.emit("join_profile_room", { userid: params.profileID, path: pathname });
					}
					socket.emit("send_notification", { username: data.username, userid: data.userid, type: "profile", usernameUser: user.username});
					setProfile(data);
					if(data.isOwn) {
						const response = await fetch("http://localhost:3001/search/tags", {
							credentials: "include",
							method: 'GET'
						});
						const data = await response.json();
						if(data.status) {
							setTagOptions(data.tags);
						} else {
							if(data.isAuthenticated === false) {
								notAuthenticated()
							} else  {
								toast("Something went wrong! Error loading tags, please refresh the page!", { position: 'top-center', duration: 5000 })
							}
						}
					}
				} else {
					if(data.isAuthenticated === false) {
						notAuthenticated()
					} else  {
						toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
					}
				}
				setIsLoading(false);
			})();
		}
		return () => {mounted = false};
	}, [params, socket, pathname, user.userid, user.username]);
	
	useEffect(() => {
		socket.on("online_response", data => {
			setOnlineStatus(data.onlineStatus)
		});
		socket.on("repsonse_logout", data => {
			setOnlineStatus(data.onlineStatus)
			setProfile(profile => ( {
				...profile,
				lastactive: data.lastActive
			}))
		});
		return () => {
			socket.off("online_response")
			socket.off("response_logout")
		};
	}, [socket]);
	if (isLoading) {
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
						{profile.amiblocked ? <div className="margin-auto profile-biography">Blocked</div> : <div className="margin-auto profile-biography">{profile.biography}</div>}
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
					tagOptions={tagOptions}
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
