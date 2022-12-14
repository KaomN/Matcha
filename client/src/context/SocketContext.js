import io from 'socket.io-client';
import React from "react";

export const socket = io({
	transports: ["polling"],
});
export const SocketContext = React.createContext();