const express = require("express");
const session = require('express-session')
const bodyParser = require('body-parser');
const Database = require("./createDatabase");
const fileUpload = require('express-fileupload');
const cors = require('cors')
Database.createDatabase();
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

app.use(session({
	name: "sessionId",
	secret: process.env.SESSION_SECRET,
	store: new MySQLStore({}, require("./setup").pool),
	resave: false,
	saveUninitialized: true,
	clearExpired: true,
	checkExpirationInterval: 900000, // Clears expired sessions every 15minutes
	expiration: 604800000 , // Set session expiration 1 week
	cookie: {
		maxAge: 604800000  // Session cookie persists for 1 week.
	}
}));

if (!fs.existsSync(__dirname + "/uploads")){
	fs.mkdirSync(__dirname + "/uploads");
}

// Save Socket users in array;
const userStatus = [];

function updateUserStatus(userId, socketId) {
	const index = userStatus.findIndex((user) => user.userId === userId)
	if (index !== -1) {
		console.log("-----userStatus array-----")
		userStatus[index] = {
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now() / 1000),
		};
	} else {
		console.log("-----userStatus array-----")
		userStatus.push({
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now() / 1000),
		});
	}
	console.log(userStatus)
}

io.use((socket , next) => {
	//console.log(socket.handshake.auth)
	const userId = socket.handshake.auth.user.userid
	const socketId = socket.id
	updateUserStatus(userId, socketId)
	next()
});

io.on('connection', (socket) => {
	socket.on('new-connection', (data) => {
		//console.log(data.user.username, data.user.userid)
		//console.log(userStatus)
	})

	socket.on('disconnect', () => {
		//console.log('user disconnected', socket.id)
	})
});

// io.on('disconnect', (socket) => {
// 	console.log('a user disconnected');
// });

// For parsing application/json header
app.use(bodyParser.json());
// For file uploads
app.use(fileUpload());
app.use(cors({origin: "http://127.0.0.1:3001", credentials:true}));

// UserModule
//const userModule = require('./controllers/UserController');
app.use('/request', require('./controllers/UserController'));
app.use('/chat', require('./controllers/ChatController'));

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});