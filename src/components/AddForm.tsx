import React, { useCallback, useMemo, useState } from 'react';
import { getTodayDate } from 'utils/utils';
import calculatePrices from '../utils/calculatePrices';
import { ExpenseItem, category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import {
	Button,
	Col,
	Collapse,
	DatePicker,
	Flex,
	Form,
	Input,
	Row,
	Typography,
} from 'antd';
import CurrencySelect from 'components/CurrencySelect';
import { listStore } from 'utils/listStore';
import constants from 'settings/constants';
import dayjs from 'dayjs';
import CategorySelect from './CategorySelect';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const AddForm: React.FC = observer(() => {
	const [activeKey, setActiveKey] = useState<string | string[]>([]);
	const [currency, setCurrency] = useState('USD');
	const { addItem } = listStore;
	const { categories } = categoryStore;
	const { language, currencyRates, isSmallScreen } = userStore;

	const emptyItem: ExpenseItem = useMemo(
		() => constants.getEmptyItem(getTodayDate),
		[]
	);

	const [newItem, setNewItem] = useState<ExpenseItem>(emptyItem);

	const clearItem = useCallback(() => {
		setNewItem({ ...emptyItem, id: Math.random() });
	}, [setNewItem, emptyItem]);

	const handleActiveKeyChange = useCallback(
		(key: string | string[]) => {
			setActiveKey(key);
			clearItem();
		},
		[setActiveKey, clearItem]
	);

	const addNewItem = useCallback(() => {
		addItem(newItem);
		handleActiveKeyChange([]);
	}, [addItem, handleActiveKeyChange, newItem]);

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setNewItem((prevItem: ExpenseItem) => ({ ...prevItem, title: value }));
		},
		[setNewItem]
	);

	const handleDateChange = useCallback(
		(value: dayjs.Dayjs) => {
			if (value)
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

	const TitleJSX = (
		<Input
			required
			type='text'
			value={newItem.title}
			onInput={handleTitleChange}
		/>
	);

	const PriceJSX = (
		<Input
			required
			type='number'
			min='1'
			step='1'
			value={Math.round(newItem.price[currency])}
			onInput={handlePriceChange}
		/>
	);

	const CurrencyJSX = (
		<CurrencySelect
			value={currency}
			setCurrency={setCurrency}
			onChange={setCurrency}
		/>
	);

	const DateJSX = (
		<DatePicker
			required
			onChange={handleDateChange}
			value={newItem.date}
			minDate={dayjs('2020-01-01')}
			maxDate={dayjs(getTodayDate(new Date()))}
		/>
	);

	const CategoryJSX = (
		<CategorySelect
			item={newItem}
			handler={handleCategoryChange}
		/>
	);

	return (
		<Collapse
			ghost
			activeKey={activeKey}
			onChange={handleActiveKeyChange}
			style={{
				inlineSize: isSmallScreen ? '100%' : 'min(25em, 50%)',
				alignSelf: 'start',
			}}
			size='small'
			items={[
				{
					key: 0,
					label: (
						<Typography.Text>{languages.addExpense[language]}</Typography.Text>
					),
					children: (
						<Form
							layout='vertical'
							style={{ inlineSize: '100%' }}
						>
							<Form.Item label={languages.title[language]}>
								{TitleJSX}
							</Form.Item>
							<Form.Item label={languages.price[language]}>
								<Row>
									<Col span={16}>{PriceJSX}</Col>
									<Col span={1}></Col>
									<Col span={7}>{CurrencyJSX}</Col>
								</Row>
							</Form.Item>
							<Form.Item label={languages.dateAndCat[language]}>
								<Row>
									<Col span={10}>{DateJSX}</Col>
									<Col span={1}></Col>
									<Col span={13}>{CategoryJSX}</Col>
								</Row>
							</Form.Item>
							<Flex justify='space-between'>
								<Button onClick={addNewItem}>
									<CheckOutlined />
								</Button>
								<Button onClick={() => setActiveKey([])}>
									<CloseOutlined />
								</Button>
							</Flex>
						</Form>
					),
				},
			]}
		/>
	);
});

export default AddForm;
