import {useState, useContext} from "react";
import { UserContext } from '../components/UserContext';
import "./styles/Home.css";

export default function Home() {
	const { user, logout} = useContext(UserContext);
	//console.log(user.auth, user.name)
	if (user.auth) {
		return (
			<main>
				<h3>Show profile of other interesting users. Be able to filter by age gap, fame rating gap, location and interest. Also able to sort by them.</h3>
			</main>
		);
	} else {
		return (
			<main>
				<h3>Not logged in</h3>
			</main>
		);
	}
}