import {useState, createContext, useEffect} from 'react';
import { useLocation } from "react-router-dom";

export const ActiveChatContext = createContext("");

export const ActiveChatProvider = ({ children }) => {
	const [activeChat, setActiveChat] = useState("");
	const { pathname } = useLocation();

	// useEffect(() => {
	// 	setActiveChat("")
	// }, [pathname]);
	
	return (
		<ActiveChatContext.Provider value={{ activeChat, setActiveChat }}>
			{children}
		</ActiveChatContext.Provider>
	);
}