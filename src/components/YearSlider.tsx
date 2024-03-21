import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Slider } from 'antd';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { ExpenseItem } from 'settings/interfaces';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

const YearSlider: React.FC = observer(() => {
	const { list } = listStore;
	const { listOptions, setRange, setDefaultRange } = optionsStore;

	const { range, defaultRange } = listOptions;

	const [value, setValue] = useState(defaultRange);

	const sliderRange: [number, number] = useMemo(() => {
		const mappedList = list.map((item: ExpenseItem) => item.date);
		return [
			dayjs.min(mappedList)?.valueOf() || 0,
			dayjs.max(mappedList)?.valueOf() || 0,
		];
	}, [list]);

	useEffect(() => {
		setDefaultRange(sliderRange);
	}, [sliderRange, setDefaultRange]);

	const marks: { [key: number]: string } = useMemo(() => {
		const start = dayjs(sliderRange[0]).startOf('month');
		const end = dayjs(sliderRange[1]).endOf('month');
		const marks: { [key: number]: string } = {};

		let currentMonth = start;
		while (currentMonth.isBefore(end) || currentMonth.isSame(end, 'month')) {
			marks[currentMonth.valueOf()] =
				currentMonth.month() === 0 ? currentMonth.format('YYYY') : ' ';
			currentMonth = currentMonth.add(1, 'month').startOf('month');
		}

		return marks;
	}, [sliderRange]);

	const handleRangeChanging = useCallback(
		(values: number[]) => {
			setRange(values);
		},
		[setRange]
	);

	useEffect(() => {
		setValue(range);
	}, [range]);

	return (
		<Flex>
			<Slider
				range
				value={value}
				marks={marks}
				step={null}
				dots={true}
				tooltip={{
					formatter: (value: number | undefined) => (
						<>{dayjs(value).format('MM.YYYY')}</>
					),
				}}
				min={sliderRange[0]}
				max={sliderRange[1]}
				defaultValue={defaultRange}
				onChange={setValue}
				onChangeComplete={handleRangeChanging}
				style={{ inlineSize: '100%' }}
			/>
		</Flex>
	);
});

export default YearSlider;
