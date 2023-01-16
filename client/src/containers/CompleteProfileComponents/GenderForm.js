export default function GenderForm(props) {

	return (<main className="form-container ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="preferenceForm">
							<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
								<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Gender</label>
								<div className="form_message_error"></div>
							</div>
							<div className="flex-column-completeprofile">
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}}  id="genderMale" defaultChecked={props.gender === "male" ? true : false } onClick={function(e) {props.setGender("male")}}/>
									<label style={{fontSize: "23px"}} defaultChecked={props.gender === "male" ? true : false }  htmlFor="genderMale">Male</label>
								</div>
								<div style={{border: "0px", marginBottom: "0.5rem"}}>
									<input type="radio" name="gender" style={{border: "0px", height: "1.5em", width: "1.5em"}}  id="genderFemale" onClick={function(e) {props.setGender("female")}}/>
									<label style={{fontSize: "23px"}} htmlFor="genderFemale">Female</label>
								</div>
							</div>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {document.querySelector('.form_message_error').innerHTML = ""; props.setShowForm("ageForm");}}>Previous</button>
								<button className="complete-form-button" onClick={() => {
										if(!document.getElementById('genderMale').checked && !document.getElementById('genderFemale').checked) {
											document.querySelector('.form_message_error').innerHTML = "Empty field!"
										} else {
											document.querySelector('.form_message_error').innerHTML = ""
											props.setShowForm("preferenceForm");
										}
									}}>Next</button>
							</div>
						</div>
					</div>
				</div>
			</main>);
}