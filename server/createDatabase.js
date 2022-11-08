const mysql = require('mysql2/promise');

async function createDatabase(host, user, password) {
	const con =  await mysql.createConnection({
		host: host,
		user: user,
		password: password
	})
	con.execute("CREATE DATABASE IF NOT EXISTS matcha");
	con.changeUser({database: "matcha"});
	var sql = "CREATE TABLE IF NOT EXISTS users (userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) BINARY NOT NULL, password VARCHAR(50) NOT NULL, firstname VARCHAR(50) NOT NULL, surname VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, gender VARCHAR(10) DEFAULT NULL, sexpreference VARCHAR(20) DEFAULT NULL, biography TEXT DEFAULT NULL)";
	con.query(sql);
	sql = "CREATE TABLE IF NOT EXISTS images (imageid INT NOT NULL PRIMARY KEY, profilepic INT NOT NULL)";
	con.query(sql);
	sql = "CREATE TABLE IF NOT EXISTS tagitem (userid INT NOT NULL, tagid INT NOT NULL)";
	con.query(sql);
	sql = "CREATE TABLE IF NOT EXISTS tag (tagid INT NOT NULL, tag VARCHAR(25))";
	con.query(sql);
	con.end()
}

module.exports = { createDatabase };