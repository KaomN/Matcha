const mysql = require('mysql2/promise');
// Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});

module.exports = con;