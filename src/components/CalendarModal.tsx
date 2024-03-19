import { Calendar, Flex, Modal, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import constants from 'settings/constants';
import { listStore } from 'utils/listStore';
import { getValuesByMonthOrDay } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { getSymbol } from 'utils/utils';
import Title from 'antd/es/typography/Title';

interface Props {
	year: number | null;
	month: number | null;
	day: number | null;
	setYear: (arg0: number | null) => void;
	setMonth: (arg0: number | null) => void;
	setDay: (arg0: number | null) => void;
	opened: boolean;
	toggleOpened: () => void;
}

const CalendarModal: React.FC<Props> = observer(
	({ opened, toggleOpened, year, month, day, setYear, setMonth, setDay }) => {
		const { list } = listStore;
		const { currency } = userStore;

		const handleDateChange = (date: dayjs.Dayjs) => {
			setYear(date.year());
			setMonth(date.month());
			setDay(date.date());
		};

		const valuesByMonth = useMemo(
			() => getValuesByMonthOrDay(list, currency, year, month),
			[year, month, currency, list]
		);

		const valuesByDay = useMemo(
			() => getValuesByMonthOrDay(list, currency, year, month, day),
			[year, month, day, currency, list]
		);

		const monthCellRender = (date: dayjs.Dayjs) => {
			const index = date.month();
			const value = valuesByMonth[index];
			return value ? (
				<Flex
					justify='center'
					align='center'
				>
					<Title level={5}>{`${getSymbol(currency)}${value}`}</Title>
				</Flex>
			) : (
				<></>
			);
		};

		const dateCellRender = (date: dayjs.Dayjs) => {
			const index = date.date();
			const value = valuesByDay[index];
			return value ? (
				<Flex
					justify='center'
					align='center'
				>
					<Typography.Text strong>{`${getSymbol(
						currency
					)}${value}`}</Typography.Text>
				</Flex>
			) : (
				<></>
			);
		};

		const cellRender = (current: any, info: any) => {
			if (info.type === 'date') return dateCellRender(current);
			if (info.type === 'month') return monthCellRender(current);
			return info.originNode;
		};

		return (
			<Modal
				open={opened}
				onCancel={toggleOpened}
				okButtonProps={{
					style: {
						display: 'none',
					},
				}}
				cancelButtonProps={{
					style: {
						display: 'none',
					},
				}}
			>
				<Calendar
					cellRender={cellRender}
					validRange={[constants.startDate, dayjs()]}
					value={dayjs(
						new Date(year as number, month as number, day as number)
					)}
					onChange={handleDateChange}
				/>
			</Modal>
		);
	}
);

export default CalendarModal;
