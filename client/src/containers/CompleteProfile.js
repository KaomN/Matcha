import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CompleteProfile.css";
import '../../node_modules/pikaday/css/pikaday.css';
import { useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import AgeForm from "./CompleteProfileComponents/AgeForm";
import GenderForm from "./CompleteProfileComponents/GenderForm";
import PreferenceForm from "./CompleteProfileComponents/PreferenceForm";
import BiographyForm from "./CompleteProfileComponents/BiographyForm";
import InterestForm from "./CompleteProfileComponents/InterestForm";
import ProfileForm from "./CompleteProfileComponents/ProfileForm";
import { LoadingSpinner } from "../components/LoadingSpinner";
import toast from 'react-simple-toasts';

export default function CompleteProfile() {
	const { user } = useContext(UserContext);
	const [age, setAge] = useState("");
	const [tagOptions, setTagOptions] = useState([]);
	const [isLoading, setIsLoading] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(undefined);
	const [gender, setGender] = useState("");
	const [preference, setPreference] = useState("");
	const [biography, setBiography] = useState("");
	const [interest, setInterest] = useState([]);
	const [showform, setShowForm] = useState("ageForm");
	const [locationLat, setLocationLat] = useState("")
	const [locationLng, setLocationLng] = useState("")
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("")
	const [tags, setTags] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				setIsLoading(true);
				const response = await fetch("http://localhost:3001/search/tags", {
					credentials: "include",
					method: 'GET'
				});
				const data = await response.json();
				if(data.status) {
					setTagOptions(data.tags);
				} else {
					toast("Something went wrong! Error loading tags, please refresh the page!", { position: 'top-center', duration: 5000 })
				}
				setIsLoading(false);
			})();
		}
		return () => {mounted = false};
	}, [])

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				// Success function
				saveLocation,
				// Error function, get location from google API instead
				getLocationAPI,
				// Options. See MDN for details.
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				});
		}
	}

	function saveLocation(position) {
		setLocationLat(position.coords.latitude)
		setLocationLng(position.coords.longitude)
	}

	async function getLocationAPI() {
		let response = await fetch('http://localhost:3001/request/getlocation', {
			credentials: "include",
			method: "POST",
		});
		response = await response.json();
		if(response.status) {
			setLocationLat(response.location.lat)
			setLocationLng(response.location.lng)
		}
	}

	if (locationLat === "" && locationLng === "") {
		getLocation();
	}

	useEffect(() => {
		if(user.profile) {
			navigate("/home");
		}
	}, [navigate, user]);

	if(isLoading) {
		<LoadingSpinner/>
	}

	if(showform === "ageForm")
		return <AgeForm
				date={dateOfBirth}
				setDateOfBirth={setDateOfBirth}
				setAge={setAge}
				setShowForm={setShowForm}
				/>
	else if(showform === "genderForm")
		return <GenderForm
				gender={gender}
				setGender={setGender}
				setShowForm={setShowForm}
				/>
	else if(showform === "preferenceForm")
		return <PreferenceForm
				preference={preference}
				setPreference={setPreference}
				setShowForm={setShowForm}
				/>
	else if(showform === "biographyForm")
		return <BiographyForm
				biography={biography}
				setBiography={setBiography}
				setShowForm={setShowForm}
				/>
	else if(showform === "interestForm")
		return <InterestForm
				setInterest={setInterest}
				interest={interest}
				setShowForm={setShowForm}
				tagOptions={tagOptions}
				tags={tags}
				setTags={setTags}
				/>
	else if(showform === "profileForm")
		return <ProfileForm
				profilePicture={profilePicture}
				setProfilePicture={setProfilePicture}
				profilePictureSrc={profilePictureSrc}
				setProfilePictureSrc={setProfilePictureSrc}
				setShowForm={setShowForm}
				age={age}
				dateOfBirth={dateOfBirth}
				gender={gender}
				preference={preference}
				biography={biography}
				locationLat={locationLat}
				locationLng={locationLng}
				tags={tags}
				/>
}