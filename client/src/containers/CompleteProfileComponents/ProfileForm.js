import { useState, useCallback , useContext} from "react";
import { UserContext } from '../../context/UserContext';
import Cropper from 'react-easy-crop'
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function ProfileForm(props) {
	const { setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	const navigate = useNavigate();

	const onCropComplete = useCallback((croppedArea) => {
		setImageSize(croppedArea)
	}, 	[setImageSize])

	function saveProfilePicture(event) {
		props.setProfilePictureSrc(URL.createObjectURL(event.target.files[0]))
		props.setProfilePicture(event.target.files[0])
	}

	var fileInput, btn
	if (props.profilePicture && Object.keys(props.profilePicture).length === 0 && Object.getPrototypeOf(props.profilePicture) === Object.prototype) {
		btn = ""
		fileInput = <div className="flex-column-completeprofile ">
							<div style={{border: "0px", marginBottom: "0.5rem"}}>
								<input type="file" id="profilePic" accept="image/*" name="profile" onChange={saveProfilePicture}/>
								<i className="material-icons completeprofile-file-btn" onClick={() => {document.getElementById('profilePic').click();}}>add_photo_alternate</i>
							</div>
						</div>
	} else {
		btn = <button className="complete-form-button" onClick={() => {
			props.setProfilePicture({});
			props.setProfilePictureSrc("");
		}}>Delete</button>
		fileInput = ""
	}

	async function handleSubmit() {
		if(document.getElementById('profilePic') != null) {
			document.querySelector('.form_message_error').innerHTML = "Please choose a profile picture!"
		} else {
			setIsLoading(true)
			const formdata = new FormData();
			formdata.append("age", props.age);
			formdata.append("birthDate", props.dateOfBirth);
			formdata.append("gender", props.gender);
			formdata.append("preference", props.preference);
			formdata.append("biography", props.biography);
			formdata.append("locationLat", props.locationLat);
			formdata.append("locationLng", props.locationLng);
			var interestString = "";
			props.interest.map(interests => (
				interestString += interests.name + " "
			));
			interestString = interestString.trim();
			formdata.append("interest", interestString);
			formdata.append("profilePicture", props.profilePicture);
			formdata.append("x", imageSize.x)
			formdata.append("y", imageSize.y)
			formdata.append("width", imageSize.width)
			formdata.append("height", imageSize.height)
			let response = await fetch('http://localhost:3001/request/completeprofile', {
				credentials: "include",
				method: "POST",
				body: formdata
			});
			response = await response.json();
			if (response.status) {
				setTimeout(() => {
					setUser(user => ( {
						...user,
						imageSrc: response.imageSrc,
						profile: true
					}))
					setIsLoading(false)
					navigate("/home");
				}, 500)
			}
		}
	}

	//Helsinki. This is a test Biography.
	//I dont know what to write here please help

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
										<div className={props.profilePictureSrc !== "" ? "cropper-container cropper-container-size" : "cropper-container"}>
											{(props.profilePictureSrc !== "") ? <Cropper
											image={props.profilePictureSrc}
											crop={crop}
											zoom={zoom}
											zoomSpeed={0.1}
											aspect={4 / 4}
											onCropChange={setCrop}
											onCropComplete={onCropComplete}
											onZoomChange={setZoom}
											cropShape = 'round'
											/>
											:
											null}
											</div>
										{btn}
									</div>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {document.querySelector('.form_message_error').innerHTML = ""; props.setShowForm("interestForm");;
									}}>Previous</button>
								<div>
									<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{isLoading ? <LoadingSpinner /> : null}
			</main>);
}