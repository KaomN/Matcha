const express = require('express');
const app = express();
const server = require('http').createServer(app);
const {sessionMiddleware} = require('./SessionMiddleware')
const con = require("../setup").pool;
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

// Convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// Have Socket Io use the middleware
io.use(wrap(sessionMiddleware));

const userStatus = [];

function updateUserStatus(userId, socketId) {
	const index = userStatus.findIndex((user) => user.userId === userId)
	if (index !== -1) {
		//console.log("-----userStatus array-----")
		userStatus[index] = {
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now() / 1000),
		};
	} else {
		//console.log("-----userStatus array-----")
		userStatus.push({
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now() / 1000),
		});
	}
	//console.log(userStatus)
}

// Only allow authenticated users
io.use((socket, next) => {
	const session = socket.request.session;
	if (session && session.authenticated) {
		updateUserStatus(session.userid, socket.id)
		next();
	} else {
		next(new Error("unauthorized"));
	}
});

io.on('connection', (socket) => {
	try {
		socket.channel = ""
		// Get all connected users and display them.
		socket.on("connected", async (callback) => {
			const session = socket.request.session;
			//var [rows, fields] = await con.execute('SELECT * FROM connected WHERE userid1 = ? OR userid2 = ?', [session.userid, session.userid])
			//console.log(rows)
			callback({
				status: "ok"
			});
		})
		socket.on("joinChannel", function (data) {
			//console.log(data)
			socket.channel = data.channel;
			//console.log(data.channel)
			socket.join(data.channel);
			//console.log("socket.channel")
		});
		socket.on("message", function (data) {
			// emit a "message" event to every other socket
			//console.log(data)
			//socket.to("channel").emit('receive_message', data);
			socket.to(data.channel).emit("receive_message", {
				message: data.message
			});
			// socket.broadcast.emit("receive_message", {
			// 	message: data.message
			// });
		});
	} catch (err) {
		console.log(err)
	}

});


module.exports = {
	app,
	server
}