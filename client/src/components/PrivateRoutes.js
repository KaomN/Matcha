import React, { useEffect, useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner';

async function userAuth() {
	var response = await fetch('/request/getloginstatus', {
		credentials: "include",
		method: "GET",
	});
	response = await response.json()
	return response.auth;
}

const PrivateRoutes = () => {
	const [state, setState] = useState("loading");

	// Get login status from server
	useEffect(() => {
		// TIMEOUT FOR TESTING PURPOSES ONLY.
		setTimeout(() => {
			(async function() {
				try {
					const isUserLogged = await userAuth();
					console.log(isUserLogged)
					setState(isUserLogged ? true : false);
				} catch {
					setState(false);
				}
			})();
		}, 1000)
	}, []);
	if(state === "loading") {
		return <LoadingSpinner />
	}

	return (
		state ?  <Outlet /> : <Navigate to="/login" />
	)
}

export default PrivateRoutes