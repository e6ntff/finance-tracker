import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Slider } from 'antd';
import { listStore } from 'utils/listStore';
import { ExpenseItem } from 'settings/interfaces';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import {
	Chart,
	Tooltip,
	CategoryScale,
	LinearScale,
	LineElement,
	LineController,
	PointElement,
} from 'chart.js';
import SliderDiagram from './SliderDiagram';
import { optionsStore } from 'utils/optionsStore';

Chart.register(
	Tooltip,
	LineElement,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement
);

dayjs.extend(minMax);

interface Props {
	range: number[];
	setRange: (arg0: number[]) => void;
}

const YearSlider: React.FC<Props> = observer(({ range, setRange }) => {
	const { list } = listStore;
	const { defaultRange, setDefaultRange } = optionsStore;

	const [value, setValue] = useState(defaultRange);

	const sliderRange: [number, number] = useMemo(() => {
		const dates = Object.values(list).map((item: ExpenseItem) => item.date);
		return [Math.min(...dates), Math.max(...dates)];
	}, [list]);

	const marks: { [key: number]: string } = useMemo(() => {
		const start = dayjs(sliderRange[0]).startOf('day');
		const end = dayjs(sliderRange[1]).endOf('day');
		const marks: { [key: number]: string } = {};
		let currentDate = start;

		while (currentDate.isBefore(end) || currentDate.isSame(end, 'month')) {
			marks[currentDate.valueOf()] =
				currentDate.month() === 0 ? currentDate.format('YYYY') : ' ';
			currentDate = currentDate.add(1, 'month').startOf('month');
		}
		return marks;
	}, [sliderRange]);

	useEffect(() => {
		setDefaultRange(sliderRange);
	}, [sliderRange, setDefaultRange]);

	useEffect(() => {
		setRange(defaultRange);
	}, [defaultRange, setRange]);

	const handleRangeChanging = useCallback(
		(values: number[]) => {
			setRange(values);
		},
		[setRange]
	);

	useEffect(() => {
		setValue(range);
	}, [range]);

	return dayjs(defaultRange[1]).diff(dayjs(defaultRange[0]), 'hours') >= 48 ? (
		<Flex
			vertical
			align='stretch'
			style={{ inlineSize: '100%' }}
		>
			<SliderDiagram />
			<Slider
				range
				value={value}
				marks={marks}
				step={null}
				dots={true}
				tooltip={{
					formatter: (value: number | undefined) =>
						dayjs(value).format('MM.YY'),
				}}
				min={sliderRange[0]}
				max={sliderRange[1]}
				defaultValue={defaultRange}
				onChange={setValue}
				onChangeComplete={handleRangeChanging}
			/>
		</Flex>
	) : (
		<></>
	);
});

export default memo(YearSlider);
