import * as actionTypes from '../actions/actionTypes';

const initalState = {
    currenciesFrom: ['GBP', 'EUR', 'USD'],
    currenciesTo:   ['GBP', 'EUR', 'USD'],
    activeFromCurrency: 0,
    activeToCurrency: 1,
    valueSetByUser: 0,
    lastChangedField: '',
    rates: {
      'GBP': {},
      'EUR': {},
      'USD': {}
    }
};

const rootReducer = (state = initalState, action) => {
	switch (action.type) {
    case actionTypes.UPDATE_RATES:
      return {
        ...state,
        rates: {
          ...state.rates,
          [action.data.base]: action.data.rates
        }
      };
    case actionTypes.CHANGE_SET_BY_USER_VALUE:
      return {
        ...state,
        valueSetByUser: action.data.valueSetByUser,
        lastChangedField: action.data.lastChangedField,
      }
    case actionTypes.CHANGE_ACTIVE_CURRENCY_FROM:
      return {
        ...state,
        activeFromCurrency: action.data.newIndex
      }
    case actionTypes.CHANGE_ACTIVE_CURRENCY_TO:
      return {
        ...state,
        activeToCurrency: action.data.newIndex
      }
		default:
			return state;
	  }
};

export default rootReducer;
