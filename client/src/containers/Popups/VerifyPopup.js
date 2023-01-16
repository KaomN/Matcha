import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyPopup(props) {
	const navigate = useNavigate();

	function handleNavigate() {
		navigate("/login");
	}

	useEffect(() => {
		if (props.data.verified) {
			navigate("/login");
		}
	}, [props.data.verified, navigate]);

	if(props.data.status === true && !props.data.verified) {
		return(	<div className="popup">
					<div className="popup-content">
						<p>Success! Your account is now verified!</p>
						<div className="center">
							<button type="button" className="form_button_verify" onClick={handleNavigate}>Login!</button>
						</div>
					</div>
				</div>);
	} else if(!props.data.status) {
		return(	<div className="popup">
					<div className="popup-content">
						<p>Please follow the link you received on your email to verify your account!</p>
						<div className="center">
							<button type="button" className="form_button_verify" onClick={() =>{props.setPopup(false)}}>Close</button>
						</div>
					</div>
				</div>);
	}

	return (null);
}