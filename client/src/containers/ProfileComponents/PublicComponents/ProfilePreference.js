import { useState, useEffect } from "react";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";
import { SocketContext } from "../../../context/SocketContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom"
import toast from 'react-simple-toasts';
import { UserContext } from '../../../context/UserContext';

export default function ProfilePreference(props) {
	const socket = useContext(SocketContext);
	const { pathname } = useLocation();
	const [promiseTracker, setPromiseTracker] = useState(false);
	const [errorPreference, setErrorPreference] = useState("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		if(socket && socket.disconnected && user.auth) {
			socket.open()
		}
	}, [socket, user.auth]);

	async function handleSubmit(e) {
		try {
			setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/preference', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ preference: e.target.value})
			});
			response = await response.json()
			if (response.status) {
				props.setPreferenceSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setPreferenceSuccessMsg("")
				}, 3000)
				props.setPreference(e.target.value)
				props.setUser(user => ( {
					...user,
					preference: e.target.value
				}))
				props.setProfile(user => ( {
					...user,
					preference: e.target.value
				}))
				socket.emit("gender_preference_change", { path: pathname, gender: props.user.gender, preference: e.target.value, username: props.user.username})
			} else {
				setErrorPreference(response.err)
				setTimeout(() => {
					setErrorPreference("")
				}, 3000)
			}
			setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			setPromiseTracker(false)
		}
	}

	return (
		<div className="profile-component-items">
			{promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<div className="flex-col">
				<div className="flex-row">
					<label htmlFor ="preferencerMale" className="profile-gender-label">Male:</label>
					<input name="preference" value="male" type="radio" id="preferencerMale" defaultChecked={props.preference === "male" ? true : false} onChange={handleSubmit} ></input>
				</div>
				<div className="flex-row">
					<label htmlFor="preferenceFemale" className="profile-gender-label" >Female:</label>
					<input name="preference" value="female" type="radio" id="preferenceFemale" defaultChecked={props.preference === "female" ? true : false} onChange={handleSubmit} ></input>
				</div>
				<div className="flex-row">
					<label htmlFor="preferenceBoth" className="profile-gender-label" >Both:</label>
					<input name="preference" value="both" type="radio" id="preferenceBoth" defaultChecked={props.preference === "both" ? true : false} onChange={handleSubmit} ></input>
				</div>
				<div className="profile-input-error">{errorPreference}</div>
			</div>
			}
		</div>
	);
}