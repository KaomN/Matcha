import React from "react";
import "./App.css";
import Routes from "./Routes";
import Header from './containers/Header'

function Footer() {
	return <footer>© 2022 Matcha. conguyen</footer>;
};
function App() {
	return (
		<div className="App">
			<Header />
			<Routes />
			<Footer />
		</div>
	);
}
export default App;
