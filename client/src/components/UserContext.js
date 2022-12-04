import {useState, createContext, useEffect} from 'react';

// var response;
// (async  () => {
// 	response = await fetch('/request/getloginstatus', {
// 		method: "POST",
// 	});
// 	response = await response.json()

// })()


export const UserContext = createContext({ name: '', auth: false });

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ name: localStorage.getItem('username') || "", auth: localStorage.getItem('auth') ? true : false});
	// useEffect(() => {
	// 	if (localStorage.getItem('username') != null) 
	// 		setUser({name: localStorage.getItem('username'), auth: true})
	// }, []);

	// Login updates the user data with a name parameter
	const login = (name) => {
	  setUser((user) => ({
		name: name,
		auth: true,
	  }));
	};
  
	// Logout updates the user data to default
	const logout = () => {
	  setUser((user) => ({
		name: '',
		auth: false,
	  }));
	};
  
	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}