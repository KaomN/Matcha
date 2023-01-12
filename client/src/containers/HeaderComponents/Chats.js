import { useContext, useEffect, useState } from "react";
import { ActiveChatContext } from '../../context/ActiveChatContext';
import { LoadingSpinnerComponent } from "../../components/LoadingSpinnerComponent";
import ChatItems from "./ChatItems";
import toast from 'react-simple-toasts';


export default function Chats(props) {
	const { activeChat, setActiveChat } = useContext(ActiveChatContext);
	const [connectedUsers, setConnectedUser] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async function() {
			setIsLoading(true)
			const response = await fetch(`/chat/chat/`)
			const data = await response.json()
			if(data.status) {
				setConnectedUser(data.connectedUsers)
			} else {
				toast("Something went wrong!", { position: 'top-center', duration: 5000 })
			}
			setIsLoading(false)
		})();
	}, [props.isChatVisible]);

	return (
		<>
			<div ref={props.refChat} title="Chat dropdown">
				<i className="material-icons header-material-icons" onClick={ () => props.isChatVisible ? props.setIsChatVisible(false) : props.setIsChatVisible(true) }>chat</i>
				{!props.isChatVisible ? null : 
				<div className="header-profile-dropdown header-zindex">
					{isLoading ?
					<LoadingSpinnerComponent
					size={50}
					class="chat_loading_component"
					/>
					:
					<>
					{connectedUsers.length > 0 ?
						<>
						{connectedUsers.map((user, index) => (
							<div className="header_chat_user_container" key={index}>
								<ChatItems
								user={user}
								setActiveChat={setActiveChat}
								activeChat={activeChat}
								setIsChatVisible={props.setIsChatVisible}
								/>
							</div>
							
						))}
					</>
					:
					<div className="header-profile-dropdown-profile-container">
						No connected people
					</div>
					}
					</>
					}
				</div>
				}
			</div>
		</>
	);
}