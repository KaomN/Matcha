import {LoadingSpinnerComponent} from "../../components/LoadingSpinnerComponent";
import HistoryItems from "./HistoryItems";


export default function RecentlyWatchedBy(props) {

	return (
			<div className="header-profile-dropdown-profile-history">
				<div>
					<div className="profile_history_font_size">Recently Watched By</div>
				</div>
				<div className="profile_history_container">
				{props.isLoading ?
					<LoadingSpinnerComponent
					class={"header_notification_loading_spinner"}
					/>
					:
					props.watchedByHistory.length > 0 ?
					props.watchedByHistory.map((watchedByHistory, index) => {
						return (
							<div className="header_history_item" key={index}>
								<HistoryItems
								type={"watchedbyhistory"}
								id={watchedByHistory.id}
								setWatchedByHistory={props.setWatchedByHistory}
								username={watchedByHistory.username}
								imageSrc={ "http://localhost:3001/images/" + watchedByHistory.username + "/" + watchedByHistory.image}
								userid={watchedByHistory.pk_userid}
								setIsProfileVisible={props.setIsProfileVisible}
								/>
							</div>)
					})
					:
					<div className="flex center">No Users Has Watched Your Profile</div>}
				</div>
			</div>
			)
}