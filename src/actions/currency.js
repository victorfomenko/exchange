import * as actionTypes from './actionTypes';
import * as ExchangeRates from '../data/providers/ExchangeRates';


export const updateRates = (baseCurrency) => async (dispatch) => {
  let data = await ExchangeRates.getLatest(baseCurrency);
  dispatch({ type: actionTypes.UPDATE_RATES, data });
}

export const changeValues = ({ valueSetByUser, lastChangedField }) => (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_SET_BY_USER_VALUE,  data: { valueSetByUser, lastChangedField } });
}

export const changeActiveCurrencyFrom = ({ direction }) => async (dispatch, getState) => {
	const state = getState();
  const newIndex = getNewIndex(state.currenciesFrom, state.activeFromCurrency, direction);
  const baseCurrency = state.currenciesFrom[newIndex];

  dispatch({ type: actionTypes.CHANGE_ACTIVE_CURRENCY_FROM, data: { newIndex } });
  
  if(!Object.keys(state.rates[baseCurrency]).length){
    let data = await ExchangeRates.getLatest(baseCurrency);
    dispatch({ type: actionTypes.UPDATE_RATES, data });  
  }
  
}

export const changeActiveCurrencyTo = ({ direction }) => (dispatch, getState) => {
	const state = getState();
  const newIndex = getNewIndex(state.currenciesTo, state.activeToCurrency, direction)
  dispatch({ type: actionTypes.CHANGE_ACTIVE_CURRENCY_TO, data: { newIndex } });
}

const getNewIndex = (array, currentIndex, direction) => {
  const lastIndex = array.length-1;
  let newIndex = currentIndex;

  if(currentIndex+direction < 0){
    newIndex = lastIndex;
  }
  else if (currentIndex+direction > lastIndex){
    newIndex = 0;
  }
  else {
    newIndex = currentIndex+direction;
  }
  return newIndex
}