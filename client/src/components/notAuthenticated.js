import toast from "react-simple-toasts"

const notAuthenticated = function() {
	toast("Not Authenticated! Redirecting to Login page, please login again", { position: 'top-center', duration: 3000 })
		setTimeout(() => {
			window.location.reload()
		}, 3000)
}

export default notAuthenticated;