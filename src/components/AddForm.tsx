import React, { useCallback, useMemo, useState } from 'react';
import getTodayDate from '../utils/date';
import calculatePrices from '../utils/calculatePrices';
import { ExpenseItem, category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import { Button, Col, DatePicker, Flex, Form, Input, Row } from 'antd';
import CurrencySelect from 'components/CurrencySelect';
import { listStore } from 'utils/listStore';
import constants from 'settings/constants';
import dayjs from 'dayjs';
import CategorySelect from './CategorySelect';

const AddForm: React.FC = observer(() => {
	const [isFormActive, setIsFormActive] = useState<boolean>(false);
	const [currency, setCurrency] = useState('USD');
	const { addItem } = listStore;
	const { categories } = categoryStore;
	const { language } = userStore;
	const { currencyRates } = userStore;

	const emptyItem: ExpenseItem = useMemo(
		() => constants.getEmptyItem(getTodayDate),
		[]
	);

	const [newItem, setNewItem] = useState<ExpenseItem>(emptyItem);

	const clearItem = useCallback(() => {
		setNewItem({ ...emptyItem, id: Math.random() });
	}, [setNewItem, emptyItem]);

	const toggleFormDisplay = useCallback(() => {
		setIsFormActive((prev: boolean) => !prev);
		clearItem();
	}, [setIsFormActive, clearItem]);

	const addNewItem = useCallback(() => {
		addItem(newItem);
		toggleFormDisplay();
	}, [addItem, toggleFormDisplay, newItem]);

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setNewItem((prevItem: ExpenseItem) => ({ ...prevItem, title: value }));
		},
		[setNewItem]
	);

	const handleDateChange = useCallback(
		(value: dayjs.Dayjs) => {
			setNewItem((prevItem: ExpenseItem) => ({ ...prevItem, date: value }));
		},
		[setNewItem]
	);

	const handleCategoryChange = useCallback(
		(id: number) => {
			const foundCategory = categories.find((cat: category) => cat.id === id);
			setNewItem((prevItem: ExpenseItem) => ({
				...prevItem,
				category: foundCategory || prevItem.category,
			}));
		},
		[setNewItem, categories]
	);

	const handlePriceChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setNewItem((prevItem) => {
				const updatedItem = {
					...prevItem,
					price: {
						...prevItem.price,
						[currency]: Number(value),
					},
				};
				return {
					...updatedItem,
					price: calculatePrices(updatedItem.price, currencyRates, currency),
				};
			});
		},
		[setNewItem, currency, currencyRates]
	);

	return (
		<>
			{isFormActive ? (
				<Form
					layout='vertical'
					style={{ inlineSize: '50%' }}
				>
					<Form.Item label={languages.title[language]}>
						<Input
							required
							type='text'
							value={newItem.title}
							onInput={handleTitleChange}
						/>
					</Form.Item>
					<Form.Item label={languages.price[language]}>
						<Row>
							<Col span={5}>
								<CurrencySelect
									value={currency}
									setCurrency={setCurrency}
									onChange={setCurrency}
								/>
							</Col>
							<Col span={1}></Col>
							<Col span={18}>
								<Input
									required
									type='number'
									min='1'
									step='1'
									value={Math.round(newItem.price[currency])}
									onInput={handlePriceChange}
								/>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label={languages.dateAndCat[language]}>
						<Row>
							<Col span={15}>
								<CategorySelect
									id={newItem.category.id}
									handler={handleCategoryChange}
								/>
							</Col>
							<Col span={1}></Col>
							<Col span={8}>
								<DatePicker
									required
									onChange={handleDateChange}
									value={newItem.date}
									minDate={dayjs('2020-01-01')}
									maxDate={dayjs(getTodayDate(new Date()))}
								/>
							</Col>
						</Row>
					</Form.Item>
					<Flex justify='space-between'>
						<Button onClick={addNewItem}>{languages.add[language]}</Button>
						<Button onClick={toggleFormDisplay}>
							{languages.cancel[language]}
						</Button>
					</Flex>
				</Form>
			) : (
				<Button
					onClick={toggleFormDisplay}
					style={{ inlineSize: '50%' }}
				>
					{languages.addExpense[language]}
				</Button>
			)}
		</>
	);
});

export default AddForm;
