import io from 'socket.io-client';
import React , {useEffect} from "react";

export const socket = io('http://localhost:3000',{
//transports: ['websocket', 'polling'],
//transports: ['websocket'],
transports: ['polling'],
});

export const SocketContext = React.createContext();