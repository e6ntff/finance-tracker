import React, { createContext, useState, useEffect } from 'react'
import languages from '../../settings/languages'

const LanguageContext = createContext()

function LanguageProvider({ children }) {
  if (localStorage.getItem('lang') === null) localStorage.setItem('lang', 'en')

  const [language, setLanguage] = useState(localStorage.getItem('lang'))

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }
