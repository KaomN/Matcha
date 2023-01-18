
export async function userAuth() {
	var response = await fetch('http://localhost:3001/user/getuserinfo', {
		credentials: "include",
		method: "GET",
	});
	response = await response.json()
	return response.auth;
}