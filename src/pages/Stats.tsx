import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, Empty, Flex, Statistic, Typography } from 'antd';
import DiagramBar from '../components/DiagramBar';
import DiagramPie from 'components/DiagramPie';
import { userStore } from 'utils/userStore';
import { getSymbolAndPrice } from 'utils/utils';
import { ReloadOutlined } from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import YearSlider from 'components/YearSlider';
import { Interval } from 'settings/interfaces';
import LargeSpin from 'components/LargeSpin';
import { getTotalInCurrentRange } from 'utils/transformData';

dayjs.extend(isBetween);

const Stats: React.FC = observer(() => {
	const { list } = listStore;
	const { isSmallScreen, loading } = userStore;
	const {
		statsOptions,
		userOptions,
		setStatsRange,
		setDefaultStatsRange,
		setIsStatsAccurate,
	} = optionsStore;
	const { currency } = userOptions;
	const { range, defaultRange, isAccurate } = statsOptions;

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

	const cardTitle = useMemo(() => {
		const format = isAccurate ? 'DD.MM.YY' : 'MM.YY';
		return (
			<Typography.Text
				type='secondary'
				style={{ fontSize: isSmallScreen ? '.8em' : '1em' }}
			>
				{dayjs(range[0]).format(format)}
				{range[0] !== range[1] ? `-${dayjs(range[1]).format(format)}` : ''}
			</Typography.Text>
		);
	}, [isAccurate, range, isSmallScreen]);

	useEffect(() => {
		if (dayjs(range[0]).year() !== dayjs(range[1]).year()) {
			setMode('year');
		} else {
			setMode('month');
		}
	}, [range]);

	const PanelJSX = (
		<Flex gap={16}>
			<Card bordered>
				<Statistic
					title={cardTitle}
					value={getTotalInCurrentRange(list, range, currency)}
					prefix={getSymbolAndPrice(currency)}
					valueStyle={{
						color: '#f00',
						fontSize: isSmallScreen ? '1em' : '1.5em',
					}}
				/>
			</Card>
			<Button
				size={isSmallScreen ? 'small' : 'middle'}
				onClick={resetRange}
				disabled={!isRangeChanged}
			>
				<ReloadOutlined />
			</Button>
		</Flex>
	);

	const DiagramsJSX = (
		<Flex
			vertical
			gap={16}
			align='stretch'
		>
			<YearSlider
				setIsAccurate={setIsStatsAccurate}
				isAccurate={isAccurate}
				range={range}
				defaultRange={defaultRange}
				setRange={setStatsRange}
				setDefaultRange={setDefaultStatsRange}
			/>
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
