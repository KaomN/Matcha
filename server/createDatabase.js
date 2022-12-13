async function createDatabase() {
	const con = await require("./setup").con;
	try {
		await Promise.all([
			con.query("CREATE DATABASE IF NOT EXISTS matcha"),
			con.changeUser({database: "matcha"}),
			con.query("CREATE TABLE IF NOT EXISTS users (pk_userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) BINARY NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, surname VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, verified BOOLEAN NOT NULL DEFAULT FALSE, token varchar(70) DEFAULT NULL, gender VARCHAR(10) DEFAULT NULL, age INT DEFAULT NULL, dateofbirth VARCHAR(20), genderpreference VARCHAR(20) DEFAULT NULL, biography TEXT DEFAULT NULL, latitude DECIMAL(10, 7), longitude DECIMAL(10, 7), rating INT DEFAULT 0, profile BOOLEAN NOT NULL DEFAULT FALSE)"),
			con.query("CREATE TABLE IF NOT EXISTS images (imageid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT, profilepic INT DEFAULT 0, imagename VARCHAR(50))"),
			con.query("CREATE TABLE IF NOT EXISTS tagitem (fk_userid INT NOT NULL, fk_tagid INT NOT NULL)"),
			con.query("CREATE TABLE IF NOT EXISTS tag (pk_tagid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, tag VARCHAR(25))"),
			con.query("CREATE TABLE IF NOT EXISTS usertokens (pk_userid INT NOT NULL PRIMARY KEY, passwordresettoken VARCHAR(70) DEFAULT NULL, passwordresetexpr BIGINT DEFAULT NULL, emailchangetoken VARCHAR(70) DEFAULT NULL, emailexpr BIGINT DEFAULT NULL, emailpin VARCHAR(10) DEFAULT NULL, emailrequest VARCHAR(100) DEFAULT NULL)"),
			con.query("CREATE TABLE IF NOT EXISTS connect (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL)"),
			con.query("CREATE TABLE IF NOT EXISTS connected (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, userid1 INT NOT NULL, userid2 INT NOT NULL)"),
			con.query("CREATE TABLE IF NOT EXISTS messages (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, messagedate DATETIME DEFAULT CURRENT_TIMESTAMP, fk_connected INT NOT NULL, userid INT NOT NULL, message TEXT NOT NULL)"),
			con.query("ALTER TABLE images ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
			con.query("ALTER TABLE tagitem ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
			con.query("ALTER TABLE tagitem ADD FOREIGN KEY (fk_tagid) REFERENCES tag (pk_tagid) ON DELETE CASCADE"),
			con.query("ALTER TABLE messages ADD FOREIGN KEY (fk_connected) REFERENCES connected (pk_id) ON DELETE CASCADE"),
			con.query("ALTER TABLE connect ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE")
		])
		await con.end();
	} catch (err) {
		console.log(err)
	}
}

module.exports = { createDatabase };