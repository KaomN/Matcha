import React from 'react'
import Pikaday from 'pikaday'

export default class PikadayWrap extends React.Component {
	constructor (params) {
		super(params)
		this.myRef = React.createRef()
	}

	componentDidMount () {
		new Pikaday({
		field: this.myRef.current,
		format: 'DD-MM-YYYY',
		firstDay: 0,
		maxDate: new Date(new Date()),
		yearRange: [1900,2022]
		})
	}

	render () {
		return	<div>
					<input type='text' id="date" className='text-align-center' ref={this.myRef} autoComplete="off"/>
				</div>
	}
}
