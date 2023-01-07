const session = require('express-session')
const express = require('express');
const bodyParser = require('body-parser');
const Database = require("./createDatabase");
const fileUpload = require('express-fileupload');
const cors = require('cors')
Database.createDatabase();
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;
const {sessionMiddleware} = require('./modules/SessionMiddleware')
const { Server } = require('socket.io')
const app = express();
const { updateLastActive, getUserToken } = require('./modules/HelperModules')

// Session middleware
app.use(sessionMiddleware);
//app.use(express.static('public'));
const httpServer = app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// Have Socket Io use the sessionMiddleware
io.use(wrap(sessionMiddleware));

const userStatus = [];

function updateUserStatus(userId, socketId) {
	const index = userStatus.findIndex((user) => user.userId === userId)
	if (index !== -1) {
		//console.log("-----userStatus array-----")
		userStatus[index] = {
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now()),
		};
	} else {
		//console.log("-----userStatus array-----")
		userStatus.push({
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now()),
		});
	}
	//console.log(userStatus)
}

function deleteUser(userId) {
	const index = userStatus.findIndex((user) => user.userId === userId)
	if (index !== -1) {
		userStatus.splice(index, 1);
	}
}

function queryOnlineUsers(userId) {
	// Max time inactive 10 minutes
	const maxTimeInactive = 600000;
	const index = userStatus.findIndex((user) => user.userId === userId);
	if (index > -1) {
		// Check if user is still active
		if (Date.now() - userStatus[index].lastActive < maxTimeInactive) return true;
		userStatus.splice(index, 1);
	}
	return false;
};

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
		//console.log("joining", socket.request.session.token)
		socket.join(socket.request.session.token);
		socket.to(socket.request.session.token).emit('online_response', {
			onlineStatus: true
		});
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
			console.log(data)
			//socket.to("channel").emit('receive_message', data);
			socket.to(data.channel).emit("receive_message", {
				message: data.message
			});
			// socket.broadcast.emit("receive_message", {
			// 	message: data.message
			// });
		});
		// Join profile room to listen for updates
		socket.on("join_profile_room", async function (data) {
			socket.join(await getUserToken(data.room));
			updateUserStatus(socket.request.session.userid, socket.id)
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: true
			});
		});
		// Update last active
		socket.on("update_last_active", () => {
			updateUserStatus(socket.request.session.userid, socket.id)
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: true
			});
		});
		// Check if user is online
		socket.on('online_query', function (data) {
			//console.log("running online_query")
			const onlineStatus = queryOnlineUsers(data.queryId);
			socket.emit('online_response', {
				onlineStatus: onlineStatus
			});
			updateUserStatus(socket.request.session.userid, socket.id);
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: true
			});
		});
		// Logout user
		socket.on('logout', async function (data) {
			// Update last active
			await updateLastActive(socket.request.session.userid)
			// Delete user from userStatus array
			deleteUser(socket.request.session.userid)
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: false
			});
		});

	} catch (err) {
		//console.log(err)
	}
});

app.use('/images', express.static(__dirname + '/uploads'));

if (!fs.existsSync(__dirname + "/uploads")){
	fs.mkdirSync(__dirname + "/uploads");
}
// For parsing application/json header
app.use(bodyParser.json());
// For file uploads
app.use(fileUpload());
app.use(cors({origin: "http://127.0.0.1:3001", credentials:true}));
app.use(cors());
// UserController
app.use('/request', require('./controllers/UserController'));
// ChatController
app.use('/chat', require('./controllers/ChatController'));
// ProfileController
app.use('/profile', require('./controllers/ProfileController'));
// HomeController
app.use('/home', require('./controllers/HomeController'));

// server.listen(PORT, () => {
// 	console.log(`Server listening on ${PORT}`);
// });