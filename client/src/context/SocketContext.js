import io from 'socket.io-client';
import React from "react";

export var socket

try {
	socket = io('http://localhost:3000',{
		//transports: ['websocket', 'polling'],
		//transports: ['websocket'],
		transports: ['polling'],
		});
} catch (error) {
	//console.log(error)
}


export const SocketContext = React.createContext();