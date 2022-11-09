import React from "react";
//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
//import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";

// function navbar1() {
// 	return <Navbar collapseOnSelect bg="secondary" expand="md" className="mb-3 p-2 rounded">
// 				<LinkContainer to="/">
// 					<Navbar.Brand className="font-weight-bold text-dark">
// 					Matcha
// 					</Navbar.Brand>
// 				</LinkContainer>
// 				<Navbar.Toggle />
// 				<Navbar.Collapse className="justify-content-end">
// 					<Nav activeKey={window.location.pathname}>
// 						<LinkContainer to="/signup">
// 							<Nav.Link>Signup</Nav.Link>
// 						</LinkContainer>
// 						<LinkContainer to="/login">
// 							<Nav.Link>Login</Nav.Link>
// 						</LinkContainer>
// 					</Nav>
// 				</Navbar.Collapse>
// 			</Navbar>;
// };

function navbar() {
	return (<header>
				<div className="flex-center">
					<a href="/" draggable="false" className="title"><h3>Matcha</h3></a>
				</div>
				<nav>
					<ul>
						<li><a href="/login" draggable="false" className="login" title="Login">Login</a></li>
						<li><a href="/signup" draggable="false" className="signup" title="Signup">Signup</a></li>
					</ul>
				</nav>
			</header>);
};

function footerTag() {
	return <footer>© 2022 Matcha. conguyen</footer>;
};

function App() {
	// const [data, setData] = React.useState(null);

	// React.useEffect(() => {
	// 	fetch("/createDatabase")
	// 	.then((res) => res.json())
	// 	.then((data) => setData(data.message));
	// }, []);
	// console.log(data)

	const navigation = navbar();
	const footer = footerTag();
	return (
		<div className="App">
			{navigation}
			<Routes />
			{footer}
		</div>
	);
}

fetch("/createDatabase");
export default App;
