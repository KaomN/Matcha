import EditImagePopup from "./EditImagePopup";
import ProfileImages from "./ProfileImages";
import { useEditImageVisible } from "../UsePopupVisibility";

export default function ProfileRightContainer(props) {
	const { refEditImage, isEditImageVisible, setIsEditImageVisible } = useEditImageVisible(false);

	return (
		<div className="padding05 profile-right-container pos-relative">
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
			refEditImage={refEditImage}
			setIsEditImageVisible={setIsEditImageVisible}
			profile={props.profile}
			isOwn={props.profile.isOwn}
			setProfile={props.setProfile}
			setSucessMessage={props.setSucessMessage}
			/>
			:
			<div>No images uploaded</div>
			}
		</div>
	);
}