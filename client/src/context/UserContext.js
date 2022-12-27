import {useState, createContext, useEffect} from 'react';
import { useLocation } from "react-router-dom";

export const UserContext = createContext({ username: "", auth: false, isLoading: true, imageSrc: "", firstname: "", surname: "", gender: "", age: "", birthdate: "", interest: "", latitude: "", longitude: "", preference: "", biography: "", rating: "" });

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(UserContext);
	const [userContextLoading, setUserContextLoading] = useState(false)
	const { pathname } = useLocation();

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			(async () => {
				setUserContextLoading(true)
				var response = await fetch('/request/getuserinfo');
				response = await response.json()
				setUser({...user, ...response})
				setUserContextLoading(false)
			})()
		}
		return () => mounted = false;
	}, [pathname]);
	return (
		<UserContext.Provider value={{ user, setUser, userContextLoading, setUserContextLoading }}>
			{children}
		</UserContext.Provider>
	);
}