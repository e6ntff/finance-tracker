import React, { useMemo } from 'react';
import { ExpenseItem, Interval } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Bar } from 'react-chartjs-2';
import languages from 'settings/languages';
import { getSymbol } from 'utils/utils';
import { Flex } from 'antd';
import {
	Chart,
	Tooltip,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';
import {
	getValuesForBarDiagramByMonth,
	getValuesForBarDiagramByYear,
} from 'utils/transformData';
import { optionsStore } from 'utils/optionsStore';
Chart.register(Tooltip, BarController, BarElement, CategoryScale, LinearScale);

interface Props {
	list: ExpenseItem[];
	interval: Interval;
	setInterval: (arg0: number | null) => void;
}

const DiagramBar: React.FC<Props> = observer(
	({ list, interval, setInterval }) => {
		const { isSmallScreen } = userStore;
		const { statsOptions, userOptions } = optionsStore;
		const { currency, language } = userOptions;

		const { year } = statsOptions;

		const values: number[] | { [key: string]: number } = useMemo(() => {
			if (interval === 'year')
				return getValuesForBarDiagramByYear(list, currency);
			return getValuesForBarDiagramByMonth(list, year, currency);
		}, [currency, list, interval, year]);

		const data = {
			labels:
				interval === 'month' ? languages.months[language] : Object.keys(values),
			datasets: [
				{
					label: getSymbol(currency),
					data: Object.values(values),
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
					setInterval(interval === 'year' ? Number(data.labels[index]) : index);
				} else {
					setInterval(null);
				}
			},
		};

		return (
			<Flex style={{ inlineSize: isSmallScreen ? 'unset' : '50%' }}>
				<Bar
					data={data}
					options={options}
				/>
			</Flex>
		);
	}
);

export default DiagramBar;
