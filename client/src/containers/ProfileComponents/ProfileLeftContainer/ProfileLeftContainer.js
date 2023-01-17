import { useEditProfileImageVisible } from "../UsePopupVisibility";
import EditProfileImagePopup from "./EditProfileImagePopup";

export default function ProfileLeftContainer(props) {
	const { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible } = useEditProfileImageVisible(false);


	function parseDate(date) {
		if(!date) return "Offline";
		let dateArray = date.split("T")[0].split("-");
		let time = 	date.split("T")[1].split(":");
		return(`Offline last active: ${dateArray[2]}-${dateArray[1]}-${dateArray[0]} ${parseInt(time[0]) + 2}:${time[1]}:${time[2].split(".")[0]}`)
	}
	if(props.profile.lastactive) {
		parseDate(props.profile.lastactive)
	}
	return (
		<div className="padding05 profile-left-container flex-col">
			{props.profile.amiblocked ? null : !props.profile.isOwn ? props.onlineStatus ?
			<i className="material-icons profile_online" title={"Online"}>radio_button_checked</i>
			:
			<i className="material-icons profile_offline" title={parseDate(props.profile.lastactive)}>radio_button_checked</i>
			:
			null
			}
			
			<div className="pos-relative profile-image-container">
				{props.profile.isOwn
				?
				<i className="pos-absolute-top-right material-icons profile-file-btn" onClick={ () => setIsEditProfileImageVisible(true) } title="Edit" >edit</i>
				:
				null
				}
				{/* Edit Profile Image Popup */}
				{!isEditProfileImageVisible ?
					null
					:
					<EditProfileImagePopup
					refEditProfileImage={refEditProfileImage}
					setIsEditProfileImageVisible={setIsEditProfileImageVisible}
					setUser={props.setUser}
					user={props.user}
					/>
				}
				{props.profile.amiblocked ?
				<img className="profile-view-image" src={"http://localhost:3001/images/defaultProfile.png"} alt={"profileImage"}></img>
				:
				props.profile.profile ?
					<img className="profile-view-image" src={props.profile.profileSrc} alt={"profileImage"}></img>
					:
					<img className="profile-view-image" src={"http://localhost:3001/images/defaultProfile.png"} alt={"profileImage"}></img>
					}
			</div>

			<div className="padding05">
				<div className="flex-center profile-view-font">{props.profile.firstname} {props.profile.surname}</div>
				<div className="flex-center profile-view-font-small">@{props.profile.username}</div>
			</div>

			<div className="padding05 flex-center flex-col">
				{/* <div>Date of birth: {profile.dateofbirth}</div> */}
				{props.profile.amiblocked ? <div>Blocked</div> : <div>Age: {props.profile.age}</div>}
				{props.profile.amiblocked ? null : <div className="home_profile_gender_container">Gender: <i className="material-icons home_profile_gender_icon" draggable="false" title={props.profile.gender}>{props.profile.gender}</i></div>}
				{props.profile.amiblocked ? null : <div className="home_profile_gender_container">Preference: {
					props.profile.preference === "both" ?
					<div className="flex-center">
						<i className="material-icons home_profile_gender_icon" draggable="false" title="male">male</i> &
						<i className="material-icons home_profile_gender_icon" draggable="false" title="female">female</i>
					</div>
					 : 
					 <i className="material-icons home_profile_gender_icon" draggable="false" title={props.profile.preference}>{props.profile.preference}</i>}</div>}
				{(props.profile.isOwn === true) ?
					null
					:
					props.profile.amiblocked ? null : <div>{props.profile.distance + " km away"}</div>
				}
				{props.profile.amiblocked ? null : <div>Rating: {props.profile.rating}</div>}
				{props.profile.amiblocked ? null : <div className="profile-interest-container ">
				{props.profile.interest.map(interests => (
						<div className="profile-interest-components" key={interests.value} data-key={interests.value} >#{interests.label}</div>
				))}
				</div>}
			</div>
		</div>
	);
}