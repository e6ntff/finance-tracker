import { Card, DatePicker, Statistic, Tooltip, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { memo, useMemo } from 'react';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { getTotalInCurrentRange } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { getSymbolAndPrice } from 'utils/utils';
import dayjs from 'dayjs';
import constants from 'settings/constants';

interface Props {
	resetRange: () => void;
}

const StatsCard: React.FC<Props> = observer(({ resetRange }) => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { statsOptions, userOptions, setStatsRange } = optionsStore;

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

	return (
		<Card bordered>
			<Statistic
				title={
					<Tooltip
						color='#0000'
						trigger='click'
						title={
							<DatePicker.RangePicker
								onChange={(values: [any, any]) => {
									setStatsRange(
										values.map((value: dayjs.Dayjs) => value.valueOf())
									);
								}}
								value={[dayjs(range[0]), dayjs(range[1])]}
								size={isSmallScreen ? 'small' : 'middle'}
								minDate={constants.startDate}
								maxDate={dayjs()}
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
