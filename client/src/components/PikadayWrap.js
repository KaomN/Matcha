import React from 'react'
import Pikaday from 'pikaday'

export default class PikadayWrap extends React.Component {
	constructor (params) {
		super(params)
		this.myRef = React.createRef()
		// Min 18 years of age
		this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
		// min 100 years of age
		this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 100))
		// Get Max date from value props
		if(this.props.value) {
			const dateParts = this.props.value.split('-')
			this.maxDateValue =  new Date(dateParts[1] + '-' + dateParts[0] + '-' + dateParts[2]);
		}
		// Max year range
		this.maxYear = new Date().getFullYear() - 18
		// Min Year range
		this.minYear = new Date().getFullYear() - 100
	}

	componentDidMount () {
		new Pikaday({
		defaultDate: this.props.value !== undefined ? this.maxDateValue : this.maxDate,
		field: this.myRef.current,
		format: 'DD-MM-YYYY',
		firstDay: 0,
		maxDate: this.maxDate,
		minDate: this.minDate,
		onSelect: this.props.onSelect,
		yearRange: [this.minYear,this.maxYear],
		 position: "bottom right"
		})
	}

	render () {
		return	<div>
					<input type='text' id={this.props.page === "profile" ? 'profile' : 'date'} className={this.props.page === "profile" ? 'text-align-center profile-pikaday' : 'text-align-center'} ref={this.myRef} autoComplete="off" placeholder={this.props.value} readOnly/>
				</div>
	}
}
