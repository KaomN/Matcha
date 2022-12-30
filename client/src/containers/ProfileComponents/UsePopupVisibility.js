import { useState, useEffect, useRef } from "react";

// Edit profile image popup
export function useEditProfileImageVisible(editProfileImageInitialIsVisible) {
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
export function useEditImageVisible(editImageInitialIsVisible) {
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
export function useEditProfileVisible(editProfileInitialIsVisible) {
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