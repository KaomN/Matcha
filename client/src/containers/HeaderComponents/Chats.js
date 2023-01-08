//import { useState } from "react";

export default function Chats(props) {

	return (
		<>
			<div ref={props.refChat} title="Chat">
				<i className="material-icons header-material-icons" onClick={ () => props.isChatVisible ? props.setIsChatVisible(false) : props.setIsChatVisible(true) }>chat</i>
				{!props.isChatVisible ? null : 
				<div className="header-profile-dropdown header-zindex">
					<div className="header-profile-dropdown-profile-container">
						Show connected persons
					</div>
				</div>
				}
			</div>
		</>
	);
}