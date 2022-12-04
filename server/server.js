const express = require("express");
const session = require('express-session')
const bodyParser = require('body-parser');
const Database = require("./createDatabase");
const fileUpload = require('express-fileupload');
const cors = require('cors')
const cookieParser = require('cookie-parser')
Database.createDatabase();
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;

const MySQLStore = require('express-mysql-session')(session);
const connection = require("./setup").pool;
const sessionStore = new MySQLStore({}, connection);
const app = express();
app.use(session({
	name: "sessionId",
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 86400000 // Session cookie persists for a day.
	}
}));

if (!fs.existsSync(__dirname + "/uploads")){
	fs.mkdirSync(__dirname + "/uploads");
}


// For parsing application/json header
app.use(bodyParser.json());
// for file uploads
app.use(fileUpload());
app.use(cors({origin: "http://127.0.0.1:3001", credentials:true}));
app.use(cookieParser());

// UserModule
const userModule = require('./modules/UserModule');
app.use('/request', userModule);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});