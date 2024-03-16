import React, { useState, useEffect, useCallback } from 'react';
import calculatePrices from '../utils/calculatePrices';
import { getSymbol, getTodayDate } from 'utils/utils';
import CategorySelect from './CategorySelect';
import { ExpenseItem, Mode, category } from '../settings/interfaces';
import useDebounce from '../hooks/useDebounce';
import Item from 'antd/es/list/Item';
import { Button, Card, Col, DatePicker, Flex, Progress, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import Title from 'antd/es/typography/Title';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import constants from 'settings/constants';

interface Props {
	mode: Mode;
	initialIitem: ExpenseItem;
}

const ListItem: React.FC<Props> = observer(({ mode, initialIitem }) => {
	const { id, category, date, title, price } = initialIitem;
	const { currency, currencyRates, isSmallScreen } = userStore;
	const { categories } = categoryStore;
	const { replaceItem, removeItem } = listStore;
	const [isItemDeleting, setIsItemDeleting] = useState<boolean>(false);
	const [deleteValue, setDeleteValue] = useState<number>(0);

	const [currentItem, setCurrentItem] = useState<ExpenseItem>({
		id: id,
		date: date,
		title: title,
		category: category,
		price: price,
	});

	const startItemDeleting = useCallback(() => {
		setIsItemDeleting(true);
	}, [setIsItemDeleting]);

	const cancelItemDeleting = useCallback(() => {
		setIsItemDeleting(false);
	}, [setIsItemDeleting]);

	useEffect(() => {
		const deleteId = setInterval(() => {
			setDeleteValue((prevValue: number) => {
				const newValue = prevValue + 10;
				if (newValue >= constants.deleteDelay && isItemDeleting) {
					removeItem(currentItem);
				}
				return newValue;
			});
		}, 10);
		if (!isItemDeleting) {
			clearInterval(deleteId);
			setDeleteValue(0);
		}
		return () => clearInterval(deleteId);
	}, [isItemDeleting, currentItem, removeItem]);

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
				level={isSmallScreen ? 4 : 3}
				style={{ margin: 0 }}
				editable={isItemDeleting ? false : { onChange: handleTitleChange }}
			>
				{currentItem.title}
			</Title>
		</Flex>
	);

	const CategorySelectJSX = (
		<Flex
			vertical
			align='stretch'
		>
			<CategorySelect
				value={currentItem.category}
				onChange={handleCategoryChange}
			/>
		</Flex>
	);

	const PriceJSX = (
		<Flex justify='center'>
			<Title
				level={isSmallScreen ? 4 : 3}
				style={{ margin: 0 }}
				editable={isItemDeleting ? false : { onChange: handlePriceChange }}
			>
				{getSymbol(currency)}
				{Math.round(currentItem.price[currency])}
			</Title>
		</Flex>
	);

	const ButtonJSX = (
		<Button
			onClick={isItemDeleting ? cancelItemDeleting : startItemDeleting}
			size={isSmallScreen ? 'small' : 'middle'}
		>
			{isItemDeleting ? <CloseOutlined /> : <DeleteOutlined />}
		</Button>
	);

	const ProgressJSX = (
		<Progress
			showInfo={false}
			percent={(deleteValue / constants.deleteDelay) * 100}
			status='exception'
		/>
	);

	return mode === 'list' ? (
		<Item>
			{!isItemDeleting ? (
				isSmallScreen ? (
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
							<Col>{ButtonJSX}</Col>
						</Row>
					</Flex>
				) : (
					<>
						<Col span={4}>{DatePickerJSX}</Col>
						<Col span={8}>{TitleJSX}</Col>
						<Col span={4}>{CategorySelectJSX}</Col>
						<Col span={5}>{PriceJSX}</Col>
						<Col>{ButtonJSX}</Col>
					</>
				)
			) : (
				<>
					<Col span={21}>{ProgressJSX}</Col>
					<Col>{ButtonJSX}</Col>
				</>
			)}
		</Item>
	) : (
		<Card
			size={isSmallScreen ? 'small' : 'default'}
			style={{
				flex: `1 1 ${isSmallScreen ? 15 : 20}em`,
			}}
			bordered
			title={TitleJSX}
			actions={[PriceJSX, ButtonJSX]}
		>
			{isItemDeleting ? (
				<Flex>{ProgressJSX}</Flex>
			) : (
				<Flex
					vertical={isSmallScreen}
					align='stretch'
					gap={8}
				>
					{DatePickerJSX}
					{CategorySelectJSX}
				</Flex>
			)}
		</Card>
	);
});

export default ListItem;
