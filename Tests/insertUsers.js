const con = require("../server/setup").pool;
const fs = require('fs');
const users = [
	{
		firstname: "John",
		lastname: "West",
		username: "John",
		email: "email",
		password: "password",
		token: "token",
		gender: "male",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "male",
		biography: "Im a test user, area Turku",
		latitude: 60.4533006,
		longitude: 22.3078571,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Fishing",
				id: "26",
			},
			{
				tag: "Working-Out",
				id: "35",
			},
			{
				tag: "Rock-Climbing",
				id: "42",
			},
		]
	},
	{
		firstname: "Yogendra",
		lastname: "Singh",
		username: "Yogendra",
		email: "email",
		password: "password",
		token: "token",
		gender: "male",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "female",
		biography: "Im a test user, area Helsinki",
		latitude: 60.24872934488623,
		longitude: 24.93654004078942,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Tehcnology",
				id: "8",
			},
			{
				tag: "Tennis",
				id: "31",
			},
			{
				tag: "Running",
				id: "43",
			},
		]
	},
	{
		firstname: "Mostafa",
		lastname: "Sannad",
		username: "Mostafa",
		email: "email",
		password: "password",
		token: "token",
		gender: "male",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "both",
		biography: "Im a test user, area Helsinki",
		latitude: 60.222482003530786,
		longitude: 24.104768178006072,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Movies",
				id: "1",
			},
			{
				tag: "Gaming",
				id: "14",
			},
			{
				tag: "Music",
				id: "3",
			},
		]
	},
	{
		firstname: "Kenny",
		lastname: "South",
		username: "Kens",
		email: "email",
		password: "password",
		token: "token",
		gender: "male",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "female",
		biography: "Im a test user, area Vaasa",
		latitude: 63.0870864,
		longitude: 21.6567978,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Motorcycling",
				id: "41",
			},
			{
				tag: "Snowboarding",
				id: "46",
			},
			{
				tag: "Hiking",
				id: "16",
			},
		]
	},
	{
		firstname: "Bob",
		lastname: "Builder",
		username: "BuilderBob",
		email: "email",
		password: "password",
		token: "token",
		gender: "male",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "both",
		biography: "Im a test user, area Oulu",
		latitude: 65.0223372,
		longitude: 25.6647897,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Camping",
				id: "25",
			},
			{
				tag: "Golfing",
				id: "40",
			},
			{
				tag: "Cooking",
				id: "12",
			},
		]
	},
	{
		firstname: "Sofie",
		lastname: "Graham",
		username: "Sofie",
		email: "email",
		password: "password",
		token: "token",
		gender: "female",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "both",
		biography: "Im a test user, area Helsinki",
		latitude: 60.27867249536114,
		longitude: 24.992162692290012,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Music",
				id: "3",
			},
			{
				tag: "Dancing",
				id: "13",
			},
			{
				tag: "Singing",
				id: "21",
			},
		]
	},
	{
		firstname: "Marie",
		lastname: "Howell",
		username: "Marie",
		email: "email",
		password: "password",
		token: "token",
		gender: "female",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "male",
		biography: "Im a test user, area Vaasa",
		latitude: 63.0922380,
		longitude: 21.6499684,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Art",
				id: "6",
			},
			{
				tag: "Sports",
				id: "5",
			},
			{
				tag: "Gardening",
				id: "15",
			},
		]
	},
	{
		firstname: "Penny",
		lastname: "Pennies",
		username: "Penny",
		email: "email",
		password: "password",
		token: "token",
		gender: "female",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "female",
		biography: "Im a test user, area Jyväskylä",
		latitude: 62.2375066,
		longitude: 25.8375627,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Meditation",
				id: "18",
			},
			{
				tag: "Yoga",
				id: "24",
			},
			{
				tag: "Baking",
				id: "36",
			},
		]
	},
	{
		firstname: "Andrea",
		lastname: "Piacquadio",
		username: "Andrea",
		email: "email",
		password: "password",
		token: "token",
		gender: "female",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "male",
		biography: "Im a test user, area Helsinki",
		latitude: 60.23629004439612,
		longitude: 24.93551007260238,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Photography",
				id: "19",
			},
			{
				tag: "Writing",
				id: "23",
			},
			{
				tag: "Painting",
				id: "28",
			},
		]
	},
	{
		firstname: "Kim",
		lastname: "An",
		username: "Kim",
		email: "email",
		password: "password",
		token: "token",
		gender: "female",
		age: 18,
		dateofbirth: "08-09-2005",
		preference: "both",
		biography: "Im a test user, area Helsinki",
		latitude: 60.15984672040793,
		longitude: 24.878175176857116,
		profile: 1,
		verified: 1,
		interests: [
			{
				tag: "Fashion",
				id: "7",
			},
			{
				tag: "Music",
				id: "3",
			},
			{
				tag: "Animals",
				id: "10",
			},
		]
	},
];

async function insert() {
	try {
		for (const user of users) {
			const username = user.username
			const dateArr = user.dateofbirth.split("-")
			for (let i = 0; i < 50; i++) {
				const firstname = user.firstname + i
				const lastname = user.lastname + i
				const email = user.email + i
				const age = user.age + i
				const dateofbirth = dateArr[0] + "-" + dateArr[1] + "-" + (parseInt(dateArr[2]) + i)
				const profileUsername = username + i
				var result = await con.execute(
					`INSERT INTO users
					(firstname, surname, username, email, password, token, gender, age, dateofbirth, genderpreference, biography, latitude, longitude, profile, verified)
					VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
					[firstname, lastname, profileUsername, email, user.password, user.token, user.gender, age, dateofbirth, user.preference, user.biography, user.latitude, user.longitude, user.profile, user.verified])
				for (const interest of user.interests) {
					await con.execute("INSERT INTO tagitem (fk_userid, fk_tagid) VALUES (?, ?)", [result[0].insertId, interest.id])
				}
				if (!fs.existsSync(__dirname.slice(0, -5) + "server/uploads/" + profileUsername)){
					fs.mkdirSync(__dirname.slice(0, -5) + "server/uploads/" + profileUsername)
					fs.cpSync(__dirname.slice(0, -5) + "Tests/images/" + username + "/profile.jpg", __dirname.slice(0, -5) + "server/uploads/" + profileUsername + "/profile.jpg")
					await con.execute("INSERT INTO images (fk_userid, profilepic, imagename) VALUES (?, '1', 'profile.jpg')", [result[0].insertId])
				}
			}
		}
		console.log("Users added to database!")
	} catch (err) {
		console.log(err)
	}
}
insert();