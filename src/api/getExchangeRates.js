const getExchangeRates = () => {
  // const options = { method: 'GET', headers: { accept: 'application/json' } }

  // try {
  //   const response = await fetch(
  //     'https://openexchangerates.org/api/latest.json?app_id=18b758f916234d23a83e2044e88c534e&base=USD&symbols=EUR%2CRUB&prettyprint=false&show_alternative=false',
  //     options
  //   )
  // 	const data = await response.json()
  // 	console.log(111)
  // 	return data
  // } catch (err) {
  //   alert('Failed to get exchange rates')
  // }
  console.log('got rates')
  return {
    disclaimer: 'Usage subject to terms: https://openexchangerates.org/terms',
    license: 'https://openexchangerates.org/license',
    timestamp: 1699794020,
    base: 'USD',
    rates: {
      EUR: 0.933264,
      RUB: 92.180001,
    },
  }
}

const calculatePrices = (prices, rates, currency = 'USD') => {
  switch (currency) {
    case 'USD': {
      prices['EUR'] = Math.round(rates['EUR'] * prices['USD'])
      prices['RUB'] = Math.round(rates['RUB'] * prices['USD'])
      break
    }
    case 'EUR': {
      prices['USD'] = Math.round(prices['EUR'] / rates['EUR'])
      prices['RUB'] = Math.round(prices['EUR'] / (rates['EUR'] / rates['RUB']))
      break
    }
    case 'RUB': {
      prices['EUR'] = Math.round(prices['RUB'] / (rates['RUB'] / rates['EUR']))
      prices['USD'] = Math.round(prices['RUB'] / rates['RUB'])
      break
    }
  }

  return prices
}

const currencyRates = getExchangeRates().rates

export { getExchangeRates, currencyRates, calculatePrices }
