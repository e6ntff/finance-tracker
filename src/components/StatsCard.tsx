import { Card, Statistic, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { memo, useMemo } from 'react';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { getTotalInCurrentRange } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { getSymbolAndPrice } from 'utils/utils';
import dayjs from 'dayjs';

const StatsCard: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { listOptions, userOptions } = optionsStore;

	const { range, isAccurate } = listOptions;
	const { currency } = userOptions;

	const value = useMemo(
		() => getTotalInCurrentRange(list, range, currency),
		[list, range, currency]
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

	return (
		<Card bordered>
			<Statistic
				title={cardTitle}
				value={value}
				prefix={getSymbolAndPrice(currency)}
				valueStyle={{
					color: '#f00',
					fontSize: isSmallScreen ? '1em' : '1.5em',
				}}
			/>
		</Card>
	);
});

export default memo(StatsCard);
