import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateRates, changeValues, changeActiveCurrencyFrom, changeActiveCurrencyTo } from '../../actions/currency'

import Rate from '../Rate'
import Currency from '../Currency'

import styles from './styles.sass';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currencyFrom: props.currenciesFrom[props.activeFromCurrency],
			currencyTo: props.currenciesTo[props.activeToCurrency],
			currencyFromValue: 0,
			currencyToValue: 0,
			lastChangedField: props.lastChangedField
		}
		this.onCurrencyFromChange = this.onCurrencyFromChange.bind(this);
		this.onCurrencyFromValueChange = this.onCurrencyFromValueChange.bind(this);
		this.onCurrencyToChange = this.onCurrencyToChange.bind(this);
		this.onCurrencyToValueChange = this.onCurrencyToValueChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const currencyFrom = nextProps.currenciesFrom[nextProps.activeFromCurrency];
		const currencyTo = nextProps.currenciesTo[nextProps.activeToCurrency];
		const rate = nextProps.rates[currencyFrom][currencyTo];
		let currencyFromValue = this.state.currencyFromValue;
		let currencyToValue = this.state.currencyToValue;

		switch (nextProps.lastChangedField) {
			case 'from':
				currencyFromValue = nextProps.valueSetByUser;
				currencyToValue = nextProps.valueSetByUser*rate;
				break;
			case 'to':
				currencyFromValue = nextProps.valueSetByUser/rate;
				currencyToValue = nextProps.valueSetByUser;
				break;
		}
		this.setState({
			currencyFrom,
			currencyTo,
			currencyFromValue,
			currencyToValue
		})
	}

	componentDidMount() {
		const currencyFrom = this.state.currencyFrom;
		this.props.updateRates(currencyFrom);
		this.timer = setInterval(
			() => this.props.updateRates(this.state.currencyFrom),
			10000
		)
		document.querySelector('input').focus();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	onCurrencyFromChange(value){
		this.props.changeActiveCurrencyFrom({direction: value})
	}

	onCurrencyFromValueChange(value){
		this.props.changeValues({
			valueSetByUser: value,
			lastChangedField: 'from'
		})
	}

	onCurrencyToChange(value){
		this.props.changeActiveCurrencyTo({ direction: value })
	}

	onCurrencyToValueChange(value) {
		this.props.changeValues({
			valueSetByUser: value,
			lastChangedField: 'to'
		})
	}

	render () {
		const { currencyFrom, currencyTo, currencyFromValue, currencyToValue } = this.state;

		return(
			<div className={styles.revolut}>
  			<Rate
  				currencyFrom={currencyFrom}
  				currencyTo={currencyTo}
  				rates={this.props.rates}
  			/>
  			<Currency
  				value={currencyFromValue}
  				prefix={'-'}
  				currency={currencyFrom}
  				onCurrencyChange={this.onCurrencyFromChange}
  				onCurrencyValueChange={this.onCurrencyFromValueChange}
  			/>
  			<Currency
  				value={currencyToValue}
  				prefix={'+'}
  				currency={currencyTo}
  				onCurrencyChange={this.onCurrencyToChange}
  				onCurrencyValueChange={this.onCurrencyToValueChange}
  			/>
			</div>
		)
	}
}
App.propTypes = {
  updateRates: React.PropTypes.func.isRequired,
  changeValues: React.PropTypes.func.isRequired,
  changeActiveCurrencyFrom: React.PropTypes.func.isRequired,
  changeActiveCurrencyTo: React.PropTypes.func.isRequired,
};

export default connect(state => (state), { updateRates, changeValues, changeActiveCurrencyFrom, changeActiveCurrencyTo })(App);
