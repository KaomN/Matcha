import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { UserContext } from '../context/UserContext';
import { useParams } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import Cropper from 'react-easy-crop'
import "./styles/Profile.css";

// Edit profile image popup
function useEditProfileImageVisible(editProfileImageInitialIsVisible) {
	const [isEditProfileImageVisible, setIsEditProfileImageVisible] = useState(editProfileImageInitialIsVisible);
	const refEditProfileImage = useRef(null);

	const handleClickOutside = event => {
		if (refEditProfileImage.current && !refEditProfileImage.current.contains(event.target)) {
			setIsEditProfileImageVisible(false);
		}
	};

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsEditProfileImageVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside, true);
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside, true);
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible };
}

// Edit images popup
function useEditImageVisible(editImageInitialIsVisible) {
	const [isEditImageVisible, setIsEditImageVisible] = useState(editImageInitialIsVisible);
	const refEditImage = useRef(null);

	const handleClickOutside = event => {
		if (refEditImage.current && !refEditImage.current.contains(event.target)) {
			setIsEditImageVisible(false);
		}
	};

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsEditImageVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside, true);
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside, true);
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refEditImage, isEditImageVisible, setIsEditImageVisible };
}

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}


export default function Profile() {
	const { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible } = useEditProfileImageVisible(false);
	const { refEditImage, isEditImageVisible, setIsEditImageVisible } = useEditImageVisible(false);
	const { user, setUser } = useContext(UserContext);
	const [profile, setProfile] = useState("loading");
	const [profileImageFileInput, setProfileImageFileInput] = useState("");
	const [imageFileInput, setImageFileInput] = useState("");
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("");
	const [pictures, setPictures] = useState([]);
	//const [images, setImages] = useState("");
	const [numImage, setNumImage] = useState(0);
	const [sucessMessage, setSucessMessage] = useState("");
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	
	const onCropComplete = useCallback((croppedArea) => {
		setImageSize(croppedArea)
	})

	const [cropImages, setCropImages] = useState([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }])
	//const [cropImages, setCropImages] = useState([])
	const [zoomImages, setZoomImages] = useState([1, 1, 1, 1])
	const [imageSizeImages, setImageSizeImages] = useState(["", "", "", ""])

	let params = useParams()

	useEffect(() => {
		(async function() {
			let response = await fetch('/profile/getprofile', {
				credentials: "include",
				method: "POST",
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					profileID: params.profileID,
				})
			})
			response = await response.json()
			setProfile(response)
			})();

	}, [user]);

	// useEffect(() => {
	// 	setTotalImages(profile.images.length)
	// }, [profile]);

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
				// TODO Show error message
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
		setNumImage(numImage + 1)
	}
	function previousImage() {
		setNumImage(numImage - 1)
	}

	function saveChosenPicture(event) {
		//if(pictures.length < 4) {
			let pictureObj = event.target.files[0]
			if (pictureObj !== undefined) {
				let pictureSrc = URL.createObjectURL(pictureObj)
				setPictures([...pictures, {id:pictures.length, file:pictureObj, imageSrc: pictureSrc}]);
			}
		//}
	}

	async function uploadImages() {
		const formdata = new FormData();
		if(pictures.length < 1) {
			console.log("noimages")
		} else {
			pictures.map(pictureElem => {
				formdata.append(pictureElem.id, pictureElem.file)
				formdata.append("x" + pictureElem.id, imageSizeImages[pictureElem.id].x)
				formdata.append("y" + pictureElem.id, imageSizeImages[pictureElem.id].y)
				formdata.append("width" + pictureElem.id, imageSizeImages[pictureElem.id].width)
				formdata.append("height" + pictureElem.id, imageSizeImages[pictureElem.id].height)
			});
			let response = await fetch('/profile/uploadprofileimages', {
					method: "POST",
					body: formdata
				});
			response = await response.json();
			console.log(response)
			if(response.status) {
				const profileCopy = JSON.parse(JSON.stringify(profile));
				profileCopy.images.push(response.image)
				setProfile(profileCopy)
				setPictures([])
				setIsEditImageVisible(false)
				setSucessMessage("Profile updated successfully!")
				setTimeout(() => {
					setSucessMessage("")
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
	if (profile === "loading") {
		return <LoadingSpinner />
	} else if (profile.status) {
		return (
			<main className="flex-col padding1 ma profile-background">
				<div className="profile-update-success flex-center">{sucessMessage}</div>
				<div className="flex-row ma">
					<div className="padding05 profile-right-container">
						<div className="pos-relative profile-image-container">
							{(profile.isOwn === true)
								?
								<i className="pos-absolute-top-right material-icons" onClick={ () => isEditProfileImageVisible ? setIsEditProfileImageVisible(false) : setIsEditProfileImageVisible(true) }>edit</i>
								:
								null
							}
							{/* Edit Profile Image */}
							{!isEditProfileImageVisible ?
								null
								:
								<div className="popup-profile">
									<div ref={refEditProfileImage} className="popup-content-profile">
									<h1 className="profile-popup-title"> Upload Profile Picture</h1>
									{profileImageFileInput}
										<div className="wh-100p">
											<div className="flex-center wh-100p flex-col flex-justify-content-start profile-position-relative">
											{(profileImageFileInput !== "") ?
												null
												:
												<i className="material-icons profile-file-btn profile-position-absolute" onClick={() => { setProfilePicture({}); setProfilePictureSrc(""); }}>close</i>}
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
						<i className="profile-edit-images-button material-icons" onClick={ () => isEditImageVisible ? setIsEditImageVisible(false) : setIsEditImageVisible(true) }>edit</i>
						{!isEditImageVisible ?
								null
								:
								<div className="popup-profile">
									<div ref={refEditImage} className="popup-content-profile">
									<h1 className="profile-view-font profile-popup-title"> Upload Profile Pictures</h1>
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
															{pictures.length < 1 ?
																null
															:
																<div>
																	<div className="flex-center profile-selected-image-container flex-col flex-justify-content-start">
																		{pictures.map(pictureElem => (
																			<div key={pictureElem.id} data-key={pictureElem.id} className="flex-center wh-100p pb-1rem flex-col flex-justify-content-start profile-position-relative">
																				<div className={pictures[pictureElem.id]!== "" ? "cropper-container cropper-container-size" : "cropper-container"}>
																					{<Cropper
																					image={pictureElem.imageSrc}
																					crop={cropImages[pictureElem.id]}
																					zoom={zoomImages[pictureElem.id]}
																					aspect={3 / 4}
																					onCropChange={(crop) => {
																						const newCrop = cropImages.slice()
																						newCrop[pictureElem.id] = crop
																						setCropImages(newCrop)
																					}}
																					onCropComplete={ (croppedArea) => {
																						const newCroppedArea = imageSizeImages.slice()
																						newCroppedArea[pictureElem.id] = croppedArea
																						setImageSizeImages(newCroppedArea)
																					}}
																					onZoomChange={(zoom) => {
																						const newZoom = zoomImages.slice()
																						newZoom[pictureElem.id] = zoom
																						setZoomImages(newZoom)
																					}}
																					/>
																					}
																				</div>
																			</div>
																		))}
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
								<div  className="pt-1rem">
									<div className="pos-relative">
										<img src={profile.images[numImage].imageSrc} className="rounded-corners"/>
										<i className="material-icons pos-abs-bottom-middle" draggable="false" onClick={() => {
																					if(deleteImage(profile.images[numImage])) {
																						const profileCopy = JSON.parse(JSON.stringify(profile));
																						profileCopy.images.splice(numImage, 1)
																						if(numImage != 0) {
																							setNumImage(numImage - 1);
																						}
																						setProfile(profileCopy)
																						setSucessMessage("Profile updated successfully!")
																						setTimeout(() => {
																							setSucessMessage("")
																						}, 2000)
																					}
																				}}>close</i>
									</div>
									<div className="flex-center">
										{numImage != 0 ?
											<i className="material-icons profile-button-nofade" draggable="false" onClick={previousImage}>chevron_left</i>
										:
											<i className="material-icons profile-button-disabled" draggable="false">chevron_left</i>
										}
										{profile.images.length > numImage + 1 ?
											<i className="material-icons profile-button-nofade" draggable="false" onClick={nextImage}>chevron_right</i>
										:
											<i className="material-icons profile-button-disabled" draggable="false">chevron_right</i>
										}
									</div>
									{/* {profile.images.length} {numImage} */}
								</div>
							:
								<div>No images uploaded</div>
						}
					</div>
				</div>
				<div className="flex-col ma profile-biography-container">
					<div className="profile-view-font">About</div>
					<div className="margin-auto">{profile.biography}</div>
				</div>
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
