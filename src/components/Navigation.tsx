import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import paths from '../settings/paths';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import {
	DeleteOutlined,
	FolderOpenOutlined,
	LineChartOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';

const Navigation: React.FC = observer(() => {
	const location = useLocation();
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const items = [
		{
			label: (
				<NavLink to={paths.stats}>
					{!isSmallScreen && languages.stats[language]}
				</NavLink>
			),
			key: paths.stats,
			title: '',
			icon: <LineChartOutlined />,
		},
		{
			label: (
				<NavLink to={paths.expenses}>
					{!isSmallScreen && languages.expenses[language]}
				</NavLink>
			),
			key: paths.expenses,
			title: '',
			icon: <ShoppingCartOutlined />,
		},
		{
			label: (
				<NavLink to={paths.categories}>
					{!isSmallScreen && languages.categories[language]}
				</NavLink>
			),
			key: paths.categories,
			title: '',
			icon: <FolderOpenOutlined />,
		},
		{
			label: (
				<NavLink to={paths.trash}>
					{!isSmallScreen && languages.trash[language]}
				</NavLink>
			),
			key: paths.trash,
			title: '',
			icon: <DeleteOutlined />,
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
