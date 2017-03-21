import React, { Component } from 'react';


class Rate extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const { rates, currencyFrom, currencyTo } = this.props;
		const result = rates[currencyFrom][currencyTo]
		return (
			result ?
			<span>
	 			1{currencyFrom}={result}{currencyTo}
			</span>
		 	: null
		)
	}
}

Rate.propTypes = {
  currencyFrom: React.PropTypes.string.isRequired,
  currencyTo: React.PropTypes.string.isRequired,
  rates: React.PropTypes.object.isRequired
};

export default Rate