


function createDatabase() {
	const con = require("./db").con;
	con.query("CREATE DATABASE IF NOT EXISTS matcha");
	con.changeUser({database: "matcha"});
	con.query("CREATE TABLE IF NOT EXISTS users (pk_userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) BINARY NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, surname VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, gender VARCHAR(10) DEFAULT NULL, age INT DEFAULT NULL, genderpreference VARCHAR(20) DEFAULT NULL, biography TEXT DEFAULT NULL, rating INT DEFAULT 0)");
	con.query("CREATE TABLE IF NOT EXISTS images (imageid INT NOT NULL PRIMARY KEY, profilepic INT NOT NULL, fk_userid INT)");
	con.query("CREATE TABLE IF NOT EXISTS tagitem (fk_userid INT NOT NULL, fk_tagid INT NOT NULL)");
	con.query("CREATE TABLE IF NOT EXISTS tag (pk_tagid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, tag VARCHAR(25))");
	con.query("ALTER TABLE images ADD FOREIGN KEY(fk_userid) REFERENCES users(pk_userid) ON DELETE CASCADE");
	con.query("ALTER TABLE tagitem ADD FOREIGN KEY(fk_userid) REFERENCES users(pk_userid) ON DELETE CASCADE");
	con.query("ALTER TABLE tagitem ADD FOREIGN KEY(fk_tagid) REFERENCES tag(pk_tagid) ON DELETE CASCADE");
	con.end();
}

module.exports = { createDatabase };