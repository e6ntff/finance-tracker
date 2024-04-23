import React, { useState, useCallback, memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Empty, Flex } from 'antd';
import DiagramBar from '../components/DiagramBar';
import DiagramPie from 'components/DiagramPie';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import YearSlider from 'components/YearSlider';
import { Interval } from 'settings/interfaces';
import LargeSpin from 'components/LargeSpin';
import StatsCard from 'components/StatsCard';
import { debounce } from 'lodash';
import constants from 'settings/constants';

dayjs.extend(isBetween);

const Stats: React.FC = observer(() => {
	const { list } = listStore;
	const { isSmallScreen, loading } = userStore;
	const { statsOptions, defaultRange, setStatsRange } = optionsStore;

	const { range, type } = statsOptions;

	const [mode, setMode] = useState<Interval>('year');

	const resetRange = useCallback(() => {
		setMode('year');
		setStatsRange(defaultRange);
	}, [setMode, defaultRange, setStatsRange]);

	useEffect(() => {
		const resetRangeWithEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				resetRange();
			}
		};

		window.addEventListener('keydown', resetRangeWithEsc);

		return () => {
			window.removeEventListener('keydown', resetRangeWithEsc);
		};
	}, [resetRange]);

	useEffect(() => {
		if (dayjs(range[0]).year() !== dayjs(range[1]).year()) {
			setMode('year');
		} else {
			setMode('month');
		}
	}, [range]);

	const [isRangeChanged, setIsRangeChanged] = useState<boolean>(false);

	// eslint-disable-next-line
	const debouncedSetIsRangeChanged = useCallback(
		debounce(setIsRangeChanged, constants.optionsDebounceDelay),
		[setIsRangeChanged]
	);

	useEffect(() => {
		const isChanged =
			range[0] !== defaultRange[0] || range[1] !== defaultRange[1];
		console.log();
		debouncedSetIsRangeChanged(isChanged);
	}, [range, defaultRange, debouncedSetIsRangeChanged]);

	const DiagramsJSX = (
		<Flex
			vertical
			align='stretch'
			style={{ inlineSize: '100%' }}
		>
			<Flex style={{ inlineSize: '100%' }}>
				<YearSlider
					range={range}
					type={type}
					setRange={setStatsRange}
				/>
			</Flex>
			<Flex
				align='center'
				justify='space-between'
				vertical={isSmallScreen}
			>
				<DiagramBar
					mode={mode}
					setMode={setMode}
				/>
				<DiagramPie />
			</Flex>
		</Flex>
	);

	return loading ? (
		<LargeSpin />
	) : Object.keys(list).length ? (
		<Flex
			vertical
			align='start'
		>
			<StatsCard
				open={isRangeChanged}
				resetRange={resetRange}
			/>
			{DiagramsJSX}
		</Flex>
	) : (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={''}
		/>
	);
});

export default memo(Stats);
