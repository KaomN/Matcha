import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { UserContext } from '../context/UserContext';
import { useParams } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import Cropper from 'react-easy-crop'
import PikadayWrap from "../components/PikadayWrap";
import "./styles/Profile.css";

// Edit profile image popup
function useEditProfileImageVisible(editProfileImageInitialIsVisible) {
	const [isEditProfileImageVisible, setIsEditProfileImageVisible] = useState(editProfileImageInitialIsVisible);
	const refEditProfileImage = useRef(null);

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsEditProfileImageVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible };
}

// Edit images popup
function useEditImageVisible(editImageInitialIsVisible) {
	const [isEditImageVisible, setIsEditImageVisible] = useState(editImageInitialIsVisible);
	const refEditImage = useRef(null);

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsEditImageVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refEditImage, isEditImageVisible, setIsEditImageVisible };
}

// Edit profile popup
function useEditProfileVisible(editProfileInitialIsVisible) {
	const [isEditProfileVisible, setIsEditProfileVisible] = useState(editProfileInitialIsVisible);
	const refEditProfile = useRef(null);

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsEditProfileVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refEditProfile, isEditProfileVisible, setIsEditProfileVisible };
}

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

export default function Profile() {
	// Custom States for popups
	const { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible } = useEditProfileImageVisible(false);
	const { refEditImage, isEditImageVisible, setIsEditImageVisible } = useEditImageVisible(false);
	const { refEditProfile, isEditProfileVisible, setIsEditProfileVisible  } = useEditProfileVisible(true);
	// User context
	const { user, setUser } = useContext(UserContext);
	// Profile states
	const [profile, setProfile] = useState("loading");
	const [profileImageFileInput, setProfileImageFileInput] = useState("");
	const [imageFileInput, setImageFileInput] = useState("");
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("");
	const [pictures, setPictures] = useState([]);
	//const [images, setImages] = useState("");
	// Profile image states
	const [imagePage, setImagePage] = useState(0);
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	// Error states for Uploading images
	const [successMessage, setSucessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	// Profile Settings States
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [age, setAge] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [gender, setGender] = useState("");
	const [preference, setPreference] = useState("");
	
	const [biography, setBiography] = useState("");
	const [interest, setInterest] = useState([]);
	const [interestClicked, setInterestClicked] = useState("");
	const [interestError, setInterestError] = useState("");
	const [errorFirstname, setErrorFirstname] = useState("");
	const [errorSurname, setErrorSurname] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
	// Visibility states
	const [isPublicProfileSettingsVisible, setIsPublicProfileSettingsVisible] = useState(false);
	const [isPrivateProfileSettingsVisible, setIsPrivateProfileSettingsVisible] = useState(false);
	const [isNameVisible, setIsNameVisible] = useState(false);
	const [isUsernameVisible, setIsUsernameVisible] = useState(false);
	const [isDateVisible, setIsDateVisible] = useState(false);
	const [isGenderVisible, setIsGenderVisible] = useState(false);
	const [isPreferenceVisible, setIsPreferenceVisible] = useState(false);
	const [isInterestsVisible, setIsInterestsVisible] = useState(false);
	const [isBiographyVisible, setIsBiographyVisible] = useState(false);
	const [isEmailVisible, setIsEmailVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLocationVisible, setIsLocationVisible] = useState(false);
	
	const onCropComplete = useCallback((croppedArea) => {
		setImageSize(croppedArea)
	})

	const [cropImages, setCropImages] = useState({ x: 0, y: 0 })
	const [zoomImages, setZoomImages] = useState(1)
	const [imageSizeImages, setImageSizeImages] = useState("")

	const onCropCompleteImages = useCallback((croppedArea) => {
		setImageSizeImages(croppedArea)
	})

	let params = useParams()

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		
		(async function() {
			let response = await fetch('/profile/getprofile', {
				signal,
				credentials: "include",
				method: "POST",
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					profileID: params.profileID,
				})
			})
			response = await response.json()
			let interestId = 0;
			const interestCopy = response.interest.slice()
			interestCopy.map(interest => {
				interest.id = interestId
				interestId++
			})
			setProfile(response)
			setBiography(response.biography)
			setInterest(interestCopy)
			console.log(response)
			})();

			return () => controller.abort()
	}, [user]);

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
				setUser(user => ( {
					...user,
					imageSrc: response.imageSrc
				}))
				setIsEditProfileImageVisible(false)
				setSucessMessage("Profile updated successfully!")
				setTimeout(() => {
					setSucessMessage("")
				}, 3000)
			} else {
				setErrorMessage(response.err)
				setTimeout(() => {
					setErrorMessage("")
				}, 3000)
			}
		}
	}

	useEffect(() => {
		if (profile.images != undefined && profile.images.length < 4) {
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
	}, [profile]);

	function nextImage() {
		setImagePage(imagePage + 1)
	}
	function previousImage() {
		setImagePage(imagePage - 1)
	}

	function saveChosenPicture(event) {
		var pictureObj = event.target.files[0]
		if (pictureObj !== undefined) {
			var pictureSrc = URL.createObjectURL(pictureObj)
			setPictures({file:pictureObj, imageSrc: pictureSrc});
		}
	}

	async function uploadImages() {
		const formdata = new FormData();
		if(pictures.length < 1) {
			console.log("noimages")
		} else {
			formdata.append("imageFile", pictures.file)
			formdata.append("x", imageSizeImages.x)
			formdata.append("y", imageSizeImages.y)
			formdata.append("width", imageSizeImages.width)
			formdata.append("height", imageSizeImages.height)
			let response = await fetch('/profile/uploadprofileimages', {
					method: "POST",
					body: formdata
				});
			response = await response.json();
			if(response.status) {
				const profileCopy = JSON.parse(JSON.stringify(profile));
				profileCopy.images.push(response.image)
				setProfile(profileCopy)
				//
				setIsEditImageVisible(false)
				setSucessMessage("Profile updated successfully!")
				setTimeout(() => {
					setSucessMessage("")
				}, 3000)
			} else {
				setErrorMessage(response.err)
				setTimeout(() => {
					setErrorMessage("")
				}, 3000)
			}
		}
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

	function deleteInterest() {
		setInterest(
			interest.filter(a =>
			a.id !== parseInt(interestClicked)
			)
		);
	}

	function interestKeydown(event) {
		//console.log(event.key)
		if(event.key === " ")
			event.preventDefault()
		else if(event.key === "Enter") {
			if(event.target.value.length > 25) {
				setInterestError("Error! Interest tags max length 25!")
			} else if(event.target.value.trim().length === 0) {
				setInterestError("Error! Interest tags cant be empty!")
			} else {
				let interestValue = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase().trim()
				console.log()
				setInterest([...interest, {id:interest.length, tag:interestValue} ]);
				event.target.value = "";
			}
		}
		//document.querySelector('.form_message_error').innerHTML = ""
	}

	function hidePublicItems(show) {
		setIsNameVisible(false)
		setIsUsernameVisible(false)
		setIsDateVisible(false)
		setIsGenderVisible(false)
		setIsPreferenceVisible(false)
		setIsInterestsVisible(false)
		setIsBiographyVisible(false)
		show(true)
	}

	function hidePrivateItems(show) {
		setIsEmailVisible(false)
		setIsPasswordVisible(false)
		setIsLocationVisible(false)
		show(true)
	}

	function hideSettings(show) {
		setIsPublicProfileSettingsVisible(false)
		setIsPrivateProfileSettingsVisible(false)
		show(true)
	}


	if (profile === "loading") {
		return <LoadingSpinner />
	} else if (profile.status) {
		return (
			<main className="flex-col padding1 ma profile-background">
				<div className="profile-update-success flex-center">{successMessage}</div>
				<div className="flex-row ma pb05">
					<div className="padding05 profile-right-container">
						<div className="pos-relative profile-image-container">
							{(profile.isOwn === true)
								?
								<i className="pos-absolute-top-right material-icons" onClick={ () => setIsEditProfileImageVisible(true) } title="Edit" >edit</i>
								:
								null
							}
							{/* Edit Profile Image Popup */}
							{!isEditProfileImageVisible ?
								null
								:
								<div className="popup-profile">
									<div ref={refEditProfileImage} className="popup-content-profile pos-relative">
									<h1 className="profile-popup-title"> Upload Profile Picture</h1>
									<i className="material-icons pos-absolute-top-right" draggable="false" onClick={ () => setIsEditProfileImageVisible(false)} >close</i>
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
														<button className="profile-upload-submit-profile-image" onClick={uploadProfileImage}>Save</button>
													}
											</div>
										</div>
									</div>
								</div>
							}
							{(profile.profile === true) ?
								<img className="profile-view-image" src={profile.profileSrc}></img>
								:
								<img className="profile-view-image" src={"http://localhost:3001/images/defaultProfile.png"}></img>
								}
						</div>
						<div className="padding05">
							<div className="flex-center profile-view-font">{profile.firstname} {profile.surname}</div>
							<div className="flex-center profile-view-font-small">@{profile.username}</div>
						</div>
						<div className="padding05 flex-center flex-col">
							{/* <div>Date of birth: {profile.dateofbirth}</div> */}
							<div>Age: {profile.age}</div>
							<div>Gender: {capitalize(profile.gender)}</div>
							{(profile.isOwn === true) ?
								null
								:
								<div>{profile.distance} km away</div>
							}
							<div>Rating: {profile.rating}</div>
							<div className="profile-interest-container ">
							{profile.interest.map(interests => (
									<div className="profile-interest-components" key={interests.id} data-key={interests.id} >#{interests.tag}</div>
							))}
							</div>
						</div>
					</div>
					<div className="ma padding05 profile-left-container pos-relative">
						{/* Edit Images Popup */}
						{(profile.isOwn === true)
							?
							<i className="profile-edit-images-button material-icons" onClick={ () => setIsEditImageVisible(true) } title="Edit">edit</i>
							:
							null
						}
						{!isEditImageVisible ?
								null
								:
								<div className="popup-profile">
									<div ref={refEditImage} className="popup-content-profile">
									<h1 className="profile-view-font profile-popup-title"> Upload Profile Pictures</h1>
									<i className="material-icons pos-absolute-top-right" draggable="false" onClick={ () => setIsEditImageVisible(false)} >close</i>
										<div className="wh-100p">
											<div className="flex-center wh-100p flex-col flex-justify-content-start profile-position-relative">
												<div>
													<div className="complete-form-container">
														<div id="pictureForm">
															<div className="flex flex-col flex-align-center">
																<div className="flex flex-col flex-align-center">
																	<p className="m-0">Choose pictures to upoad to your profile!</p>
																</div>
															</div>
															<div className="flex-column-completeprofile pb-1rem">
																{imageFileInput}
															</div>
															<div className="flex-center pb-1rem profile-update-error">
																{errorMessage}
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
																					aspect={3 / 4}
																					// onCropChange={(crop) => {
																					// 	const newCrop = cropImages.slice()
																					// 	newCrop[pictures.id] = crop
																					// 	setCropImages(newCrop)
																					// }}
																					onCropChange={setCropImages}
																					onZoomChange={setZoomImages}
																					onCropComplete={onCropCompleteImages}
																					// onCropComplete={ (croppedArea) => {
																					// 	const newCroppedArea = imageSizeImages.slice()
																					// 	newCroppedArea[pictures.id] = croppedArea
																					// 	setImageSizeImages(newCroppedArea)
																					// }}
																					// onZoomChange={(zoom) => {
																					// 	const newZoom = zoomImages.slice()
																					// 	newZoom[pictures.id] = zoom
																					// 	setZoomImages(newZoom)
																					// }}
																					/>
																					} 
																				</div>
																			</div>
																	</div>
																	<div className="flex-center pt-1rem">
																		<button className="complete-form-button" onClick={uploadImages}>Save</button>
																	</div>
																</div>}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							}
						{profile.images.length > 0 ?
								<div className="pt-1rem">
									<div className="pos-relative">
										<img src={profile.images[imagePage].imageSrc} className="rounded-corners"/>
										<i className="material-icons pos-abs-bottom-middle" draggable="false" onClick={() => {
											if(deleteImage(profile.images[imagePage])) {
												const profileCopy = JSON.parse(JSON.stringify(profile));
												profileCopy.images.splice(imagePage, 1)
												if(imagePage != 0) {
													setImagePage(imagePage - 1);
												}
												setProfile(profileCopy)
												setSucessMessage("Profile updated successfully!")
												setTimeout(() => {
													setSucessMessage("")
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
										{profile.images.length > imagePage + 1 ?
											<i className="material-icons profile-button-nofade" draggable="false" onClick={nextImage}>chevron_right</i>
										:
											<i className="material-icons profile-button-disabled" draggable="false">chevron_right</i>
										}
									</div>
									{/* {profile.images.length} {imagePage} */}
								</div>
							:
								<div>No images uploaded</div>
						}
					</div>
				</div>
				<div className="flex-col ma profile-biography-container">
					<div className="profile-view-font">About</div>
					<div className="margin-auto profile-biography">{profile.biography}</div>
				</div>
				{/* Edit Profile Popup */}
				{(profile.isOwn === true)
				?
				<button className="form_button_verify mt-05rem" onClick={ () => setIsEditProfileVisible(true) }>Edit Profile</button>
				:
				null
				}
				{!isEditProfileVisible ?
					null
					:
					<div className="popup-profile">
						<div ref={refEditProfile} className="popup-content-profile-edit pos-relative">
							<h1 className="profile-popup-title">Edit Profile</h1>
							<i className="material-icons pos-absolute-top-right" draggable="false" onClick={ () => setIsEditProfileVisible(false)} >close</i>
							<div className="wh-100p">
								<div className="flex-center wh-100p flex-col flex-justify-content-start">
									<div className="form-container1">
										<div className={!isPublicProfileSettingsVisible ? "form-show-container1 border360": "form-show-container1"}>
											<b className="profile-hover" onClick={() => {
												isPublicProfileSettingsVisible ? setIsPublicProfileSettingsVisible(false) : hideSettings(setIsPublicProfileSettingsVisible)
											}}>Public Profile Settings</b>
										</div>
										{isPublicProfileSettingsVisible ?
										<div className="profile-edit-container">
											<div className="profile-edit-components" onClick={() => {
												isNameVisible ? setIsNameVisible(false) : hidePublicItems(setIsNameVisible)
												}}>Name
											</div>
											{isNameVisible ?
											<div className="test">
												<div className="flex-row">
													<input className="profile-inputs" placeholder={profile.firstname}></input>
													<input className="profile-inputs" placeholder={profile.surname}></input>
												</div>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isUsernameVisible ? setIsUsernameVisible(false) : hidePublicItems(setIsUsernameVisible)
												}}>Username
											</div>
											{isUsernameVisible ?
											<div className="test">
												<input className="profile-inputs" placeholder={profile.username}></input>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isDateVisible ? setIsDateVisible(false) : hidePublicItems(setIsDateVisible)
												}}>Date of birth
											</div>
											{isDateVisible ?
											<div className="test">
												<PikadayWrap value={profile.dateofbirth} page="profile"/>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isGenderVisible ? setIsGenderVisible(false) : hidePublicItems(setIsGenderVisible)
												}}>Gender
											</div>
											{isGenderVisible ?
											<div className="test">
												<div className="flex-col">
													<div className="flex-row">
														<label htmlFor ="genderMale" className="profile-gender-label">Male:</label>
														<input name="gender" value="male" type="radio" id="genderMale" defaultChecked={profile.gender === "male" ? true : false} ></input>
													</div>
													<div className="flex-row">
														<label htmlFor="genderFemale" className="profile-gender-label" >Female:</label>
														<input name="gender" value="female" type="radio" id="genderFemale" defaultChecked={profile.gender === "female" ? true : false} ></input>
													</div>
												</div>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isPreferenceVisible ? setIsPreferenceVisible(false) : hidePublicItems(setIsPreferenceVisible)
												}}>Preference
											</div>
											{isPreferenceVisible ?
											<div className="test">
												<div className="flex-col">
													<div className="flex-row">
														<label htmlFor ="preferencerMale" className="profile-gender-label">Male:</label>
														<input name="preference" value="male" type="radio" id="preferencerMale" defaultChecked={profile.preference === "male" ? true : false} ></input>
													</div>
													
													<div className="flex-row">
														<label htmlFor="preferenceFemale" className="profile-gender-label" >Female:</label>
														<input name="preference" value="female" type="radio" id="preferenceFemale" defaultChecked={profile.preference === "female" ? true : false} ></input>
													</div>
													<div className="flex-row">
														<label htmlFor="preferenceBoth" className="profile-gender-label" >Both:</label>
														<input name="preference" value="both" type="radio" id="preferenceBoth" defaultChecked={profile.preference === "both" ? true : false} ></input>
													</div>
												</div>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isInterestsVisible ? setIsInterestsVisible(false) : hidePublicItems(setIsInterestsVisible)
												}}>Interests
											</div>
											{isInterestsVisible ?
											<div className="test">
												<div style={{border: "0px", marginBottom: "0.5rem"}}>
													<input type="text" id="interest" onKeyDown={interestKeydown} autoComplete="off" className="text-align-center"/>
												</div>
												<div>Interests added:</div>
												<div style={{border: "0px", marginBottom: "0.5rem"}} >
													<select multiple id="interestSelect" className="text-align-center">
													{interest.map(interest => (<option key={interest.id} onClick={() => {setInterestClicked(interest.id)}}>{interest.tag}</option>))}
													</select>
												</div>
												<button className="complete-form-button delete-btn" onClick={deleteInterest}>Delete Interest</button>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isBiographyVisible ? setIsBiographyVisible(false) : hidePublicItems(setIsBiographyVisible)
												}}>Biography
											</div>
											{isBiographyVisible ?
											<div className="test">
												<textarea className="profile-biography-textarea" onChange={function(e) {setBiography(e.target.value)}} defaultValue={biography}></textarea>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
										</div>
										:
										null}
										{/* Private Profile Settings */}
										<div className={!isPrivateProfileSettingsVisible ? "form-show-container1 border360 mt-05rem": "form-show-container1 mt-05rem"}>
											<b className="profile-hover" onClick={() => {
												isPrivateProfileSettingsVisible ? setIsPrivateProfileSettingsVisible(false) : hideSettings(setIsPrivateProfileSettingsVisible)
											}}>Private Profile Settings</b>
										</div>
										{isPrivateProfileSettingsVisible ?
										<div className="profile-edit-container">
											<div className="profile-edit-components" onClick={() => {
												isEmailVisible ? setIsEmailVisible(false) : hidePrivateItems(setIsEmailVisible)
												}}>Email
											</div>
											{isEmailVisible ?
											<div className="test">
												<div className="flex-row">
													<input className="profile-inputs" placeholder={profile.email}></input>
												</div>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isPasswordVisible ? setIsPasswordVisible(false) : hidePrivateItems(setIsPasswordVisible)
												}}>Password
											</div>
											{isPasswordVisible ?
											<div className="test">
												<input className="profile-inputs" placeholder="Password"></input>
												<input className="profile-inputs" placeholder="Confirm Password"></input>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {
												isLocationVisible ? setIsLocationVisible(false) : hidePrivateItems(setIsLocationVisible)
												}}>Location
											</div>
											{isLocationVisible ?
											<div className="test">
												<PikadayWrap value={profile.dateofbirth} page="profile"/>
												<button className="profile-button mt-05rem">Save</button>
											</div>
											:
											null
											}
										</div>
										:
										null}
									</div>
									
									{/* <div className="profile-public-edit-container">
										<form >
											<h1 className="title-signup">Public profile settings</h1>
											<div className="form_message form_message_error"></div>
											<div className="flex-row-signup">
												<div className="form_input_group">
													<input autoFocus type="text" name="firstname" className="form_input" placeholder="Firstname" autoComplete="off" value={firstname} onChange={function(e) {setFirstname(e.target.value); setErrorFirstname("")}}/>
													<div className="form_input_error_message">{errorFirstname}</div>
												</div>
												<div className="form_input_group">
													<input type="text" name="surname" className="form_input" placeholder="Surname" autoComplete="off" value={surname} onChange={function(e) {setSurname(e.target.value); setErrorSurname("")}}/>
													<div className="form_input_error_message">{errorSurname}</div>
												</div>
											</div>
											<div className="form_input_group">
												<input type="text" name="username" className="form_input" placeholder="Username" autoComplete="off" value={username} onChange={function(e) {setUsername(e.target.value); setErrorUsername("")}}/>
												<div className="form_input_error_message">{errorUsername}</div>
											</div>
											<div className="form_input_group">
												<input type="text" name="email" className="form_input" placeholder="Email" autoComplete="off" value={email} onChange={function(e) {setEmail(e.target.value); setErrorEmail("")}}/>
												<div className="form_input_error_message">{errorEmail}</div>
											</div>
											<div className="form_input_group">
												<input type="password" name="password" className="form_input" placeholder="Password" autoComplete="off" value={password} onChange={function(e) {setPassword(e.target.value); setErrorPassword("")}}/>
												<div className="form_input_error_message">{errorPassword}</div>
											</div>
											<div className="form_input_group">
												<input type="password" name="passwordConfirm" className="form_input" placeholder="Confirm Password" autoComplete="off" value={passwordConfirm} onChange={function(e) {setPasswordConfirm(e.target.value); setErrorPasswordConfirm("")}}/>
												<div className="form_input_error_message">{errorPasswordConfirm}</div>
											</div>
											<button className="form_button" name="request" type="submit">Save</button>
										</form>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				}
			</main>
		);
	} else if (profile.status === false) {
		return (
			<main className="ma">
				<div className="flex-center flex-col">
					<h1>Oops!</h1>
					<h3>Something went wrong fetching user profile.</h3>
					<h3>Please try again later!</h3>
				</div>
			</main>
		);
	} else {
		return (
			<main className="ma">
				<h3>No Profile Found</h3>
			</main>
		);
	}
}
