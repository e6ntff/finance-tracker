import {
	Button,
	Collapse,
	DatePicker,
	Flex,
	Form,
	Input,
	InputNumber,
	Typography,
} from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useState,
} from 'react';
import constants from 'settings/constants';
import { Goal } from 'settings/interfaces';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import dayjs from 'dayjs';
import goalStore from 'utils/GoalStore';
import { CheckOutlined } from '@ant-design/icons';
import { getSymbolAndPrice } from 'utils/utils';
import { userStore } from 'utils/userStore';

interface Props {
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

const NewGoal: React.FC<Props> = observer(
	({ handleMoneyChange, handleDateChange, handleTitleChange }) => {
		const { isSmallScreen } = userStore;
		const { addGoal } = goalStore;
		const { userOptions } = optionsStore;

		const { currency, language } = userOptions;

		const [activeKey, setActiveKey] = useState<string[]>([]);

		const [newGoal, setNewGoal] = useState<Goal>(constants.emptyGoal);

		const toggleOpened = useCallback(() => {
			if (activeKey.length) {
				setActiveKey([]);
				setNewGoal(constants.emptyGoal);
			} else {
				setActiveKey(['0']);
			}
		}, [setActiveKey, activeKey]);

		const addNewGoal = useCallback(() => {
			const date = dayjs().valueOf();
			addGoal({ ...newGoal, createdAt: date });
			toggleOpened();
		}, [addGoal, toggleOpened, newGoal]);

		return (
			<Collapse
				style={{
					inlineSize: isSmallScreen ? '25em' : '35em',
				}}
				ghost
				onChange={toggleOpened}
				activeKey={activeKey}
				items={[
					{
						key: '0',
						label: languages.newGoal[language],
						children: (
							<Form>
								<Form.Item>
									<Input
										value={newGoal.title}
										onChange={(event: ChangeEvent<HTMLInputElement>) =>
											handleTitleChange(event.target.value, setNewGoal)
										}
									/>
								</Form.Item>
								<Form.Item>
									<DatePicker
										onChange={(date: dayjs.Dayjs) =>
											handleDateChange(date, 'start', setNewGoal)
										}
									/>
									<Typography.Text strong> - </Typography.Text>
									<DatePicker
										onChange={(date: dayjs.Dayjs) =>
											handleDateChange(date, 'end', setNewGoal)
										}
									/>
								</Form.Item>
								<Form.Item>
									<Flex justify='space-between'>
										<Flex
											gap={8}
											align='center'
										>
											<InputNumber
												formatter={(price?: number) =>
													`${getSymbolAndPrice(currency)}${price}`
												}
												value={newGoal.money.collected[currency]}
												onChange={(value: number | null) =>
													handleMoneyChange(value, 'collected', setNewGoal)
												}
											/>
											<Typography.Text strong>/</Typography.Text>
											<InputNumber
												formatter={(price?: number) =>
													`${getSymbolAndPrice(currency)}${price}`
												}
												value={newGoal.money.total[currency]}
												onChange={(value: number | null) =>
													handleMoneyChange(value, 'total', setNewGoal)
												}
											/>
										</Flex>
										<Button
											disabled={!newGoal.title}
											onClick={() => addNewGoal()}
										>
											<CheckOutlined />
										</Button>
									</Flex>
								</Form.Item>
							</Form>
						),
					},
				]}
			/>
		);
	}
);

export default NewGoal;
