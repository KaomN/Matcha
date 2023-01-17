import { useEffect, useState, useContext } from "react";
import { SocketContext } from '../../context/SocketContext';
import { useLocation } from "react-router-dom";
import { UserContext } from '../../context/UserContext';


const useChat = (activeChat) => {
	const [messages, setMessages] = useState([]);
	const socket = useContext(SocketContext);
	const { pathname } = useLocation();
	const { user } = useContext(UserContext);

	useEffect(() => {
		setMessages([])
	}, [activeChat]);

	useEffect(() => {
		if (socket.disconnected)
			socket.open()
		socket.on("receive_message", (message) => {
			if(socket.disconnected)
				socket.open()
			socket.emit("message_chat_notification", {
				channel: message.channel,
				userid: message.userid,
				sendto: message.sentto,
				path: pathname,
				username: user.username
			});
			if(message.channel === activeChat.channel) {
				delete message.channel
				const incomingMessage = {
					...message,
				};
				setMessages((messages) => [...messages, incomingMessage]);
			} 
		});

		return () => {socket.off("receive_message");};
	}, [activeChat, pathname, socket]);

	const sendMessage = (messageBody) => {
		if (socket.disconnected)
			socket.open()
		socket.emit("message", {
		message: messageBody.message,
		channel: messageBody.channel,
		userid: messageBody.userid,
		path: pathname,
		username: user.username
		});
	};

	return { messages, sendMessage};
};

export default useChat;
