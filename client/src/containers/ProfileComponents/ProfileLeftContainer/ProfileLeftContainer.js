import { useEditProfileImageVisible } from "../UsePopupVisibility";
import EditProfileImagePopup from "./EditProfileImagePopup";

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

export default function ProfileLeftContainer(props) {
	const { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible } = useEditProfileImageVisible(false);


	return (
		<div className="padding05 profile-left-container flex-col">
			<div className="pos-relative profile-image-container">
				{(props.profile.isOwn === true)
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
					setSucessMessage={props.setSucessMessage}
					setErrorMessage={props.setErrorMessage}
					/>
				}
				{(props.profile.profile === true) ?
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
				<div>Age: {props.profile.age}</div>
				<div>Gender: {capitalize(props.profile.gender)}</div>
				{(props.profile.isOwn === true) ?
					null
					:
					<div>{props.profile.distance} km away</div>
				}
				<div>Rating: {props.profile.rating}</div>
				<div className="profile-interest-container ">
				{props.profile.interest.map(interests => (
						<div className="profile-interest-components" key={interests.id} data-key={interests.id} >#{interests.tag}</div>
				))}
				</div>
			</div>
		</div>
	);
}