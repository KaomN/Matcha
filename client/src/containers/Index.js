import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/Index.css";

export default function Index() {
	const [popup, setPopup] = useState("");
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
	return (
		<main className="ma">
			<div>
				<img src="images/logo.png" alt="logo"></img>
			</div>
			{popup}
		</main>
	);
}