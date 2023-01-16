import { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  VerifyPopup  from "./Popups/VerifyPopup";
import EmailChangePopup from "./Popups/EmailChangePopup";
import "./styles/Index.css";

export default function Index() {
	const { user } = useContext(UserContext);
	const [popupVerify, setPopupVerify] = useState(false);
	const [popupEmailChange, setPopupEmalChange] = useState(false);
	const [data, setData] = useState(false);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		let mounted = true;
		if(searchParams.get("verification") !== null){
			if(mounted) {
				(async () => {
					const token = searchParams.get("verification")
					const response = await fetch('http://localhost:3001/request/verify', {
						credentials: "include",
						method: "POST",
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({
							token: token,
						})
					});
					const data = await response.json();
					setPopupVerify(true);
					setData(data);
				})()
			}
		} else if (searchParams.get("emailchangerequest") !== null) {
			setPopupEmalChange(true)
		} 
		return () => mounted = false;
	}, [searchParams, navigate]);

	useEffect(() => {
		if(user.auth && searchParams.get("emailchangerequest") === null && searchParams.get("verification") === null) {
			navigate("/home");
		}
	}, [user.auth, navigate, searchParams]);

	return (
		<main className="ma">
			<div>
				<img className="logo" src="images/logo.png" alt="logo"></img>
			</div>
			{popupVerify &&
			<VerifyPopup
			setPopup={setPopupVerify}
			data={data}
			/>}
			{popupEmailChange &&
			<EmailChangePopup
			setPopup={setPopupEmalChange}
			/>}
		</main>
	);
}