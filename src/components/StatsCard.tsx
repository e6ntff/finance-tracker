import { Card, Statistic, Tooltip, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { memo, useMemo } from 'react';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { getTotalInCurrentRange } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { getSymbolAndPrice } from 'utils/utils';
import dayjs from 'dayjs';
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
	resetRange: () => void;
}

const StatsCard: React.FC<Props> = observer(({ resetRange }) => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { statsOptions, userOptions, defaultRange } = optionsStore;

	const { range } = statsOptions;
	const { currency } = userOptions;

	const value = useMemo(
		() => getTotalInCurrentRange(list, range, currency),
		[list, range, currency]
	);

	const cardTitle = useMemo(() => {
		const format = true ? 'DD.MM.YY' : 'MM.YY';
		return (
			<Typography.Text
				type='secondary'
				style={{ fontSize: isSmallScreen ? '.8em' : '1.2em' }}
			>
				{dayjs(range[0]).format(format)}
				{range[0] !== range[1] ? `-${dayjs(range[1]).format(format)}` : ''}
			</Typography.Text>
		);
	}, [range, isSmallScreen]);

	const isRangeChanged = useMemo(
		() => range[0] !== defaultRange[0] || range[1] !== defaultRange[1],
		[range, defaultRange]
	);

	return (
		<Card bordered>
			<Statistic
				title={
					<Tooltip
						placement='right'
						color='#0000'
						open={isRangeChanged}
						title={
							<ReloadOutlined
								onClick={resetRange}
								style={{
									scale: isSmallScreen ? '1' : '1.25',
									filter: 'invert()',
								}}
							/>
						}
					>
						{cardTitle}
					</Tooltip>
				}
				value={value}
				prefix={getSymbolAndPrice(currency)}
				valueStyle={{
					color: '#f00',
					fontSize: isSmallScreen ? '1.5em' : '2.25em',
				}}
			/>
		</Card>
	);
});

export default memo(StatsCard);
