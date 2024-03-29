import { useEffect, useState, useContext } from "react";
import { SocketContext } from '../../context/SocketContext';

export default function ChatUserProfiles(props) {
	const [unreadMessage, setUnreadMessage] = useState(false);
	const socket = useContext(SocketContext);

	useEffect(() => {
		socket.on("receive_message_chat_notification", async (data) => {
			if (data.channel === props.profile.room && props.activeChat.channel !== props.profile.room) {
				setUnreadMessage(true);
			}
			if (data.channel === props.profile.room && props.activeChat.channel === props.profile.room) {
				await fetch(`http://localhost:3001/chat/markread`,{
					credentials: "include",
					method: "PUT",
					headers: {"Content-Type": "application/json",},
					body: JSON.stringify({channel: props.profile.room})
				})
			}
		});
		return () => {socket.off("receive_message_chat_notification");};
	}, [props.profile.room, props.activeChat.channel, socket]);

	useEffect(() => {
		var unread = false;
		props.profile.messages.forEach((message) => {
			if ( message.isread === 0 && message.userid === props.profile.userid) {
				unread = true;
			}
		})
		setUnreadMessage(unread);
	}, [props.profile.messages, props.activeChat, props.profile.userid]);

	async function handleOnclick() {
		props.setComponentIsLoading(true)
		await fetch(`http://localhost:3001/chat/markread`,{
			credentials: "include",
			method: "PUT",
			headers: {"Content-Type": "application/json",},
			body: JSON.stringify({channel: props.profile.room})
		})
		setUnreadMessage(false);
		props.setActiveChat({userid: props.profile.userid, channel: props.profile.room})
	}

	return (
		<div className="chat_user_profile_container" onClick={handleOnclick}>
			<img className="chat_user_profile_image" src={props.profile.profilePic} alt={"profileImage"}></img>
			<div>@{props.profile.username}</div>
			{unreadMessage && <i className="material-icons chat_unread_message" title="Unread message">mark_unread_chat_alt</i>}
		</div>
	);
}