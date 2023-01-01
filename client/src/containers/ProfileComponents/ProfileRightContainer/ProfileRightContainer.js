import EditImagePopup from "./EditImagePopup";
import ProfileImages from "./ProfileImages";
import { useEditImageVisible } from "../UsePopupVisibility";

export default function ProfileRightContainer(props) {
	const { refEditImage, isEditImageVisible, setIsEditImageVisible } = useEditImageVisible(false);

	return (
		<div className="padding05 profile-right-container pos-relative">
			{(props.profile.isOwn === true)
				?
				<i className="profile-edit-images-button material-icons" onClick={ () => setIsEditImageVisible(true) } title="Edit">edit</i>
				:
				null
			}
			{!isEditImageVisible ?
			null
			:
			<EditImagePopup
			refEditImage={refEditImage}
			setIsEditImageVisible={setIsEditImageVisible}
			profile={props.profile}
			setProfile={props.setProfile}
			setSucessMessage={props.setSucessMessage}
			setErrorMessage={props.setErrorMessage}
			/>
			}
			{props.profile.images.length > 0 ?
			<ProfileImages
			profile={props.profile}
			setProfile={props.setProfile}
			setSucessMessage={props.setSucessMessage}
			/>
			:
			<div>No images uploaded</div>
			}
		</div>
	);
}