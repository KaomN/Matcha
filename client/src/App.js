import React from "react";
import "./App.css";
import Routes from "./Routes";

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
	return (
		<div className="App">
			{navbar()}
			<Routes />
			{footerTag()}
		</div>
	);
}
export default App;
