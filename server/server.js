const express = require("express");
const session = require('express-session')
const bodyParser = require('body-parser');
const app = express();
const Database = require("./createDatabase");
const fileUpload = require('express-fileupload');
var fs = require('fs');
Database.createDatabase();
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;
//sessionStore = new session.MemoryStore();
var MySQLStore = require('express-mysql-session')(session);
const connection = require("./setup").pool;
var sessionStore = new MySQLStore({}, connection);
app.use(session({
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

if (!fs.existsSync(__dirname + "/uploads")){
	fs.mkdirSync(__dirname + "/uploads");
}


// For parsing application/json header
app.use(bodyParser.json());
// for file uploads
app.use(fileUpload());

app.get('/verification', (req, res) => {
	console.log("test")
});

// UserModule
const userModule = require('./modules/UserModule');
app.use('/request', userModule);

app.post('/upload', function(req, res) {
	console.log(req.files)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});