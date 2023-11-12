import React, { useContext, useEffect } from 'react'

import styles from './LanguageSelect.module.scss'

import { LanguageContext } from '../LanguageContext/LanguageContext'

const LanguageSelect = () => {
	useEffect(() => {
		setLanguage(localStorage.getItem('lang'))
	}, [])

  const { language, setLanguage } = useContext(LanguageContext)

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
		localStorage.setItem('lang', event.target.value)
  }

  return (
    <select
      className={styles.select}
      value={language}
      onChange={handleLanguageChange}
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="ua" disabled>
        Українська (coming soon...)
      </option>
      <option value="fr" disabled>
        Français (coming soon...)
      </option>
      <option value="de" disabled>
        Deutsch (coming soon...)
      </option>
    </select>
  )
}

export default LanguageSelect
