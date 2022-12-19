import { useLocation, useNavigate } from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../context/UserContext';
import "./styles/Header.css";

function useProfileVisible(profileInitialIsVisible) {
	const [isProfileVisible, setIsProfileVisible] = useState(
		profileInitialIsVisible
	);
	const refProfile = useRef(null);

	const handleClickOutside = event => {
		if (refProfile.current && !refProfile.current.contains(event.target)) {
			setIsProfileVisible(false);
		}
	};

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsProfileVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside, true);
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside, true);
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refProfile, isProfileVisible, setIsProfileVisible };
}

function useChatVisible(chatInitialIsVisible) {
	const [isChatVisible, setIsChatVisible] = useState(
		chatInitialIsVisible
	);
	const refChat = useRef(null);

	const handleClickOutside = event => {
		if (refChat.current && !refChat.current.contains(event.target)) {
			setIsChatVisible(false);
		}
	};

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsChatVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside, true);
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside, true);
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refChat, isChatVisible, setIsChatVisible };
}

function useNotificationVisible(notificationInitialIsVisible) {
	const [isNotificationVisible, setIsNotificationVisible] = useState(
		notificationInitialIsVisible
	);
	const refNotification = useRef(null);

	const handleEscapeKey = event => {
		if (event.key === "Escape") {
			setIsNotificationVisible(false);
		}
	}

	const handleClickOutside = event => {
		if (refNotification.current && !refNotification.current.contains(event.target)) {
			setIsNotificationVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside, true);
		document.addEventListener("keydown", handleEscapeKey, true);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside, true);
			document.removeEventListener("keydown", handleEscapeKey, true);
		};
	});

	return { refNotification, isNotificationVisible, setIsNotificationVisible };
}

export default function Header() {
	const { user, setUser } = useContext(UserContext);
	const [profileImageSrc, setProfileImageSrc] = useState(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { refProfile, isProfileVisible, setIsProfileVisible } = useProfileVisible(false);
	const { refChat, isChatVisible, setIsChatVisible } = useChatVisible(false);
	const { refNotification, isNotificationVisible, setIsNotificationVisible } = useNotificationVisible(false);

	function fetchLogout() {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(fetch('/request/logout')
				.then((response) => response.json()));
			}, 150)
		});
		return promise
	}

	async function handleLogout(event) {
		event.preventDefault();
			var response = await trackPromise(fetchLogout());
			console.log(response)
			
			if(response.status) {
				setUser({})
				navigate("/login");
			}
	}

	useEffect(() => {
		(async () => {
			var response = await fetch('/request/getprofileimage');
			response = await response.json()
			setProfileImageSrc(response.imageSrc)
		})()
	}, [pathname, user]);
	//console.log(user)
	if(pathname === "/login" || pathname === "/signup" || pathname === "/forgotpassword" || pathname === "/passwordreset" || pathname === "/") {
		return (<header>
			<div className="flex-center">
				<a draggable="false" className="title" onClick={() => {navigate('/')}}><h3>Matcha</h3></a>
			</div>
			<nav>
				<ul>
					<li><a href="/login" draggable="false" className="login" title="Login">Login</a></li>
					<li><a href="/signup" draggable="false" className="signup" title="Signup">Signup</a></li>
				</ul>
			</nav>
		</header>);
	} else {
		return (<header>
			<div className="flex-center">
				<a draggable="false" className="title" onClick={() => {navigate('/home')}}><h3>Matcha</h3></a>
			</div>
			<nav className="pr05">
				<ul className="header-overflow-visible">
					<div className="header-profile-dropdown-container">
						<li><i className="material-icons" onClick={handleLogout} title="Logout">logout</i></li>
						<li>
							<div ref={refNotification}>
								<i className="material-icons" onClick={ () => isNotificationVisible ? setIsNotificationVisible(false) : setIsNotificationVisible(true) }>notifications</i>
								{!isNotificationVisible ? null : 
									<div className="header-profile-dropdown header-zindex">
										<div className="header-profile-dropdown-profile-container">
											Show Notification
										</div>
									</div>
								}
							</div>
						</li>
						<li>
							<div ref={refChat}>
								<i className="material-icons" onClick={ () => isChatVisible ? setIsChatVisible(false) : setIsChatVisible(true) }>chat</i>
								{!isChatVisible ? null : 
									<div className="header-profile-dropdown header-zindex">
										<div className="header-profile-dropdown-profile-container">
											Show connected persons
										</div>
									</div>
								}
							</div>
						</li>
						<li>
							{profileImageSrc === false ? null :
								<div ref={refProfile}>
									<img className="header-profile" src={profileImageSrc} onClick={ () => isProfileVisible ? setIsProfileVisible(false) : setIsProfileVisible(true) }></img>
										{!isProfileVisible ? null : 
											<div className="header-profile-dropdown header-zindex">
												<div className="header-profile-dropdown-profile-container">
													<div className="header-profile-dropdown-profile" onClick={() => {navigate("/profile"); setIsProfileVisible(false)}}>
														<img className="header-profile-dropdown-profile-image" src={profileImageSrc} ></img>
														<div className="ml05 header-font-color">@{user.username}</div>
													</div>
													<div className="header-profile-seperator"></div>
													<div className="header-profile-dropdown-profile-history">Profile history</div>
												</div>
												<div className="header-profile-dropdown-profile">Settings? needed?</div>
											</div>
										}
								</div>
							}
						</li>
					</div>
				</ul>
			</nav>
		</header>);
	}
}
