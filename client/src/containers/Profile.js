//import {useState} from "react";
import { useParams } from "react-router-dom"

export default function Profile() {
	let params = useParams()
	console.log(params)
	if(params && Object.keys(params).length === 0 && Object.getPrototypeOf(params) === Object.prototype) {
		return (
			<main>
				<h3>Show user profile</h3>
			</main>
		);
	} else {

	// TODO add fetching user information
	
		return (
			<main>
				<h3>other Profiles</h3>
			</main>
		);
	}
}