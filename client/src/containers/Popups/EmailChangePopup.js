import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EmailChangePopup(props) {
	const [pin, setPin] = useState("");
	const [responseMsg, setResponseMsg] = useState("");
	const [responseErrorMsg, setResponseErrorMsg] = useState("");
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	async function handleSubmit() {
		const token = searchParams.get("emailchangerequest")
		const response = await fetch('http://localhost:3001/request/email', {
			credentials: "include",
			method: "PUT",
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				token: token,
				pin: pin,
			})
		});
		const data = await response.json();
		if(data.status) {
			setResponseMsg(data.msg)
			setTimeout(() => {
				setResponseMsg("")
			}, 3000)
		} else {
			setResponseErrorMsg(data.err)
		}
	}

	function handleNavigate() {
		navigate("/login");
	}

	return(	<div className="popup">
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
						<div className="login a-links unselectable" onClick={handleNavigate}>Login</div>
					</div>
				</div>
			</div>);
}