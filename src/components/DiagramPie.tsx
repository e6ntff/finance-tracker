import React, { useMemo } from 'react';
import { ExpenseItem, category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Pie } from 'react-chartjs-2';
import {
	Chart,
	ArcElement,
	PieController,
	Tooltip,
	Legend,
	Title,
} from 'chart.js';
import getSymbol from 'utils/getSymbol';
import { Flex } from 'antd';
import languages from 'settings/languages';
import { getMonth } from 'utils/date';
Chart.register(ArcElement, PieController, Tooltip, Legend, Title);

interface Value {
	category: category;
	value: number;
}

interface Props {
	list: ExpenseItem[];
	interval: 'year' | 'month';
	intervalBig: string | null;
	intervalSmall: string | null;
}

const DiagramPie: React.FC<Props> = observer(
	({ list, interval, intervalBig, intervalSmall }) => {
		const { currency, language } = userStore;

		const valuesByCategory: Value[] = useMemo(() => {
			const values: Value[] = [];
			list.forEach((item: ExpenseItem) => {
				const indexOfCategory: number = values.findIndex(
					(value: Value) => value.category.id === item.category.id
				);

				let expenseDate: string | null = null;
				if (interval === 'year') {
					if (intervalBig === null && intervalSmall !== null) {
						expenseDate = item.date.year().toString();
					}
				} else if (interval === 'month') {
					if (intervalSmall === null) {
						expenseDate = item.date.year().toString();
					} else {
						expenseDate = getMonth(language, item.date)[0];
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
		}, [list, currency, interval, intervalBig, intervalSmall, language]);

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
				title: {
					display: true,
					text: `${
						languages.expensesIn(intervalSmall ? intervalSmall : intervalBig)[
							language
						]
					}`,
				},
				legend: {
					display: true,
					position: 'right' as const,
				},
			},
		};

		return (
			<Flex style={{ inlineSize: '40%' }}>
				<Pie
					data={data}
					options={options}
				/>
			</Flex>
		);
	}
);

export default DiagramPie;
