const con = require("../server/setup").pool;
const fs = require('fs');

async function insert() {
	try {
		var interests = ["Games", "Food", "Movies", "Cars", "Music"]
		for (const tag of interests) {
			var [rows, fields] = await con.execute('SELECT * FROM tag WHERE tag = ?', [tag])
			if (!rows[0]) {
				await con.execute('INSERT INTO tag (tag) VALUES (?)', [tag])
			}
		}
		console.log("Interests added to database!")
		
		// Test user1
		var firstname = "John"
		var lastname = "West"
		var username = "John"
		var email = "email1"
		var password = "password"
		var token = "token"
		var gender = "male"
		var age = 24
		var dateofbirth = "08-09-1998"
		var preference = "male"
		var biography = "Turku"
		var latitude = 60.4533006
		var longitude = 22.3078571
		var rating = 0
		var profile = 1
		var verified = 1

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user2
		firstname = "Kenny"
		lastname = "South"
		username = "Kens"
		gender = "male"
		age = 28
		biography = "Vaasa"
		dateofbirth = "08-09-1994"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Food'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user3
		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob"
		gender = "male"
		age = 25
		biography = "Oulu"
		dateofbirth = "08-09-1997"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Cars'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user4
		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie"
		gender = "female"
		age = 20
		biography = "Tampere"
		dateofbirth = "08-09-2002"
		preference = "both"
		latitude = 61.4710659
		longitude = 23.9052097

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Music'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user5
		firstname = "Marie"
		lastname = "North"
		username = "Marie"
		gender = "female"
		age = 28
		biography = "Vaasa"
		dateofbirth = "08-09-1994"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Games'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}

		// Test user6
		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny"
		gender = "female"
		age = 32
		biography = "Jyväskylä"
		dateofbirth = "08-09-1990"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, (SELECT pk_tagid from tag WHERE tag = 'Movies'))", [result[0].insertId])
		if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + username)){
			fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + username)
			fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + username + "/profile.jpg")
			await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
		}
		console.log("Users added to database!")
	} catch (err) {
		console.log(err)
	}
}
insert();