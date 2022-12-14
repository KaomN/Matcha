import {useState, createContext, useEffect} from 'react';

export const UserContext = createContext({ name: "", auth: false });

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ name: "", auth: false});
	useEffect(() => {
		(async () => {
			var response = await fetch('/request/getloginstatus');
			response = await response.json()
			setUser({name: response.username, auth: response.auth})
		})()
	}, []);
	return (
		<UserContext.Provider value={{ user }}>
			{children}
		</UserContext.Provider>
	);
}