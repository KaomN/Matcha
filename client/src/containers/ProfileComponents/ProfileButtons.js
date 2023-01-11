import toast from 'react-simple-toasts';
import { SocketContext } from "../../context/SocketContext";
import { useEffect, useContext, useState } from "react";

export default function ProfileButtons(props) {
	const socket = useContext(SocketContext);
	const [connectRequest, setConnectRequest] = useState(props.profile.connectRequest);
	const [connected, setConnected] = useState(props.profile.connected);
	
	useEffect(() => {
		socket.on("receive_connect_request", (data) => {
			setConnectRequest(data.connectRequest)
		});
		socket.on("receive_disconnect_request", (data) => {
			if(data.connected) {
				setConnected(data.connected)
			} else {
				setConnectRequest(data.connectRequest)
			}
		});
		socket.on("receive_connected_request", (data) => {
			setConnected(data.connected)
		});
		return () => {
			socket.off("receive_connect_request");
			socket.off("receive_disconnect_request");
			socket.off("receive_connected_request");
			};
	}, []);

	async function handleBlock() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/profile/block", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username
						})
					})
					const data = await response.json()
					if (data.status) {
						if(props.userProfileIsArray) {
							props.setProfile(profile => profile.map((user) => {
								if(user.userid === props.profile.userid) {
									return {
										...user, blocked: true
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, blocked: true
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			//console.log(err)
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	async function handleUnblock() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/profile/block", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username
						})
					})
					const data = await response.json()
					if (data.status) {
						if(props.userProfileIsArray) {
							props.setProfile(profile => profile.map((user) => {
								if(user.userid === props.profile.userid) {
									return {
										...user, blocked: false
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, blocked: false
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			//console.log(err)
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}
	
	async function handleReport() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/profile/report", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username
						})
					})
					const data = await response.json()
					if (data.status) {
						if(props.userProfileIsArray) {
							props.setProfile(profile => profile.map((user) => {
								if(user.userid === props.profile.userid) {
									return {
										...user, reported: true
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, reported: true
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			//console.log(err)
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	async function handleUnreport() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/profile/report", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username
						})
					})
					const data = await response.json()
					if (data.status) {
						if(props.userProfileIsArray) {
							props.setProfile(profile => profile.map((user) => {
								if(user.userid === props.profile.userid) {
									return {
										...user, reported: false
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, reported: false
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			//console.log(err)
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	async function handleConnect() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/profile/connect", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username
						})
					})
					const data = await response.json()
					if (data.status) {
						if(data.connected) {
							if(props.userProfileIsArray) {
								props.setProfile(profile => profile.map((user) => {
									if(user.userid === props.profile.userid) {
										return {
											...user, connectRequestSent: true, connected: true
										}
									} else {
										return user
									}
								}))
							} else {
								props.setProfile(profile => ({
									...profile, connectRequestSent: true, connected: true
								}))
							}
						} else {
							if(props.userProfileIsArray) {
								props.setProfile(profile => profile.map((user) => {
									if(user.userid === props.profile.userid) {
										return {
											...user, connectRequestSent: true
										}
									} else {
										return user
									}
								}))
							} else {
								props.setProfile(profile => ({
									...profile, connectRequestSent: true
								}))
							}
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						// setTimeout(() => {
							socket.emit("send_notification", { username: props.user.username, userid: props.profile.userid, type: "connect" });
							socket.emit("send_connected", { userid: props.profile.userid});
							socket.emit("send_connect_request", { userid: props.profile.userid});
							props.setLoading(false)
						// }, 1300)
					}
				})();
			}, 300)
		} catch (err) {
			//console.log(err)
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}
	async function handleDisconnect() {
		try {
			props.setLoading(true)
			
			setTimeout(() => {
				(async function() {
					const response = await fetch(`/profile/disconnect/?userid1=${props.profile.userid}&userid2=${props.user.userid}`)
					const data = await response.json()
					if (data.status) {
						socket.emit("send_notification", { username: props.user.username, userid: props.profile.userid, type: "disconnect" });
					}
				})();
				(async function() {
					const response = await fetch("/profile/disconnect", {
						method: "DELETE",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username,
							message: `${props.user.username} has sent you a connection request!`
						})
					})
					const data = await response.json()
					if (data.status) {
						if(props.userProfileIsArray) {
							props.setProfile(profile => profile.map((user) => {
								if(user.userid === props.profile.userid) {
									return {
										...user, connectRequestSent: false, connected: false, connectRequest: data.connectRequest
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, connectRequestSent: false, connected: false, connectRequest: data.connectRequest
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						socket.emit("send_disconnect_request", { userid: props.profile.userid});
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			//console.log(err)
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	return (
			<>
				{props.profile.canConnect ?
					props.profile.connectRequestSent ?
					<i className="material-icons profile_disconnect_btn" title="Disconnect" onClick={handleDisconnect}>star</i>
					:
					<i className="material-icons profile_connect_btn" title="Connect"  onClick={handleConnect}>star</i>
				:
				null
				}
				{props.profile.blocked ?
				<i
				className={props.profile.canConnect ? "material-icons profile_unblock_btn" : "material-icons profile_unblock_btn_no_connect"}
				title="Unlock"
				onClick={handleUnblock}>block</i>
				:
				<i
				className={props.profile.canConnect ? "material-icons profile_block_btn" : "material-icons profile_block_btn_no_connect"}
				title="Block"
				onClick={handleBlock}>block</i>
				}
				{props.profile.reported ?
				<i
				className={props.profile.canConnect ? "material-icons profile_unreport_btn" : "material-icons profile_unreport_btn_no_connect"}
				title="Unreport"
				onClick={handleUnreport}>report</i>
				:
				<i
				className={props.profile.canConnect ? "material-icons profile_report_btn" : "material-icons profile_report_btn_no_connect"}
				title="Report"
				onClick={handleReport}>report</i>
				}
				{connectRequest ?
					connected ?
					<i className="material-icons profile_connected" title="Connect">star</i>
					:
					<i className="material-icons profile_connect_request" draggable="false" title={"Connection request"}>star_half</i>
				:
				null
				}
			</>
	);
}