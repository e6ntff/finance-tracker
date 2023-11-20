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
import Preloader from './components/Preloader/Preloader';
import setTheme from './utils/themes';

const auth = getAuth(firebaseApp);

setTheme(localStorage.getItem('theme') === 'dark' ? true : false);

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLogged(!!authUser);
      setUser(JSON.parse(JSON.stringify(authUser)) || {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={GlobalStore}>
      <LanguageProvider>
        <CurrencyProvider>
          {loading ? (
            <Preloader />
          ) : (
            <Router>
              {logged && <Header />}
              {logged ? (
                <AppRoutes logged={logged} user={user} />
              ) : (
                <AppRoutes logged={logged} user={user} />
              )}
            </Router>
          )}
        </CurrencyProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default App;
