import { useState, useEffect } from "react";
import io from 'socket.io-client';
import { trackPromise} from 'react-promise-tracker';


export default function Chat() {
	const [user, setUser] = useState("loading");

	useEffect(() => {
		function fetchUserinfo() {
			const promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(fetch('/chat/getlogininfo', {
						credentials: "include",
						method: "GET",
					})
					.then((response) => response.json()));
				}, 500)
			});
			return promise
		}
		(async function() {
			setUser(await trackPromise(fetchUserinfo()))
		})();
	}, []);
	//console.log(user)
// 	const [isConnected, setIsConnected] = useState(socket.connected);
// 	useEffect(() => {
// 		socket.on('connect', () => {
// 			setIsConnected(true);
// 		});
	
// 		socket.on('disconnect', () => {
// 			setIsConnected(false);
// 		});
	
// 		// Cleanup
// 		return () => {
// 			socket.off('connect');
// 			socket.off('disconnect');
// 		};
//  }, []);
	if(user !== "loading") {
		const socket = io({
			auth: {
				user
			}
		});
		//socket.emit('new-connection', {user});
	}
	return (
		<main className="flex-column flex-center">
			<h3>Chat page. Show connected users on a panel to the left. clicking on the user brings up the Chat page in the middle with history of the chat</h3>
			<div className="message-container">
				<div className="user-message-input">
					<span className="user-message-username">kaom</span>
					<input type="text" className="chat-input" id="userMessage" placeholder="Write a comment..." autoComplete="off" />
						</div>
						<div className="messages">
							<div>
								<div className="comments-container">
									<span>kaom</span><div className="message" title="0 seconds ago">asd</div>
								</div>
						</div>
				</div>
			</div>

		</main>
	);
}