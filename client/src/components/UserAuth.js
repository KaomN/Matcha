
export async function userAuth() {
	var response = await fetch('/request/getuserinfo', {
		credentials: "include",
		method: "GET",
	});
	response = await response.json()
	return response.auth;
}