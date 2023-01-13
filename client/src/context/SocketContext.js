import io from 'socket.io-client';
import React from "react";

export const socket = io('http://localhost:3000',{
	//transports: ['websocket', 'polling'],
	//transports: ['websocket'],
	autoConnect: false,
	reconnection: true,
	transports: ['polling'],
	withCredentials: true,
});

export const SocketContext = React.createContext();