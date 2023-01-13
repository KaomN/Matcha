import { useState } from "react";
import { LoadingSpinnerComponent } from "../../components/LoadingSpinnerComponent";
import ProfileButtons from "../ProfileComponents/ProfileButtons";

export default function UserProfile(props) {
	const [imagePage, setImagePage] = useState(0);
	const [loading, setLoading] = useState(false);
	
	function nextImage() {
		setImagePage(imagePage + 1)
	}

	function previousImage() {
		setImagePage(imagePage - 1)
	}

	return (
		<>
		{loading ? <LoadingSpinnerComponent class="home_loader_component" size={100}/> : null}
		<ProfileButtons
		profile={props.profile}
		setProfile={props.setUserProfiles}
		setLoading={setLoading}
		user={props.user}
		userProfileIsArray={true}
		/>
		<div className="home_profile_left_container">
			<div className="home_profile_picture_container">
				<div className="flex-center">
					<a className="home_username_fontstyle" href={"/profile/" + props.profile.userid}>@{props.profile.username}</a>
				</div>
				<div className="flex-center">
					<img className="home_user_profile_image" src={props.profile.profilePic} alt="profile" />
				</div>
			</div>
			<div className="home_image_container">
				{props.profile.images.length > 0 ?
				<img className="home_user_images" src={props.profile.images[imagePage].imagename} alt="profile" />
				:
				<div className="home_no_images">{props.profile.username} has not uploaded any images</div>
				}
				<div className="flex-center flex-gap-3rem">
					{imagePage !== 0 ?
						<i className="material-icons profile-button-nofade" draggable="false" onClick={previousImage}>chevron_left</i>
					:
						<i className="material-icons profile-button-disabled" draggable="false">chevron_left</i>
					}
					{props.profile.images.length > imagePage + 1 ?
						<i className="material-icons profile-button-nofade" draggable="false" onClick={nextImage}>chevron_right</i>
					:
						<i className="material-icons profile-button-disabled" draggable="false">chevron_right</i>
					}
				</div>
			</div>
		</div>
		<div className="home_profile_right_container">
			<div className="home_user_info_container">
				<div className="home_user_profile_info">
					<span>{props.profile.firstname} {props.profile.surname}</span>
					<div>Age: {props.profile.age}</div>
					<div className="home_profile_gender_container">Gender: <i className="material-icons home_profile_gender_icon" draggable="false" title={props.profile.gender}>{props.profile.gender}</i></div>
					<div>{props.profile.distance} km away</div>
					<div>Rating: {props.profile.rating}</div>
					<div className="home_interest_container">
					{props.profile.interests.map(interest => (
						<div className="profile-interest-components" key={interest.id} >#{interest.tag}</div>
					))}
					</div>
				</div>
			</div>
			<div className="home_user_profile_biography_container">
				<div>About</div>
				<div className="home_user_profile_biography">
					{props.profile.biography}
				</div>
			</div>
		</div>
		</>
	);
}