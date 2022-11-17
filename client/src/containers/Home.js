import {useState} from "react";
import "./styles/Home.css";

export default function Home() {
	const [src, setSrc]= useState("");

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				// Success function
				showPosition, 
				// Error function
				getLocationAPI, 
				// Options. See MDN for details.
				{
				   enableHighAccuracy: true,
				   timeout: 5000,
				   maximumAge: 0
				});
		} else { 
			// Log not supported
			console.log("Geolocation is not supported by this browser.");
		}
	}

	function showPosition(position) {
		console.log(position.coords.latitude)
	}

	async function getLocationAPI() {
		let response = await fetch('/request/getlocation', {
			method: "POST",
			headers: { 'content-type': 'application/json' },
		});
		response = await response.json();
		console.log(response)

		// let response = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB8wL82E7kWfGIg8uMCXmCnQmPSOzERdAY', {
		// 	method: "POST",
		// 	headers: { 'content-type': 'application/json' },
		// });
		// response = await response.json();
		// console.log("testing google maps api")
		// console.log(response.location["lat"], response.location["lng"])
	}
	getLocation();
	return (
		<main>
			<h3>Logged in!</h3>
		</main>
	);
}