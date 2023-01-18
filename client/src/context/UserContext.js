import {useState, createContext, useEffect} from 'react';
import { useLocation } from "react-router-dom";

export const UserContext = createContext({ username: "", auth: false, isLoading: true, imageSrc: "", firstname: "", surname: "", gender: "", age: "", birthdate: "", interest: "", latitude: "", longitude: "", preference: "", biography: "", rating: "", profile: "" });

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(UserContext);
	const [userContextLoading, setUserContextLoading] = useState(false)
	const { pathname } = useLocation();

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setUserContextLoading(true)
			if(pathname === "/home" || pathname.slice(0, 8) === "/profile" || pathname === "/chat" || pathname === "/completeprofile" || pathname === "/search") {
				setTimeout(() => {
					(async () => {
						const response = await fetch('http://localhost:3001/user/getuserinfo', {
							credentials: "include",
							method: 'GET'
						});
						const data = await response.json()
						if(!data.authMessage) {
							setUser(data)
						}
						setUserContextLoading(false)
					})()
				}, 300)
			}
		}
		return () => mounted = false;
	}, [pathname]);
	return (
		<UserContext.Provider value={{ user, setUser, userContextLoading, setUserContextLoading }}>
			{children}
		</UserContext.Provider>
	);
}