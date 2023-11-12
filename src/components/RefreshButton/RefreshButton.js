import React, { useContext } from 'react'
import { LanguageContext } from '../LanguageContext/LanguageContext'

import styles from './RefreshButton.module.scss'

import getList from '../../api/getList'
import { calculatePrices, currencyRates } from '../../api/getExchangeRates'

const RefreshButton = (props) => {
  const { language, languages } = useContext(LanguageContext)

  const refresh = () => {
    getList().then((data) =>
      props.setList(
        data.map(
          (item) => ({...item, price: calculatePrices(item.price, currencyRates)})
        )
      )
    )
  }

  return (
    <button className={styles.button} onClick={refresh}>
      {languages.fetch[language]}
    </button>
  )
}

export default RefreshButton
