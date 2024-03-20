import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import paths from 'settings/paths';
import LargeSpin from './LargeSpin';

const Expenses = lazy(() => import('../pages/Expenses'));
const Stats = lazy(() => import('../pages/Stats'));
const Settings = lazy(() => import('../pages/Settings'));
const Welcome = lazy(() => import('../pages/Welcome'));
const Categories = lazy(() => import('../pages/Categories'));

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
						<Suspense fallback={<LargeSpin />}>
							<Welcome />
						</Suspense>
					)
				}
			/>
			<Route
				path={paths.stats}
				element={
					logged ? (
						<Suspense fallback={<LargeSpin />}>
							<Stats />
						</Suspense>
					) : (
						<Navigate to='/' />
					)
				}
			/>
			<Route
				path={paths.expenses}
				element={
					logged ? (
						<Suspense fallback={<LargeSpin />}>
							<Expenses />
						</Suspense>
					) : (
						<Navigate to='/' />
					)
				}
			/>
			<Route
				path={paths.settings}
				element={
					logged ? (
						<Suspense fallback={<LargeSpin />}>
							<Settings />
						</Suspense>
					) : (
						<Navigate to='/' />
					)
				}
			/>
			<Route
				path={paths.categories}
				element={
					logged ? (
						<Suspense fallback={<LargeSpin />}>
							<Categories />
						</Suspense>
					) : (
						<Navigate to='/' />
					)
				}
			/>
			<Route
				path='/*'
				element={<Navigate to='/' />}
			/>
		</Routes>
	);
});

export default AppRoutes;
