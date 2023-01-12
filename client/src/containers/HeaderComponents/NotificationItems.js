import { useNavigate } from "react-router-dom";

export default function NotificationItems(props) {
	const navigate = useNavigate();
	
	async function handleNavigate() {
		try {
			if(!props.item.isread) {
				const response = await fetch("/user/notification/", {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						notificationid: props.item.pk_id
					})
				})
				const data = await response.json()
				if (data.status) {
					const notificationCopy = props.notification.slice()
					notificationCopy[props.index].isread = true
					var res = false
					for (let i = 0; i < notificationCopy.length; i++) {
						if(notificationCopy[i].isread === 0) 
							var res = true
					}
					if(res) {
						props.setIsRead(false)
					} else {
						props.setIsRead(true)
					}
					props.setNotification(notificationCopy)
				}
				props.setIsNotificationVisible(false)
			}
		} catch (error) {
			//console.log(error)
		}
		props.item.notification.slice(-8) === "message!" ? navigate(`/chat`) : navigate(`/profile/${props.item.targetuserid}`)
		props.setIsNotificationVisible(false)
	}

	return (
		<>
			<div className="unselectable notification_onclick" onClick={handleNavigate}>{props.item.notification}</div>
			{!props.item.isread ? <div className="notification_isread unselectable"></div> : null}
		</>
	);
}