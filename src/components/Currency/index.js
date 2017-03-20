import React, { Component } from 'react';

import styles from './styles.sass';


class Currency extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currency: props.currency,
			value: props.value
		}
		this.onInputChange = this.onInputChange.bind(this);
		this.onArrowClick = this.onArrowClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			currency: nextProps.currency,
			value: nextProps.value
		})
	}

	onInputChange(e){
		let value = Number(e.target.value);
		if(typeof value !== 'number' || isNaN(value)) {return}
		if(value<0){ value = 0 }

		this.setState({ value })
		this.props.onCurrencyValueChange(value)
	}

	onArrowClick(value){
		this.props.onCurrencyChange(value)
	}

	render () {
		const { currency } = this.state;
		const value = Math.round(this.state.value*100)/100;
		console.log(value)
		return (
			<div className={styles.currency}>
				<span className={styles.arrow} onClick={()=>{this.onArrowClick(-1)}}>&lt;</span>
				<div className={styles.container}>
					<span className={styles.currencyName}>{currency}</span>
					<div className={styles.right}>
						{value ? <span className={styles.prefix}>{this.props.prefix}</span> : null }
						<input 
							className={styles.value}
							type='text'
							size={String(value).length}
							onChange={this.onInputChange}
							value={value ? value : ''}
						/>
					</div>
				</div>
				<span className={styles.arrow} onClick={()=>{this.onArrowClick(1)}}>&gt;</span>
			</div>
		)
	}
}

Currency.propTypes = {
  value: React.PropTypes.number.isRequired,
  currency: React.PropTypes.string.isRequired,
  onCurrencyChange: React.PropTypes.func.isRequired,
  onCurrencyValueChange: React.PropTypes.func.isRequired
};

export default Currency