import React from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import Expenses from '../../pages/Expenses/Expenses';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

import paths from '../../settings/paths';

import Settings from '../../pages/Settings/Settings';
import Categories from '../../pages/Categories/Categories';
import Login from '../../pages/Login/Login';

interface Props {
  logged: boolean;
}

const AppRoutes: React.FC<Props> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.home} />} />
      <Route path={paths.login} element={!props.logged && <Login />} />
      <Route
        path={paths.dashboard}
        element={props.logged ? <Dashboard /> : <Navigate to={paths.login} />}
      />
      <Route
        path={paths.expenses}
        element={props.logged ? <Expenses /> : <Navigate to={paths.login} />}
      />
      <Route
        path={paths.home}
        element={props.logged ? <Home /> : <Navigate to={paths.login} />}
      />
      <Route
        path={paths.settings}
        element={props.logged ? <Settings /> : <Navigate to={paths.login} />}
      />
      <Route
        path={paths.categories}
        element={props.logged ? <Categories /> : <Navigate to={paths.login} />}
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
