import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Bar } from 'react-chartjs-2';
import languages from 'settings/languages';
import { getSymbolAndPrice } from 'utils/utils';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import {
	Chart,
	Tooltip,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';
import { getValuesForBarDiagram } from 'utils/transformData';
import { optionsStore } from 'utils/optionsStore';
import { listStore } from 'utils/listStore';
import { Interval } from 'settings/interfaces';
import constants from 'settings/constants';
Chart.register(Tooltip, BarController, BarElement, CategoryScale, LinearScale);

interface Props {
	mode: Interval;
	setMode: (arg0: Interval) => void;
}

const DiagramBar: React.FC<Props> = observer(({ mode, setMode }) => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { statsOptions, userOptions, setStatsRange } = optionsStore;
	const { currency, language } = userOptions;

	const { range, type } = statsOptions;

	const values: number[] | { [key: string]: number } = useMemo(() => {
		return getValuesForBarDiagram(
			list,
			type,
			currency,
			mode,
			dayjs(range[0]).year()
		);
	}, [currency, type, mode, range, list]);

	const colors = useMemo(
		() =>
			Object.keys(values).map((key: string) => {
				let period: number | dayjs.Dayjs = 0;
				let isInRange: boolean = false;
				if (mode === 'month') {
					period = Number(key);
					isInRange =
						period >= dayjs(range[0]).startOf('month').month() &&
						period <= dayjs(range[1]).endOf('month').month();
				} else if (mode === 'year') {
					period = dayjs(key);
					isInRange =
						period >= dayjs(range[0]).startOf('year') &&
						period <= dayjs(range[1]).endOf('year');
				}
				if (type === 'expense') {
					return isInRange
						? constants.colors.expense
						: constants.colors.expenseLight;
				} else {
					return isInRange
						? constants.colors.income
						: constants.colors.incomeLight;
				}
			}),
		[range, values, mode, type]
	);

	const data = {
		labels: mode === 'month' ? languages.months[language] : Object.keys(values),
		datasets: [
			{
				label: getSymbolAndPrice(currency),
				data: Object.values(values),
				backgroundColor: colors,
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

				const newRangeItem =
					mode === 'year'
						? [
								dayjs(range[0])
									.year(Number(data.labels[index]))
									.startOf('year')
									.valueOf(),
								dayjs(range[0])
									.year(Number(data.labels[index]))
									.endOf('year')
									.valueOf(),
						  ]
						: [
								dayjs(range[0]).month(index).startOf('month').valueOf(),
								dayjs(range[0]).month(index).endOf('month').valueOf(),
						  ];

				mode === 'year' && setMode('month');
				setStatsRange(newRangeItem);
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
});

export default DiagramBar;
