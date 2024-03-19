import React, { useMemo } from 'react';
import { ExpenseItem, Interval, Value } from '../settings/interfaces';
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
import {
	getValuesForPieDiagramInCurrentDay,
	getValuesForPieDiagramByMonth,
	getValuesForPieDiagramByYear,
} from 'utils/transformData';
Chart.register(ArcElement, PieController, Tooltip, Legend, Title);

interface Props {
	list: ExpenseItem[];
	interval: Interval;
	year: number | null;
	month: number | null;
	day: number | null;
}

const DiagramPie: React.FC<Props> = observer(
	({ list, interval, year, month, day }) => {
		const { currency, isSmallScreen } = userStore;

		const valuesByCategory: Value[] = useMemo(() => {
			if (interval === 'year')
				return getValuesForPieDiagramByYear(list, currency);
			if (interval === 'month')
				return getValuesForPieDiagramByMonth(list, year, month, currency);
			return getValuesForPieDiagramInCurrentDay(
				list,
				year,
				month,
				day,
				currency
			);
		}, [list, currency, interval, year, month, day]);

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
			<Flex
				style={{
					inlineSize: isSmallScreen || interval === 'day' ? 'unset' : '40%',
				}}
			>
				<Pie
					data={data}
					options={options}
				/>
			</Flex>
		);
	}
);

export default DiagramPie;
