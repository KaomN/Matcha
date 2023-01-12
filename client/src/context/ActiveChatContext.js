import {useState, createContext} from 'react';

export const ActiveChatContext = createContext("");

export const ActiveChatProvider = ({ children }) => {
	const [activeChat, setActiveChat] = useState("");

	return (
		<ActiveChatContext.Provider value={{ activeChat, setActiveChat }}>
			{children}
		</ActiveChatContext.Provider>
	);
}