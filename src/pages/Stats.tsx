import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, Empty, Flex, Spin, Statistic } from 'antd';
import DiagramBar from '../components/DiagramBar';
import DiagramPie from 'components/DiagramPie';
import languages from 'settings/languages';
import { userStore } from 'utils/userStore';
import { getSymbolAndPrice } from 'utils/utils';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import { categoryStore } from 'utils/categoryStore';
import CalendarModal from 'components/CalendarModal';
import { optionsStore } from 'utils/optionsStore';

const Stats: React.FC = observer(() => {
	const { list } = listStore;
	const { isSmallScreen } = userStore;
	const { statsOptions, userOptions, setYear, setMonth, setDay } = optionsStore;
	const { language, currency } = userOptions;

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const { year, month } = statsOptions;

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

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

	const goBack = useCallback(() => {
		if (month) {
			setMonth(null);
			setDay(null);
		} else if (year) {
			setYear(null);
		}
	}, [setMonth, setYear, setDay, month, year]);

	useEffect(() => {
		const goBackWithEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !isModalOpened) {
				goBack();
			}
		};

		window.addEventListener('keydown', goBackWithEsc);

		return () => {
			window.removeEventListener('keydown', goBackWithEsc);
		};
	}, [goBack, isModalOpened]);

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
							year ? languages.In[language] : languages.total[language]
						} ${month !== null ? languages.months[language][month] : ''} ${
							year || ''
						}`}
						value={Math.round(year ? getTotalInCurrentInterval(month) : total)}
						prefix={getSymbolAndPrice(currency)}
						valueStyle={{ color: '#f00' }}
					/>
				</Card>
				<CalendarModal
					opened={isModalOpened}
					toggleOpened={toggleIsModalOpened}
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
							setInterval={setMonth}
						/>
						<DiagramPie
							list={filteredList}
							interval='month'
						/>
					</>
				) : (
					<>
						<DiagramBar
							list={list}
							interval='year'
							setInterval={setYear}
						/>
						<DiagramPie
							list={list}
							interval='year'
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
