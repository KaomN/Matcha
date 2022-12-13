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
					<div className="pl05 pt05 pb05 pr05">
						<img className="profile-view-image" src={"http://localhost:3001/images/" + profile.username + "/profile.jpg"}></img>
						<div className="flex-center profile-view-font">{profile.firstname} {profile.surname}</div>
						<div className="flex-center profile-view-font-small">@{profile.username}</div>
					</div>
					<div className="pl05 pt05 pb05 pr05">
						<p>Date of birth: {profile.dateofbirth}</p>
						<p>Age: {profile.age}</p>
						<p>Gender: {profile.gender}</p>
						{(profile.isOwn === true) ? null : <p>{profile.distance} km away</p>}
						<p>Rating: {profile.rating}</p>
					</div>
				</div>
				<div className="flex-col pb1 ma">
					<div>About</div>
					<div>About</div>
					<div>About</div>
					<div>About</div>
					<div className="margin-auto">{profile.biography}</div>
				</div>
				<div className="ma">
					other images
				</div>
			</main>
		);
	} else {
		return (
			<main>
				<h3>No Profile Found</h3>
			</main>
		);
	}
}