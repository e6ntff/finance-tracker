import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';

import { LanguageProvider } from './components/LanguageContext/LanguageContext';
import { CurrencyProvider } from './components/CurrencyContext/CurrencyContext';
import { Provider } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './utils/firebase';

import AppRoutes from './components/AppRoutes/AppRoutes';

import GlobalStore from './utils/store';

const auth = getAuth(firebaseApp);

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLogged(!!authUser);
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={GlobalStore}>
      <LanguageProvider>
        <CurrencyProvider>
          {loading &  : <Router>
            {logged && <Header />}
            {logged ? (
              <div className="app">
                <AppRoutes logged={logged}/>
              </div>
            ) : (
              <div className="form">
                <AppRoutes logged={logged}/>
              </div>
            )}
          </Router>}
        </CurrencyProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default App;
