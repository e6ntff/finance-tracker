const getExchangeRates = async () => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    // const response = await fetch(
    //   'https://openexchangerates.org/api/latest.json?app_id=18b758f916234d23a83e2044e88c534e&base=USD&symbols=EUR%2CRUB&prettyprint=false&show_alternative=false',
    //   options
    // );
    // const data = await response.json();
    const data = {
      base: 'USD',
      disclaimer: 'Usage subject to terms: https://openexchangerates.org/terms',
      license: 'https://openexchangerates.org/license',
      rates: { EUR: 0.92314, RUB: 90.494508 },
      timestamp: 1699974001,
    };

    return data;
  } catch (err) {
    alert('Failed to get exchange rates');
  }
};

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

export { getExchangeRates, calculatePrices };
