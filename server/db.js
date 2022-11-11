const mysql = require('mysql2');
// Environment Variables
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
	database: 'matcha',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

module.exports.con = con;
module.exports.pool = pool;