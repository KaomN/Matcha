import React, {useState} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

function GoogleMaps(props) {
	const [markerPos, setMarkerPos] = useState(props.position)
	const [initialPosition, setInitialPosition] = useState(props.position)
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_API_KEY,
	});
	async function handleChange(event) {
		const newPosition = event.latLng.toJSON();
		props.setSavedPosition(newPosition);
		setMarkerPos(newPosition)
	}
	return (
		<>
		{isLoaded && <GoogleMap
			mapContainerClassName="search_map"
			center={initialPosition}
			zoom={10}
			clickableIcons={false}
			options={{ mapTypeControl: false, fullscreenControl: false, streetViewControl: false}}
			onClick={handleChange}
			>
				<Marker
					position={markerPos}
				>
				</Marker>
			</GoogleMap>}
		</>
	)
}

export default React.memo(GoogleMaps)