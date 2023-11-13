import React, { createContext, useState, Context } from 'react';
import languages from '../../settings/languages';

interface LanguageContextProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  languages: any;
}

const initialContextValue: LanguageContextProps = {
  language: 'en',
  setLanguage: () => {},
  languages: {},
};

const LanguageContext: Context<LanguageContextProps> =
  createContext(initialContextValue);

const LanguageProvider: React.FC<any> = ({ children }) => {
  // if (localStorage.getItem('lang') === null) localStorage.setItem('lang', 'en');

  const LangFromLocal: string | null = localStorage.getItem('lang');

  const [language, setLanguage] = useState<string>(
    typeof LangFromLocal === 'string' ? LangFromLocal : 'en'
  );

  const ContextValue: LanguageContextProps = {
    language,
    setLanguage,
    languages,
  };

  return (
    <LanguageContext.Provider value={ContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
