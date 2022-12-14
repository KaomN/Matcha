import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { LoadingSpinner } from '../components/LoadingSpinner';
import "./styles/Profile.css";

export default function Profile() {
	const [profile, setProfile] = useState("loading");
	const [profileSrc, setProfileSrc] = useState("");
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
			setProfile(await response.json())
			})();

	}, []);

	// console.log(profile)
	if (profile === "loading") {
		return <LoadingSpinner />
	} else if (profile.status) {
		return (
			<main className="flex-col padding1 ma">
				<div className="flex-row ma">
					<div className="padding05">
						<div className="pos-relative profile-image-container">
							{(profile.isOwn === true) ? <i className="pos-absolute-top-right material-icons">edit</i> : null}
							{(profile.profile === true) ? <img className="profile-view-image" src={profile.profileSrc}></img> : <img className="profile-view-image" src={"http://localhost:3001/images/defaultProfile.png"}></img>}
							
						</div>
						<div className="padding05">
							<div className="flex-center profile-view-font">{profile.firstname} {profile.surname}</div>
							<div className="flex-center profile-view-font-small">@{profile.username}</div>
						</div>
						<div className="padding05 flex-center flex-col">
							{/* <div>Date of birth: {profile.dateofbirth}</div> */}
							<div>Age: {profile.age}</div>
							<div>Gender: {profile.gender}</div>
							{(profile.isOwn === true) ? null : <div>{profile.distance} km away</div>}
							<div>Rating: {profile.rating}</div>
						</div>
					</div>
					<div className="ma padding05">
						other images
					</div>
				</div>
				<div className="flex-col pb1 ma">
					<div className="profile-view-font">About</div>
					<div className="margin-auto">{profile.biography}</div>
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