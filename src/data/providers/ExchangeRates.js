import * as requestProvider from '../helpers/fetch';

const API = 	'https://openexchangerates.org/api/';
const APP_ID = 	'04d686b02b664dceb0419502d44d2bd5';

export const getLatest = async (baseCurrency = 'USD') => {
	return requestProvider.get({
  	url: `${API}latest.json?app_id=${APP_ID}&base=${baseCurrency}`
	})
	.then(resp => {
		return resp;
	}).catch(error => {
		return Promise.reject(error);
	});
};