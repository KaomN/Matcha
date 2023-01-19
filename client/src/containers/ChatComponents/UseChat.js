import { useEffect, useState, useContext } from "react";
import { SocketContext } from '../../context/SocketContext';
import { useLocation } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import notAuthenticated from '../../components/notAuthenticated.js'
import toast from "react-simple-toasts";

const useChat = (activeChat) => {
	const [messages, setMessages] = useState([]);
	const socket = useContext(SocketContext);
	const { pathname } = useLocation();
	const { user } = useContext(UserContext);

	useEffect(() => {
		setMessages([])
	}, [activeChat]);

	useEffect(() => {
		if(socket && socket.disconnected && user.auth) {
			socket.open()
		}
	}, [socket, user.auth]);

	useEffect(() => {
		socket.on("receive_message", (message) => {
			(async () => {
				const response = await fetch('http://localhost:3001/user/checkauth', {
					credentials: "include",
					method: 'GET'
				});
				const data = await response.json()
				if(data.status) {
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
				} else {
					if(!data.isAuthenticated === false) {
						notAuthenticated()
					}else {
						toast("Something went wrong!", { position: 'top-center', duration: 5000 })
					}
				}
			})()
		});

		return () => {socket.off("receive_message");};
	}, [activeChat, pathname, socket, user.username]);

	const sendMessage = (messageBody) => {
		(async () => {
			const response = await fetch('http://localhost:3001/user/checkauth', {
				credentials: "include",
				method: 'GET'
			});
			const data = await response.json()
			if(data.status) {
				socket.emit("message", {
					message: messageBody.message,
					channel: messageBody.channel,
					userid: messageBody.userid,
					path: pathname,
					username: user.username
				});
			} else {
				if(!data.isAuthenticated === false) {
					notAuthenticated()
				} else {
					toast("Something went wrong sending your message! Please try again later", { position: 'top-center', duration: 5000 })
				}
			}
		})()
	};

	return { messages, sendMessage};
};

export default useChat;
