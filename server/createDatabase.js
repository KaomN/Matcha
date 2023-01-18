async function createDatabase() {
	const con = await require("./setup").con;
	try {
		const result = await con.query("CREATE DATABASE IF NOT EXISTS matcha")
		if(result[0].warningStatus === 0) {
			await Promise.all([
				con.changeUser({database: "matcha"}),
				con.query("CREATE TABLE IF NOT EXISTS users (pk_userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) BINARY NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, surname VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, verified BOOLEAN NOT NULL DEFAULT FALSE, token varchar(73) DEFAULT NULL, gender VARCHAR(10) DEFAULT NULL, age INT DEFAULT NULL, dateofbirth VARCHAR(20), genderpreference VARCHAR(20) DEFAULT NULL, biography TEXT DEFAULT NULL, latitude DECIMAL(18, 15), longitude DECIMAL(18, 15), rating INT DEFAULT 0, profile BOOLEAN NOT NULL DEFAULT FALSE, lastactive DATETIME DEFAULT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS images (imageid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT, profilepic INT DEFAULT 0, imagename VARCHAR(50))"),
				con.query("CREATE TABLE IF NOT EXISTS tagitem (fk_userid INT NOT NULL, fk_tagid INT NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS tag (pk_tagid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, tag VARCHAR(25))"),
				con.query("CREATE TABLE IF NOT EXISTS history (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP)"),
				con.query("CREATE TABLE IF NOT EXISTS usertokens (pk_userid INT NOT NULL PRIMARY KEY, passwordresettoken VARCHAR(150) DEFAULT NULL, passwordresetexpr BIGINT DEFAULT NULL, emailchangetoken VARCHAR(150) DEFAULT NULL, emailexpr BIGINT DEFAULT NULL, emailpin VARCHAR(10) DEFAULT NULL, emailrequest VARCHAR(100) DEFAULT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS connect (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS connected (pk_id VARCHAR(73) NOT NULL PRIMARY KEY, userid1 INT NOT NULL, userid2 INT NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS blocked (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS report (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS notifications (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL, notification VARCHAR(255) NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP, isread BOOLEAN NOT NULL DEFAULT FALSE, type INT NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS messages (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, messagedate DATETIME DEFAULT CURRENT_TIMESTAMP, fk_connected VARCHAR(73) NOT NULL, userid INT NOT NULL, message TEXT NOT NULL, isread BOOLEAN NOT NULL DEFAULT FALSE)"),
				con.query("CREATE TABLE IF NOT EXISTS rating (fk_userid INT NOT NULL, fk_fromuserid INT NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP, type VARCHAR(10) NOT NULL)"),
				con.query("CREATE TABLE IF NOT EXISTS watchedbyhistory (pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, fk_userid INT NOT NULL, targetuserid INT NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP)"),
				con.query("ALTER TABLE images ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE tagitem ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE tagitem ADD FOREIGN KEY (fk_tagid) REFERENCES tag (pk_tagid) ON DELETE CASCADE"),
				con.query("ALTER TABLE messages ADD FOREIGN KEY (fk_connected) REFERENCES connected (pk_id) ON DELETE CASCADE"),
				con.query("ALTER TABLE messages ADD FOREIGN KEY (userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE connect ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE connect ADD FOREIGN KEY (targetuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE blocked ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE blocked ADD FOREIGN KEY (targetuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE report ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE report ADD FOREIGN KEY (targetuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE usertokens ADD FOREIGN KEY (pk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE connected ADD FOREIGN KEY (userid1) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE connected ADD FOREIGN KEY (userid2) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE history ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE history ADD FOREIGN KEY (targetuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE notifications ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE notifications ADD FOREIGN KEY (targetuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE rating ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE rating ADD FOREIGN KEY (fk_fromuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE watchedbyhistory ADD FOREIGN KEY (fk_userid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
				con.query("ALTER TABLE watchedbyhistory ADD FOREIGN KEY (targetuserid) REFERENCES users (pk_userid) ON DELETE CASCADE"),
			])
			await con.end();
			return true
		}
		return false
	} catch (err) {
	}
}

async function insertTags(con) {
	await con.execute("INSERT INTO tag (tag) VALUES ('Movies'), ('Cars'), ('Music'), ('Traveling'), ('Sports'), ('Art'), ('Fashion'), ('Technology'), ('Books'), ('Animals'), ('Nature'), ('Cooking'), ('Dancing'), ('Gaming'), ('Gardening'), ('Hiking'), ('Hunting'), ('Meditation'), ('Photography'), ('Reading'), ('Singing'), ('Skiing'), ('Writing'), ('Yoga'), ('Camping'), ('Fishing'), ('Horseback-Riding'), ('Painting'), ('Sailing'), ('Surfing'), ('Tennis'), ('Volleyball'), ('Walking'), ('Wine-Tasting'), ('Working-Out'), ('Baking'), ('Biking'), ('Boating'), ('Climbing'), ('Golfing'), ('Motorcycling'), ('Rock-Climbing'), ('Running'), ('Scuba-Diving'), ('Shopping'), ('Snowboarding')")
}

module.exports = { createDatabase, insertTags };