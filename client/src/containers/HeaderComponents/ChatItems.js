import { useNavigate } from "react-router-dom";

export default function ChatItems(props) {
	const navigate = useNavigate();

	function handleChat() {
		props.setActiveChat({userid: props.user.userid, channel: props.user.room})
		navigate(`/chat`)
		props.setIsChatVisible(false)
	}

	function handleProfile() {
		navigate(`/profile/${props.user.userid}`)
		props.setIsChatVisible(false)
	}



	return (
			<>
				<div className="header_chat_user" onClick={handleProfile} title={props.user.username + " profile"}>
					<img src={props.user.profilePic} alt="Profile" className="chat_dropdown_user_profile_image" />
					<div className="chat_dropdown_username unselectable">
						@{props.user.username}
					</div>
				</div>
				<div className="header_chat_button">
					<i className="material-icons header-material-icons" onClick={handleChat}>comment</i>
				</div>
			</>
	)
}
