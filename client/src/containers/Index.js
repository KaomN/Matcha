import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNavigate } from "react-router-dom";
import "./styles/Index.css";

export default function Index() {
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [popup, setPopup] = useState("");
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if(searchParams.get("verification") !== null){
			async function verifyUser(token) {
				let response = await fetch('/request/verify', {
					method: "POST",
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({
						token: token,
					})
				});
				response = await response.json();
				if(response.status === true && !response.verified) {
					setPopup(	<div className="popup">
									<div className="popup-content">
										<p>Success! Your account is now verified!</p>
										<div className="center">
											<a href="/login"><button type="button" className="form_button_verify">Login!</button></a>
										</div>
									</div>
								</div>);
				} else if(!response.status) {
					setPopup(	<div className="popup">
									<div className="popup-content">
										<p>Please follow the link you received on your email to verify your account!</p>
										<div className="center">
											<button type="button" className="form_button_verify" onClick={function(e) {setPopup("")}}>Close</button>
										</div>
									</div>
								</div>);
				}
			}
			verifyUser(searchParams.get("verification"));
		}
	}, [searchParams]);

	useEffect(() => {
		if(isLoading) {
			if(user.auth) {
				navigate("/home");
			}
		}
	}, [user]);

	if (user.isLoading === true) {
		return <LoadingSpinner />
	} else {
		return (
			<main className="ma">
				<div>
					<img src="images/logo.png" alt="logo"></img>
				</div>
				{popup}
			</main>
		);
	}
}