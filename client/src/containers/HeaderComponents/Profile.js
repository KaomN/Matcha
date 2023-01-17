import { useNavigate } from "react-router-dom";
import {LoadingSpinnerComponent} from "../../components/LoadingSpinnerComponent";
import HistoryItems from "./HistoryItems";


export default function Profile(props) {
	const navigate = useNavigate();

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
						{props.isLoading ?
							<LoadingSpinnerComponent
							class={"header_notification_loading_spinner"}
							/>
							:
							props.history.length > 0 ?
							props.history.map((history, index) => {
								return (
									<div className="header_history_item" key={index}>
										<HistoryItems
										id={history.id}
										setHistory={props.setHistory}
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