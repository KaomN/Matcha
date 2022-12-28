import React, {useState} from "react";
import { GoogleMap, LoadScript, Marker,  } from "@react-google-maps/api"

const containerStyle = {
	width: '100%',
	height: '300px',
};

function GoogleMaps({position, setSavedPosition}) {
	const [markerPos, setMarkerPos] = useState(position)

	async function handleChange(event) {
		const newPosition = event.latLng.toJSON();
		setSavedPosition(newPosition);
		setMarkerPos(newPosition)
	}
	
	return (
		<LoadScript
		googleMapsApiKey={process.env.REACT_APP_API_KEY}
		>
			<GoogleMap
			mapContainerStyle={containerStyle}
			center={position}
			zoom={10}
			clickableIcons={false}
			options={{ mapTypeControl: false, fullscreenControl: false, streetViewControl: false}}
			onClick={handleChange}
			>
				<Marker
					position={markerPos}
				>
				</Marker>
			</GoogleMap>
		</LoadScript>
	)
}

export default React.memo(GoogleMaps)