export default function PreferenceForm(props) {

	return (<main className="form-container ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="preferenceForm">
							<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
								<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Preference</label>
								<div className="form_message_error"></div>
							</div>
							<div className="flex-column-completeprofile">
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceFemale" defaultChecked={props.preference === "female" ? true : false} onClick={function(e) {props.setPreference("female")}}/>
									<label style={{fontSize: "23px"}} htmlFor="preferenceFemale">Female</label>
								</div>
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceMale" defaultChecked={props.preference === "male" ? true : false} onClick={function(e) {props.setPreference("male")}}/>
									<label style={{fontSize: "23px"}} htmlFor="preferenceMale">Male</label>
								</div>
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="radio" name="preference" style={{border: "0px", height: "1.5em", width: "1.5em"}} id="preferenceBoth" defaultChecked={props.preference === "both" ? true : false} onClick={function(e) {props.setPreference("both")}}/>
									<label style={{fontSize: "23px"}} htmlFor="preferenceBoth">Both</label>
								</div>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {document.querySelector('.form_message_error').innerHTML = ""; props.setShowForm("genderForm");}}>Previous</button>
								<button className="complete-form-button" onClick={() => {
										if(!document.getElementById('preferenceFemale').checked && !document.getElementById('preferenceMale').checked && !document.getElementById('preferenceBoth').checked) {
											document.querySelector('.form_message_error').innerHTML = "Empty field!"
										} else {
											document.querySelector('.form_message_error').innerHTML = ""
											props.setShowForm("biographyForm");
										}
									}}>Next</button>
							</div>
						</div>
					</div>
				</div>
			</main>);
}