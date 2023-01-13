import io from 'socket.io-client';
import React from "react";

export var socket = io('http://localhost:3000',{
	//transports: ['websocket', 'polling'],
	//transports: ['websocket'],
	transports: ['polling'],
	withCredentials: true,
});

export const SocketContext = React.createContext();