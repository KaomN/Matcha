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
const MySQLStore = require('express-mysql-session')(session);
const {app, server} = require('./modules/SocketIO');
const {sessionMiddleware} = require('./modules/SessionMiddleware')

// Session middleware
app.use(sessionMiddleware);
//app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/uploads'));

if (!fs.existsSync(__dirname + "/uploads")){
	fs.mkdirSync(__dirname + "/uploads");
}

// For parsing application/json header
app.use(bodyParser.json());
// For file uploads
app.use(fileUpload());
app.use(cors({origin: "http://127.0.0.1:3001", credentials:true}));

//const userModule = require('./controllers/UserController');
// UserController
app.use('/request', require('./controllers/UserController'));
// ChatController
app.use('/chat', require('./controllers/ChatController'));
// ProfileController
app.use('/profile', require('./controllers/ProfileController'));

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});