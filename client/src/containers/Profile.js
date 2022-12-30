import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import { LoadingSpinnerPromiseComponent } from '../components/LoadingSpinnerPromiseComponent';
import GoogleMaps from "./GoogleMaps";
import Cropper from 'react-easy-crop'
import PikadayWrap from "../components/PikadayWrap";
import moment from "moment"
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
	const navigate = useNavigate();
	// Custom States for popups
	const { refEditProfileImage, isEditProfileImageVisible, setIsEditProfileImageVisible } = useEditProfileImageVisible(false);
	const { refEditImage, isEditImageVisible, setIsEditImageVisible } = useEditImageVisible(false);
	const { refEditProfile, isEditProfileVisible, setIsEditProfileVisible  } = useEditProfileVisible(false);
	// User context
	const { user, setUser, userContextLoading } = useContext(UserContext);
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
	const [errorFirstname, setErrorFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [errorSurname, setErrorSurname] = useState("");
	const [nameSuccessMsg, setNameSuccessMsg] = useState("");
	const [username, setUsername] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [usernameSuccessMsg, setUsernameSuccessMsg] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [dateofbirthSuccessMsg, setDateOfBirthSuccessMsg] = useState("");
	const [errorDate, setErrorDate] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [errorGender, setErrorGender] = useState("");
	const [genderSuccessMsg, setGenderSuccessMsg] = useState("");
	const [preference, setPreference] = useState("");
	const [errorPreference, setErrorPreference] = useState("");
	const [preferenceSuccessMsg, setPreferenceSuccessMsg] = useState("");
	const [interest, setInterest] = useState([]);
	const [interestClicked, setInterestClicked] = useState("");
	const [errorPutInterest, setErrorPutInterest] = useState("");
	const [errorDeleteInterest, setErrorDeleteInterest] = useState("");
	const [biography, setBiography] = useState("");
	const [newBiography, setNewBiography] = useState("");
	const [biographySuccessMsg, setBiographySuccessMsg] = useState("");
	const [errorBiography, setErrorBiography] = useState("");
	const [interestSuccessMsg, setInterestSuccessMsg] = useState([]);
	const [email, setEmail] = useState("");
	const [emailSuccessMsg, setEmailSuccessMsg] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [emailChangeMsg, setEmailChangeMsg] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [passwordSuccessMsg, setPasswordSuccessMsg] = useState([]);
	const [errorPassword, setErrorPassword] = useState("");
	const [errorNewPassword, setErrorNewPassword] = useState("");
	const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");
	//isNaN(position) ? {lat: 60.167867048720026, lng: 24.945892132588806} : position 
	const [savedPosition, setSavedPosition] = useState({lat: parseFloat((user.latitude === null) ? 60.167867048720026 : user.latitude), lng: parseFloat((user.longitude === null) ? 24.945892132588806 : user.longitude)});
	const [positionSuccessMsg, setPositionSuccessMsg] = useState("");
	const [errorPosition, setErrorPosition] = useState("");
	//const testMaps = useMemo( () => <Maps2 position={savedPosition} onClick={onClick} setSavedPosition={setSavedPosition}/>, [] );
	const Maps = useMemo( () => <GoogleMaps position={savedPosition} setSavedPosition={setSavedPosition}/>, [] );
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
	// Tracking Promises
	const [promiseTracker, setPromiseTracker] = useState(false);
	const [promiseTracker2, setPromiseTracker2] = useState(false);

	const onCropComplete = useCallback((croppedArea) => {
		setImageSize(croppedArea)
	})

	const onDateSelect = useCallback((date) => {
		let newDate = moment(date).format('DD-MM-YYYY')
		setDateOfBirth(newDate)
		let parts = newDate.split('-')
		let dateArr = new Date(parts[2], parts[1] - 1, parts[0])
		let diff = Math.abs(new Date() - dateArr)
		setAge(Math.floor(diff / (1000 * 60 * 60 * 24 * 365)))
	})

	const [cropImages, setCropImages] = useState({ x: 0, y: 0 })
	const [zoomImages, setZoomImages] = useState(1)
	const [imageSizeImages, setImageSizeImages] = useState("")

	const onCropCompleteImages = useCallback((croppedArea) => {
		setImageSizeImages(croppedArea)
	})

	useEffect(() => {
		if(!user.profile) {
			navigate("/completeprofile");
		}
	}, [user, userContextLoading]);

	let params = useParams()
	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				let response = await fetch(`/profile/profile/?id=${params.profileID === undefined ? user.userid : params.profileID}`)
				response = await response.json()
				let interestId = 0;
				if(response.interest !== undefined) {
					const interestCopy = response.interest.slice()
					interestCopy.map(interest => {
						interest.id = interestId
						interestId++
					})
					setInterest(interestCopy)
				}
				setProfile(response)
				setGender(response.gender)
				setPreference(response.preference)
				setBiography(response.biography)
				setNewBiography(response.biography)
			})();
		}
		return () => mounted = false;
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
					setUser(user => ( {
						...user,
						imageSrc: response.imageSrc
					}))
					setIsEditProfileImageVisible(false)
					setSucessMessage("Profile updated successfully!")
					setTimeout(() => {
						setSucessMessage("")
					}, 3000)
					setPromiseTracker(false)
				}, 1500)
			} else {
				setErrorMessage(response.err)
				setTimeout(() => {
					setErrorMessage("")
				}, 3000)
				setPromiseTracker(false)
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

	function hidePublicItems(show) {
		setIsNameVisible(false)
		setIsUsernameVisible(false)
		setIsDateVisible(false)
		setIsGenderVisible(false)
		setIsPreferenceVisible(false)
		setIsInterestsVisible(false)
		setIsBiographyVisible(false)
		setInterestClicked("")
		clearStates()
		show(true)
	}

	function hidePrivateItems(show) {
		setIsEmailVisible(false)
		setIsPasswordVisible(false)
		setIsLocationVisible(false)
		setInterestClicked("")
		clearStates()
		show(true)
	}

	function hideSettings(show) {
		setIsPublicProfileSettingsVisible(false)
		setIsPrivateProfileSettingsVisible(false)
		setInterestClicked("")
		clearStates()
		show(true)
	}

	function clearStates() {
		setFirstname("")
		setSurname("")
		setUsername("")
		setDateOfBirth("")
		setPassword("")
		setNewPassword("")
		setConfirmNewPassword("")
		resetBiographyState()
	}

	function resetBiographyState() {
		setBiography(newBiography)
	}

	async function handleSubmit(props, value, event) {
		if (props === "name") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/name', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ firstname: capitalize(firstname), surname:capitalize(surname) })
				});
				response = await response.json();
				if (response.status) {
					setNameSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setNameSuccessMsg("")
					}, 3000)
					setUser(user => ( {
						...user,
						firstname: capitalize(firstname),
						surname: capitalize(surname)
					}))
				} else {
					setErrorFirstname(response.errorFirstname)
					setErrorSurname(response.errorSurname)
					setTimeout(() => {
						setErrorFirstname("")
						setErrorSurname("")
					}, 3000)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "username") {
			try {
				setPromiseTracker(true)
				
				let response = await fetch('/profile/username', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ username: username })
				});
				response = await response.json()
				if (response.status) {
					setUsernameSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setUsernameSuccessMsg("")
					}, 3000)
					setUser(user => ( {
						...user,
						username: username
					}))
				} else {
					setErrorUsername(response.err)
					setTimeout(() => {
						setErrorUsername("")
					}, 3000)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "dateofbirth") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/dateofbirth', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ dateofbirth: dateOfBirth, age:age })
				});
				response = await response.json()
				
				if (response.status) {
					setDateOfBirthSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setDateOfBirthSuccessMsg("")
					}, 3000)
					setUser(user => ( {
						...user,
						birthdate: dateOfBirth,
						age: age
					}))
				} else {
					setErrorDate(response.err)
					setTimeout(() => {
						setErrorDate("")
					}, 3000)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "gender") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/gender', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ gender: value})
				});
				response = await response.json()
				console.log(response)
				if (response.status) {
					setGenderSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setGenderSuccessMsg("")
					}, 3000)
					setGender(value)
					setUser(user => ( {
						...user,
						gender: value
					}))
				} else {
					setErrorGender(response.err)
					setTimeout(() => {
						setErrorGender("")
					}, 3000)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "preference") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/preference', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ preference: value})
				});
				response = await response.json()
				console.log(response)
				if (response.status) {
					setPreferenceSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setPreferenceSuccessMsg("")
					}, 3000)
					setPreference(value)
					setUser(user => ( {
						...user,
						preference: value
					}))
				} else {
					setErrorPreference(response.err)
					setTimeout(() => {
						setErrorPreference("")
					}, 3000)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "interestPut") {
			try {
				if(event.key === " ")
					event.preventDefault()
				else if(event.key === "Enter") {
					setPromiseTracker(true)
					let response = await fetch('/profile/interest', {
						headers: {'Content-Type': 'application/json'},
						method: "PUT",
						body: JSON.stringify({ interest: capitalize(value)})
					});
					response = await response.json()
					console.log(response)
					if(response.status) {
						setInterestSuccessMsg("Updated successfully!")
						setTimeout(() => {
							setInterestSuccessMsg("")
						}, 3000)
						// Update Interest state
						const interestCopy = interest.slice()
						interestCopy.push({tag: capitalize(value), id: interest.length})
						setInterest(interestCopy)
						// Update User.interest state
						const userInterestCopy = user.interest.slice()
						userInterestCopy.push({tag: capitalize(value)})
						setUser(user => ( {
							...user,
							interest: userInterestCopy
						}))
						event.target.value = "";
					} else {
						setErrorPutInterest(response.err)
						setTimeout(() => {
							setErrorPutInterest("")
						}, 3000)
					}
					setPromiseTracker(false)
				}
			} catch (err) {

			}
		}
		else if (props === "interestDelete") {
			try {
				setPromiseTracker2(true)
				let response = await fetch('/profile/interest', {
					headers: {'Content-Type': 'application/json'},
					method: "DELETE",
					body: JSON.stringify({ interest: interestClicked.tag})
				});
				response = await response.json()
				if (response.status) {
					setInterestSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setInterestSuccessMsg("")
					}, 3000)
					setInterest(
						interest.filter(a =>
						a.id !== parseInt(interestClicked.id)
						)
					);
					const userInterestCopy =  user.interest.filter(a =>a.tag !== interestClicked.tag)
					setUser(user => ( {
						...user,
						interest: userInterestCopy
					}))
				} else {
					setErrorDeleteInterest(response.err)
					setTimeout(() => {
						setErrorDeleteInterest("")
					}, 3000)
				}
				setPromiseTracker2(false)
			} catch (err) {

			}
		}
		else if (props === "biography") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/biography', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ biography: biography})
				});
				response = await response.json()
				if (response.status) {
					setBiographySuccessMsg("Updated successfully!")
					setTimeout(() => {
						setBiographySuccessMsg("")
					}, 3000)
					setBiography(biography)
					setNewBiography(biography)
					setUser(user => ( {
						...user,
						biography: biography
					}))
				} else {
					setErrorBiography(response.err)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "email") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/email', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ email: email})
				});
				response = await response.json()
				if (response.status) {
					setEmailSuccessMsg("Email change request sent!")
					setEmailChangeMsg(response.msg)
					setTimeout(() => {
						setEmailSuccessMsg("")
					}, 3000)
					setTimeout(() => {
						setEmailChangeMsg("")
					}, 6000)
				} else {
					setErrorEmail(response.err)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "password") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/password', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ currentPassword: password, newPassword: newPassword, confirmNewPassword: confirmNewPassword})
				});
				response = await response.json()
				if (response.status) {
					setPasswordSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setPasswordSuccessMsg("")
					}, 3000)
				} else {
					setErrorPassword(response.errorPassword)
					setErrorNewPassword(response.errorNewPassword)
					setErrorConfirmNewPassword(response.errorConfirmNewPassword)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
		else if (props === "position") {
			try {
				setPromiseTracker(true)
				let response = await fetch('/profile/position', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ lat: savedPosition.lat, lng: savedPosition.lng})
				});
				response = await response.json()
				if (response.status) {
					setPositionSuccessMsg("Updated successfully!")
					setTimeout(() => {
						setPositionSuccessMsg("")
					}, 3000)
				} else {
					setErrorPosition(response.errorPassword)
					setTimeout(() => {
						setErrorPosition("")
					}, 3000)
				}
				setPromiseTracker(false)
			} catch (err) {

			}
		}
	}

	// function onClick(newPosition) {
	// 	setSavedPosition(newPosition)
	// }

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
									<div ref={refEditImage} className="popup-content-profile pos-relative">
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
				<button className="form_button_verify mt-05rem" onClick={ () => {setIsEditProfileVisible(true); setInterestClicked("")} }>Edit Profile</button>
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
											<div className="profile-edit-components" onClick={() => { isNameVisible ? setIsNameVisible(false) : hidePublicItems(setIsNameVisible) }}>
												<div>Name</div>
												<div className="profile-items-success-msg">{nameSuccessMsg}</div>
											</div>
											{isNameVisible ?
											<div className="test">
												<div className="flex-row">
													<div className="flex-col">
														<input className="profile-inputs" placeholder={profile.firstname} defaultValue={firstname} onChange={function(e) {setFirstname(e.target.value); setErrorFirstname(""); }}></input>
														<div className="profile-input-error">{errorFirstname}</div>
													</div>
													<div className="flex-col">
														<input className="profile-inputs" placeholder={profile.surname} defaultValue={surname} onChange={function(e) {setSurname(e.target.value); setErrorSurname(""); }}></input>
														<div className="profile-input-error">{errorSurname}</div>
													</div>
												</div>
												{promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={ () => { handleSubmit("name") }}>Save</button>}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isUsernameVisible ? setIsUsernameVisible(false) : hidePublicItems(setIsUsernameVisible)}}>
												<div>Username</div>
												<div className="profile-items-success-msg">{usernameSuccessMsg}</div>
											</div>
											{isUsernameVisible ?
											<div className="test">
												<div>
													<input className="profile-inputs" placeholder={profile.username} defaultValue={username} onChange={function(e) {setUsername(e.target.value); setErrorUsername(""); }}></input>
													<div className="profile-input-error">{errorUsername}</div>
												</div>
												{promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={ () => { handleSubmit("username") }}>Save</button>}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => { isDateVisible ? setIsDateVisible(false) : hidePublicItems(setIsDateVisible) }}>
												<div>Date of birth</div>
												<div className="profile-items-success-msg">{dateofbirthSuccessMsg}</div>
											</div>
											{isDateVisible ?
											<div className="test">
												<PikadayWrap
												value={profile.dateofbirth}
												page="profile"
												onSelect={onDateSelect}
												/>
												<div className="profile-input-error">{errorDate}</div>
												{promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={ () => { handleSubmit("dateofbirth") }}>Save</button>}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isGenderVisible ? setIsGenderVisible(false) : hidePublicItems(setIsGenderVisible)}}>
												<div>Gender</div>
												<div className="profile-items-success-msg">{genderSuccessMsg}</div>
											</div>
											{isGenderVisible ?
											<div className="test">
												{promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<div className="flex-col">
													<div className="flex-row">
														<label htmlFor ="genderMale" className="profile-gender-label">Male:</label>
														<input name="gender" value="male" type="radio" id="genderMale" defaultChecked={gender === "male" ? true : false} onChange={(e) => {handleSubmit("gender", e.target.value)}}></input>
													</div>
													<div className="flex-row">
														<label htmlFor="genderFemale" className="profile-gender-label" >Female:</label>
														<input name="gender" value="female" type="radio" id="genderFemale" defaultChecked={gender === "female" ? true : false} onChange={(e) => {handleSubmit("gender", e.target.value)}}></input>
													</div>
													<div className="profile-input-error">{errorGender}</div>
												</div>
												}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isPreferenceVisible ? setIsPreferenceVisible(false) : hidePublicItems(setIsPreferenceVisible)}}>
												<div>Preference</div>
												<div className="profile-items-success-msg">{preferenceSuccessMsg}</div>
											</div>
											{isPreferenceVisible ?
											<div className="test">
												{promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<div className="flex-col">
													<div className="flex-row">
														<label htmlFor ="preferencerMale" className="profile-gender-label">Male:</label>
														<input name="preference" value="male" type="radio" id="preferencerMale" defaultChecked={preference === "male" ? true : false} onChange={(e) => {handleSubmit("preference", e.target.value)}} ></input>
													</div>
													
													<div className="flex-row">
														<label htmlFor="preferenceFemale" className="profile-gender-label" >Female:</label>
														<input name="preference" value="female" type="radio" id="preferenceFemale" defaultChecked={preference === "female" ? true : false} onChange={(e) => {handleSubmit("preference", e.target.value)}} ></input>
													</div>
													<div className="flex-row">
														<label htmlFor="preferenceBoth" className="profile-gender-label" >Both:</label>
														<input name="preference" value="both" type="radio" id="preferenceBoth" defaultChecked={preference === "both" ? true : false} onChange={(e) => {handleSubmit("preference", e.target.value)}} ></input>
													</div>
													<div className="profile-input-error">{errorPreference}</div>
												</div>
												}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isInterestsVisible ? setIsInterestsVisible(false) : hidePublicItems(setIsInterestsVisible)}}>
												<div>Interests</div>
												<div className="profile-items-success-msg">{interestSuccessMsg}</div>
											</div>
											{isInterestsVisible ?
											<div className="test">
												<div style={{border: "0px", marginBottom: "0.5rem"}}>
													<input type="text" onKeyDown={(e) => {handleSubmit("interestPut", e.target.value, e); setErrorPutInterest(""); setErrorDeleteInterest("")}} autoComplete="off" className="profile-interest-input"/>
												</div>
												<div>Interests added:</div>
												<div style={{border: "0px", marginBottom: "0.5rem"}} >
													<select multiple id="interestSelect" className="text-align-center profile-interest-select">
														{interest.map(interest => (
														<option key={interest.id} onClick={() => { setInterestClicked({id:interest.id, tag:interest.tag})}}>{interest.tag}</option>
														))}
													</select>
												</div>
												<div className="profile-input-error">{errorPutInterest}</div>
												<div className="profile-input-error">{errorDeleteInterest}</div>
												{promiseTracker2 ?
												<LoadingSpinnerPromiseComponent/>
												:
												interestClicked != "" ?
												<button className="complete-form-button delete-btn" onClick={() => {handleSubmit("interestDelete")}}>Delete Interest</button>
												:
												null
												}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isBiographyVisible ? setIsBiographyVisible(false) : hidePublicItems(setIsBiographyVisible)}}>
												<div>Biography</div>
												<div className="profile-items-success-msg">{biographySuccessMsg}</div>
											</div>
											{isBiographyVisible ?
											<div className="test">
												<textarea className="profile-biography-textarea" onChange={function(e) {setBiography(e.target.value)}} defaultValue={biography}></textarea>
												<div className="profile-input-error">{errorBiography}</div>
												{promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={() => {handleSubmit("biography")}}>Save</button>
												}
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
											<div className="profile-edit-components" onClick={() => {isEmailVisible ? setIsEmailVisible(false) : hidePrivateItems(setIsEmailVisible)}}>
												<div>Email</div>
												<div className="profile-items-success-msg">{emailSuccessMsg}</div>
											</div>
											{isEmailVisible ?
											<div className="test">
												<div className="flex-col">
													<input className="profile-inputs" placeholder={profile.email} onChange={(e) => {setEmail(e.target.value); setErrorEmail("")}}></input>
													<div className="profile-input-error">{errorEmail}</div>
													<div className="profile-items-success-msg">{emailChangeMsg}</div>
												</div>
												{ promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={() => {handleSubmit("email")}}>Submit</button>
												}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isPasswordVisible ? setIsPasswordVisible(false) : hidePrivateItems(setIsPasswordVisible)}}>
												<div>Password</div>
												<div className="profile-items-success-msg">{passwordSuccessMsg}</div>
											</div>
											{isPasswordVisible ?
											<div className="test">
												<input className="profile-inputs" type="password" placeholder="Current Password" onChange={(e) => {setPassword(e.target.value); setErrorPassword("")}}></input>
												<div className="profile-input-error">{errorPassword}</div>
												<input className="profile-inputs" type="password" placeholder="New Password" onChange={(e) => {setNewPassword(e.target.value); setErrorNewPassword("")}}></input>
												<div className="profile-input-error">{errorNewPassword}</div>
												<input className="profile-inputs" type="password" placeholder="Confirm New Password" onChange={(e) => {setConfirmNewPassword(e.target.value); setErrorConfirmNewPassword("");}}></input>
												<div className="profile-input-error">{errorConfirmNewPassword}</div>
												{ promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={() => {handleSubmit("password")}}>Save</button>
												}
											</div>
											:
											null
											}
											<div className="profile-edit-components" onClick={() => {isLocationVisible ? setIsLocationVisible(false) : hidePrivateItems(setIsLocationVisible)}}>
												<div>Location</div>
												<div className="profile-items-success-msg">{positionSuccessMsg}</div>
											</div>
											{isLocationVisible ?
											<div className="test">
												{/* <Maps2
												position={savedPosition}
												onClick={onClick}
												/> */}
												{Maps}
												<div className="profile-input-error">{errorPosition}</div>
												{ promiseTracker ?
												<LoadingSpinnerPromiseComponent/>
												:
												<button className="profile-button" onClick={() => {handleSubmit("position")}}>Save</button>
												}
											</div>
											:
											null
											}
										</div>
										:
										null}
									</div>
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

// q: how to merge on github