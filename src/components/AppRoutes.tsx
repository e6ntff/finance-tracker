import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Expenses from '../pages/Expenses';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import paths from '../settings/paths';
import Settings from '../pages/Settings';
import Categories from '../pages/Categories';
import Login from '../pages/LogIn';
import Register from '../pages/SignIn';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';

const AppRoutes: React.FC = observer(() => {
	const { logged } = userStore;
	return (
		<Routes>
			<Route
				path='/'
				element={
					logged ? (
						<Navigate to={paths.expenses} />
					) : (
						<Navigate to={paths.login} />
					)
				}
			/>
			<Route
				path={paths.login}
				element={logged ? <Navigate to='/' /> : <Login />}
			/>
			<Route
				path={paths.register}
				element={logged ? <Navigate to='/' /> : <Register />}
			/>
			<Route
				path={paths.dashboard}
				element={logged ? <Dashboard /> : <Navigate to='/' />}
			/>
			<Route
				path={paths.expenses}
				element={logged ? <Expenses /> : <Navigate to='/' />}
			/>
			<Route
				path={paths.home}
				element={logged ? <Home /> : <Navigate to='/' />}
			/>
			<Route
				path={paths.settings}
				element={logged ? <Settings /> : <Navigate to='/' />}
			/>
			<Route
				path={paths.categories}
				element={logged ? <Categories /> : <Navigate to='/' />}
			/>
			<Route
				path='/*'
				element={<Navigate to={paths.expenses} />}
			/>
		</Routes>
	);
});

export default AppRoutes;
