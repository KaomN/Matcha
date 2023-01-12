import { useState, useEffect } from "react";
import { LoadingSpinnerComponent } from "../../components/LoadingSpinnerComponent";


export default function ChatMessage(props) {
	const [connectedUserId, setConnectedUserId] = useState("");

	useEffect(() => {
		if(props.connectedUserFiltered.length > 0) {
			setConnectedUserId(props.connectedUserFiltered[0].userid)
		}
	}, [props.connectedUserFiltered])


	function handleSendMessage(event) {
		if(event.key === "Enter") {
			if(event.target.value.trim() !== "") {
				props.sendMessage({ message: event.target.value, channel: props.activeChat.channel, userid: connectedUserId });
				event.target.value = ""
			}
		}
	};

	if(props.componentIsLoading) {
		return (<LoadingSpinnerComponent
			class="chat_loading_component"
			size={50}
			/>)
	}
	return (<>
				{props.activeChat !== "" ?
				<>
					<div className="chat_message_output_container">
						{props.messages.slice(0).reverse().map((message, index) => {
							if(message.userid === props.connectedUserFiltered[0].userid) {
								return (
									<div key={index} className="chat_message_container_left">
										<img className="chat_message_left_profileimage" src={props.connectedUserFiltered[0].profilePic} alt="profile"></img>
										<div className="chat_message_left_align">

											{message.message}
										</div>
									</div>
								)
							} else {
								return (
									<div key={index} className="chat_message_container_right">
										
										<div className="chat_message_right_align">
											{message.message}
										</div>
										<img className="chat_message_right_profileimage" src={props.user.imageSrc} alt="profile"></img>
									</div>
								)
							}
						})}
						{props.connectedUserFiltered.map(connectedUser => {
							return (connectedUser.messages.map((message, index) => {
								if(message.userid === connectedUser.userid) {
									return (
										<div key={index} className="chat_message_container_left">
											<img className="chat_message_left_profileimage" src={connectedUser.profilePic} alt="profile"></img>
											<div className="chat_message_left_align">

												{message.message}
											</div>
										</div>
									)
								} else {
									return (
										<div key={index} className="chat_message_container_right">
											
											<div className="chat_message_right_align">
												{message.message}
											</div>
											<img className="chat_message_right_profileimage" src={props.user.imageSrc} alt="profile"></img>
										</div>
									)
								}
							}))
						})}
					</div>
					<div className="chat_message_input_container">
						<input className="chat_input" type="text" placeholder="Type a message" onKeyDown={handleSendMessage}></input>
					</div>
				</>
				: null}
			</>
	);
}
