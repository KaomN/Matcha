function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

export async function HandleSubmit(props) {
	if (props.type === "name") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/name', {
				headers: {'Content-Type': 'application/json'},
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

		}
	}
	else if (props.type === "username") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/username', {
				headers: {'Content-Type': 'application/json'},
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
			} else {
				props.setErrorUsername(response.err)
				setTimeout(() => {
					props.setErrorUsername("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {

		}
	}
	else if (props.type === "dateofbirth") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/dateofbirth', {
				headers: {'Content-Type': 'application/json'},
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
			} else {
				props.setErrorDate(response.err)
				setTimeout(() => {
					props.setErrorDate("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {
			console.log(err)
		}
	}
	else if (props.type === "gender") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/gender', {
				headers: {'Content-Type': 'application/json'},
				method: "PUT",
				body: JSON.stringify({ gender: props.value})
			});
			response = await response.json()
			if (response.status) {
				props.setGenderSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setGenderSuccessMsg("")
				}, 3000)
				props.setGender(props.value)
				props.setUser(user => ( {
					...user,
					gender: props.value
				}))
			} else {
				props.setErrorGender(response.err)
				setTimeout(() => {
					props.setErrorGender("")
				}, 3000)
			}
			props.setPromiseTracker(false)
		} catch (err) {

		}
	}
	else if (props.type === "preference") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/preference', {
				headers: {'Content-Type': 'application/json'},
				method: "PUT",
				body: JSON.stringify({ preference: props.value})
			});
			response = await response.json()
			if (response.status) {
				props.setPreferenceSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setPreferenceSuccessMsg("")
				}, 3000)
				props.setPreference(props.value)
				props.setUser(user => ( {
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

		}
	}
	else if (props.type === "interestPut") {
		try {
			if(props.event.key === " ")
				props.event.preventDefault()
			else if(props.event.key === "Enter") {
				props.setPromiseTracker(true)
				let response = await fetch('/profile/interest', {
					headers: {'Content-Type': 'application/json'},
					method: "PUT",
					body: JSON.stringify({ interest: capitalize(props.value)})
				});
				response = await response.json()
				if(response.status) {
					props.setInterestSuccessMsg("Updated successfully!")
					setTimeout(() => {
						props.setInterestSuccessMsg("")
					}, 3000)
					// Update Interest state
					const interestCopy = props.interest.slice()
					interestCopy.push({tag: capitalize(props.value), id: props.interest.length})
					props.setInterest(interestCopy)
					// Update User.interest state
					const userInterestCopy = props.user.interest.slice()
					userInterestCopy.push({tag: capitalize(props.value)})
					props.setUser(user => ( {
						...user,
						interest: userInterestCopy
					}))
					props.event.target.value = "";
				} else {
					props.setErrorPutInterest(response.err)
					setTimeout(() => {
						props.setErrorPutInterest("")
					}, 3000)
				}
				props.setPromiseTracker(false)
			}
		} catch (err) {

		}
	}
	else if (props.type === "interestDelete") {
		console.log(props.interestClicked)
		try {
			props.setPromiseTracker2(true)
			let response = await fetch('/profile/interest', {
				headers: {'Content-Type': 'application/json'},
				method: "DELETE",
				body: JSON.stringify({ interest: props.interestClicked.tag})
			});
			response = await response.json()
			if (response.status) {
				props.setInterestSuccessMsg("Updated successfully!")
				setTimeout(() => {
					props.setInterestSuccessMsg("")
				}, 3000)
				props.setInterest(
					props.interest.filter(a =>
					a.id !== parseInt(props.interestClicked.id)
					)
				);
				const userInterestCopy = props.user.interest.filter(a =>a.tag !== props.interestClicked.tag)
				props.setUser(user => ( {
					...user,
					interest: userInterestCopy
				}))
				props.setInterestClicked("")
			} else {
				props.setErrorDeleteInterest(response.err)
				setTimeout(() => {
					props.setErrorDeleteInterest("")
				}, 3000)
			}
			props.setPromiseTracker2(false)
		} catch (err) {

		}
	}
	else if (props.type === "biography") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/biography', {
				headers: {'Content-Type': 'application/json'},
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
			} else {
				props.setErrorBiography(response.err)
			}
			props.setPromiseTracker(false)
		} catch (err) {

		}
	}
	else if (props.type === "email") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/email', {
				headers: {'Content-Type': 'application/json'},
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

		}
	}
	else if (props.type === "password") {
		console.log("password")
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/password', {
				headers: {'Content-Type': 'application/json'},
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

		}
	}
	else if (props.type === "position") {
		try {
			props.setPromiseTracker(true)
			let response = await fetch('/profile/position', {
				headers: {'Content-Type': 'application/json'},
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

		}
	}
}