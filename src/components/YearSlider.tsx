import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented, Slider, Tooltip as TooltipAntd } from 'antd';
import { listStore } from 'utils/listStore';
import { ExpenseItem } from 'settings/interfaces';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
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
import languages from 'settings/languages';
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
	isAccurate: boolean;
	setIsAccurate: (arg0: boolean) => void;
}

const YearSlider: React.FC<Props> = observer(
	({ range, setRange, isAccurate, setIsAccurate }) => {
		const { list } = listStore;
		const { isSmallScreen } = userStore;
		const { defaultRange, setDefaultRange, userOptions } = optionsStore;

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
					(
						dayjs.max([
							dayjs(range[0]).startOf('month'),
							dayjs(defaultRange[0]),
						]) as dayjs.Dayjs
					).valueOf(),
					(
						dayjs.min([
							dayjs(range[1]).endOf('month'),
							dayjs(defaultRange[1]),
						]) as dayjs.Dayjs
					).valueOf(),
				]);
			// eslint-disable-next-line
		}, [isAccurate]);

		return dayjs(defaultRange[1]).diff(dayjs(defaultRange[0]), 'hours') >=
			48 ? (
			<Flex
				gap={16}
				align='center'
				style={{ inlineSize: '100%' }}
			>
				<Segmented
					size={isSmallScreen ? 'small' : 'middle'}
					defaultValue={isAccurate}
					value={isAccurate}
					onChange={setIsAccurate}
					options={[
						{
							label: (
								<TooltipAntd title={languages.byMonth[userOptions.language]}>
									<ZoomOutOutlined />
								</TooltipAntd>
							),
							value: false,
						},
						{
							label: (
								<TooltipAntd title={languages.byDay[userOptions.language]}>
									<ZoomInOutlined />
								</TooltipAntd>
							),
							value: true,
							disabled: isSmallScreen,
						},
					]}
				/>
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
							formatter: (value: number | undefined) => (
								<>{dayjs(value).format(isAccurate ? 'DD.MM.YY' : 'MM.YY')}</>
							),
						}}
						min={sliderRange[0]}
						max={sliderRange[1]}
						defaultValue={defaultRange}
						onChange={setValue}
						onChangeComplete={handleRangeChanging}
					/>
				</Flex>
			</Flex>
		) : (
			<></>
		);
	}
);

export default memo(YearSlider);
