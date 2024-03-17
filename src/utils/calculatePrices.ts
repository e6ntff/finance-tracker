import constants from '../settings/constants';
import { currencies, rates } from '../settings/interfaces';

const calculatePrices = (
	prices: currencies,
	rates: rates,
	currency: string = constants.baseCurrency
) => {
	switch (currency) {
		case 'USD':
			prices['EUR'] = prices['USD'] * rates['EUR'];
			prices['RUB'] = prices['USD'] * rates['RUB'];
			break;
		case 'EUR':
			prices['USD'] = prices['EUR'] / rates['EUR'];
			prices['RUB'] = (prices['EUR'] * rates['RUB']) / rates['EUR'];
			break;
		case 'RUB':
			prices['EUR'] = (prices['RUB'] / rates['RUB']) * rates['EUR'];
			prices['USD'] = prices['RUB'] / rates['RUB'];
			break;
		default:
	}

	return prices;
};

export default calculatePrices;
