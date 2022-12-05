const con = require("../server/setup").pool;
async function insert() {
	try {
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
		var biography = "Biography"
		var latitude = 60.4533006
		var longitude = 22.3078571
		var rating = 0
		var profile = 1
		var verified = 1

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])

		firstname = "Kenny"
		lastname = "South"
		username = "Kens"
		gender = "male"
		age = 28
		dateofbirth = "08-09-1994"
		preference = "female"
		latitude = 63.0870864
		longitude = 21.6567978

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])

		firstname = "Bob"
		lastname = "Builder"
		username = "BuilderBob"
		gender = "male"
		age = 25
		dateofbirth = "08-09-1997"
		preference = "both"
		latitude = 65.0223372
		longitude = 25.6647897

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])

		firstname = "Sofie"
		lastname = "Graham"
		username = "Sofie"
		gender = "female"
		age = 20
		dateofbirth = "08-09-2002"
		preference = "both"
		latitude = 61.4710659
		longitude = 23.9052097

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])

		firstname = "Marie"
		lastname = "North"
		username = "Marie"
		gender = "female"
		age = 28
		dateofbirth = "08-09-1994"
		preference = "female"
		latitude = 63.0922380
		longitude = 21.6499684

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])

		firstname = "Penny"
		lastname = "Pennies"
		username = "Penny"
		gender = "female"
		age = 32
		dateofbirth = "08-09-1990"
		preference = "male"
		latitude = 62.2375066
		longitude = 25.8375627

		result = await con.execute("INSERT INTO users (firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, rating, profile, verified) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [firstname, lastname, username, email, password, token, gender, age, dateofbirth, preference, biography, latitude, longitude, rating, profile, verified])
		
		console.log("Users added!")
	} catch (err) {
		console.log(err)
	}
}
insert();