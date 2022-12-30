import EditImagePopup from "./EditImagePopup";
import ProfileImages from "./ProfileImages";
import { useEditImageVisible } from "../UsePopupVisibility";

export default function ProfileLeftContainer(props) {
	const { refEditImage, isEditImageVisible, setIsEditImageVisible } = useEditImageVisible(false);

	return (
		<div className="ma padding05 profile-left-container pos-relative">
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