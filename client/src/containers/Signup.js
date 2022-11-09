import React, { useState } from "react";
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
		let response = await fetch('/signup/request', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				firstname: firstname,
				surname: surname,
				username: username,
				email: email,
				password: password,
				passwordconfirm: passwordConfirm,
			})
		});
		console.log(response);
	}

	return(
		<main className="form-container" id="formLogin">
			<form onSubmit={handleSubmit}>
				<h1 className="title-signup">Signup</h1>
				<div className="form_message form_message_error"></div>
				<div className="flex-row">
					<div className="form_input_group">
						<input autoFocus type="text" name="firstname" className="form_input" placeholder="Firstname" autoComplete="off" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
						<div className="form_input_error_message"></div>
					</div>
					<div className="form_input_group">
						<input type="text" name="surname" className="form_input" placeholder="Surname" autoComplete="off" value={surname} onChange={(e) => setSurname(e.target.value)}/>
						<div className="form_input_error_message"></div>
					</div>
				</div>
				<div className="form_input_group">
					<input type="text" name="username" className="form_input" placeholder="Username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
					<div className="form_input_error_message"></div>
				</div>
				<div className="form_input_group">
					<input type="text" name="email" className="form_input" placeholder="Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<div className="form_input_error_message"></div>
				</div>
				<div className="form_input_group">
					<input type="password" name="password" className="form_input" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<div className="form_input_error_message"></div>
				</div>
				<div className="form_input_group">
					<input type="password" name="passwordConfirm" className="form_input" placeholder="Confirm Password" autoComplete="off" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
					<div className="form_input_error_message"></div>
				</div>
				<button className="form_button" name="request" value="signupAction" type="submit">Sign up</button>
				<div className="seperator"><div></div><div>OR</div><div></div></div>
				<div className="center">
					<a className="form__link" href="forgotpassword" draggable="false">Forgot password?</a>
				</div>
			</form>
		</main>
	);

	// return (
	// 	<div className="Signup">
	// 		<Form onSubmit={handleSubmit}>
	// 			<Form.Group size="lg" controlId="firstname">
	// 				<Form.Label>Firstname</Form.Label>
	// 				<Form.Control autoFocus type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
	// 			</Form.Group>
	// 			<Form.Group size="lg" controlId="surname">
	// 				<Form.Label>Surname</Form.Label>
	// 				<Form.Control type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
	// 			</Form.Group>
	// 			<Form.Group size="lg" controlId="username">
	// 				<Form.Label>Username</Form.Label>
	// 				<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
	// 			</Form.Group>
	// 			<Form.Group size="lg" controlId="email">
	// 				<Form.Label>Email</Form.Label>
	// 				<Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
	// 			</Form.Group>
	// 			<Form.Group size="lg" controlId="password">
	// 				<Form.Label>Password</Form.Label>
	// 				<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
	// 			</Form.Group>
	// 			<Form.Group size="lg" controlId="passwordconfirm">
	// 				<Form.Label>Confirm Password</Form.Label>
	// 				<Form.Control type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
	// 			</Form.Group>
	// 			<div className="text-center">
	// 				{/* <Button className="mt-2" block="true" size="lg" type="submit" disabled={!validateForm()}>Signup</Button> */}
	// 				<Button className="mt-2" block="true" size="lg" type="submit" >Signup</Button>
	// 			</div>
	// 			<div className="text-center container-fluid mt-3">
	// 				<a href="/forgotpassword" className="link-primary">Forgot Password</a>
	// 			</div>
	// 		</Form>
	// 	</div>
	// );
}