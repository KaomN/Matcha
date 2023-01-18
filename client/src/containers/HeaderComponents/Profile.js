import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecentlyWatchedProfiles from "./RecentlyWatchedProfiles";
import ConnectRequested from "./ConnectRequested";
import RecentlyWatchedBy from "./RecentlyWatchedBy";


export default function Profile(props) {
	const navigate = useNavigate();
	const [visibleTab, setVisibleTab] = useState(1);

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
					<div className="header_tabs_buttons_container">
						<i className="material-icons header_tabs_buttons" title="Recently Watched Profiles" onClick={() => {setVisibleTab(1)}}>history</i>
						<i className="material-icons header_tabs_buttons" title="Connect Requests" onClick={() => {setVisibleTab(2)}}>hotel_class</i>
						<i className="material-icons header_tabs_buttons" title="Recently Watched By" onClick={() => {setVisibleTab(3)}}>update</i>
					</div>
					 {visibleTab === 1 && <RecentlyWatchedProfiles
					isLoading={props.isLoading}
					history={props.history}
					setHistory={props.setHistory}
					setIsProfileVisible={props.setIsProfileVisible}
					/>}
					{visibleTab === 2 && <ConnectRequested
					isLoading={props.isLoading}
					setIsProfileVisible={props.setIsProfileVisible}
					connectRequests={props.connectRequests}
					setConnectRequests={props.setConnectRequests}
					/>}
					{visibleTab === 3 && <RecentlyWatchedBy
					isLoading={props.isLoading}
					setIsProfileVisible={props.setIsProfileVisible}
					watchedByHistory={props.watchedByHistory}
					setWatchedByHistory={props.setWatchedByHistory}
					/>}
				</div>
				}
			</div>
		</>
	);
}