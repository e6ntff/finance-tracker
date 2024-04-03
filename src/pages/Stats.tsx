import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
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
import ResetButton from 'components/ResetButton';

dayjs.extend(isBetween);

const Stats: React.FC = observer(() => {
	const { list, listTemplate } = listStore;
	const { isSmallScreen, loading, tourRefs, isTourStarted } = userStore;
	const { statsOptions, defaultRange, setStatsRange, setIsStatsAccurate } =
		optionsStore;

	const { range, isAccurate } = statsOptions;

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

	const isRangeChanged = useMemo(
		() => range[0] !== defaultRange[0] || range[1] !== defaultRange[1],
		[range, defaultRange]
	);

	useEffect(() => {
		if (dayjs(range[0]).year() !== dayjs(range[1]).year()) {
			setMode('year');
		} else {
			setMode('month');
		}
	}, [range]);

	const PanelJSX = (
		<Flex gap={16}>
			<StatsCard />
			<ResetButton
				reset={resetRange}
				disabled={!isRangeChanged}
			/>
		</Flex>
	);

	const DiagramsJSX = (
		<Flex
			vertical
			gap={16}
			align='stretch'
			style={{ inlineSize: '100%' }}
		>
			<Flex
				ref={tourRefs[8]}
				style={{ inlineSize: '100%' }}
			>
				<YearSlider
					setIsAccurate={setIsStatsAccurate}
					isAccurate={isAccurate}
					range={range}
					setRange={setStatsRange}
				/>
			</Flex>
			<Flex
				ref={tourRefs[7]}
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
	) : Object.keys(isTourStarted ? listTemplate : list).length ? (
		<Flex
			vertical
			gap={32}
		>
			{PanelJSX}
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
