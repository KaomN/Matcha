import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { LoadingSpinner } from "../components/LoadingSpinner";
import ChatUserProfiles from "./ChatComponents/ChatUserProfiles";
import ChatMessage from "./ChatComponents/ChatMessage";
import { ActiveChatContext } from '../context/ActiveChatContext';
import useChat from "./ChatComponents/UseChat";



import "./styles/Chat.css";

export default function Chat() {
	const { user } = useContext(UserContext);
	const { activeChat, setActiveChat } = useContext(ActiveChatContext);
	const [connectedUser, setConnectedUser] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [componentIsLoading, setComponentIsLoading] = useState(false);
	const { messages, sendMessage } = useChat(activeChat);

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			if(connectedUser.length > 0) {
				(async function() {
					const response = await fetch(`/chat/chat/`)
					const data = await response.json()
					if(data.status) {
						setConnectedUser(data.connectedUsers)
					}
					setComponentIsLoading(false)
				})();
			} else {
				(async function() {
					setIsLoading(true)
					const response = await fetch(`/chat/chat/`)
					const data = await response.json()
					if(data.status) {
						setConnectedUser(data.connectedUsers)
					}
					setIsLoading(false)
				})();
			}
			
		}
		return () => {mounted = false};
	}, [activeChat, connectedUser.length]);


	function filterActiveChat(user) {
		return user.room === activeChat.channel
	}

	if(isLoading)
		return (<LoadingSpinner />)
	return (
		<main className="chat_main_container">
			<div className="chat_user_container ma">
				{connectedUser.map((user, index) => {
					return (
						<div key={index}>
							<ChatUserProfiles
							profile={user}
							setActiveChat={setActiveChat}
							activeChat={activeChat}
							setComponentIsLoading={setComponentIsLoading}
							/>
						</div>
					)
				})}
			</div>
			<div className="chat_messages_container ma">
				<ChatMessage
				user={user}
				activeChat={activeChat}
				connectedUserFiltered={connectedUser.filter(filterActiveChat)}
				setConnectedUser={setConnectedUser}
				componentIsLoading={componentIsLoading}
				sendMessage={sendMessage}
				messages={messages}
				/>
			</div>
		</main>
	);
}
