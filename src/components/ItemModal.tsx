import React, { useCallback, useEffect, useState } from 'react';
import calculatePrices from '../utils/calculatePrices';
import { ExpenseItem, category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import { Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import CurrencySelect from 'components/CurrencySelect';
import constants from 'settings/constants';
import dayjs from 'dayjs';
import CategorySelect from './CategorySelect';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';

interface Props {
	opened: boolean;
	initialItem: ExpenseItem;
	toggleOpened: () => void;
	submitItem: (arg0: ExpenseItem) => void;
}

const ItemModal: React.FC<Props> = observer(
	({ opened, initialItem, toggleOpened, submitItem }) => {
		const [currency, setCurrency] = useState(constants.baseCurrency);
		const { categories } = categoryStore;
		const { currencyRates, isSmallScreen } = userStore;
		const { userOptions } = optionsStore;

		const { language } = userOptions;

		const [currentItem, setCurrentItem] = useState<ExpenseItem>(initialItem);

		const handleTitleChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				const { value } = event.target;
				setCurrentItem((prevItem: ExpenseItem) => ({
					...prevItem,
					title: value,
				}));
			},
			[setCurrentItem]
		);

		const handleDateChange = useCallback(
			(value: dayjs.Dayjs) => {
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
			(event: React.ChangeEvent<HTMLInputElement>) => {
				const { value } = event.target;
				setCurrentItem((prevItem) => {
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
			[setCurrentItem, currency, currencyRates]
		);

		useEffect(() => {
			const submitItemWithEnter = (event: KeyboardEvent) => {
				if (event.key === 'Enter' && opened) {
					submitItem(currentItem);
				}
			};

			window.addEventListener('keydown', submitItemWithEnter);

			return () => {
				window.removeEventListener('keydown', submitItemWithEnter);
			};
		}, [currentItem, submitItem, opened]);

		const TitleJSX = (
			<Input
				required
				type='text'
				value={currentItem.title}
				onInput={handleTitleChange}
			/>
		);

		const PriceJSX = (
			<Input
				required
				type='number'
				min='1'
				step='1'
				value={Math.round(currentItem.price[currency])}
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
				value={currentItem.date}
				minDate={constants.startDate}
				maxDate={dayjs()}
			/>
		);

		const CategoryJSX = (
			<CategorySelect
				value={currentItem.category}
				onChange={handleCategoryChange}
			/>
		);

		return (
			<Modal
				style={{ inlineSize: '' }}
				open={opened}
				okButtonProps={{ size: isSmallScreen ? 'small' : 'middle' }}
				cancelButtonProps={{ size: isSmallScreen ? 'small' : 'middle' }}
				onOk={() => {
					submitItem(currentItem);
				}}
				onCancel={() => {
					setCurrentItem(initialItem);
					toggleOpened();
				}}
				okText={<CheckOutlined />}
				cancelText={<CloseOutlined />}
			>
				<Form
					size={isSmallScreen ? 'small' : 'middle'}
					layout='vertical'
					style={{ inlineSize: '100%' }}
				>
					<Form.Item label={languages.title[language]}>{TitleJSX}</Form.Item>
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
				</Form>
			</Modal>
		);
	}
);

export default ItemModal;
