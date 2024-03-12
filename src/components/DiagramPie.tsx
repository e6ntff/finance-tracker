import React, { useMemo } from 'react';
import { ExpenseItem, category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Flex } from 'antd';
import { Pie } from 'react-chartjs-2';
import { getSymbol } from 'utils/utils';
import {
	Chart,
	ArcElement,
	PieController,
	Tooltip,
	Legend,
	Title,
} from 'chart.js';
Chart.register(ArcElement, PieController, Tooltip, Legend, Title);

interface Value {
	category: category;
	value: number;
}

interface Props {
	list: ExpenseItem[];
	interval: 'year' | 'month';
	intervalBig: number | null;
	intervalSmall: number | null;
}

const DiagramPie: React.FC<Props> = observer(
	({ list, interval, intervalBig, intervalSmall }) => {
		const { currency, isSmallScreen } = userStore;

		const valuesByCategory: Value[] = useMemo(() => {
			const values: Value[] = [];
			list.forEach((item: ExpenseItem) => {
				const indexOfCategory: number = values.findIndex(
					(value: Value) => value.category.id === item.category.id
				);
				let expenseDate: number | null = null;
				if (interval === 'year') {
					if (intervalBig === null && intervalSmall !== null) {
						expenseDate = item.date.year();
					}
				} else if (interval === 'month') {
					if (intervalSmall === null) {
						expenseDate = item.date.year();
					} else {
						expenseDate = item.date.month();
					}
				}
				if (expenseDate === (intervalSmall ? intervalSmall : intervalBig)) {
					if (indexOfCategory !== -1) {
						values[indexOfCategory].value += item.price[currency];
					} else {
						values.push({
							category: item.category,
							value: item.price[currency],
						});
					}
				}
			});
			return values;
		}, [list, currency, interval, intervalBig, intervalSmall]);

		const [names, colors, values] = [
			valuesByCategory.map((value: Value) => value.category.name),
			valuesByCategory.map((value: Value) => value.category.color),
			valuesByCategory.map((value: Value) => Math.round(value.value)),
		];

		const data = {
			labels: names,
			datasets: [
				{
					label: getSymbol(currency),
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
			<Flex style={{ inlineSize: isSmallScreen ? 'unset' : '40%' }}>
				<Pie
					data={data}
					options={options}
				/>
			</Flex>
		);
	}
);

export default DiagramPie;
