import { useState } from "react";
import toast from 'react-simple-toasts';
import notAuthenticated from "../../../components/notAuthenticated";

export default function ProfileImages(props) {
	const [imagePage, setImagePage] = useState(0);

	function nextImage() {
		setImagePage(imagePage + 1)
	}
	function previousImage() {
		setImagePage(imagePage - 1)
	}

	async function deleteImage() {
		const response = await fetch('http://localhost:3001/profile/deleteimage', {
			credentials: "include",
			headers: { 'content-type': 'application/json' },
			method: "POST",
			body: JSON.stringify(props.profile.images[imagePage])
		});
		const data = await response.json();
		if(data.status) {
			const profileCopy = JSON.parse(JSON.stringify(props.profile));
			profileCopy.images.splice(imagePage, 1)
			if(imagePage !== 0) {
				setImagePage(imagePage - 1);
			}
			props.setProfile(profileCopy)
			toast("Image Deleted!", { position: 'top-center', duration: 5000 })
		} else {
			if(!data.isAuthenticated === false) {
				notAuthenticated()
			} else {
				toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			}
		}
	}

	if(props.profile.amiblocked) {
		return <div className="profile-images-container"> Blocked </div>
	}

	return (
			<div className="profile-images-container">
				<div className="pt-2rem pos-relative">
				<img src={props.profile.images[imagePage].imageSrc} className="rounded-corners" alt="images"/>
				{(props.isOwn === true)
					?
					<i className="material-icons pos-abs-bottom-middle profile_image_delete_btn" draggable="false" onClick={deleteImage} title="Delete">close</i>
					:
					null
				}
				</div>
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
	);
}