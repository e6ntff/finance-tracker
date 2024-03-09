import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import paths from '../settings/paths';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';

const Navigation: React.FC = observer(() => {
	const { language } = userStore;
	const location = useLocation();

	const items = [
		{
			label: <NavLink to={paths.home}>{languages.home[language]}</NavLink>,
			key: paths.home,
			title: '',
		},
		{
			label: (
				<NavLink to={paths.dashboard}>{languages.dashboard[language]}</NavLink>
			),
			key: paths.dashboard,
			title: '',
		},
		{
			label: (
				<NavLink to={paths.expenses}>{languages.expenses[language]}</NavLink>
			),
			key: paths.expenses,
			title: '',
		},
		{
			label: (
				<NavLink to={paths.categories}>
					{languages.categories[language]}
				</NavLink>
			),
			key: paths.categories,
			title: '',
		},
		{
			label: (
				<NavLink to={paths.settings}>{languages.settings[language]}</NavLink>
			),
			key: paths.settings,
			title: '',
		},
	];
	return (
		<Menu
			selectedKeys={[location.pathname]}
			mode='horizontal'
			theme='dark'
			items={items}
		/>
	);
});

export default memo(Navigation);
