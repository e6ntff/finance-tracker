import React, { createContext, useState, useEffect } from 'react'
import { getExchangeRates } from '../../api/getExchangeRates'

const CurrencyContext = createContext()

function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(localStorage.getItem('curr'))
  const [currencyRates, setCurrencyRates] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getExchangeRates()
        setCurrencyRates(rates.rates)
      } catch (error) {
        console.error('Error fetching currency rates:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencyRates }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export { CurrencyContext, CurrencyProvider }
