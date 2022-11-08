const express = require("express");
//var session = require('express-session')
var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer();
const app = express();
const Database = require("./createDatabase.js");

// Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});
const PORT = process.env.PORT;

// For parsing application/json header
app.use(bodyParser.json()); 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// for parsing multipart/form-data
// app.use(express.static('public'));
//app.use(upload.array()); 

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.get("/test", (req, res) => {
	res.json({ message: "Test" });
});

app.get("/createDatabase", () => {
	Database.createDatabase(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD);
});

app.post("/signup/request", (req, res) => {
	//console.log(req.body);
	res.json("recieved your request!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});