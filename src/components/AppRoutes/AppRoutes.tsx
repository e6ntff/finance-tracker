import React from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import Expenses from '../../pages/Expenses/Expenses';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

import paths from '../../settings/paths';

import Settings from '../../pages/Settings/Settings';
import Categories from '../../pages/Categories/Categories';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.home} />} />
      <Route path={paths.dashboard} element={<Dashboard />} />
      <Route path={paths.expenses} element={<Expenses />} />
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.settings} element={<Settings />} />
      <Route path={paths.categories} element={<Categories />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
