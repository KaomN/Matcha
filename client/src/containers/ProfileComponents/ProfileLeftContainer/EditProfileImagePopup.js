import { useState, useCallback, useEffect } from "react";
import Cropper from 'react-easy-crop'
import { LoadingSpinnerPromiseComponent } from '../../../components/LoadingSpinnerPromiseComponent';


export default function EditProfileImagePopup(props) {

	const [profileImageFileInput, setProfileImageFileInput] = useState("");
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("");
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	const [promiseTracker, setPromiseTracker] = useState(false);
	const onCropComplete = useCallback((croppedArea) => {
		setImageSize(croppedArea)
	}, [setImageSize])

	function saveProfilePicture(event) {
		setProfilePictureSrc(URL.createObjectURL(event.target.files[0]))
		setProfilePicture(event.target.files[0])
	}

	useEffect(() => {
		if (profilePicture && Object.keys(profilePicture).length === 0 && Object.getPrototypeOf(profilePicture) === Object.prototype) {
			setProfileImageFileInput(<div className="flex-center">
										<div>
											<input type="file" id="profilePic" accept="image/*" name="profile" onChange={saveProfilePicture}/>
											<button className="profile-upload-profile-image-button" onClick={() => {document.getElementById('profilePic').click();}}>Upload Photo</button>
										</div>
									</div>)
		} else {
			setProfileImageFileInput("")
		}
	}, [profilePicture]);

	async function uploadProfileImage() {
		if(document.getElementById('profilePic') != null) {
			document.querySelector('.form_message_error').innerHTML = "Please choose a profile picture!"
		} else {
			setPromiseTracker(true)
			const formdata = new FormData();
			formdata.append("profilePicture", profilePicture);
			formdata.append("x", imageSize.x)
			formdata.append("y", imageSize.y)
			formdata.append("cropWidth", imageSize.width)
			formdata.append("cropHeight", imageSize.height)
			let response = await fetch('/profile/uploadprofileimage', {
				method: "POST",
				body: formdata
			});
			response = await response.json();
			if(response.status) {
				setTimeout(() => {
					props.setUser(user => ( {
						...user,
						imageSrc: response.imageSrc
					}))
					props.setIsEditProfileImageVisible(false)
					props.setSucessMessage("Profile updated successfully!")
					setTimeout(() => {
						props.setSucessMessage("")
					}, 3000)
					setPromiseTracker(false)
				}, 1500)
			} else {
				props.setErrorMessage(response.err)
				setTimeout(() => {
					props.setErrorMessage("")
				}, 3000)
				setPromiseTracker(false)
			}
		}
	}

	return (
		<div className="popup-profile">
			<div ref={props.refEditProfileImage} className="popup-content-profile pos-relative">
			<h1 className="profile-popup-title"> Upload Profile Picture</h1>
			<i className="material-icons pos-absolute-top-right" draggable="false" onClick={ () => props.setIsEditProfileImageVisible(false)} >close</i>
			{profileImageFileInput}
				<div className="wh-100p">
					<div className="flex-center wh-100p flex-col flex-justify-content-start profile-position-relative">
					{(profileImageFileInput !== "") ?
						null
						:
						<i className="material-icons profile-file-btn profile-position-absolute" onClick={() => { setProfilePicture({}); setProfilePictureSrc(""); }} title="Delete">close</i>}
						<div className={profilePictureSrc !== "" ? "cropper-container cropper-container-size" : "cropper-container"}>
							{(profilePictureSrc !== "") ? <Cropper
								image={profilePictureSrc}
								crop={crop}
								zoom={zoom}
								aspect={4 / 4}
								zoomSpeed={0.1}
								cropShape = 'round'
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
								/>
								:
								null}
						</div>
							{(profileImageFileInput !== "") ?
								null
								:
								promiseTracker ?
								<LoadingSpinnerPromiseComponent/>
								:
								<button className="profile-upload-submit-profile-image" onClick={uploadProfileImage}>Save</button>
							}
					</div>
				</div>
			</div>
		</div>
	);
}