import {LoadingSpinnerComponent} from "../../components/LoadingSpinnerComponent";
import HistoryItems from "./HistoryItems";


export default function RecentlyWatchedProfiles(props) {
	
	return (
			<div className="header-profile-dropdown-profile-history">
				<div>
					<div className="profile_history_font_size">Recently Watched Profiles</div>
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
								type={"history"}
								id={history.id}
								setHistory={props.setHistory}
								username={history.username}
								imageSrc={history.image}
								userid={history.pk_userid}
								setIsProfileVisible={props.setIsProfileVisible}
								/>
							</div>)
					})
					:
					<div className="flex center">No History</div>}
				</div>
			</div>
			)
}