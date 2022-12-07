import React from 'react'
import Pikaday from 'pikaday'

export default class PikadayWrap extends React.Component {
	constructor (params) {
		super(params)
		this.myRef = React.createRef()
		// Min 18 years of age
		this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
		// Max year range
		this.maxYear = new Date().getFullYear() - 18
	}

	componentDidMount () {
		new Pikaday({
		defaultDate: this.maxDate,
		field: this.myRef.current,
		format: 'DD-MM-YYYY',
		firstDay: 0,
		maxDate: this.maxDate,
		yearRange: [1900,this.maxYear]
		})
	}

	render () {
		return	<div>
					<input type='text' id="date" className='text-align-center' ref={this.myRef} autoComplete="off"/>
				</div>
	}
}
