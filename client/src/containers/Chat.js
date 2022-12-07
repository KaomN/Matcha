// import { useState, useEffect } from "react";
// import "./styles/Home.css";
// import io from 'socket.io-client';
// const socket = io();


export default function Chat() {
	// const [isConnected, setIsConnected] = useState(socket.connected);
	// const [lastPong, setLastPong] = useState(null);
	// useEffect(() => {
	// 	socket.on('connect', () => {
	// 	  setIsConnected(true);
	// 	});
	
	// 	socket.on('disconnect', () => {
	// 	  setIsConnected(false);
	// 	});
	
	// 	socket.on('pong', () => {
	// 	  setLastPong(new Date().toISOString());
	// 	});
		
	// 	// Cleanup
	// 	return () => {
	// 		socket.off('connect');
	// 		socket.off('disconnect');
	// 		socket.off('pong');
	// 	};
	//   }, []);
	return (
		<main>
			<h3>Chat page. Show connected users on a panel to the left. clicking on the user brings up the Chat page in the middle with history of the chat</h3>
		</main>
	);
	// return (
	// 	<div>
	// 	  <p>Connected: { '' + isConnected }</p>
	// 	  <p>Last pong: { lastPong || '-' }</p>
	// 	  <button >Send ping</button>
	// 	</div>
	//   );
}