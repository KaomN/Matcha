
export async function userAuth() {
	var response = await fetch('http://localhost:3001/request/getuserinfo', {
		credentials: "include",
		method: "GET",
	});
	response = await response.json()
	return response.auth;
}