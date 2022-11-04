import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signup.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	// function validateForm() {
	// 	return username.length > 0 && password.length > 0 && firstname.length > 0 && surname.length > 0 && email.length > 0;
	// }

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("firstname", firstname);
		formData.append("surname", surname);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("passwordconfirm", passwordConfirm);
		let response = await fetch('/signup/request', {
			method: "POST",
			body: formData
		});
		
		// let response = await fetch('/signup/request', {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		firstname: firstname,
		// 		surname: surname,
		// 		username: username,
		// 		email: email,
		// 		password: password,
		// 		passwordconfirm: passwordConfirm,
		// 	}),
		// });

		// async function test() {
		// 	const formData = new FormData();
		// 	formData.append("test", true);
		// 	var response = await fetch('/signup', {
		// 		method: 'POST',
		// 		body: formData
		// 	});
		// 	response = await response.json();
		console.log(response)
		// }
	}

	return (
		<div className="Signup">
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="firstname">
					<Form.Label>Firstname</Form.Label>
					<Form.Control autoFocus type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlId="surname">
					<Form.Label>Surname</Form.Label>
					<Form.Control type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlId="passwordconfirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
				</Form.Group>
				<div className="text-center">
					{/* <Button className="mt-2" block="true" size="lg" type="submit" disabled={!validateForm()}>Signup</Button> */}
					<Button className="mt-2" block="true" size="lg" type="submit" >Signup</Button>
				</div>
				<div className="text-center container-fluid mt-3">
					<a href="/forgotpassword" className="link-primary">Forgot Password</a>
				</div>
			</Form>
		</div>
	);
}