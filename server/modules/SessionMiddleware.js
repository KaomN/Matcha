const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

const sessionMiddleware = session({
	name: "sessionId",
	secret: process.env.SESSION_SECRET,
	store: new MySQLStore({}, require("../setup").pool),
	resave: false,
	saveUninitialized: false,
	clearExpired: true,
	checkExpirationInterval: 86400000, // Clears expired sessions every day
	expiration: 604800000 , // Set session expiration 1 week
	cookie: {
		maxAge: 604800000 // Session cookie persists for 1 week.
	}
});

module.exports = {
	sessionMiddleware,
}