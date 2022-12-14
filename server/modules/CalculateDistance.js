function distance(lat1, lng1, lat2, lng2) {
	lng1 = lng1 * Math.PI / 180;
	lng2 = lng2 * Math.PI / 180;
	lat1 = lat1 * Math.PI / 180;
	lat2 = lat2 * Math.PI / 180;

	let dlng = lng2 - lng1;
	let dlat = lat2 - lat1;
	 // Haversine formula
	let a = Math.pow(Math.sin(dlat / 2), 2)
			+ Math.cos(lat1) * Math.cos(lat2)
			* Math.pow(Math.sin(dlng / 2),2);
		
	let c = 2 * Math.asin(Math.sqrt(a));

	let r = 6371;

	return(parseInt(c * r));
}

module.exports = { distance };