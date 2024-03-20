import { Calendar, Flex, Modal, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import constants from 'settings/constants';
import { listStore } from 'utils/listStore';
import { getValuesForCalendar } from 'utils/transformData';
import { getSymbolAndPrice } from 'utils/utils';
import DiagramPie from './DiagramPie';
import { optionsStore } from 'utils/optionsStore';

interface Props {
	opened: boolean;
	toggleOpened: () => void;
}

const CalendarModal: React.FC<Props> = observer(({ opened, toggleOpened }) => {
	const { list } = listStore;
	const { statsOptions, userOptions, setYear, setMonth, setDay } = optionsStore;

	const { currency } = userOptions;
	const { year, month, day } = statsOptions;

	const [isDiagramVisible, setIsDiagramVisible] = useState<boolean>(false);

	const handleDateChange = (date: dayjs.Dayjs) => {
		setYear(date.year());
		setMonth(date.month());
		setDay(date.date());
	};

	const valuesByMonth = useMemo(
		() => getValuesForCalendar(list, currency, year, month),
		[year, month, currency, list]
	);

	const valuesByDay = useMemo(
		() => getValuesForCalendar(list, currency, year, month, day),
		[year, month, day, currency, list]
	);

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
		return (
			<Flex
				vertical
				justify='center'
				align='center'
			>
				<Typography.Text strong>
					{value ? getSymbolAndPrice(currency, value) : '-'}
				</Typography.Text>
			</Flex>
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
					/>
				)}
			</Flex>
		</Modal>
	);
});

export default CalendarModal;
