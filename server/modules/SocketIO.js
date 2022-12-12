const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});
const con = require("../setup").pool;
// const io = new Server(server, {
	
// });


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

io.use((socket, next) => {
	//console.log(socket.handshake.auth)
	const userId = socket.handshake.auth.user.userid
	const socketId = socket.id
	if(!userId) {
		return next(new Error("Unauthorized"));
	}
	updateUserStatus(userId, socketId)
	next()
});

io.on('connection', (socket) => {
	try {
		// Get all connected users and display them.
		socket.on("connected", async (callback) => {
			var [rows, fields] = await con.execute('SELECT * FROM connected WHERE userid1 = ? OR userid2 = ?', [socket.handshake.auth.user.userid, socket.handshake.auth.user.userid])
			console.log(rows)
			callback({
				status: "ok"
			});
		})
	
		// socket.on('disconnect', () => {
		// 	//console.log('user disconnected', socket.id)
		// })
	} catch (err) {
		console.log(err)
	}

});


module.exports = {
	app,
	server
}