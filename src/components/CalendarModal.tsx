import { Calendar, Flex, Modal, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import constants from 'settings/constants';
import { listStore } from 'utils/listStore';
import { getValuesByMonthOrDay } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { getSymbol } from 'utils/utils';
import DiagramPie from './DiagramPie';

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

		const [isDiagramVisible, setIsDiagramVisible] = useState<boolean>(false);

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
		
		useEffect(() => {
			if (day && valuesByDay[day]) {
				setIsDiagramVisible(true);
			} else {
				setIsDiagramVisible(false);
			}
		}, [day, valuesByDay]);

		useEffect(() => {
			if (day && valuesByDay[day]) {
				setIsDiagramVisible(true);
			} else {
				setIsDiagramVisible(false);
			}
		}, [day, valuesByDay]);

		const cellRender = (date: dayjs.Dayjs, info: any) => {
			const index = info.type === 'date' ? date.date() : date.month();
			const value =
				info.type === 'date' ? valuesByDay[index] : valuesByMonth[index];
			return value ? (
				<Flex
					vertical
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
				<Flex
					vertical
					align='center'
				>
					<Calendar
						cellRender={cellRender}
						fullscreen={false}
						validRange={[constants.startDate, dayjs()]}
						value={dayjs(new Date(year as number, month || 0, day || 1))}
						onChange={handleDateChange}
					/>
					{isDiagramVisible && (
						<DiagramPie
							list={list}
							interval='day'
							year={year}
							month={month}
							day={day}
						/>
					)}
				</Flex>
			</Modal>
		);
	}
);

export default CalendarModal;
