import { useState, useCallback , useContext, useEffect} from "react";
import { UserContext } from '../../context/UserContext';
import Cropper from 'react-easy-crop'
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import toast from "react-simple-toasts";
import notAuthenticated from '../../components/notAuthenticated';

export default function ProfileForm(props) {
	const { setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	const [btn, setBtn] = useState("")
	const [fileInput, setFileInput] = useState("")
	const navigate = useNavigate();

	const onCropComplete = useCallback((croppedArea) => {
		setImageSize(croppedArea)
	}, 	[setImageSize])

	useEffect(() => {
		function saveProfilePicture(event) {
			props.setProfilePictureSrc(URL.createObjectURL(event.target.files[0]))
			props.setProfilePicture(event.target.files[0])
		}
		
		if (props.profilePicture && Object.keys(props.profilePicture).length === 0 && Object.getPrototypeOf(props.profilePicture) === Object.prototype) {
			setBtn("")
			setFileInput(<div className="flex-column-completeprofile-profilepicture">
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="file" id="profilePic" accept="image/*" name="profile" onChange={saveProfilePicture}/>
									<i className="material-icons completeprofile-file-btn" onClick={() => {document.getElementById('profilePic').click();}}>add_photo_alternate</i>
								</div>
							</div>)
		} else {
			setBtn(<button className="complete-form-button" onClick={() => {
				props.setProfilePicture({});
				props.setProfilePictureSrc("");
			}}>Delete</button>)
			setFileInput("")
		}
	}, [props.profilePicture, props])

	async function handleSubmit() {
		if(document.getElementById('profilePic') != null) {
			document.querySelector('.form_message_error').innerHTML = "Please choose a profile picture!"
		} else {
			setIsLoading(true)
			const formData = new FormData();
			formData.append("profilePicture", props.profilePicture);
			formData.append("x", imageSize.x)
			formData.append("y", imageSize.y)
			formData.append("width", imageSize.width)
			formData.append("height", imageSize.height)
			const response1 = await fetch('http://localhost:3001/completeprofile/saveprofilepicture', {
				credentials: "include",
				method: "POST",
				body: formData
			});
			const data1 = await response1.json();
			if(data1.status) {
				setUser(user => ( {
					...user,
					imageSrc: response1.imageSrc,
				}))
				const response2 = await fetch('http://localhost:3001/completeprofile/saveinterests', {
					headers: { 'content-type': 'application/json' },
					credentials: "include",
					method: "POST",
					body: JSON.stringify({interest: props.tags})
				});
				const data2 = await response2.json();
				if(data2.status) {
					setUser(user => ( {
						...user,
						interest: props.tags,
					}))
					const response3 = await fetch('http://localhost:3001/completeprofile/saveuserinfo', {
						headers: { 'content-type': 'application/json' },
						credentials: "include",
						method: "POST",
						body: JSON.stringify({
							age: props.age,
							birthDate: props.dateOfBirth,
							gender: props.gender,
							preference: props.preference,
							biography: props.biography,
							locationLat: props.locationLat,
							locationLng: props.locationLng,
						})
					});
					const data3 = await response3.json();
					if(data3.status) {
						setUser(user => ( {
							...user,
							profile: true
						}))
						navigate("/home");
					} else {
						toast("Something went wrong, please try again later", { position: 'top-center', duration: 5000 })
					}
				} else {
					toast("Something went wrong, please try again later", { position: 'top-center', duration: 5000 })
				}
			} else {
				if(!data1.isAuthenticated) {
					notAuthenticated()
				} else {
					toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
				}
			}
			setIsLoading(false)
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