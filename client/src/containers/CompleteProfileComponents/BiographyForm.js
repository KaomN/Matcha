export default function BiographyForm(props) {

	return (<main className="form-container ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="biographyForm">
							<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
								<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Biography</label>
								<div className="form_message_error"></div>
							</div>
							<div className="flex-column-completeprofile">
								<textarea cols={35} rows={10} id="biographyText" onChange={function(e) {props.setBiography(e.target.value)}} defaultValue={props.biography}></textarea>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {document.querySelector('.form_message_error').innerHTML = ""; props.setShowForm("preferenceForm");;}}>Previous</button>
								<button className="complete-form-button" onClick={() => {
									if(document.getElementById('biographyText').value === "") {
										document.querySelector('.form_message_error').innerHTML = "Empty field!"
									} else {
										document.querySelector('.form_message_error').innerHTML = ""
										props.setShowForm("interestForm");
									}
									}}>Next</button>
							</div>
						</div>
					</div>
				</div>
			</main>);
}