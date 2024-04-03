import React, { memo, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import paths from '../settings/paths';
import { Badge, Menu } from 'antd';
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
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';

const Navigation: React.FC = observer(() => {
	const location = useLocation();
	const { isSmallScreen, isTourStarted } = userStore;
	const { userOptions } = optionsStore;
	const { userList, listTemplate } = listStore;
	const { userCategories: categories, categoriesTemplate } = categoryStore;

	const list = useMemo(
		() => (isTourStarted ? listTemplate : userList),
		[isTourStarted, listTemplate, userList]
	);

	const { language } = userOptions;

	const count = useMemo(() => {
		const currentList = isTourStarted ? listTemplate : list;
		const currentCategories = isTourStarted ? categoriesTemplate : categories;

		return (
			Object.keys(currentList).reduce(
				(acc: number, key: string) => (currentList[key].deleted ? ++acc : acc),
				0
			) +
			Object.keys(currentCategories).reduce(
				(acc: number, key: string) =>
					currentCategories[key].deleted ? ++acc : acc,
				0
			)
		);
	}, [list, categories, listTemplate, categoriesTemplate, isTourStarted]);

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
			icon: (
				<Badge
					count={count}
					size='small'
					offset={[3, -3]}
				>
					<DeleteOutlined />
				</Badge>
			),
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
