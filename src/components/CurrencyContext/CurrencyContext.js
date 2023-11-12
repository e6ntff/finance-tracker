import React, { createContext, useState, useEffect } from 'react'
import {currencyRates} from '../../api/getExchangeRates'

const CurrencyContext = createContext()

function CurrencyProvider({ children }) {
  if (localStorage.getItem('curr') === null) localStorage.setItem('curr', 'USD')

  const [currency, setCurrency] = useState(localStorage.getItem('curr'))

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencyRates }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export { CurrencyContext, CurrencyProvider }
