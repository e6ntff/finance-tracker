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
	GlobalOutlined,
	LineChartOutlined,
	PushpinOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';

const Navigation: React.FC = observer(() => {
	const location = useLocation();

	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;
	const { list } = listStore;
	const { categories } = categoryStore;

	const { language } = userOptions;

	const count = useMemo(
		() =>
			Object.keys(list).reduce(
				(acc: number, key: string) => (list[key].deleted ? ++acc : acc),
				0
			) +
			Object.keys(categories).reduce(
				(acc: number, key: string) => (categories[key].deleted ? ++acc : acc),
				0
			),
		[list, categories]
	);

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
				<NavLink to={paths.list}>
					{!isSmallScreen && languages.list[language]}
				</NavLink>
			),
			key: paths.list,
			title: '',
			icon: <UnorderedListOutlined />,
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
				<NavLink to={paths.goals}>
					{!isSmallScreen && languages.goals[language]}
				</NavLink>
			),
			key: paths.goals,
			title: '',
			icon: <PushpinOutlined />,
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
		{
			label: (
				<NavLink to={paths.community}>
					{!isSmallScreen && languages.community[language]}
				</NavLink>
			),
			key: paths.community,
			title: '',
			icon: <GlobalOutlined />,
		},
	];

	return (
		<Menu
			style={{ inlineSize: '100%' }}
			selectedKeys={[`/${location.pathname.split('/')[1]}`]}
			mode='horizontal'
			theme='dark'
			items={items}
		/>
	);
});

export default memo(Navigation);
