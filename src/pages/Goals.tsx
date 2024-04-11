import { Flex } from 'antd';
import GoalItem from 'components/GoalItem';
import NewGoal from 'components/NewGoal';
import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Goal } from 'settings/interfaces';
import goalStore from 'utils/GoalStore';
import calculatePrices from 'utils/calculatePrices';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';

const Goals: React.FC = observer(() => {
	const { isSmallScreen, currencyRates } = userStore;
	const { goals, lastDeletedGoalIds } = goalStore;
	const { userOptions } = optionsStore;

	const { currency } = userOptions;

	const handleTitleChange = useCallback(
		(value: string, setGoal: Dispatch<SetStateAction<Goal>>) => {
			setGoal((prevItem: Goal) => ({
				...prevItem,
				title: value,
			}));
		},
		[]
	);

	const handleMoneyChange = useCallback(
		(
			value: number | null,
			key: keyof Goal['money'],
			setGoal: Dispatch<SetStateAction<Goal>>
		) => {
			setGoal((prevGoal: Goal) => {
				const updatedGoal = {
					...prevGoal,
					money: {
						...prevGoal.money,
						[key]: { ...prevGoal.money[key], [currency]: value },
					},
				};
				return {
					...updatedGoal,
					money: {
						...updatedGoal.money,
						[key]: calculatePrices(
							updatedGoal.money[key],
							currencyRates,
							currency
						),
					},
				};
			});
		},
		[currency, currencyRates]
	);

	const handleDateChange = useCallback(
		(
			date: dayjs.Dayjs,
			key: keyof Goal['date'],
			setGoal: Dispatch<SetStateAction<Goal>>
		) => {
			setGoal((prevGoal: Goal) => ({
				...prevGoal,
				date: { ...prevGoal.date, [key]: date.valueOf() },
			}));
		},
		[]
	);

	return (
		<Flex
			style={{
				inlineSize: isSmallScreen ? '25em' : '35em',
				margin: 'auto',
			}}
			vertical
			gap={isSmallScreen ? 16 : 32}
			align='center'
		>
			<NewGoal
				handleMoneyChange={handleMoneyChange}
				handleDateChange={handleDateChange}
				handleTitleChange={handleTitleChange}
			/>
			{Object.keys(goals)
				.filter((key: string) => !lastDeletedGoalIds.includes(key))
				.map((key: string) => (
					<GoalItem
						key={key}
						initialGoalId={key}
						handleMoneyChange={handleMoneyChange}
						handleDateChange={handleDateChange}
						handleTitleChange={handleTitleChange}
					/>
				))}
		</Flex>
	);
});

export default Goals;
