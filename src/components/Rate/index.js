import React, { Component } from 'react';

import styles from './styles.sass';


class Rate extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
	}

	render () {
		const { rates, currencyFrom, currencyTo } = this.props;
		const result = rates[currencyFrom][currencyTo]
		return (
			<div className={styles.rate}>
				{result ?
					<span className={styles.rate__value}>
			 			1{currencyFrom}={result}{currencyTo}
					</span>
				 : null}
			</div>
		)
	}
}

Rate.propTypes = {
  currencyFrom: React.PropTypes.string.isRequired,
  currencyTo: React.PropTypes.string.isRequired,
  rates: React.PropTypes.object.isRequired
};

export default Rate