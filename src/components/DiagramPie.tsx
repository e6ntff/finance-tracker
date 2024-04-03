import React, { useMemo } from 'react';
import { Value } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Flex } from 'antd';
import { Pie } from 'react-chartjs-2';
import { getSymbolAndPrice } from 'utils/utils';
import {
	Chart,
	ArcElement,
	PieController,
	Tooltip,
	Legend,
	Title,
} from 'chart.js';
import { getValuesForPieDiagram } from 'utils/transformData';
import { optionsStore } from 'utils/optionsStore';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';
Chart.register(ArcElement, PieController, Tooltip, Legend, Title);

const DiagramPie: React.FC = observer(() => {
	const { isSmallScreen, isTourStarted } = userStore;
	const { userList, listTemplate } = listStore;
	const { userOptions, statsOptions } = optionsStore;
	const { currency } = userOptions;
	const { userCategories, categoriesTemplate } = categoryStore;

	const list = useMemo(
		() => (isTourStarted ? listTemplate : userList),
		[isTourStarted, listTemplate, userList]
	);

	const categories = useMemo(
		() => (isTourStarted ? categoriesTemplate : userCategories),
		[isTourStarted, userCategories, categoriesTemplate]
	);

	const { range } = statsOptions;

	const valuesByCategory: Value[] = useMemo(
		() =>
			getValuesForPieDiagram(
				isTourStarted ? listTemplate : list,
				range,
				currency
			),
		[list, listTemplate, currency, range, isTourStarted]
	);

	const [names, colors, values] = useMemo(() => {
		const currentCategories = isTourStarted ? categoriesTemplate : categories;
		return [
			valuesByCategory.map(
				(value: Value) => currentCategories[value.categoryId].name
			),
			valuesByCategory.map(
				(value: Value) => currentCategories[value.categoryId].color
			),
			valuesByCategory.map((value: Value) => Math.round(value.value)),
		];
	}, [isTourStarted, categories, categoriesTemplate, valuesByCategory]);

	const data = {
		labels: names,
		datasets: [
			{
				label: getSymbolAndPrice(currency),
				data: values,
				backgroundColor: colors,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: true,
				position: 'right' as const,
			},
		},
	};

	return (
		<Flex
			style={{
				inlineSize: isSmallScreen ? 'unset' : '40%',
			}}
		>
			<Pie
				data={data}
				options={options}
			/>
		</Flex>
	);
});

export default DiagramPie;
