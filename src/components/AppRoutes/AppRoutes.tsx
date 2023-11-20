import React, { useEffect, useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import Expenses from '../../pages/Expenses/Expenses';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

import paths from '../../settings/paths';

import Settings from '../../pages/Settings/Settings';
import Categories from '../../pages/Categories/Categories';
import Login from '../../pages/Login/Login';
import { useDispatch } from 'react-redux';
import { setCategories, setList, setUser } from '../../utils/store';
import getData from '../../utils/getData';
import Register from '../../pages/Register/Register';

interface Props {
  logged: boolean;
  user: any;
}

const AppRoutes: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [listLoading, setListLoading] = useState<boolean>(true);

  useEffect(() => {
    getData(props.user).then((data) => {
      setListLoading(false);
      if (data !== undefined) {
        dispatch(setList({ list: data.list }));
        dispatch(setCategories({ categories: data.categories }));
      }
      dispatch(setUser({ user: props.user }));
    });
  }, [props.user]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          props.logged ? (
            <Navigate to={paths.expenses} />
          ) : (
            <Navigate to={paths.login} />
          )
        }
      />
      <Route
        path={paths.login}
        element={props.logged ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path={paths.register}
        element={props.logged ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path={paths.dashboard}
        element={props.logged ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path={paths.expenses}
        element={
          props.logged ? (
            <Expenses loading={listLoading} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path={paths.home}
        element={props.logged ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path={paths.settings}
        element={props.logged ? <Settings /> : <Navigate to="/" />}
      />
      <Route
        path={paths.categories}
        element={
          props.logged ? (
            <Categories loading={listLoading} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/*" element={<Navigate to={paths.error} />} />
      <Route path={paths.error} element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
