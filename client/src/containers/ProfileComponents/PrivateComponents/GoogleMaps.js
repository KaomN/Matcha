import React, {useState} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

const containerStyle = {
	width: '100%',
	height: '300px',
};

function GoogleMaps({position, setSavedPosition}) {
	const [markerPos, setMarkerPos] = useState(position)
	const [ initialPosition ] = useState(position)
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_API_KEY,
	});
	
	async function handleChange(event) {
		const newPosition = event.latLng.toJSON();
		setSavedPosition(newPosition);
		setMarkerPos(newPosition)
	}
	
	return (
		<>
		{isLoaded && <GoogleMap
			mapContainerStyle={containerStyle}
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