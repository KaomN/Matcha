import toast from 'react-simple-toasts';
import { SocketContext } from "../../context/SocketContext";
import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom"
import { UserContext } from '../../context/UserContext';

export default function ProfileButtons(props) {
	const socket = useContext(SocketContext);
	const [connectRequest, setConnectRequest] = useState(false);
	const [connected, setConnected] = useState(false);
	const [amIBlocked, setAmIBlocked] = useState(false);
	const { pathname } = useLocation();
	const { user } = useContext(UserContext);
	
	useEffect(() => {
		if(socket && socket.disconnected && user.auth) {
			socket.open()
		}
	}, [socket, user.auth]);

	useEffect(() => {
		setConnectRequest(props.profile.connectRequest);
		setConnected(props.profile.connected);
		setAmIBlocked(props.profile.amiblocked);
	}, [props.profile]);
	
	useEffect(() => {
		socket.on("receive_connect_request", (data) => {
			if (data.myUserID === props.profile.userid) {
				setConnectRequest(data.connectRequest)
			}
		});
		socket.on("receive_disconnect_request", (data) => {
			if (data.myUserID === props.profile.userid) {
				setConnected(data.connected)
				setConnectRequest(data.connectRequest)
			}
		});
		socket.on("receive_connected_request", (data) => {
			if (data.myUserID === props.profile.userid) {
				setConnected(data.connected)
			}
		});
		socket.on("receive_unblocked_request", (data) => {
			if (data.myUserID === props.profile.userid) {
				setAmIBlocked(data.amiblocked)
				if(props.userProfileIsArray) {
					props.setProfile(profile => profile.map((user) => {
						if(user.userid === props.profile.userid) {
							return {
								...user, amiblocked: false, connectRequestSent: false, connected: false, connectRequest:false
							}
						} else {
							return user
						}
					}))
				} else {
					props.setProfile(profile => ({
						...profile, amiblocked: false, connectRequestSent: false, connected: false, connectRequest:false
					}))
				}
			}
		});
		socket.on("receive_blocked_request", (data) => {
			if (data.myUserID === props.profile.userid) {
				setAmIBlocked(data.amiblocked)
				setConnected(false)
				setConnectRequest(false)
				if(props.userProfileIsArray) {
					props.setProfile(profile => profile.map((user) => {
						if(user.userid === props.profile.userid) {
							return {
								...user, amiblocked: true, connectRequestSent: false, connected: false, connectRequest:false
							}
						} else {
							return user
						}
					}))
				} else {
					props.setProfile(profile => ({
						...profile, amiblocked: true, connectRequestSent: false, connected: false, connectRequest:false
					}))
				}
			}
		});
		socket.on("receive_report_request", (data) => {
			if (data.myUserID === props.profile.userid) {
				setConnected(false)
				setConnectRequest(false)
			}
		});
		return () => {
			socket.off("receive_connect_request");
			socket.off("receive_disconnect_request");
			socket.off("receive_connected_request");
			socket.off("receive_unblocked_request");
			socket.off("receive_blocked_request");
			socket.off("receive_report_request");
			};
	// eslint-disable-next-line
	}, [socket, props.profile.userid]);

	async function handleBlock() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("http://localhost:3001/profile/block", {
						credentials: "include",
						method: "POST",
						headers: { 'content-type': 'application/json' },
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
										...user, blocked: true, connectRequestSent: false, connectRequest: false, connected: false
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, blocked: true, connectRequestSent: true, connectRequest: false, connected: false
							}))
						}
						socket.emit("send_blocked", {userid: props.profile.userid, path: pathname, wasConnected:connected})
						toast(data.message, { position: 'top-center', duration: 5000 })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	async function handleUnblock() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("http://localhost:3001/profile/block", {
						credentials: "include",
						method: "DELETE",
						headers: { 'content-type': 'application/json' },
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
										...user, blocked: false, connectRequestSent: false, connectRequest: false, connected: false
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, blocked: false, connectRequestSent: false, connectRequest: false, connected: false
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						socket.emit("send_unblocked", {userid: props.profile.userid, path: pathname})
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}
	
	async function handleReport() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("http://localhost:3001/profile/report", {
						credentials: "include",
						method: "POST",
						headers: { 'content-type': 'application/json' },
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
										...user, reported: true, connectRequestSent: false, connectRequest: false, connected: false
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, reported: true, connectRequestSent: false, connectRequest: false, connected: false
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						socket.emit("send_report", {userid: props.profile.userid, path: pathname})
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	async function handleUnreport() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("http://localhost:3001/profile/report", {
						credentials: "include",
						method: "DELETE",
						headers: { 'content-type': 'application/json' },
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
										...user, reported: false, connectRequestSent: false, connectRequest: false, connected: false
									}
								} else {
									return user
								}
							}))
						} else {
							props.setProfile(profile => ({
								...profile, reported: false, connectRequestSent: false, connectRequest: false, connected: false
							}))
						}
						toast(data.message, { position: 'top-center', duration: 5000 })
						socket.emit("update_last_active", { path: pathname })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	async function handleConnect() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("http://localhost:3001/profile/connect", {
						credentials: "include",
						method: "POST",
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({
							userid: props.profile.userid,
						})
					})
					const data = await response.json()
					if (data.status) {
						if(data.connected) {
							if(props.userProfileIsArray) {
								props.setProfile(profile => profile.map((user) => {
									if(user.userid === props.profile.userid) {
										return {
											...user, connectRequestSent: true, connected: true, connectRequest: true
										}
									} else {
										return user
									}
								}))
							} else {
								props.setProfile(profile => ({
									...profile, connectRequestSent: true, connected: true, connectRequest: true
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
							socket.emit("send_notification", { username: props.user.username, userid: props.profile.userid, type: "connect", path: pathname});
							socket.emit("send_connected", { userid: props.profile.userid, path: pathname});
							socket.emit("send_connect_request", { userid: props.profile.userid , path: pathname});
							props.setLoading(false)
					} else {
						toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}
	async function handleDisconnect() {
		try {
			props.setLoading(true)
			
			setTimeout(() => {
				(async function() {
					const response = await fetch(`http://localhost:3001/profile/disconnect/?userid1=${props.profile.userid}&userid2=${props.user.userid}`)
					const data = await response.json()
					if (data.status) {
						socket.emit("send_notification", { username: props.user.username, userid: props.profile.userid, type: "disconnect" });
					}
				})();
				(async function() {
					const response = await fetch("http://localhost:3001/profile/disconnect", {
						credentials: "include",
						method: "DELETE",
						headers: { 'content-type': 'application/json' },
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
						socket.emit("send_disconnect_request", { userid: props.profile.userid, path: pathname });
						props.setLoading(false)
					}
				})();
			}, 300)
		} catch (err) {
			toast("Oops something went wrong, please try again later", { position: 'top-center', duration: 5000 })
			props.setLoading(false)
		}
	}

	return (
			<>
				{!amIBlocked ?
					props.profile.canConnect && !props.profile.blocked ?
						props.profile.connectRequestSent && !props.profile.blocked ?
						<i className="material-icons profile_disconnect_btn" title="Disconnect" onClick={handleDisconnect}>star</i>
						:
						<i className="material-icons profile_connect_btn" title="Connect"  onClick={handleConnect}>star</i>
					:
					null
				:
				<i className="material-icons profile_connect_btn" title={props.profile.username + " has blocked you"}>do_not_disturb_on</i>
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
				{ connectRequest && !connected ?
				<i className="material-icons profile_connect_request" draggable="false" title={"Connection request"}>star_half</i>
				: null
				}
				{connectRequest && connected ?
				<i className="material-icons profile_connected" title="Connected">star</i>
				: null
				}
			</>
	);
}