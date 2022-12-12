import { useState, useEffect } from "react";
import { trackPromise} from 'react-promise-tracker';
import { useParams } from "react-router-dom"

export default function Profile() {
	const [profile, setProfile] = useState("loading");
	let params = useParams()
	useEffect(() => {
		function fetchProfileInfo() {
			const promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(fetch('/profile/getprofile', {
						credentials: "include",
						method: "POST",
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({
							profileID: params.profileId,
						})
					})
					.then((response) => response.json()));
				}, 500)
			});
			return promise
		}
		(async function() {
			setProfile(await trackPromise(fetchProfileInfo()))
		})();
	}, []);
	console.log(profile)

	return (
		<main>
			<h3>Show Profiles</h3>
		</main>
	);
}