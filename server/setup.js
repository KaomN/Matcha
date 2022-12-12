const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

const emailTransporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.APP_EMAIL,
		pass: process.env.APP_PASSWORD,
	}
});

module.exports = {
	con,
	pool,
	emailTransporter,
}