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

	return (
		<Menu
			selectedKeys={[location.pathname]}
			mode='horizontal'
			theme='dark'
		>
			<Menu.Item key={paths.home}>
				<NavLink to={paths.home}>{languages.home[language]}</NavLink>
			</Menu.Item>
			<Menu.Item key={paths.dashboard}>
				<NavLink to={paths.dashboard}>{languages.dashboard[language]}</NavLink>
			</Menu.Item>
			<Menu.Item key={paths.expenses}>
				<NavLink to={paths.expenses}>{languages.expenses[language]}</NavLink>
			</Menu.Item>
			<Menu.Item key={paths.categories}>
				<NavLink to={paths.categories}>
					{languages.categories[language]}
				</NavLink>
			</Menu.Item>
			<Menu.Item key={paths.settings}>
				<NavLink to={paths.settings}>{languages.settings[language]}</NavLink>
			</Menu.Item>
		</Menu>
	);
});

export default memo(Navigation);
