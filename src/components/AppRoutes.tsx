import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Expenses from '../pages/Expenses';
import Stats from '../pages/Stats';
import paths from '../settings/paths';
import Settings from '../pages/Settings';
import Categories from '../pages/Categories';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import Welcome from 'pages/Welcome';

const AppRoutes: React.FC = observer(() => {
	const { logged } = userStore;
	return (
		<Routes>
			<Route
				path='/'
				element={logged ? <Navigate to={paths.expenses} /> : <Welcome />}
			/>
			<Route
				path={paths.stats}
				element={logged ? <Stats /> : <Navigate to='/' />}
			/>
			<Route
				path={paths.expenses}
				element={logged ? <Expenses /> : <Navigate to='/' />}
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
				element={<Navigate to='/' />}
			/>
		</Routes>
	);
});

export default AppRoutes;
