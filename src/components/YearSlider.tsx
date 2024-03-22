import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented, Slider } from 'antd';
import { listStore } from 'utils/listStore';
import { ExpenseItem } from 'settings/interfaces';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';

dayjs.extend(minMax);

interface Props {
	range: number[];
	defaultRange: number[];
	setRange: (arg0: number[]) => void;
	setDefaultRange: (arg0: number[]) => void;
	isAccurate: boolean;
	setIsAccurate: (arg0: boolean) => void;
}

const YearSlider: React.FC<Props> = observer(
	({
		range,
		defaultRange,
		setRange,
		setDefaultRange,
		isAccurate,
		setIsAccurate,
	}) => {
		const { list } = listStore;
		const { isSmallScreen } = userStore;

		const [value, setValue] = useState(defaultRange);

		const sliderRange: [number, number] = useMemo(() => {
			const mappedList = list.map((item: ExpenseItem) => item.date);
			return [
				dayjs.min(mappedList)?.valueOf() || 0,
				dayjs.max(mappedList)?.valueOf() || 0,
			];
		}, [list]);

		const marks: { [key: number]: string } = useMemo(() => {
			const start = dayjs(sliderRange[0]).startOf('month');
			const end = dayjs(sliderRange[1]).endOf('month');
			const marks: { [key: number]: string } = {};
			let currentDate = start;
			if (isAccurate) {
				while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
					marks[currentDate.valueOf()] =
						currentDate.date() === 1
							? currentDate.month() === 0
								? currentDate.format('YYYY')
								: currentDate.format('M')
							: ' ';
					currentDate = currentDate.add(1, 'day').startOf('day');
				}
			} else {
				while (currentDate.isBefore(end) || currentDate.isSame(end, 'month')) {
					marks[currentDate.valueOf()] =
						currentDate.month() === 0 ? currentDate.format('YYYY') : ' ';
					currentDate = currentDate.add(1, 'month').startOf('month');
				}
			}

			return marks;
		}, [sliderRange, isAccurate]);

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

		useEffect(() => {
			isSmallScreen && setIsAccurate(false);
		}, [isSmallScreen, setIsAccurate]);

		useEffect(() => {
			!isAccurate &&
				setRange([
					dayjs(range[0]).startOf('month').valueOf(),
					dayjs(range[1]).endOf('month').valueOf(),
				]);
			// eslint-disable-next-line
		}, [isAccurate]);

		return (
			<Flex gap={16}>
				<Segmented
					size={isSmallScreen ? 'small' : 'middle'}
					defaultValue={isAccurate}
					value={isAccurate}
					onChange={setIsAccurate}
					options={[
						{ label: <ZoomOutOutlined />, value: false },
						{ label: <ZoomInOutlined />, value: true, disabled: isSmallScreen },
					]}
				/>
				<Slider
					range
					value={value}
					marks={marks}
					step={null}
					dots={true}
					tooltip={{
						formatter: (value: number | undefined) => (
							<>{dayjs(value).format(isAccurate ? 'DD.MM.YY' : 'MM.YY')}</>
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
	}
);

export default YearSlider;
