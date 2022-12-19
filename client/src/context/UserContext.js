import {useState, createContext, useEffect} from 'react';
import { useLocation } from "react-router-dom";

export const UserContext = createContext({ username: "", auth: false, isLoading: true, imageSrc: "", firstname: "", surname: "", gender: "", age: "", birthdate: "", interest: "", latitude: "", longitude: "", preference: "", biography: "", rating: "" });

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ username: "", auth: false, isLoading: true, imageSrc: "", firstname: "", surname: "", gender: "", age: "", birthdate: "", interest: "", latitude: "", longitude: "", preference: "", biography: "", rating: "" });
	const [userContextLoading, setUserContextLoading] = useState(false)
	const { pathname } = useLocation();

	useEffect(() => {
		(async () => {
			setUserContextLoading(true)
			var response = await fetch('/request/getuserinfo');
			response = await response.json()
			setUser({...user, ...response})
			setUserContextLoading(false)

			//setUser({name: response.username, auth: response.auth, isloading: response.isLoading, imageSrc: ""})
		})()
	}, [pathname]);
	
	return (
		<UserContext.Provider value={{ user, setUser, userContextLoading, setUserContextLoading }}>
			{children}
		</UserContext.Provider>
	);
}