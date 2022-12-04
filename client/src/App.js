import React from "react";
import "./App.css";
import Routes from "./Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';

function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	function fetchLogout() {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(fetch('/request/logout')
				.then((response) => response.json()));
			}, 500)
		});
		return promise
	}

	async function handleLogout(event) {
		event.preventDefault();
			var response = await trackPromise(fetchLogout());
			if(response.status) {
				navigate("/login");
			}
			//console.log(response)
	}

	if(pathname === "/completeprofile") {
		return (<header>
			<div className="flex-center">
				<a href="/" draggable="false" className="title"><h3>Matcha</h3></a>
			</div>
			<nav>
				<ul>
					<li><a href="/login" draggable="false" className="signup" title="Logout">Logout</a></li>
				</ul>
			</nav>
		</header>);
	} else if(pathname === "/home") {
	return (<header>
				<div className="flex-center">
					<a href="/" draggable="false" className="title"><h3>Matcha</h3></a>
				</div>
				<nav>
					<ul>
						<li><a href="#" draggable="false" className="login" title="Logout" onClick={handleLogout}>Logout</a></li>
					</ul>
				</nav>
			</header>);
	} else {
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
	}
};

function Footer() {
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
	return (
		<div className="App">
			<Header />
			<Routes />
			<Footer />
		</div>
	);
}
export default App;
