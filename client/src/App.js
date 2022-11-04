// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";

fetch("/createDatabase");
function App() {
	// const [data, setData] = React.useState(null);

	// React.useEffect(() => {
	// 	fetch("/createDatabase")
	// 	.then((res) => res.json())
	// 	.then((data) => setData(data.message));
	// }, []);
	// console.log(data)

	return (
		<div className="App container py-3">
			<Navbar collapseOnSelect bg="secondary" expand="md" className="mb-3 p-2 rounded">
				<LinkContainer to="/">
					<Navbar.Brand className="font-weight-bold text-dark">
					Matcha
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Nav activeKey={window.location.pathname}>
						<LinkContainer to="/signup">
							<Nav.Link>Signup</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/login">
							<Nav.Link>Login</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			{/* Routes */}
			<Routes />
		</div>
	);
}
export default App;