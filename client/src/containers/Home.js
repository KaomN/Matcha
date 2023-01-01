import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import Cropper from 'react-easy-crop'
import "./styles/Home.css";
import ProfileForm from "./CompleteProfileComponents/ProfileForm";


export default function Home() {
	const { user, setUser, userContextLoading } = useContext(UserContext);
	const [promiseTracket, setPromiseTracker] = useState(false);
	const [interestingUsers, setInterestinUsers] = useState({});
	const navigate = useNavigate();
	const [profilePicture, setProfilePicture] = useState({});
	const [profilePictureSrc, setProfilePictureSrc] = useState("")

	async function handleSubmit() {

	}
	
	useEffect(() => {
		if(!user.profile) {
			navigate("/completeprofile");
		}
	}, []);

	useEffect(() => {
		(async function() {
			const response = await fetch("/home/getusers/");
			const data = await response.json();
			console.log(response)
			console.log(data)
			setInterestinUsers(data)
		})();
	}, []);
	console.log(interestingUsers)
	return (
			<ProfileForm
			profilePicture={profilePicture}
			setProfilePicture={setProfilePicture}
			profilePictureSrc={profilePictureSrc}
			setProfilePictureSrc={setProfilePictureSrc}
			/>
	);
}