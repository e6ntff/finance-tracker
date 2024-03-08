import React, { useState, useEffect, useCallback } from 'react';
import calculatePrices from '../utils/calculatePrices';
import getTodayDate from '../utils/date';
import getSymbol from '../utils/getSymbol';
import CategorySelect from './CategorySelect';
import { ExpenseItem, category } from '../settings/interfaces';
import useDebounce from '../hooks/useDebounce';
import Item from 'antd/es/list/Item';
import { Button, Col, DatePicker, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
	initialIitem: ExpenseItem;
}

const ListItem: React.FC<Props> = observer(({ initialIitem }) => {
	const { id, category, date, title, price } = initialIitem;
	const { currency } = userStore;
	const { currencyRates } = userStore;
	const { categories } = categoryStore;
	const { replaceItem, removeItem } = listStore;

	const [currentItem, setCurrentItem] = useState<ExpenseItem>({
		id: id,
		date: date,
		title: title,
		category: category,
		price: price,
	});

	const deleteItem = useCallback(() => {
		removeItem(currentItem);
	}, [currentItem, removeItem]);

	const handleTitleChange = useCallback(
		(value: string) => {
			setCurrentItem((prevItem: ExpenseItem) => ({
				...prevItem,
				title: value,
			}));
		},
		[setCurrentItem]
	);

	const handleDateChange = useCallback(
		(value: any) => {
			setCurrentItem((prevItem: ExpenseItem) => ({ ...prevItem, date: value }));
		},
		[setCurrentItem]
	);

	const handleCategoryChange = useCallback(
		(id: number) => {
			const foundCategory = categories.find((cat: category) => cat.id === id);
			setCurrentItem((prevItem: ExpenseItem) => ({
				...prevItem,
				category: foundCategory || prevItem.category,
			}));
		},
		[setCurrentItem, categories]
	);

	const clearInput = (initialValue: number, value: string) => {
		if (Number(value).toString() === value) {
			return Number(value);
		}
		return initialValue;
	};

	const handlePriceChange = useCallback(
		(value: string) => {
			setCurrentItem((prevItem) => {
				const updatedItem = {
					...prevItem,
					price: {
						...prevItem.price,
						[currency]: clearInput(prevItem.price[currency], value),
					},
				};
				return {
					...updatedItem,
					price: calculatePrices(updatedItem.price, currencyRates, currency),
				};
			});
		},
		[setCurrentItem, currency, currencyRates]
	);

	const debouncedItem = useDebounce(currentItem);

	useEffect(() => {
		replaceItem(debouncedItem);
	}, [debouncedItem, replaceItem]);

	return (
		<Item>
			<Col span={4}>
				<DatePicker
					value={currentItem.date}
					minDate={dayjs('2020-01-01')}
					maxDate={dayjs(getTodayDate(new Date()))}
					onChange={handleDateChange}
				/>
			</Col>
			<Col span={8}>
				<Flex justify='center'>
					<Title
						level={3}
						style={{ margin: 0 }}
						editable={{ onChange: handleTitleChange }}
					>
						{currentItem.title}
					</Title>
				</Flex>
			</Col>
			<Col span={4}>
				<CategorySelect
					handler={handleCategoryChange}
					item={currentItem}
				/>
			</Col>
			<Col span={5}>
				<Flex justify='center'>
					<Title
						level={3}
						style={{ margin: 0 }}
						editable={{ onChange: handlePriceChange }}
					>
						{getSymbol(currency)}
						{Math.round(currentItem.price[currency])}
					</Title>
				</Flex>
			</Col>
			<Col span={2}>
				<Button onClick={deleteItem}>
					<DeleteOutlined />
				</Button>
			</Col>
		</Item>
	);
});

export default ListItem;
