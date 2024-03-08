import React, { useMemo } from 'react';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Bar } from 'react-chartjs-2';
import getSymbol from 'utils/getSymbol';
import { Flex } from 'antd';
import {
	Chart,
	Tooltip,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';
import { getMonth } from 'utils/date';
Chart.register(Tooltip, BarController, BarElement, CategoryScale, LinearScale);

interface Props {
	interval: 'year' | 'month';
	list: ExpenseItem[];
	setInterval: (arg0: string | null) => void;
}

const DiagramBar: React.FC<Props> = observer(
	({ interval, list, setInterval }) => {
		const { currency, language } = userStore;

		const labels = useMemo(() => {
			if (interval === 'month') {
				return getMonth(language);
			} else if (interval === 'year') {
				const years: string[] = [];
				list.forEach((item: ExpenseItem) => {
					const year = item.date.year().toString();
					if (!years.find((item: string) => item === year)) years.unshift(year);
				});
				return years;
			}
			return [];
		}, [interval, list, language]);

		const values = useMemo(() => {
			const values: number[] = new Array(12).fill(0);
			list.forEach((item: ExpenseItem) => {
				const index = (() => {
					if (interval === 'month') {
						return item.date.month();
					} else if (interval === 'year') {
						return item.date.year() - Number(labels[0]);
					}
					return -1;
				})();
				values[index] += item.price[currency];
			});
			return values;
		}, [currency, list, interval, labels]);

		const data = {
			labels: labels,
			datasets: [
				{
					label: getSymbol(currency),
					data: values,
					backgroundColor: '#f00',
				},
			],
		};

		const options = {
			plugins: {
				legend: {
					display: false,
				},
			},
			onClick: (_: any, chartElements: any) => {
				if (chartElements.length) {
					const index = chartElements[0].index;
					setInterval(data.labels[index]);
				} else {
					setInterval(null);
				}
			},
		};

		return (
			<Flex style={{ inlineSize: '50%' }}>
				<Bar
					data={data}
					options={options}
				/>
			</Flex>
		);
	}
);

export default DiagramBar;
