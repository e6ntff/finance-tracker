import React, { useContext } from 'react'
import { LanguageContext } from '../LanguageContext/LanguageContext'

import styles from './RefreshButton.module.scss'

import getList from '../../api/getList'
import { calculatePrices } from '../../api/getExchangeRates'
import { CurrencyContext } from '../CurrencyContext/CurrencyContext'

const RefreshButton = (props) => {
  const { language, languages } = useContext(LanguageContext)

  const { currencyRates } = useContext(CurrencyContext)

  const refresh = () => {
    getList().then((data) => {
      // console.log(data)
      return props.setList(
        data.map((item) => ({
          ...item,
          price: calculatePrices(item.price, currencyRates),
        }))
      )
    })
  }

  return (
    <button className={styles.button} onClick={refresh}>
      {languages.fetch[language]}
    </button>
  )
}

export default RefreshButton
