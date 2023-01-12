import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {LoadingSpinnerComponent} from "../../components/LoadingSpinnerComponent";
import HistoryItems from "./HistoryItems";
import toast from 'react-simple-toasts';


export default function Profile(props) {
	const navigate = useNavigate();
	const [history, setHistory] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const { pathname } = useLocation();

	useEffect(() => {
		(async function() {
			try {
				setIsLoading(true)
				const response = await fetch("/user/history")
				const data = await response.json()
				if (data.status) {
					setHistory(data.history)
				}
				setIsLoading(false)
			} catch (error) {
				toast("Something went wrong!", { position: 'top-center', duration: 5000 })
				setIsLoading(false)
			}
		})();
	}, [pathname]);

	return (
		<>
			<div ref={props.refProfile} title="Profile">
				<img className="header-profile" src={props.user.imageSrc} onClick={ () => props.isProfileVisible ? props.setIsProfileVisible(false) : props.setIsProfileVisible(true) } alt="profile"></img>
				{!props.isProfileVisible ? null : 
				<div className="header-profile-dropdown header-zindex">
					<div className="header-profile-dropdown-profile" onClick={() => {navigate("/profile"); props.setIsProfileVisible(false)}}>
						<img className="header-profile-dropdown-profile-image" src={props.user.imageSrc} alt="profile"></img>
						<div className="ml05 header-font-color unselectable">@{props.user.username}</div>
					</div>
					<div className="header-profile-dropdown-profile-history">
						<div>
							<div className="profile_history_font_size">Profile history</div>
						</div>
						<div className="profile_history_container">
						{isLoading ?
							<LoadingSpinnerComponent
							class={"header_notification_loading_spinner"}
							/>
							:
							history.length > 0 ?
							history.map((history, index) => {
								return (
									<div className="header_history_item" key={index}>
										<HistoryItems
										id={history.id}
										setHistory={setHistory}
										username={history.username}
										imageSrc={ "http://localhost:3001/images/" + history.username + "/" + history.image}
										userid={history.pk_userid}
										setIsProfileVisible={props.setIsProfileVisible}
										/>
									</div>)
							})
							:
							<div className="flex center">No history</div>}
						</div>
					</div>
				</div>
				}
			</div>
		</>
	);
}