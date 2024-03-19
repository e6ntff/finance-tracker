import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, Empty, Flex, Spin, Statistic } from 'antd';
import DiagramBar from '../components/DiagramBar';
import DiagramPie from 'components/DiagramPie';
import Title from 'antd/es/typography/Title';
import languages from 'settings/languages';
import { userStore } from 'utils/userStore';
import { getSymbol } from 'utils/utils';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import { categoryStore } from 'utils/categoryStore';
import CalendarModal from 'components/CalendarModal';

const Stats: React.FC = observer(() => {
	const { list } = listStore;
	const { language, currency, isSmallScreen } = userStore;

	const [year, setYear] = useState<number | null>(null);
	const [month, setMonth] = useState<number | null>(null);
	const [day, setDay] = useState<number | null>(null);
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	useEffect(() => {
		setMonth(null);
	}, [year]);

	useEffect(() => {
		setDay(null);
	}, [month]);

	const total = useMemo(
		() =>
			list.reduce(
				(acc: number, item: ExpenseItem) => acc + item.price[currency],
				0
			),
		[list, currency]
	);

	const filteredList = useMemo(
		() => list.filter((item: ExpenseItem) => item.date.year() === year),
		[year, list]
	);

	const getTotalInCurrentInterval = useCallback(
		(month?: number | null) =>
			filteredList.reduce((acc: number, item: ExpenseItem) => {
				if (item.date.month() === month || !month) {
					return acc + item.price[currency];
				}
				return acc;
			}, 0),
		[filteredList, currency]
	);

	const goBack = () => {
		if (month) {
			setMonth(null);
		} else if (year) {
			setYear(null);
		}
	};

	return listStore.loading || categoryStore.loading ? (
		<Flex justify='center'>
			<Spin />
		</Flex>
	) : list.length ? (
		<>
			<Flex gap={16}>
				{year && (
					<Flex
						vertical
						justify='space-between'
					>
						<Button onClick={goBack}>
							<ArrowLeftOutlined />
						</Button>
						<Button onClick={toggleIsModalOpened}>
							<CalendarOutlined />
						</Button>
					</Flex>
				)}
				<Card
					bordered={false}
					size='small'
				>
					<Statistic
						title={`${
							year ? languages.In[language] : languages.expensesAll[language]
						} ${month !== null ? languages.months[language][month] : ''} ${
							year || ''
						}`}
						value={Math.round(year ? getTotalInCurrentInterval(month) : total)}
						prefix={getSymbol(currency)}
					/>
				</Card>
				<CalendarModal
					opened={isModalOpened}
					toggleOpened={toggleIsModalOpened}
					year={year}
					month={month}
					day={day}
					setYear={setYear}
					setMonth={setMonth}
					setDay={setDay}
				/>
			</Flex>
			<Flex
				align='center'
				justify='space-between'
				style={{ flexDirection: isSmallScreen ? 'column-reverse' : 'row' }}
			>
				{year ? (
					<>
						<DiagramBar
							list={filteredList}
							interval='month'
							year={year}
							month={month}
							setInterval={setMonth}
						/>
						<DiagramPie
							list={filteredList}
							interval='month'
							year={year}
							month={month}
							day={day}
						/>
					</>
				) : (
					<>
						<DiagramBar
							list={list}
							interval='year'
							year={year}
							month={month}
							setInterval={setYear}
						/>
						<DiagramPie
							list={list}
							interval='year'
							year={year}
							month={month}
							day={day}
						/>
					</>
				)}
			</Flex>
		</>
	) : (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={''}
		/>
	);
});

export default memo(Stats);
