const express = require('express');
const bodyParser = require('body-parser');
const { createDatabase, insertTags }= require("./createDatabase");
const fileUpload = require('express-fileupload');
const cors = require('cors')
const con = require("./setup").pool;
(async function() { 
	if(await createDatabase())
		await insertTags(con);
})();
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;
const {sessionMiddleware} = require('./modules/SessionMiddleware')
const { Server } = require('socket.io')
const app = express();
const { updateLastActive, getUserToken, saveNotification, checkConnectRequest, saveMessage, amIBlocked, deleteConnections } = require('./modules/HelperModules')
var CronJob = require('cron').CronJob;

// Cron job to delete ratings older than 7 days
const job = new CronJob('00 00 00 * * *', async function() {
	try {
		await con.execute("DELETE FROM rating WHERE date < NOW() - INTERVAL 7 DAY");
	} catch (err) {

	}
});
job.start();

app.use('/images', express.static(__dirname + '/uploads'));

if (!fs.existsSync(__dirname + "/uploads")){
	fs.mkdirSync(__dirname + "/uploads");
}
// For parsing application/json header
app.use(bodyParser.json());
// For file uploads
app.use(fileUpload()); 
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
	methods: "GET,PUT,POST,DELETE",
}));

// Session middleware
app.use(sessionMiddleware);

const httpServer = app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true
	}
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// Have SocketIo use sessionMiddleware
io.use(wrap(sessionMiddleware));

// For connected users
const userStatus = [];

function updateUserStatus(userId, socketId, path) {
	const index = userStatus.findIndex((user) => user.userId === userId)
	if (index !== -1) {
		userStatus[index] = {
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now()),
			path: path
		};
	} else {
		userStatus.push({
			userId: userId,
			socketId: socketId,
			lastActive: parseInt(Date.now()),
			path: path
		});
	}
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

function getUser(userId) {
	const index = userStatus.findIndex((user) => user.userId === userId);
	if (index > -1) {
		return userStatus[index];
	}
	return null;
}

io.use((socket, next) => {
	const session = socket.request.session;
	if (session && session.authenticated) {
		updateUserStatus(session.userid, socket.id)
		next();
	} else {
		next(new Error("Not authenticated"));
	}
});

io.on('connection', (socket) => {
	try {
		//updateUserStatus(session.userid, socket.id)
		socket.on("message", async function (data) {
			const user = getUser(data.userid);
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
			await saveMessage(data.message, socket.request.session.userid, data.channel);
			if(user) {
				if(user.path === "/chat" || user.path === "/chat/" ) {
					socket.to(user.socketId).emit("receive_message", {
						message: data.message,
						messagedate: new Date().toISOString().slice(0, 19).replace('T', ' '),
						userid: socket.request.session.userid,
						sentto: data.userid,
						channel: data.channel,
					});
				} else {
					socket.to(user.socketId).emit("receive_message_notitifaction", {
						pk_id: await saveNotification(data.userid, socket.request.session.userid, `${data.username} has sent you a message!`, 3),
						fk_userid: data.userid,
						targetuserid: socket.request.session.userid,
						notification: `${socket.request.session.username} has sent you a message!`,
						type: "message",
						isread: 0,
					});
				}
			} else {
				await saveNotification(data.userid, socket.request.session.userid, `${data.username} has sent you a message!`, 3)
			}
			socket.emit("receive_message", {
				message: data.message,
				messagedate: new Date().toISOString().slice(0, 19).replace('T', ' '),
				userid: socket.request.session.userid,
				sentto: data.userid,
				channel: data.channel,
			});
		});
		// For chat notifications
		socket.on("message_chat_notification", async function (data) {
			const user = getUser(data.sendto);
			if(user) {
				socket.to(user.socketId).emit("receive_message_chat_notification", {
					channel: data.channel,
					isread: false,
				});
			} else {
				await saveNotification(data.sendto, socket.request.session.userid, `${data.username} has sent you a message!`, 3)
			}
		});
		/* Updating connection requests */
		socket.on("send_connect_request", async function (data) {
			const user = getUser(data.userid);
			if(user) {
				socket.to(user.socketId).emit("receive_connect_request", {
					connectRequest: true,
					usersUserId: user.userId,
					myUserID: socket.request.session.userid
				});
			}
			updateUserStatus(socket.request.session.userid, socket.id, data.path)

		});
		// Updating disconnect requests
		socket.on("send_disconnect_request", async function (data) {
			const user = getUser(data.userid);
			if(user) {
				socket.to(user.socketId).emit("receive_disconnect_request", {
					connectRequest: false,
					connected: false,
					usersUserId: user.userId,
					myUserID: socket.request.session.userid
				});
			}
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
			socket.emit("receive_connected_request", {
				connected: false
			});
		});
		// Uppdating connected requests
		socket.on("send_connected", async function (data) {
			const user = getUser(data.userid);
			const status = await checkConnectRequest(data.userid, socket.request.session.userid)
			if (user) {
				socket.to(user.socketId).emit("receive_connected_request", {
					connected: status,
					usersUserId: user.userId,
					myUserID: socket.request.session.userid
				});
			}
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
		});
		// Updating blocked requests
		socket.on("send_blocked", async function (data) {
			const user = getUser(data.userid);
			if (user) {
				socket.to(user.socketId).emit("receive_blocked_request", {
					amiblocked: true,
					usersUserId: user.userId,
					myUserID: socket.request.session.userid
				});
				if(data.wasConnected) {
					socket.to(user.socketId).emit("receive_notification", {
						pk_id: await saveNotification(data.userid, socket.request.session.userid, `${data.username} has disconnected with you!`, 5),
						fk_userid: data.userid,
						targetuserid: socket.request.session.userid,
						notification: `${data.username} has disconnected from you!`,
						isread: 0,
					});
				}
			} else {
				await saveNotification(data.userid, socket.request.session.userid, `${data.username} has disconnected with you!`, 5)
			}
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
		});
		// Updating blocked requests
		socket.on("send_unblocked", async function (data) {
			const user = getUser(data.userid);
			if (user) {
				socket.to(user.socketId).emit("receive_unblocked_request", {
					amiblocked: false,
					usersUserId: user.userId,
					myUserID: socket.request.session.userid
				});
			}
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
		});
		// Updating report request
		socket.on("send_report", async function (data) {
			const user = getUser(data.userid);
			if (user) {
				socket.to(user.socketId).emit("receive_report_request", {
					usersUserId: user.userid,
					myUserID: socket.request.session.userid
				});
				
			}
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
		});
		socket.on("gender_preference_change", async function (data) {
			await deleteConnections(socket.request.session.userid, socket, getUser, data)
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
		});
		// Notification
		socket.on("send_notification", async function (data) {
			// emit notification to user if online
			// notification types:
			// 1. connect
			// 2. profile
			// 3. message
			// 4. connected
			// 5. disconnect
			const user = getUser(data.userid);
			if (data.type === "connect") {
				const type = await checkConnectRequest(data.userid, socket.request.session.userid)
				if(user) {
					if(type) {
						socket.to(user.socketId).emit("receive_notification", {
							pk_id: await saveNotification(data.userid, socket.request.session.userid, `${data.usernameUser} has connected with you!`, 4),
							fk_userid: data.userid,
							targetuserid: socket.request.session.userid,
							notification: `${data.usernameUser} has connected with you!`,
							isread: 0,
						});
					} else {
						socket.to(user.socketId).emit("receive_notification", {
							pk_id: await saveNotification(data.userid, socket.request.session.userid, `${data.usernameUser} has sent you a connection request!`, 1),
							fk_userid: data.userid,
							targetuserid: socket.request.session.userid,
							notification: `${data.usernameUser} has sent you a connection request!`,
							isread: 0,
						});
					}
				} else {
					if(type) {
						await saveNotification(data.userid, socket.request.session.userid, `${data.username} has connected with you!`, 4)
					} else {
						await saveNotification(data.userid, socket.request.session.userid, `${data.username} has sent you a connection request!`, 1)
					}
				}
			} else if (data.type === "profile") {
				if(user) {
					if(data.userid !== socket.request.session.userid && await amIBlocked(data.userid, socket.request.session.userid) === false) {
						socket.to(user.socketId).emit("receive_notification", {
							pk_id: await saveNotification(data.userid, socket.request.session.userid, `${data.usernameUser} checked your profile!`, 2),
							fk_userid: data.userid,
							targetuserid: socket.request.session.userid,
							notification: `${data.usernameUser} checked your profile!`,
							isread: 0,
						});
					}
				} else {
					await saveNotification(data.userid, socket.request.session.userid, `${data.username} checked your profile!`, 2)
				}
			} else if (data.type === "disconnect") {
				if(user) {
					socket.to(user.socketId).emit("receive_notification", {
						pk_id: await saveNotification(data.userid, socket.request.session.userid, `${data.usernameUser} has disconnected with you!`, 5),
						fk_userid: data.userid,
						targetuserid: socket.request.session.userid,
						notification: `${data.usernameUser} has disconnected from you!`,
						isread: 0,
					});
				} else {
					await saveNotification(data.userid, socket.request.session.userid, `${data.username} has disconnected with you!`, 5)
				}
			}

		});
		// Join profile room to listen for updates
		socket.on("join_profile_room", async function (data) {
			socket.join(await getUserToken(data.userid));
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: true
			});
		});
		// Update last active
		socket.on("update_last_active", (data) => {
			updateUserStatus(socket.request.session.userid, socket.id, data.path)
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: true
			});
		});
		// Check if user is online
		socket.on('online_query', function (data) {
			const onlineStatus = queryOnlineUsers(data.queryId);
			socket.emit('online_response', {
				onlineStatus: onlineStatus
			});
			updateUserStatus(socket.request.session.userid, socket.id, data.path);
			socket.to(socket.request.session.token).emit('online_response', {
				onlineStatus: true
			});
		});
		// Logout user
		socket.on('logout', async function () {
			// Update last active
			await updateLastActive(socket.request.session.userid)
			// Delete user from userStatus array
			deleteUser(socket.request.session.userid)
			let currTime = new Date()
			let modifiedTime = new Date(currTime.getTime() - currTime.getTimezoneOffset() * 60000)
			socket.to(socket.request.session.token).emit('repsonse_logout', {
				onlineStatus: false,
				lastActive: modifiedTime.toISOString()
			});
		});
	} catch (err) {
	}
});
// Middleware for checking if user is authenticated
const isAuthenticated = function (req, res, next) {
	try {
		if(req.session.userid) {
			next()
		} else {
			res.send({status:false, isAuthenticated: false, authMessage: "Not Authenticated!"})
		}
	} catch (err) {
	}
}
// Requests that doe not require authentication
app.use('/request', require('./controllers/PublicController'));
// Middleware for checking if user is authenticated
app.use(isAuthenticated)
// UserController
app.use('/user', require('./controllers/UserController'));
// CompleteProfileController
app.use('/completeprofile', require('./controllers/CompleteProfileController'));
// ChatController
app.use('/chat', require('./controllers/ChatController'));
// ProfileController
app.use('/profile', require('./controllers/ProfileController'));
// HomeController
app.use('/home', require('./controllers/HomeController'));
// SearchController
app.use('/search', require('./controllers/SearchController'));
