import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from '../context/UserContext';
import Cropper from 'react-easy-crop'
import "./styles/Home.css";

// export default function Home() {
// 	const { user } = useContext(UserContext);
// 	const [refresh, setRefresh] = useState("");

// 	async function handleTest() {
// 		var response = await fetch('/request/uploadProfileImage')
// 		response = await response.json();
// 		console.log(response)
// 	}

// 	useEffect(() => {
// 		//window.location.reload();
// 	}, [refresh]);
// 	return (
// 		<main className="flex-col flex-center ma">
// 			<h3>Show profile of other interesting users. Be able to filter by age gap, fame rating gap, location and interest. Also able to sort by them.</h3>
// 			<div>
// 				<button className="form_button" onClick={handleTest}>test</button>
// 			</div>
// 		</main>
// 	);
// }

export default function Home() {
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("");
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	
	const onCropComplete = useCallback((croppedArea) => {
		//console.log(croppedArea)
		setImageSize(croppedArea)
	})

	function saveProfilePicture(event) {
		setProfilePictureSrc(URL.createObjectURL(event.target.files[0]))
		setProfilePicture(event.target.files[0])
	}

	var fileInput, btn
	if (profilePicture && Object.keys(profilePicture).length === 0 && Object.getPrototypeOf(profilePicture) === Object.prototype) {
		btn = ""
		fileInput = <div className="flex-column-completeprofile ">
							<div style={{border: "0px", marginBottom: "0.5rem"}}>
								<input type="file" id="profilePic" accept="image/*" name="profile" onChange={saveProfilePicture}/>
								<i className="material-icons profile-file-btn" onClick={() => {document.getElementById('profilePic').click();}}>add_photo_alternate</i>
							</div>
						</div>
	} else {
		btn = <button className="complete-form-button" onClick={() => {
			setProfilePicture({});
			setProfilePictureSrc("");
		}}>Delete</button>
		fileInput = ""
	}

	async function handleSubmit() {
		if(document.getElementById('profilePic') != null) {
			document.querySelector('.form_message_error').innerHTML = "Please choose a profile picture!"
		} else {
			const formdata = new FormData();
			formdata.append("profilePicture", profilePicture);
			formdata.append("x", imageSize.x)
			formdata.append("y", imageSize.y)
			formdata.append("cropWidth", imageSize.width)
			formdata.append("cropHeight", imageSize.height)
			// picture.map(pictureElem => (
			// 	formdata.append("pictureUpload" + pictureElem.id, pictureElem.name)
			// ));
			let response = await fetch('/request/uploadprofileimage', {
				method: "POST",
				body: formdata
			});
			response = await response.json();
			console.log(response)
		}
	}

	return (<main className="form-container ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="profileForm">
							<div className="flex flex-col flex-align-center pb-1rem">
								<label style={{fontSize: "23px"}}>Profile Picture</label>
								<div className="form_message_error"></div>
							</div>
							{fileInput}
							<div className="flex-center pl-1rem pr-1rem pb-1rem complete-form-image-container">
									<div className="flex-center wh-100p flex-col flex-justify-content-start">
										<div className={profilePictureSrc !== "" ? "cropper-container cropper-container-size" : "cropper-container"}>
											{(profilePictureSrc !== "") ? <Cropper
											image={profilePictureSrc}
											crop={crop}
											zoom={zoom}
											aspect={4 / 4}
											onCropChange={setCrop}
											onCropComplete={onCropComplete}
											onZoomChange={setZoom}
											cropShape = 'round'
											/>
											:
											null}
											
											</div>
										{/* <img className="complete-form-img pt-1rem" src={profilePictureSrc} alt=""/> */}
										{btn}
									</div>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
							</div>
						</div>
					</div>
				</div>
			</main>);
}