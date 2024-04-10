import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import paths from 'settings/paths';
import LargeSpin from './LargeSpin';

const Expenses = lazy(() => import('../pages/List'));
const Stats = lazy(() => import('../pages/Stats'));
const Welcome = lazy(() => import('../pages/Welcome'));
const Categories = lazy(() => import('../pages/Categories'));
const Trash = lazy(() => import('../pages/Trash'));

const AppRoutes: React.FC = observer(() => {
	const { logged } = userStore;

	return (
		<Routes>
			<Route
				path='/'
				element={
					logged ? (
						<Navigate to={paths.list} />
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
				path={paths.list}
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
				path={paths.trash}
				element={
					logged ? (
						<Suspense fallback={<LargeSpin />}>
							<Trash />
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
