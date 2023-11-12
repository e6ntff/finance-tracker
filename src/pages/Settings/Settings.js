import React, { useContext } from 'react'

import styles from './Settings.module.scss'

import { LanguageContext } from '../../components/LanguageContext/LanguageContext'

const Settings = () => {
  const { language, languages } = useContext(LanguageContext)

  return (
    <div className={styles.settings}>
      <div className={styles.container}>
        <span className={styles.name}>{languages.language[language]}</span>
        <span className={styles.value}></span>
      </div>
    </div>
  )
}
