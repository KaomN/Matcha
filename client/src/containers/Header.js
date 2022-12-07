//import { useContext } from "react";
//import { UserContext } from '../components/UserContext';
import { useLocation, useNavigate } from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';

export default function Header() {
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
	} else if(pathname === "/home") {
	return (<header>
				<div className="flex-center">
					<a href="/home" draggable="false" className="title"><h3>Matcha</h3></a>
				</div>
				<nav>
					<ul>
					<li><button onClick={handleLogout}>Logout</button></li>
					<li><button>Profile icon, Dropdown settings</button></li>
					<li><button>Notifications</button></li>
					<li><button>Dropdown Chats</button></li>
					</ul>
				</nav>
			</header>);
	} else if(pathname === "/chat") {
		return (<header>
			<div className="flex-center">
				<a href="/home" draggable="false" className="title"><h3>Matcha</h3></a>
			</div>
			<nav>
				<ul>
					<li><button onClick={handleLogout}>Logout</button></li>
					<li><button>Dropdown settings</button></li>
					<li><button>Notifications</button></li>
				</ul>
			</nav>
		</header>);
	} else if(pathname.slice(0,8) === "/profile") {
		return (<header>
			<div className="flex-center">
				<a href="/home" draggable="false" className="title"><h3>Matcha</h3></a>
			</div>
			<nav>
				<ul>
					<li><button onClick={handleLogout}>Logout</button></li>
					<li><button>Dropdown settings</button></li>
					<li><button>Notifications</button></li>
					<li><button>Dropdown Chats</button></li>
				</ul>
			</nav>
		</header>);
	}
	else {
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
}