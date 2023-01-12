import { useLocation, useNavigate } from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../context/UserContext';
import "./styles/Header.css";
import { userAuth } from "../components/UserAuth";
import { SocketContext } from "../context/SocketContext";
import Notifications from "./HeaderComponents/Notifications";
import Chats from "./HeaderComponents/Chats";
import Profile from "./HeaderComponents/Profile";


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
	const socket = useContext(SocketContext);
	const { user, setUser } = useContext(UserContext);
	const { pathname } = useLocation();
	const [path, setPath] = useState(pathname.split("/"));
	const navigate = useNavigate();
	const { refProfile, isProfileVisible, setIsProfileVisible } = useProfileVisible(false);
	const { refChat, isChatVisible, setIsChatVisible } = useChatVisible(false);
	const { refNotification, isNotificationVisible, setIsNotificationVisible } = useNotificationVisible(false);
	const [state, setState] = useState("loading");

	// Emit updating activity everytime pathname changes
	useEffect(() => {
		socket.emit("update_last_active", { path: pathname });
	}, [pathname]);

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
			if(response.status) {
				socket.emit("logout", { userId: user.userid });
				setUser({})
				navigate("/login");
			}
	}

	function handleNavigate() {
		navigate("/search")
	}

	useEffect(() => {
		setPath(pathname.split("/"))
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => {
			(async function() {
				try {
					const isUserLogged = await userAuth();
					setState(isUserLogged ? true : false);
				} catch {
					setState(false);
				}
			})();
		}, 501)
	}, []);

	if(state === "loading") {
		return null
	}

	if (path[1] === "home" || path[1] === "profile" || path[1] === "chat" || path[1] === "search") {
		return (<header>
			<div className="flex-center">
				<span draggable="false" className="title unselectable" onClick={() => {navigate('/home')}}><h3>Matcha</h3></span>
			</div>
			<nav className="pr05">
				<ul className="header-overflow-visible">
					<div className="header-profile-dropdown-container">
						<li><i className="material-icons header-material-icons" onClick={handleLogout} title="Logout">logout</i></li>
						<li>
							<Notifications
							refNotification={refNotification}
							isNotificationVisible={isNotificationVisible}
							setIsNotificationVisible={setIsNotificationVisible}
							/>
						</li>
						<li>
							<Chats
							refChat={refChat}
							isChatVisible={isChatVisible}
							setIsChatVisible={setIsChatVisible}
							/>
						</li>
						<li>
							<Profile
							refProfile={refProfile}
							isProfileVisible={isProfileVisible}
							setIsProfileVisible={setIsProfileVisible}
							user={user}
							/>
						</li>
						<li><i className="material-icons header-material-icons" title="Search" onClick={handleNavigate} >search</i></li>
					</div>
				</ul>
			</nav>
		</header>);
	} else if(path[1] === "completeprofile") {
		return (<header>
			<div className="flex-center">
				<span draggable="false" className="header_title_disabled ml05 unselectable"><h3>Matcha</h3></span>
			</div>
			<nav className="pr05">
				<ul className="header-overflow-visible">
					<div className="header-profile-dropdown-container">
						<li><i className="material-icons header-material-icons" onClick={handleLogout} title="Logout">logout</i></li>
					</div>
				</ul>
			</nav>
		</header>);
	} else {
		return (<header>
			<div className="flex-center">
				<span draggable="false" className="title unselectable" onClick={() => {navigate('/')}}><h3>Matcha</h3></span>
			</div>
			<nav>
				<ul>
					<li><a href="/login" draggable="false" className="login a-links" title="Login">Login</a></li>
					<li><a href="/signup" draggable="false" className="signup a-links" title="Signup">Signup</a></li>
				</ul>
			</nav>
		</header>);
	}
}
