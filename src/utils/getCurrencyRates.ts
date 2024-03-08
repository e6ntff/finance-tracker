import axios from 'axios';

const getCurrencyRates = async () =>
	axios.get('https://open.er-api.com/v6/latest/USD').then((data) => {
		const fullRates = data.data.rates;
		return { RUB: fullRates.RUB, EUR: fullRates.EUR, USD: fullRates.USD };
	});

export default getCurrencyRates;
