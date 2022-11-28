import { useContext } from "react";
import { UserContext } from '../components/UserContext';
import "./styles/Home.css";

export default function Home() {
	const { user, logout} = useContext(UserContext);

	return (
		<main>
			<h3>Show profile of other interesting users. Be able to filter by age gap, fame rating gap, location and interest. Also able to sort by them.</h3>
		</main>
	);
}