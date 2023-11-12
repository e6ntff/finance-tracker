const getSymbol = (currency) => {
	if (currency === 'USD') return '$'
	if (currency === 'EUR') return '€'
	if (currency === 'RUB') return '₽'
	return ''
}

export default getSymbol