//import { useContext } from "react";
//import { UserContext } from '../components/UserContext';
import { useLocation, useNavigate } from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';
import { useContext } from "react";
import { UserContext } from '../context/UserContext';

export default function Header() {
	const { user } = useContext(UserContext);
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
	} else if(pathname === "/login" || pathname === "/signup" || pathname === "/forgotpassword" || pathname === "/passwordreset" || pathname === "/") {
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
	} else {
		return (<header>
			<div className="flex-center">
				<a href="/home" draggable="false" className="title"><h3>Matcha</h3></a>
			</div>
			<nav>
				<ul>
					<li><i className="material-icons" onClick={handleLogout} title="Logout">logout</i></li>
					<li><i className="material-icons">notifications</i></li>
					<li><i className="material-icons">chat</i></li>
					<li>{user.name === "" ? null : <img className="header-profile" src={"http://localhost:3001/images/" + user.name + "/profile.jpg"}></img>}</li>
				</ul>
			</nav>
		</header>);
	}
}