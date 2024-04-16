import {
	Card,
	DatePicker,
	Flex,
	InputNumber,
	Progress,
	Typography,
} from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { MyDate, MyIcon, MyPrice, MyTitle, tooltipTitle } from './Items';
import languages from 'settings/languages';
import dayjs from 'dayjs';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import {
	CheckOutlined,
	DeleteOutlined,
	EditOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import goalStore from 'utils/GoalStore';
import { Goal } from 'settings/interfaces';
import constants from 'settings/constants';
import { getSymbolAndPrice } from 'utils/utils';

interface Props {
	initialGoalId: string;
	handleMoneyChange: (
		value: number | null,
		key: keyof Goal['money'],
		setGoal: Dispatch<SetStateAction<Goal>>
	) => void;
	handleDateChange: (
		date: dayjs.Dayjs,
		key: keyof Goal['date'],
		setGoal: Dispatch<SetStateAction<Goal>>
	) => void;
	handleTitleChange: (
		value: string,
		setGoal: Dispatch<SetStateAction<Goal>>
	) => void;
}

const GoalItem: React.FC<Props> = observer(
	({
		initialGoalId,
		handleMoneyChange,
		handleDateChange,
		handleTitleChange,
	}) => {
		const { isSmallScreen } = userStore;
		const { userOptions } = optionsStore;
		const { goals, lastDeletedGoalIds, setLastDeletedGoalIds, replaceGoal } =
			goalStore;

		const { language, currency } = userOptions;

		const [currentGoal, setCurrentGoal] = useState<Goal>(goals[initialGoalId]);

		const { title, date, money, createdAt, updatedAt } = currentGoal;

		const [isEditMode, setIsEditMode] = useState<boolean>(false);

		const toggleMode = useCallback(() => {
			setIsEditMode((prevMode: boolean) => {
				prevMode && replaceGoal(initialGoalId, currentGoal);
				return !prevMode;
			});
		}, [setIsEditMode, replaceGoal, currentGoal, initialGoalId]);

		const deleteGoal = useCallback(() => {
			setLastDeletedGoalIds([...lastDeletedGoalIds, initialGoalId]);
		}, [setLastDeletedGoalIds, initialGoalId, lastDeletedGoalIds]);

		const GoalBody = useMemo(() => {
			const started = date.start < dayjs().valueOf();

			const percent = started
				? ((dayjs().valueOf() - date.start) / (date.end - date.start)) * 100
				: ((dayjs().valueOf() - createdAt) / (date.start - createdAt)) * 100;

			const times: [number, string][] = [
				[
					started
						? dayjs(date.end).diff(dayjs(), 'day')
						: dayjs(date.start).diff(dayjs(), 'day'),
					' d',
				],
				[
					started
						? dayjs(date.end).diff(dayjs(), 'hour')
						: dayjs(date.start).diff(dayjs(), 'hour'),
					' h',
				],
				[
					started
						? dayjs(date.end).diff(dayjs(), 'minute')
						: dayjs(date.start).diff(dayjs(), 'minute'),
					' m',
				],
			];

			const timeRemaining = times
				.find((time: [number, string]) => time[0] > 0)
				?.join('');

			const datePicker = (
				<Flex
					align='center'
					gap={4}
				>
					<DatePicker
						onChange={(value: dayjs.Dayjs) => {
							handleDateChange(value, 'start', setCurrentGoal);
						}}
						value={dayjs(date.start)}
						size={isSmallScreen ? 'small' : 'middle'}
						minDate={constants.startDate}
						maxDate={constants.endDate}
					/>
					<Typography.Text strong>-</Typography.Text>
					<DatePicker
						onChange={(value: dayjs.Dayjs) => {
							handleDateChange(value, 'end', setCurrentGoal);
						}}
						value={dayjs(date.end)}
						size={isSmallScreen ? 'small' : 'middle'}
						minDate={dayjs(date.start)}
						maxDate={constants.endDate}
					/>
				</Flex>
			);

			const progress = (
				<Progress
					size={isSmallScreen ? 'small' : 'default'}
					percent={(money.collected.USD / money.total.USD) * 100}
					format={(percent) => `${Math.round(percent as number)}%`}
				/>
			);

			return (
				<Flex
					gap={isSmallScreen ? 16 : 32}
					align='center'
				>
					<Flex
						vertical
						align='center'
						gap={8}
						style={{ inlineSize: '100%' }}
					>
						{progress}
						<Flex>
							{isEditMode
								? datePicker
								: MyDate(date.start, isSmallScreen, date.end)}
						</Flex>
					</Flex>
					<Progress
						status={started ? 'exception' : 'active'}
						type='circle'
						size={'small'}
						percent={percent}
						format={() => timeRemaining}
					/>
				</Flex>
			);
		}, [createdAt, date, handleDateChange, isEditMode, isSmallScreen, money]);

		const ActionsJSX = (
			<Flex justify='space-evenly'>
				{MyIcon(DeleteOutlined, isSmallScreen, {
					onClick: deleteGoal,
					title: languages.delete[language],
				})}
				{isEditMode ? (
					<Flex
						gap={8}
						align='center'
					>
						<InputNumber
							formatter={(price?: number) =>
								`${getSymbolAndPrice(currency)}${price}`
							}
							value={money.collected[currency]}
							onChange={(value: number | null) =>
								handleMoneyChange(value, 'collected', setCurrentGoal)
							}
						/>
						<Typography.Text strong>/</Typography.Text>
						<InputNumber
							formatter={(price?: number) =>
								`${getSymbolAndPrice(currency)}${price}`
							}
							value={money.total[currency]}
							onChange={(value: number | null) =>
								handleMoneyChange(value, 'total', setCurrentGoal)
							}
						/>
					</Flex>
				) : (
					MyPrice(
						money.collected,
						'expense',
						isSmallScreen,
						currency,
						money.total
					)
				)}
				{MyIcon(InfoCircleOutlined, isSmallScreen, {
					title: tooltipTitle(createdAt, updatedAt, language),
				})}
			</Flex>
		);

		return (
			<Card
				title={MyTitle(
					title,
					'expense',
					isSmallScreen,
					language,
					isEditMode
						? {
								onChange: (value: string) =>
									handleTitleChange(value, setCurrentGoal),
						  }
						: false
				)}
				extra={MyIcon(
					isEditMode ? CheckOutlined : EditOutlined,
					isSmallScreen,
					{
						onClick: toggleMode,
						title: languages.edit[language],
					}
				)}
				styles={{ actions: { alignItems: 'center' } }}
				actions={[ActionsJSX]}
				style={{
					inlineSize: '100%',
				}}
			>
				{GoalBody}
			</Card>
		);
	}
);

export default GoalItem;
