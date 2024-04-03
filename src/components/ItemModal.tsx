import React, { useCallback, useEffect, useMemo, useState } from 'react';
import calculatePrices from '../utils/calculatePrices';
import { ExpenseItem } from '../settings/interfaces';
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
import { listStore } from 'utils/listStore';
import ImageUpload from './ImageUpload';
import { convertToJpeg } from 'utils/utils';

interface Props {
	opened: boolean;
	initialItemId?: string;
	toggleOpened: () => void;
	submitItem: (arg0: ExpenseItem) => void;
}

const ItemModal: React.FC<Props> = observer(
	({ opened, initialItemId, toggleOpened, submitItem }) => {
		const [currency, setCurrency] = useState(constants.baseCurrency);
		const { currencyRates, isSmallScreen, isTourStarted } = userStore;
		const { userOptions } = optionsStore;
		const { userList, listTemplate } = listStore;

		const list = useMemo(
			() => (isTourStarted ? listTemplate : userList),
			[isTourStarted, listTemplate, userList]
		);

		const { language } = userOptions;

		const initialItem = useMemo(
			() =>
				initialItemId !== undefined ? list[initialItemId] : constants.emptyItem,
			[list, initialItemId]
		);

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
						date: value.valueOf(),
					}));
			},
			[setCurrentItem]
		);

		const handleCategoryChange = useCallback(
			(id: string) => {
				setCurrentItem((prevItem: ExpenseItem) => ({
					...prevItem,
					categoryId: id,
				}));
			},
			[setCurrentItem]
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

		const handleImageChange = useCallback(
			(image: string) => {
				convertToJpeg(image as string, 0.5).then((image: string) => {
					setCurrentItem((prevItem) => ({
						...prevItem,
						image: image,
					}));
				});
			},
			[setCurrentItem]
		);

		useEffect(() => {
			const submitItemWithEnter = (event: KeyboardEvent) => {
				if (event.key === 'Enter' && opened) {
					submitItem(currentItem);
					window.removeEventListener('keyup', submitItemWithEnter);
				}
			};

			window.addEventListener('keyup', submitItemWithEnter);

			return () => {
				window.removeEventListener('keyup', submitItemWithEnter);
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
				value={dayjs(currentItem.date)}
				minDate={constants.startDate}
				maxDate={dayjs()}
			/>
		);

		const CategoryJSX = (
			<CategorySelect
				id={currentItem.categoryId}
				onChange={handleCategoryChange}
			/>
		);

		const ImageJSX = (
			<ImageUpload
				image={currentItem.image}
				onChange={handleImageChange}
			/>
		);

		return (
			<Modal
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
					<Form.Item label={languages.image[language]}>{ImageJSX}</Form.Item>
				</Form>
			</Modal>
		);
	}
);

export default ItemModal;
