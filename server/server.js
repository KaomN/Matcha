const express = require("express");
const session = require('express-session')
const bodyParser = require('body-parser');
const app = express();
const Database = require("./createDatabase");
Database.createDatabase();
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;
sessionStore = new session.MemoryStore();
app.use(session({
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));



// For parsing application/json header
app.use(bodyParser.json()); 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// for parsing multipart/form-data
// app.use(express.static('public'));
//app.use(upload.array()); 
app.get('/verification', (req, res) => {
	console.log("test")
});

// UserModule
const userModule = require('./modules/UserModule');
app.use('/request', userModule);
app.use('/request', userModule);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});