import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import paths from '../settings/paths';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import {
	FolderOpenOutlined,
	LineChartOutlined,
	SettingOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';

const Navigation: React.FC = observer(() => {
	const { language } = userStore;
	const location = useLocation();

	const items = [
		{
			label: (
				<NavLink to={paths.dashboard}>{languages.dashboard[language]}</NavLink>
			),
			key: paths.dashboard,
			title: '',
			icon: <LineChartOutlined />,
		},
		{
			label: (
				<NavLink to={paths.expenses}>{languages.expenses[language]}</NavLink>
			),
			key: paths.expenses,
			title: '',
			icon: <ShoppingCartOutlined />,
		},
		{
			label: (
				<NavLink to={paths.categories}>
					{languages.categories[language]}
				</NavLink>
			),
			key: paths.categories,
			title: '',
			icon: <FolderOpenOutlined />,
		},
		{
			label: (
				<NavLink to={paths.settings}>{languages.settings[language]}</NavLink>
			),
			key: paths.settings,
			title: '',
			icon: <SettingOutlined />,
		},
	];
	return (
		<Menu
			style={{ inlineSize: '100%' }}
			selectedKeys={[location.pathname]}
			mode='horizontal'
			theme='dark'
			items={items}
		/>
	);
});

export default memo(Navigation);
