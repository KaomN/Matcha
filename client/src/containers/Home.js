// import { useContext } from "react";
// import { UserContext } from '../context/UserContext';
import "./styles/Home.css";

export default function Home() {
	//const { user } = useContext(UserContext);

	async function handleTest() {
		var response = await fetch('/request/test')
		response = await response.json();
		console.log(response)
	}
	return (
		<main className="flex-col flex-center ma">
			<h3>Show profile of other interesting users. Be able to filter by age gap, fame rating gap, location and interest. Also able to sort by them.</h3>
			<div>
				<button className="form_button" onClick={handleTest}>test</button>
			</div>
		</main>
	);
}