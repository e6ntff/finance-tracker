import React, { useContext } from 'react'

import styles from './Settings.module.scss'

import { LanguageContext } from '../../components/LanguageContext/LanguageContext'
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect'

const Settings = () => {
  const { language, languages } = useContext(LanguageContext)

  return (
    <div className={styles.settings}>
      <div className={styles.container}>
        <h2 className={styles.name}>{languages.language[language]}</h2>
        <LanguageSelect />
      </div>
    </div>
  )
}

export default Settings
