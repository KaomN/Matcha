import { useNavigate } from "react-router-dom";

export default function HistoryItems(props) {
	const navigate = useNavigate();

	async function deleteHistory() {
		const res = await fetch("/user/history", {
			method: "DELETE",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				id: props.id,
			})
		})
		const data = await res.json()
		if (data.status) {
			props.setHistory(history => history.filter(item => item.username !== props.username))
		}
	}

	return (
		<>
			<img className="header-profile-dropdown-profile-image" src={props.imageSrc} alt="profile"></img>
			<div className="ml05 header-font-color unselectable">@{props.username}</div>
			<div className="history_delete_btn" title="Delete">
				<i className="material-icons history_delete_icon" title="Delete" onClick={deleteHistory}>delete</i>
			</div>
			<div className="history_onclick_overlay"  onClick={() => {navigate("/profile/" + props.userid); props.setIsProfileVisible(false)}}></div>
		</>
	);
}