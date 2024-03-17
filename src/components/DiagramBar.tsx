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
import { getValuesForBarDiagram } from 'utils/transformData';
Chart.register(Tooltip, BarController, BarElement, CategoryScale, LinearScale);

interface Props {
	interval: Interval;
	list: ExpenseItem[];
	setInterval: (arg0: number | null) => void;
}

const DiagramBar: React.FC<Props> = observer(
	({ interval, list, setInterval }) => {
		const { currency, language, isSmallScreen } = userStore;

		const values: number[] | { [key: string]: number } = useMemo(
			() => getValuesForBarDiagram(interval, list, currency),
			[currency, list, interval]
		);

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
