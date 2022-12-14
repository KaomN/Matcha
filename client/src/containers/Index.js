import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNavigate } from "react-router-dom";
import "./styles/Index.css";

export default function Index() {
	const { user, userContextLoading } = useContext(UserContext);
	const [popup, setPopup] = useState("");
	const [pin, setPin] = useState("");
	const [responseMsg, setResponseMsg] = useState("");
	const [responseErrorMsg, setResponseErrorMsg] = useState("");
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [param, setParam] = useState("");
	useEffect(() => {
		let mounted = true;
		if(searchParams.get("verification") !== null){
			if(mounted) {
				(async () => {
					const token = searchParams.get("verification")
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
				})()
			}
		} 
		else if (searchParams.get("emailchangerequest") !== null) {
			if(mounted) {
				(() => {
					async function handleSubmit() {
						const token = searchParams.get("emailchangerequest")
						let response = await fetch('/request/email', {
							method: "PUT",
							headers: { 'content-type': 'application/json' },
							body: JSON.stringify({
								token: token,
								pin: pin,
							})
						});
						response = await response.json();
						console.log(response)
						if(response.status) {
							setResponseMsg(response.msg)
							setTimeout(() => {
								setResponseMsg("")
							}, 3000)
						} else {
							setResponseErrorMsg(response.err)
						}
						
					}
						setPopup(	<div className="popup">
										<div className="popup-content-email-change ">
											<div className="form">
												<div className="lock-image-container">
													<i className="material-icons lock">alternate_email</i>
												</div>
												<h3 className="title-email-change">Email change request</h3>
												<center><p>Enter the pin code that was sent to you</p></center>
												<div className="form_message_error">{responseErrorMsg}</div>
												<div className="form_input_group">
													<input name="pin" type="text" className="form-input-email-change" placeholder="Pin" autoComplete="off" maxLength="6" defaultValue={pin} onChange={function(e) {setPin(e.target.value); setResponseErrorMsg("")}}/>
													<div className="email-change-success">{responseMsg}</div>
												</div>
												<div className="button_container2">
													<button className="form_button2" onClick={handleSubmit}>Submit</button>
												</div>
											</div>
											<div className="flex-center">
												<a href="login" draggable="false"><span>Back To Login</span></a>
											</div>
										</div>
									</div>);
				})()
			}
		}
		return () => mounted = false;
	}, [searchParams, responseErrorMsg, responseMsg, pin]);
	console.log(pin)



		useEffect(() => {
		if(user.auth && searchParams.get("emailchangerequest") === null && searchParams.get("verification") === null) {
			navigate("/home");
		}
	}, [user, userContextLoading]);

	if(userContextLoading)
		return <LoadingSpinner />
	return (
		<main className="ma">
			<div>
				<img src="images/logo.png" alt="logo"></img>
			</div>
			{popup}
		</main>
	);
	//}
}