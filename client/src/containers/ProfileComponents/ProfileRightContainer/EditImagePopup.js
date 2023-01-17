import { useState, useEffect, useCallback } from "react";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";
import Cropper from 'react-easy-crop'
import toast from 'react-simple-toasts';


export default function EditImagePopup(props) {

	const [imageFileInput, setImageFileInput] = useState("");
	const [pictures, setPictures] = useState([]);
	const [promiseTracker, setPromiseTracker] = useState(false);
	const [cropImages, setCropImages] = useState({ x: 0, y: 0 })
	const [zoomImages, setZoomImages] = useState(1)
	const [imageSizeImages, setImageSizeImages] = useState("")
	const onCropCompleteImages = useCallback((croppedArea) => {
		setImageSizeImages(croppedArea)
	}, [setImageSizeImages])

	useEffect(() => {
		if (props.profile.images !== undefined && props.profile.images.length < 4) {
			setImageFileInput(	<div className="flex-center">
									<div>
										<input type="file" accept="image/*" id="pictureUploads" onChange={saveChosenPicture}/>
										<button className="profile-upload-profile-image-button" onClick={() => {document.getElementById('pictureUploads').click();}}>Upload Photo</button>
									</div>
								</div>)
		} else {
			setImageFileInput(	<div className="flex-center pt-1rem flex-col">
									<div>You have already uploaded 4 images!</div>
									<div>Delete some pictures first!</div>
								</div>);
		}
	}, [props.profile]);

	function saveChosenPicture(event) {
		var pictureObj = event.target.files[0]
		if (pictureObj !== undefined) {
			var pictureSrc = URL.createObjectURL(pictureObj)
			setPictures({file:pictureObj, imageSrc: pictureSrc});
		}
	}

	async function uploadImages() {
		if(pictures.length < 1) {
			toast("Please select an image to upload!", { position: 'top-center', duration: 5000 })
		} else {
			setPromiseTracker(true);
			const formdata = new FormData();
			formdata.append("imageFile", pictures.file)
			formdata.append("x", imageSizeImages.x)
			formdata.append("y", imageSizeImages.y)
			formdata.append("width", imageSizeImages.width)
			formdata.append("height", imageSizeImages.height)
			let response = await fetch('http://localhost:3001/profile/uploadprofileimages', {
					credentials: "include",
					method: "POST",
					body: formdata
				});
			response = await response.json();
			if(response.status) {
				const profileCopy = JSON.parse(JSON.stringify(props.profile));
				profileCopy.images.push(response.image)
				props.setProfile(profileCopy)
				toast("image Uploaded!", { position: 'top-center', duration: 5000 })
				props.setIsEditImageVisible(false)
				setPromiseTracker(false)
			} else {
				toast(response.err, { position: 'top-center', duration: 5000 })
				setPromiseTracker(false)
			}
		}
	}

	return (
		<div className="popup-profile">
			<div ref={props.refEditImage} className="popup-content-profile pos-relative">
			<h1 className="profile-view-font profile-popup-title"> Upload Profile Pictures</h1>
			<i className="material-icons pos-absolute-top-right" draggable="false" onClick={ () => props.setIsEditImageVisible(false)} >close</i>
				<div className="wh-100p">
					<div className="flex-center wh-100p flex-col flex-justify-content-start profile-position-relative">
						<div>
							<div className="profile-form-container">
								<div id="pictureForm">
									<div className="flex flex-col flex-align-center">
										<div className="flex flex-col flex-align-center">
											<p className="m-0">Choose pictures to upoad to your profile!</p>
										</div>
									</div>
									<div className="profile_image_left_button pb-1rem">
										{imageFileInput}
									</div>
									{pictures.length < 1 ?
									null
									:
									<div>
										<div className="flex-center profile-selected-image-container flex-col flex-justify-content-start">
											<div className="flex-center wh-100p pb-1rem flex-col flex-justify-content-start profile-position-relative">
												<div className={pictures !== [] ? "cropper-container cropper-container-size" : "cropper-container"}>
												{<Cropper
												image={pictures.imageSrc}
												crop={cropImages}
												zoom={zoomImages}
												zoomSpeed={0.1}
												aspect={3 / 4}
												onCropChange={setCropImages}
												onZoomChange={setZoomImages}
												onCropComplete={onCropCompleteImages}
												/>
												} 
												</div>
											</div>
										</div>
										<div className="flex-center pt-1rem">
											{promiseTracker ?
											<LoadingSpinnerPromiseComponent/>
											:
											<button className="complete-form-button" onClick={uploadImages}>Save</button>
											}
										</div>
									</div>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}