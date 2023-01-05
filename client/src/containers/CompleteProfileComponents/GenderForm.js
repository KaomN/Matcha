export default function GenderForm(props) {

	return (<main className="form-container ma">
				<div className="complete-profile-form">
					<div style={{backgroundColor: ""}}>
						<h1 className="title">Complete your profile</h1>
					</div>
					<div className="complete-form-container">
						<div id="genderForm">
							<div style={{fontSize: "23px", marginBottom: "0.5rem"}}>
								<label style={{fontSize: "23px", marginBottom: "0.5rem"}}>Gender</label>
								<div className="form_message_error"></div>
							</div>
							<select className="completeprofile_select" id="genderSelect" style={{border: "0px", marginBottom: "1.5rem"}} onChange={function(e) {props.setGender(e.target.value)}} defaultValue={props.gender}>
								<option value="" >Gender</option>
								<option value="male" >Male</option>
								<option value="female">Female</option>
							</select>
							<div className="center-gap">
								<button className="complete-form-button" onClick={() => {document.querySelector('.form_message_error').innerHTML = ""; props.setShowForm("ageForm");}}>Previous</button>
								<button className="complete-form-button" onClick={() => {
										if(document.getElementById('genderSelect').value === "") {
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