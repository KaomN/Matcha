import { useState } from "react";

export default function ProfileImages(props) {
	const [imagePage, setImagePage] = useState(0);

	function nextImage() {
		setImagePage(imagePage + 1)
	}
	function previousImage() {
		setImagePage(imagePage - 1)
	}

	async function deleteImage(image) {
		let response = await fetch('/profile/deleteimage', {
			headers: {'Content-Type': 'application/json'},
			method: "POST",
			body: JSON.stringify(image)
		});
		response = await response.json();
		return response
	}

	return (
		<div className="profile-images-container">
			<div className="pt-2rem pos-relative">
			{(props.isOwn === true)
				?
				<i className="profile-edit-images-button material-icons" onClick={ () => props.setIsEditImageVisible(true) } title="Edit">edit</i>
				:
				null
			}
				<img src={props.profile.images[imagePage].imageSrc} className="rounded-corners"/>
				<i className="material-icons pos-abs-bottom-middle" draggable="false" onClick={() => {
					if(deleteImage(props.profile.images[imagePage])) {
						const profileCopy = JSON.parse(JSON.stringify(props.profile));
						profileCopy.images.splice(imagePage, 1)
						if(imagePage != 0) {
							setImagePage(imagePage - 1);
						}
						props.setProfile(profileCopy)
						props.setSucessMessage("Profile updated successfully!")
						setTimeout(() => {
							props.setSucessMessage("")
						}, 2000)
					}
				}} title="Delete">close</i>
			</div>
			<div className="flex-center flex-gap-3rem">
				{imagePage != 0 ?
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