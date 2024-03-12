import React, { useState, useEffect, useCallback } from 'react';
import calculatePrices from '../utils/calculatePrices';
import { getSymbol, getTodayDate } from 'utils/utils';
import CategorySelect from './CategorySelect';
import { ExpenseItem, category } from '../settings/interfaces';
import useDebounce from '../hooks/useDebounce';
import Item from 'antd/es/list/Item';
import { Button, Col, DatePicker, Flex, Row } from 'antd';
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
	const { currency, currencyRates, isSmallScreen } = userStore;
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
			if (value)
				setCurrentItem((prevItem: ExpenseItem) => ({
					...prevItem,
					date: value,
				}));
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

	const handlePriceChange = useCallback(
		(value: string) => {
			setCurrentItem((prevItem) => {
				const updatedItem = {
					...prevItem,
					price: {
						...prevItem.price,
						[currency]: parseInt(value.toString()) || prevItem.price[currency],
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

	const DatePickerJSX = (
		<DatePicker
			value={currentItem.date}
			minDate={dayjs('2020-01-01')}
			maxDate={dayjs(getTodayDate(new Date()))}
			onChange={handleDateChange}
		/>
	);

	const TitleJSX = (
		<Flex justify='center'>
			<Title
				level={3}
				style={{ margin: 0 }}
				editable={{ onChange: handleTitleChange }}
			>
				{currentItem.title}
			</Title>
		</Flex>
	);

	const CategorySelectJSX = (
		<CategorySelect
			handler={handleCategoryChange}
			item={currentItem}
		/>
	);

	const PriceJSX = (
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
	);

	const ButtonJSX = (
		<Button onClick={deleteItem}>
			<DeleteOutlined />
		</Button>
	);

	return (
		<Item>
			{isSmallScreen ? (
				<Flex
					vertical
					gap={8}
					style={{ inlineSize: '100%', margin: 'auto' }}
				>
					<Row justify='space-between'>
						<Col span={14}>{TitleJSX}</Col>
						<Col span={8}>{PriceJSX}</Col>
					</Row>
					<Row justify='space-between'>
						<Col span={9}>{DatePickerJSX}</Col>
						<Col span={9}>{CategorySelectJSX}</Col>
						<Col span={4}>{ButtonJSX}</Col>
					</Row>
				</Flex>
			) : (
				<>
					<Col span={4}>{DatePickerJSX}</Col>
					<Col span={8}>{TitleJSX}</Col>
					<Col span={4}>{CategorySelectJSX}</Col>
					<Col span={5}>{PriceJSX}</Col>
					<Col span={2}>{ButtonJSX}</Col>
				</>
			)}
		</Item>
	);
});

export default ListItem;
