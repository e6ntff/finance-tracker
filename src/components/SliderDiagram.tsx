import { observer } from 'mobx-react-lite';
import React, { memo, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { getValuesByMonth } from 'utils/transformData';
import { userStore } from 'utils/userStore';

const SliderDiagram: React.FC = observer(() => {
	const { userList, listTemplate } = listStore;
	const { defaultRange } = optionsStore;
	const { isTourStarted } = userStore;

	const list = useMemo(
		() => (isTourStarted ? listTemplate : userList),
		[isTourStarted, listTemplate, userList]
	);

	const valuesByMonth: number[] | { [key: string]: number } = useMemo(
		() => getValuesByMonth(list, defaultRange),
		[list, defaultRange]
	);

	const data = {
		labels: new Array(valuesByMonth.length).fill(''),
		datasets: [
			{
				data: valuesByMonth,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
		scales: {
			x: {
				display: false,
				grid: {
					display: false,
				},
			},
			y: {
				display: false,
				grid: {
					display: false,
				},
			},
		},
		elements: {
			point: {
				radius: 0,
			},
			line: {
				cubicInterpolationMode: 'monotone' as 'monotone',
				borderColor: '#7775',
			},
		},
		aspectRatio: 25,
	};

	return (
		<Line
			style={{ inlineSize: '100%' }}
			data={data}
			options={options}
		/>
	);
});

export default memo(SliderDiagram);
