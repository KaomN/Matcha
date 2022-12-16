import {useState, createContext, useEffect} from 'react';

export const UserContext = createContext({ name: "", auth: false, isLoading: true, imageSrc: "" });

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ name: "", auth: false, isLoading: true, imageSrc: "" });
	useEffect(() => {
		(async () => {
			var response = await fetch('/request/getuserinfo');
			response = await response.json()
			setUser({name: response.username, auth: response.auth, isloading: response.isLoading, imageSrc: ""})
		})()
	}, []);
	//console.log(user)
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}