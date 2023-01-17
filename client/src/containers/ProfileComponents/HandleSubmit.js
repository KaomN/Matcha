import toast from 'react-simple-toasts';

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

export async function HandleSubmit(props) {

	if (props.type === "name") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/name', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ firstname: capitalize(props.firstname), surname:capitalize(props.surname) })
			});
			response = await response.json();
			if (response.status) {
				props.setNameSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setNameSuccessMsg("")
				}, 3000)
				props.setUser(user => ( {
					...user,
					firstname: capitalize(props.firstname),
					surname: capitalize(props.surname)
				}))
				props.setProfile(user => ( {
					...user,
					firstname: capitalize(props.firstname),
					surname: capitalize(props.surname)
				}))
			} else {
				props.setErrorFirstname(response.errorFirstname)
				props.setErrorSurname(response.errorSurname)
				setTimeout(() => {
					props.setErrorFirstname("")
					props.setErrorSurname("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "username") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/username', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ username: props.username })
			});
			response = await response.json()
			if (response.status) {
				props.setUsernameSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setUsernameSuccessMsg("")
				}, 3000)
				props.setUser(user => ( {
					...user,
					username: props.username
				}))
				props.setProfile(user => ( {
					...user,
					username: props.username
				}))
			} else {
				props.setErrorUsername(response.err)
				setTimeout(() => {
					props.setErrorUsername("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "dateofbirth") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/dateofbirth', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ dateofbirth: props.dateOfBirth, age: props.age })
			});
			response = await response.json()
			if (response.status) {
				props.setDateOfBirthSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setDateOfBirthSuccessMsg("")
				}, 3000)
				props.setUser(user => ( {
					...user,
					birthdate: props.dateOfBirth,
					age: props.age
				}))
				props.setProfile(user => ( {
					...user,
					birthdate: props.dateOfBirth,
					age: props.age
				}))
			} else {
				props.setErrorDate(response.err)
				setTimeout(() => {
					props.setErrorDate("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "preference") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/preference', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ preference: props.value})
			});
			response = await response.json()
			if (response.status) {
				props.socket.emit("gender_preference_change", {userid: props.profile.userid, path: props.pathname})
				props.setPreferenceSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setPreferenceSuccessMsg("")
				}, 3000)
				props.setPreference(props.value)
				props.setUser(user => ( {
					...user,
					preference: props.value
				}))
				props.setProfile(user => ( {
					...user,
					preference: props.value
				}))
			} else {
				props.setErrorPreference(response.err)
				setTimeout(() => {
					props.setErrorPreference("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			console.log(err)
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "interestPut") {
		try {
			props.setPromiseTracker(true)
			const response = await fetch('http://localhost:3001/profile/interest', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ interest: props.interest})
		});
		const data = await response.json()
		if (data.status) {
			props.setInterestSuccessMsg("Updated successfully!")
			setTimeout(() => {
				props.setInterestSuccessMsg("")
			}, 3000)
			props.setUser(user => ( {
				...user,
				interest: props.interest
			}))
			props.setProfile(user => ( {
				...user,
				interest: props.interest
			}))
		} else {
			props.setErrorPutInterest(data.err)
			setTimeout(() => {
				props.setErrorPutInterest("")
			}, 3000)
		}
		props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "biography") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/biography', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ biography: props.biography})
			});
			response = await response.json()
			if (response.status) {
				props.setBiographySuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setBiographySuccessMsg("")
				}, 3000)
				props.setBiography(props.biography)
				props.setNewBiography(props.biography)
				props.setUser(user => ( {
					...user,
					biography: props.biography
				}))
				props.setProfile(user => ( {
					...user,
					biography: props.biography
				}))
			} else {
				props.setErrorBiography(response.err)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "email") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/email', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ email: props.email})
			});
			response = await response.json()
			if (response.status) {
				props.setEmailSuccessMsg("Email change request sent!")
				props.setEmailChangeMsg(response.msg)
				setTimeout(() => {
					props.setEmailSuccessMsg("")
				}, 3000)
				setTimeout(() => {
					props.setEmailChangeMsg("")
				}, 6000)
			} else {
				props.setErrorEmail(response.err)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "password") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/password', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ currentPassword: props.password, newPassword: props.newPassword, confirmNewPassword: props.confirmNewPassword})
			});
			response = await response.json()
			if (response.status) {
				props.setPasswordSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setPasswordSuccessMsg("")
				}, 3000)
			} else {
				props.setErrorPassword(response.errorPassword)
				props.setErrorNewPassword(response.errorNewPassword)
				props.setErrorConfirmNewPassword(response.errorConfirmNewPassword)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
	else if (props.type === "position") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('http://localhost:3001/profile/position', {
				credentials: "include",
				headers: { 'content-type': 'application/json' },
				method: "PUT",
				body: JSON.stringify({ lat: props.savedPosition.lat, lng: props.savedPosition.lng})
			});
			response = await response.json()
			if (response.status) {
				props.setUser(user => ( {
					...user,
					latitude: props.savedPosition.lat,
					longitude: props.savedPosition.lng
				}))
				props.setPositionSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setPositionSuccessMsg("")
				}, 3000)
			} else {
				props.setErrorPosition(response.errorPassword)
				setTimeout(() => {
					props.setErrorPosition("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			props.setPromiseTracker(false)
		}
	}
}