import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from '../context/UserContext';
import Cropper from 'react-easy-crop'
import "./styles/Home.css";

var numImages = 0;

export default function Home() {
	const { user, setUser } = useContext(UserContext);
	const [picture, setPicture] = useState([]);
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [imageSize, setImageSize] = useState("")
	
	const onCropComplete = useCallback((croppedArea) => {
		//console.log(croppedArea)
		setImageSize(croppedArea)
	})

	function saveChosenPicture(event) {
		if(picture.length < 4) {
			let pictureObj = event.target.files[0]
			if (pictureObj !== undefined) {
				let pictureSrc = URL.createObjectURL(pictureObj)
				setPicture([...picture, {id:++numImages, name:pictureObj, src: pictureSrc}]);
			}
		}
	}
	async function handleSubmit() {
		if(document.getElementById('picture') != null) {
			document.querySelector('.form_message_error').innerHTML = "Please choose a profile picture!"
		} else {
			const formdata = new FormData();
			formdata.append("x", imageSize.x)
			formdata.append("y", imageSize.y)
			formdata.append("cropWidth", imageSize.width)
			formdata.append("cropHeight", imageSize.height)
			// picture.map(pictureElem => (
			// 	formdata.append("pictureUpload" + pictureElem.id, pictureElem.name)
			// ));
			let response = await fetch('/request/uploadprofileimage', {
				method: "POST",
				body: formdata
			});
			response = await response.json();
			setUser(user => ( {
				...user,
				imageSrc: response.imageSrc
			}))
		}
	}

	var input;
	if (picture.length < 4) {
		input = <input type="file" accept="image/*" id="pictureUploads" onChange={saveChosenPicture}/>
	} else {
		input = "";
	}

	return (<main className="form-container ma">
					<div className="complete-profile-form">
						<div style={{backgroundColor: ""}}>
							<h1 className="title">Upload Pictures</h1>
							<div className="form_message form_message_error"></div>
						</div>
							<div className="complete-form-container">
								<div id="pictureForm">
									<div className="flex flex-col flex-align-center">
										<div className="flex flex-col flex-align-center">
											<p className="m-0">Choose pictures to upoad to your profile!</p>
											<p className="mt-0">Max 4 pictures!</p>
										</div>
									</div>
									<div className="flex-column-completeprofile">
										<div style={{border: "0px", marginBottom: "0.5rem"}}>
											{input}
										</div>
									</div>
									<div className="flex-center pl-1rem pr-1rem pb-1rem complete-form-image-container flex-col flex-justify-content-start">
										{picture.map(pictureElem => (
											<div key={pictureElem.id} data-key={pictureElem.id} className="flex-center wh-100p flex-col flex-justify-content-start">
												<img className="complete-form-img pt-1rem" src={pictureElem.src} alt=""/>
												<button className="complete-form-button" onClick={() => {
													setPicture(
														picture.filter(a =>
														a.id !== parseInt(pictureElem.id)
														)
													);
												}}>Delete</button>
											</div>
										))}
									</div>
									<div className="center-gap">
										<button className="complete-form-button" onClick={handleSubmit}>Submit</button>
									</div>
								</div>
							</div>
						</div>
					</main>);
}