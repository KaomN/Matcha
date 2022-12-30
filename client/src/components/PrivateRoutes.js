import React, { useEffect, useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { userAuth } from './UserAuth'; 

const PrivateRoutes = () => {
	const [state, setState] = useState("loading");

	// Get login status from server
	useEffect(() => {
		setTimeout(() => {
			(async function() {
				try {
					const isUserLogged = await userAuth();
					setState(isUserLogged ? true : false);
				} catch {
					setState(false);
				}
			})();
		}, 500)
	}, []);
	if(state === "loading") {
		return <LoadingSpinner />
	}

	return (
		state ? <Outlet /> : <Navigate to="/login" />
	)
}

export default PrivateRoutes