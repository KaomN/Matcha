import React from 'react'
import Pikaday from 'pikaday'

export default class PikadayWrap extends React.Component {
	constructor (params) {
		super(params)
		this.myRef = React.createRef()
		// Min 18 years of age
		this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
		// Get Max date from value props
		this.maxDateValue =  new Date(this.props.value);
		// Max year range
		this.maxYear = new Date().getFullYear() - 18
	}

	test(date) {
		this.props.onTest(date);
		//this.test = this.getMoment().format('DD-MM-YYYY')
	}

	componentDidMount () {
		new Pikaday({
		defaultDate: this.props.value !== undefined ? this.maxDateValue : this.maxDate,
		field: this.myRef.current,
		format: 'DD-MM-YYYY',
		firstDay: 0,
		maxDate: this.maxDate,
		onSelect: this.props.onSelect,
		yearRange: [1900,this.maxYear],
		 position: "bottom right"
		})
	}

	render () {
		return	<div>
					<input type='text' id={this.props.page === "profile" ? 'profile' : 'date'} className={this.props.page === "profile" ? 'text-align-center profile-pikaday' : 'text-align-center'} ref={this.myRef} autoComplete="off" placeholder={this.props.value}/>
				</div>
	}
}
