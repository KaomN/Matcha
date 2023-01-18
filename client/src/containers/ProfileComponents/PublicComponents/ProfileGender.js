import { useState } from "react";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";
import { SocketContext } from "../../../context/SocketContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"
import toast from 'react-simple-toasts';
import { UserContext } from '../../../context/UserContext';

export default function ProfileGender(props) {
	const socket = useContext(SocketContext);
	const { pathname } = useLocation();
	const [errorGender, setErrorGender] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);
	const { user } = useContext(UserContext);

	useEffect(() => {
		if(socket && socket.disconnected && user.auth) {
			socket.open()
		}
	}, [socket, user.auth]);

	async function handleSubmit(e) {
		try {
			setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/gender', {
						credentials: "include",
						headers: { 'content-type': 'application/json' },
						method: "PUT",
						body: JSON.stringify({ gender: e.target.value})
					});
					response = await response.json()
					if (response.status) {
						props.setGenderSuccessMsg("Updated successfully!")
						setTimeout(() => {
							props.setGenderSuccessMsg("")
						}, 3000)
						props.setGender(e.target.value)
						props.setUser(user => ( {
							...user,
							gender: e.target.value
						}))
						props.setProfile(user => ( {
							...user,
							gender: e.target.value
						}))
						socket.emit("gender_preference_change", { path: pathname, gender: e.target.value, preference: props.user.preference, username: props.user.username})
					} else {
						setErrorGender(response.err)
						setTimeout(() => {
							setErrorGender("")
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
					<label htmlFor ="genderMale" className="profile-gender-label">Male:</label>
					<input name="gender" value="male" type="radio" id="genderMale" defaultChecked={props.gender === "male" ? true : false} onChange={handleSubmit}></input>
				</div>
				<div className="flex-row">
					<label htmlFor="genderFemale" className="profile-gender-label" >Female:</label>
					<input name="gender" value="female" type="radio" id="genderFemale" defaultChecked={props.gender === "female" ? true : false} onChange={handleSubmit}></input>
				</div>
				<div className="profile-input-error">{errorGender}</div>
			</div>
			}
		</div>
	);
}