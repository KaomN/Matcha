const sharp = require('sharp');
//const { v4: uuidv4 } = require('uuid');

const uploadProfileImage = async (image, path, req) => {
	try {
		const rotate = await sharp(image).rotate().toBuffer();
		const metaData = await sharp(rotate).metadata()
		const left = (req.body.x / Math.pow(10, 2)) * metaData.width
		const top = (req.body.y / Math.pow(10, 2)) * metaData.height
		const width = (req.body.cropWidth / Math.pow(10, 2)) * metaData.width
		const height = (req.body.cropHeight / Math.pow(10, 2)) * metaData.height
		sharp(rotate)
			.extract({left: parseInt(left.toFixed(2)), top: parseInt(top.toFixed(2)), width: parseInt(width.toFixed(2)), height: parseInt(height.toFixed(2))})
			.toFile(path, function (err) {
				if (err) {
					console.log(err)
					return false;
				}
			})
		return true;
	} catch(err) {
		return false;
	}
}

module.exports = {
	uploadProfileImage,
}