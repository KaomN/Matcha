const con = require("../server/setup").pool;
const fs = require('fs');

async function insert() {
	try {
		// Test user1
		var firstname = "John"
		var lastname = "West"
		var username = "John1"
		var email = "email1"
		var password = "password"
		var token = "token"
		var gender = "male"
		var age = 24
		var dateofbirth = "08-09-1998"
		var preference = "male"
		var biography = "Im a test user, area Turku"
		var latitude = 60.4533006
		var longitude = 22.3078571
		var rating = 10
		var profile = 1
		var verified = 1

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John2"
		password = "password"
		token = "token"
		gender = "male"
		age = 25
		dateofbirth = "08-09-1997"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 1

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John3"
		password = "password"
		token = "token"
		gender = "male"
		age = 26
		dateofbirth = "08-09-1996"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 22

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John4"
		password = "password"
		token = "token"
		gender = "male"
		age = 27
		dateofbirth = "08-09-1995"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 43

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John5"
		password = "password"
		token = "token"
		gender = "male"
		age = 28
		dateofbirth = "08-09-1994"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 74

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John6"
		password = "password"
		token = "token"
		gender = "male"
		age = 29
		dateofbirth = "08-09-1993"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 25

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John7"
		password = "password"
		token = "token"
		gender = "male"
		age = 30
		dateofbirth = "08-09-1992"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 66

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John8"
		password = "password"
		token = "token"
		gender = "male"
		age = 31
		dateofbirth = "08-09-1991"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 37

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "John"
		lastname = "West"
		username = "John9"
		password = "password"
		token = "token"
		gender = "male"
		age = 32
		dateofbirth = "08-09-1990"
		preference = "male"
		biography = "Im a test user, area Turku"
		latitude = 60.4533006
		longitude = 22.3078571
		rating = 18

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cooking'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "John" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user2
		firstname = "Kenny"
		lastname = "South"
		username = "Kens1"
		gender = "male"
		age = 50
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1972"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 0

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens2"
		gender = "male"
		age = 51
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1971"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 21

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens3"
		gender = "male"
		age = 52
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1970"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 42

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens4"
		gender = "male"
		age = 53
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1969"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 83

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens5"
		gender = "male"
		age = 54
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1968"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 54

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens6"
		gender = "male"
		age = 55
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1967"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 45

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens7"
		gender = "male"
		age = 56
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1966"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 36

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens8"
		gender = "male"
		age = 57
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1965"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 87

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Kenny"
		lastname = "South"
		username = "Kens9"
		gender = "male"
		age = 58
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1964"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978
		rating = 28

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Hunting'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Kens" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user3
		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob1"
		gender = "male"
		age = 25
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1997"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 10

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob2"
		gender = "male"
		age = 26
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1996"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 21

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob3"
		gender = "male"
		age = 27
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1995"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 23

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob4"
		gender = "male"
		age = 28
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1994"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 34

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob5"
		gender = "male"
		age = 29
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1993"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 24

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob6"
		gender = "male"
		age = 30
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1992"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 55

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob7"
		gender = "male"
		age = 31
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1991"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 66

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob8"
		gender = "male"
		age = 32
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1990"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 72

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob9"
		gender = "male"
		age = 33
		biography = "Im a test user, area Oulu"
		dateofbirth = "08-09-1989"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897
		rating = 81

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Skiing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "BuilderBob" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie1"
		gender = "female"
		age = 20
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-2002"
		preference = "both"
		latitude = 60.23849536447701
		longitude = 25.02208645948336
		rating = 10

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie2"
		gender = "female"
		age = 21
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-2001"
		preference = "both"
		latitude = 60.247672879979994
		longitude = 24.849669656229732
		rating = 12

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie3"
		gender = "female"
		age = 22
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-2000"
		preference = "both"
		latitude = 60.21024187211006
		longitude = 25.059320488531963
		rating = 32

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie4"
		gender = "female"
		age = 23
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-1999"
		preference = "both"
		latitude = 60.27867249536114
		longitude = 24.992162692290012
		rating = 43

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie5"
		gender = "female"
		age = 24
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-1998"
		preference = "both"
		latitude = 60.16025642221952
		longitude = 24.935382251087557
		rating = 74

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie6"
		gender = "female"
		age = 25
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-1997"
		preference = "both"
		latitude = 60.25359693599148
		longitude = 24.922954049072953
		rating = 85

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie7"
		gender = "female"
		age = 26
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-1996"
		preference = "both"
		latitude = 60.23412924285116
		longitude = 25.015073150112805
		rating = 36

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie8"
		gender = "female"
		age = 27
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-1995"
		preference = "both"
		latitude = 60.2235056237006
		longitude = 24.9354347014719
		rating = 27

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie9"
		gender = "female"
		age = 28
		biography = "Im a test user, area Helsinki"
		dateofbirth = "08-09-1994"
		preference = "both"
		latitude = 60.216779065916874
		longitude = 25.135238239461046
		rating = 18

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Singing'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Sofie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}


		firstname = "Marie"
		lastname = "North"
		username = "Marie1"
		gender = "female"
		age = 24
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1998"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 10

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie2"
		gender = "female"
		age = 25
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1997"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 21

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie3"
		gender = "female"
		age = 26
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1996"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 12

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie4"
		gender = "female"
		age = 27
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1995"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 73

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie5"
		gender = "female"
		age = 28
		biography = "Vaasa"
		dateofbirth = "08-09-1994"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 44

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie6"
		gender = "female"
		age = 29
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1993"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 25

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie7"
		gender = "female"
		age = 30
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1992"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 76

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie8"
		gender = "female"
		age = 31
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1991"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 67

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Marie"
		lastname = "North"
		username = "Marie9"
		gender = "female"
		age = 32
		biography = "Im a test user, area Vaasa"
		dateofbirth = "08-09-1990"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684
		rating = 48

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Yoga'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Marie" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny1"
		gender = "female"
		age = 28
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1994"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 0

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny2"
		gender = "female"
		age = 29
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1993"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 17

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny3"
		gender = "female"
		age = 30
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1992"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 22

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny4"
		gender = "female"
		age = 31
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1991"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 33

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny5"
		gender = "female"
		age = 32
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1990"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 46

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny6"
		gender = "female"
		age = 33
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1989"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 35

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny7"
		gender = "female"
		age = 34
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1988"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 26

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny8"
		gender = "female"
		age = 35
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1987"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 17

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny9"
		gender = "female"
		age = 36
		biography = "Im a test user, area Jyväskylä"
		dateofbirth = "08-09-1986"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627
		rating = 58

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + "Penny" + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		console.log("Users added to database!")
	} catch (err) {
		console.log(err)
	}
}
insert();