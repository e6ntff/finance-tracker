import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  json,
} from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';
import Expenses from './pages/Expenses/Expenses';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { LanguageProvider } from './components/LanguageContext/LanguageContext';
import { CurrencyProvider } from './components/CurrencyContext/CurrencyContext';
import { Provider } from 'react-redux';

import paths from './settings/paths';
import Settings from './pages/Settings/Settings';

import GlobalStore from './utils/store';

const App: React.FC = () => {
  return (
    <Provider store={GlobalStore}>
      <LanguageProvider>
        <CurrencyProvider>
          <Router>
            <Header />
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to={paths.home} />} />
                <Route path={paths.dashboard} element={<Dashboard />} />
                <Route path={paths.expenses} element={<Expenses />} />
                <Route path={paths.home} element={<Home />} />
                <Route path={paths.settings} element={<Settings />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </div>
          </Router>
        </CurrencyProvider>
      </LanguageProvider>
    </Provider>
  );
};

export default App;
