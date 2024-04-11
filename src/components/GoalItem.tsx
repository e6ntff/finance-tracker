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
	useEffect,
	useState,
} from 'react';
import {
	MyDate,
	MyIconWithTooltip,
	MyPrice,
	MyTitle,
	tooltipTitle,
} from './Items';
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

		const deleteGoal = useCallback(() => {
			setLastDeletedGoalIds([...lastDeletedGoalIds, initialGoalId]);
		}, [setLastDeletedGoalIds, initialGoalId, lastDeletedGoalIds]);

		useEffect(() => {
			!isEditMode && replaceGoal(initialGoalId, currentGoal);
			// eslint-disable-next-line
		}, [currentGoal, isEditMode]);

		const GoalBody = () => {
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

			const datePicker = () => {
				return (
					<DatePicker.RangePicker
						onChange={(values: [any, any]) => {
							handleDateChange(values[0].valueOf(), 'start', setCurrentGoal);
							handleDateChange(values[1].valueOf(), 'end', setCurrentGoal);
						}}
						value={[dayjs(date.start), dayjs(date.end)]}
						size={isSmallScreen ? 'small' : 'middle'}
						minDate={constants.startDate}
						maxDate={constants.endDate}
					/>
				);
			};

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
						<Progress
							size={isSmallScreen ? 'small' : 'default'}
							percent={(money.collected.USD / money.total.USD) * 100}
							format={(percent) => `${Math.round(percent as number)}%`}
						/>
						<Flex align='center'>
							{isEditMode ? (
								datePicker()
							) : (
								<>
									{MyDate(date.start, isSmallScreen)}
									<Typography.Text strong>-</Typography.Text>
									{MyDate(date.end, isSmallScreen)}
								</>
							)}
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
		};

		const ActionsJSX = (
			<Flex justify='space-evenly'>
				{MyIconWithTooltip(
					languages.delete[language],
					isSmallScreen,
					DeleteOutlined,
					false,
					deleteGoal
				)}
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
				{MyIconWithTooltip(
					tooltipTitle(createdAt, updatedAt, language),
					isSmallScreen,
					InfoCircleOutlined,
					false,
					undefined
				)}
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
				extra={MyIconWithTooltip(
					languages.edit[language],
					isSmallScreen,
					isEditMode ? CheckOutlined : EditOutlined,
					false,
					() => setIsEditMode((prevMode: boolean) => !prevMode)
				)}
				styles={{ actions: { alignItems: 'center' } }}
				actions={[ActionsJSX]}
				style={{
					inlineSize: '100%',
				}}
			>
				<GoalBody />
			</Card>
		);
	}
);

export default GoalItem;
