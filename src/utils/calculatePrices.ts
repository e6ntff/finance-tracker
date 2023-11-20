import constants from '../settings/constants';

import { currencies, rates } from '../settings/interfaces';

const calculatePrices = (
  prices: currencies,
  rates: rates,
  currency: string = constants.baseCurrency
) => {
  switch (currency) {
    case 'USD':
      prices['EUR'] = Math.round(prices['USD'] * rates['EUR']);
      prices['RUB'] = Math.round(prices['USD'] * rates['RUB']);
      break;
    case 'EUR':
      prices['USD'] = Math.round(prices['EUR'] / rates['EUR']);
      prices['RUB'] = Math.round((prices['EUR'] * rates['RUB']) / rates['EUR']);
      break;
    case 'RUB':
      prices['EUR'] = Math.round((prices['RUB'] / rates['RUB']) * rates['EUR']);
      prices['USD'] = Math.round(prices['RUB'] / rates['RUB']);
      break;
    default:
  }

  return prices;
};

export default calculatePrices;
