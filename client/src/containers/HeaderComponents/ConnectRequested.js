import {LoadingSpinnerComponent} from "../../components/LoadingSpinnerComponent";
import HistoryItems from "./HistoryItems";


export default function ConnectRequested(props) {

	return (
			<div className="header-profile-dropdown-profile-history">
				<div>
					<div className="profile_history_font_size">Connect Requests</div>
				</div>
				<div className="profile_history_container">
				{props.isLoading ?
					<LoadingSpinnerComponent
					class={"header_notification_loading_spinner"}
					/>
					:
					props.connectRequests.length > 0 ?
					props.connectRequests.map((connectRequests, index) => {
						return (
							<div className="header_history_item" key={index}>
								<HistoryItems
								type={"connect"}
								id={connectRequests.id}
								setConnectRequests={props.setConnectRequests}
								username={connectRequests.username}
								imageSrc={connectRequests.image}
								userid={connectRequests.pk_userid}
								setIsProfileVisible={props.setIsProfileVisible}
								/>
							</div>)
					})
					:
					<div className="flex center">No Connect Requests</div>}
				</div>
			</div>
			)
}