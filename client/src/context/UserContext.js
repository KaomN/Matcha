import {useState, createContext, useEffect} from 'react';

export const UserContext = createContext({ name: "", auth: false, profilePic: false});

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ name: "", auth: false, profilePic: false});
	useEffect(() => {
		(async () => {
			var response = await fetch('/request/getloginstatus');
			response = await response.json()
			setUser({name: response.username, auth: response.auth, profilePic: response.profilePic})
		})()
	}, []);
	//console.log(user)
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}