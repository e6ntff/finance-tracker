import React, {
	useState,
	useCallback,
	useMemo,
	useEffect,
	memo,
} from 'react';
import { ExpenseItem, StatsOptions } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, Empty, Flex, Spin, Statistic } from 'antd';
import DiagramBar from '../components/DiagramBar';
import DiagramPie from 'components/DiagramPie';
import languages from 'settings/languages';
import { userStore } from 'utils/userStore';
import { getSymbol } from 'utils/utils';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import { categoryStore } from 'utils/categoryStore';
import CalendarModal from 'components/CalendarModal';

const defaultStatsOptions: StatsOptions = {
	year: null,
	month: null,
	day: null,
};

const Stats: React.FC = observer(() => {
	const { list } = listStore;
	const { language, currency, isSmallScreen } = userStore;
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [statsOptions, setStatsOptions] = useState<StatsOptions>(
		JSON.parse(
			localStorage.getItem('statsOptions') ||
				JSON.stringify(defaultStatsOptions)
		)
	);

	useEffect(() => {
		localStorage.setItem('statsOptions', JSON.stringify(statsOptions));
	}, [statsOptions]);

	const setMonth = useCallback(
		(value: number | null) => {
			setStatsOptions((prevOptions: StatsOptions) => ({
				...prevOptions,
				month: value,
			}));
		},
		[setStatsOptions]
	);

	const setYear = useCallback(
		(value: number | null) => {
			setStatsOptions((prevOptions: StatsOptions) => ({
				...prevOptions,
				year: value,
			}));
		},
		[setStatsOptions]
	);

	const setDay = useCallback(
		(value: number | null) => {
			setStatsOptions((prevOptions: StatsOptions) => ({
				...prevOptions,
				day: value,
			}));
		},
		[setStatsOptions]
	);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	useEffect(() => {
		setMonth(null);
	}, [statsOptions.year, setMonth]);

	useEffect(() => {
		setDay(null);
	}, [statsOptions.month, setDay]);

	const total = useMemo(
		() =>
			list.reduce(
				(acc: number, item: ExpenseItem) => acc + item.price[currency],
				0
			),
		[list, currency]
	);

	const filteredList = useMemo(
		() =>
			list.filter(
				(item: ExpenseItem) => item.date.year() === statsOptions.year
			),
		[statsOptions.year, list]
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
		if (statsOptions.month) {
			setMonth(null);
		} else if (statsOptions.year) {
			setYear(null);
		}
	}, [setMonth, setYear, statsOptions.month, statsOptions.year]);

	return listStore.loading || categoryStore.loading ? (
		<Flex justify='center'>
			<Spin />
		</Flex>
	) : list.length ? (
		<>
			<Flex gap={16}>
				{statsOptions.year && (
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
							statsOptions.year
								? languages.In[language]
								: languages.expensesAll[language]
						} ${
							statsOptions.month !== null
								? languages.months[language][statsOptions.month]
								: ''
						} ${statsOptions.year || ''}`}
						value={Math.round(
							statsOptions.year
								? getTotalInCurrentInterval(statsOptions.month)
								: total
						)}
						prefix={getSymbol(currency)}
					/>
				</Card>
				<CalendarModal
					opened={isModalOpened}
					toggleOpened={toggleIsModalOpened}
					statsOptions={statsOptions}
					setStatsOptions={setStatsOptions}
				/>
			</Flex>
			<Flex
				align='center'
				justify='space-between'
				style={{ flexDirection: isSmallScreen ? 'column-reverse' : 'row' }}
			>
				{statsOptions.year ? (
					<>
						<DiagramBar
							list={filteredList}
							interval='month'
							statsOptions={statsOptions}
							setInterval={setMonth}
						/>
						<DiagramPie
							list={filteredList}
							interval='month'
							statsOptions={statsOptions}
						/>
					</>
				) : (
					<>
						<DiagramBar
							list={list}
							interval='year'
							statsOptions={statsOptions}
							setInterval={setYear}
						/>
						<DiagramPie
							list={list}
							interval='year'
							statsOptions={statsOptions}
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
