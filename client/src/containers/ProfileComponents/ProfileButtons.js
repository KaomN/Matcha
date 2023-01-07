import toast from 'react-simple-toasts';

export default function ProfileButtons(props) {

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
						props.setProfile(profile => ({
							...profile, blocked: true
						}))
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
						props.setProfile(profile => ({
							...profile, blocked: false
						}))
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
						props.setProfile(profile => ({
							...profile, reported: true
						}))
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
						props.setProfile(profile => ({
							...profile, reported: false
						}))
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
						props.setProfile(profile => ({
							...profile, connectRequestSent: true
						}))
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

	async function handleDisconnect() {
		try {
			props.setLoading(true)
			setTimeout(() => {
				(async function() {
					const response = await fetch("/profile/disconnect", {
						method: "DELETE",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							userid: props.profile.userid,
							username: props.profile.username
						})
					})
					const data = await response.json()
					if (data.status) {
						props.setProfile(profile => ({
							...profile, connectRequestSent: false
						}))
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
				{props.profile.connectRequest ?
					props.profile.connected ?
					<i className="material-icons profile_connected" title="Connect">star</i>
					:
					<i className="material-icons profile_connect_request" draggable="false" title="Connect Request">star_half</i>
				:
				null
				}
			</>
	);
}