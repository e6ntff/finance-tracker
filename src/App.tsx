import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';

import { LanguageProvider } from './components/LanguageContext/LanguageContext';
import { CurrencyProvider } from './components/CurrencyContext/CurrencyContext';
import { Provider } from 'react-redux';

import AppRoutes from './components/AppRoutes/AppRoutes';

import GlobalStore from './utils/store';

const App: React.FC = () => {
  return (
    <Provider store={GlobalStore}>
      <LanguageProvider>
        <CurrencyProvider>
          <Router>
            <Header />
            <div className="app">
              <AppRoutes />
            </div>
          </Router>
        </CurrencyProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default App;
