import React, { useState, useEffect, useCallback } from 'react';
import { getSymbol } from 'utils/utils';
import { ExpenseItem, Mode } from '../settings/interfaces';
import Item from 'antd/es/list/Item';
import {
	Button,
	Card,
	Col,
	Flex,
	Modal,
	Progress,
	Row,
	Tag,
	Typography,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import Title from 'antd/es/typography/Title';
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import constants from 'settings/constants';
import ItemModal from './ItemModal';

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
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const [currentItem, setCurrentItem] = useState<ExpenseItem>({
		id: id,
		date: date,
		title: title,
		category: category,
		price: price,
	});

	const toggleIsItemDeleting = () => {
		setIsItemDeleting((prevValue: boolean) => !prevValue);
	};

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

	const toggleIsModalOpened = () => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	};

	const updateCurrentItem = (item: ExpenseItem) => {
		setCurrentItem(item);
		replaceItem(item);
		toggleIsModalOpened();
	};

	const TitleJSX = (
		<Flex
			justify='center'
			style={{
				opacity: isItemDeleting ? '.5' : '1',
			}}
		>
			{isSmallScreen ? (
				<Typography.Text strong>{currentItem.title}</Typography.Text>
			) : (
				<Title
					level={3}
					style={{ margin: 0 }}
				>
					{currentItem.title}
				</Title>
			)}
		</Flex>
	);

	const DateJSX = (
		<Flex
			justify='center'
			style={{
				opacity: isItemDeleting ? '.5' : '1',
			}}
		>
			{isSmallScreen ? (
				<Typography.Text strong>
					{currentItem.date.format('DD.MM.YYYY')}
				</Typography.Text>
			) : (
				<Title
					level={3}
					style={{ margin: 0 }}
				>
					{currentItem.date.format('DD.MM.YYYY')}
				</Title>
			)}
		</Flex>
	);

	const CategoryJSX = (
		<Flex
			vertical
			align='stretch'
			style={{
				opacity: isItemDeleting ? '.5' : '1',
			}}
		>
			<Tag color={currentItem.category.color}>
				<span
					style={{
						color: currentItem.category.color,
						filter: 'invert(1)',
					}}
				>
					{currentItem.category.name}
				</span>
			</Tag>
		</Flex>
	);

	const PriceJSX = (
		<Flex
			justify='center'
			style={{
				opacity: isItemDeleting ? '.5' : '1',
			}}
		>
			{isSmallScreen ? (
				<Typography.Text strong>
					{getSymbol(currency)}
					{Math.round(currentItem.price[currency])}
				</Typography.Text>
			) : (
				<Title
					level={3}
					style={{ margin: 0 }}
				>
					{getSymbol(currency)}
					{Math.round(currentItem.price[currency])}
				</Title>
			)}
		</Flex>
	);

	const DeleteButtonJSX = (
		<Button
			onClick={toggleIsItemDeleting}
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

	const EditButtonJSX = (
		<Button
			disabled={isItemDeleting}
			size={isSmallScreen ? 'small' : 'middle'}
			onClick={toggleIsModalOpened}
		>
			<EditOutlined />
		</Button>
	);

	return (
		<>
			<ItemModal
				opened={isModalOpened}
				initialItem={currentItem}
				toggleOpened={toggleIsModalOpened}
				submitItem={updateCurrentItem}
			/>

			{mode === 'list' ? (
				<Item>
					{!isItemDeleting ? (
						<>
							<Col span={5}>{DateJSX}</Col>
							<Col span={7}>{TitleJSX}</Col>
							<Col span={4}>{CategoryJSX}</Col>
							<Col span={3}>{PriceJSX}</Col>
							<Col>{EditButtonJSX}</Col>
							<Col>{DeleteButtonJSX}</Col>
						</>
					) : (
						<>
							<Col span={21}>{ProgressJSX}</Col>
							<Col>{DeleteButtonJSX}</Col>
						</>
					)}
				</Item>
			) : (
				<Card
					size={isSmallScreen ? 'small' : 'default'}
					style={{
						flex: `1 1 ${isSmallScreen ? 10 : 15}em`,
					}}
					bordered
					title={isItemDeleting ? ProgressJSX : TitleJSX}
					actions={[EditButtonJSX, PriceJSX, DeleteButtonJSX]}
				>
					<Flex
						vertical
						align='stretch'
						gap={8}
					>
						{DateJSX}
						{CategoryJSX}
					</Flex>
				</Card>
			)}
		</>
	);
});

export default ListItem;
