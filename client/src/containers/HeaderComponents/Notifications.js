import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import NotificationItems from "./NotificationItems";
import {LoadingSpinnerComponent} from "../../components/LoadingSpinnerComponent";
import toast from 'react-simple-toasts';


export default function Notifications(props) {
	const socket = useContext(SocketContext);
	const [notification, setNotification] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRead, setIsRead] = useState(true);

	function checkNotificationArray(pk_id) {
		for (let i = 0; i < notification.length; i++) {
			if(notification[i].pk_id === pk_id) {
				return true
			}
		}
		return false
	}

	socket.on("receive_notification", (data) => {
		if(checkNotificationArray(data.pk_id)) {
			return
		}
		const notificationCopy = notification.slice()
		notificationCopy.unshift(data)
		var res1 = false
		for (let i = 0; i < notificationCopy.length; i++) {
			if(notificationCopy[i].isread === 0) 
				res1 = true
		}
		if(res1) {
			setIsRead(false)
		} else {
			setIsRead(true)
		}
		setNotification(notificationCopy)
	});

	socket.on("receive_message_notitifaction", (data) => {
		if(checkNotificationArray(data.pk_id)) {
			return
		}
		const notificationCopy = notification.slice()
		notificationCopy.unshift(data)
		var res2 = false
		for (let i = 0; i < notificationCopy.length; i++) {
			if(notificationCopy[i].isread === 0) 
				res2 = true
		}
		if(res2) {
			setIsRead(false)
		} else {
			setIsRead(true)
		}
		setNotification(notificationCopy)
	});

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				setIsLoading(true)
				const response = await fetch(`/user/notification/`)
				const data = await response.json()
				if (data.status) {
					var res3 = false
					for (let i = 0; i < data.notification.length; i++) {
						if(data.notification[i].isread === 0) 
							res3 = true
					}
					if(res3) {
						setIsRead(false)
					} else {
						setIsRead(true)
					}
					setNotification(data.notification)
				}
				setIsLoading(false)
			})();
		}
		return () => {mounted = false};
	}, [setIsRead]);

	async function handleClearNotification() {
		try {
			setIsLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/user/notification/", {
						method: "DELETE",
						headers: {"Content-Type": "application/json"}
					})
					const data = await response.json()
					if (data.status) {
						setNotification([])
					}
					setIsRead(true)
					setIsLoading(false)
				})();
			}, 500);
		} catch (error) {
			toast("Something went wrong!", { position: 'top-center', duration: 5000 })
		}
	}

	return (
		<>
			<div ref={props.refNotification} className="pos-relative" title="Notifications">
				<i className="material-icons header-material-icons" onClick={ () => props.isNotificationVisible ? props.setIsNotificationVisible(false) : props.setIsNotificationVisible(true) }>notifications</i>
				{!isRead ? <div className="notification-badge"></div> : null}
				{!props.isNotificationVisible ? null : 
				<div className="header-notification-dropdown header-zindex">
					<div className="header_notification_dropdown_container">
						{isLoading ?
						<LoadingSpinnerComponent
						class={"header_notification_loading_spinner"}
						/>
						:
						notification.length > 0 ?
						notification.map((item, index) => {
							return (
								<div className="header-notification-item" key={index}>
									<NotificationItems
									item={item}
									index={index}
									notification={notification}
									setNotification={setNotification}
									setIsRead={setIsRead}
									setIsNotificationVisible={props.setIsNotificationVisible}
									/>
								</div>)
						})
						:
						<div className="flex center">No notifications</div>}
					</div>
					<button className="clear_notification_btn" onClick={handleClearNotification}>Clear Notifications</button>
				</div>
				}
			</div>
		</>
	);
}