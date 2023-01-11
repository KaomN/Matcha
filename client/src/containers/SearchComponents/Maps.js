import { useMemo } from "react";
import GoogleMaps from "./GoogleMaps";

export default function Maps(props) {
	const Maps = useMemo(() =>
		<GoogleMaps
		position={props.location}
		setSavedPosition={props.setLocation}
		isLoaded={props.isLoaded}/>
	,[props.location]);
	return (
		<div className="search_map_container">
			{Maps}
		</div>
	);
}