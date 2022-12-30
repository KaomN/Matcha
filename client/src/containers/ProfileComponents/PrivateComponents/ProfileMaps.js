import { useMemo, useState } from "react";
import GoogleMaps from "./GoogleMaps";
import { HandleSubmit } from "../HandleSubmit";
import { LoadingSpinnerPromiseComponent } from "../../../components/LoadingSpinnerPromiseComponent";

export default function ProfileMaps(props) {

	const [savedPosition, setSavedPosition] = useState({lat: parseFloat((props.latitude === null) ? 60.167867048720026 : props.latitude), lng: parseFloat((props.longitude === null) ? 24.945892132588806 : props.longitude)});
	const [errorPosition, setErrorPosition] = useState("");
	const [promiseTracker, setPromiseTracker] = useState(false);

	const Maps = useMemo(() => <GoogleMaps position={savedPosition} setSavedPosition={setSavedPosition}/>, []);
	return (
		<div className="profile-component-items">
			{Maps}
			<div className="profile-input-error">{errorPosition}</div>
			{ promiseTracker ?
			<LoadingSpinnerPromiseComponent/>
			:
			<button className="profile-button" onClick={() => {HandleSubmit({
				...props,
				savedPosition,
				setErrorPosition,
				setPromiseTracker,
				type: "position",
			})}}>Save</button>
			}
		</div>
	);
}