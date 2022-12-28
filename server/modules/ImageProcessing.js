const sharp = require('sharp');

const uploadImage = async (image, path, imageSize) => {
	try {
		const rotate = await sharp(image).rotate().toBuffer();
		const metaData = await sharp(rotate).metadata()
		const left = (imageSize.x / Math.pow(10, 2)) * metaData.width
		const top = (imageSize.y / Math.pow(10, 2)) * metaData.height
		const width = (imageSize.width / Math.pow(10, 2)) * metaData.width
		const height = (imageSize.height / Math.pow(10, 2)) * metaData.height
		await sharp(rotate)
						.extract({left: parseInt(left.toFixed(2)), top: parseInt(top.toFixed(2)), width: parseInt(width.toFixed(2)), height: parseInt(height.toFixed(2))})
						.toFile(path)
		return true
	} catch(err) {
		//console.log(err)
		return false; 
	}
}

module.exports = {
	uploadImage,
}