import React, { useContext } from 'react'

import styles from './NoExpenses.module.scss'

import { LanguageContext } from '../LanguageContext/LanguageContext'

const NoExpenses: React.FC = () => {
  const { language, languages } = useContext(LanguageContext)

  return <h1 className={styles.text}>{languages.noExpenses[language]}</h1>
}

export default NoExpenses
