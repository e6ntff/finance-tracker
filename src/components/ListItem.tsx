import React, { useState, useEffect, useCallback } from 'react';
import { getSymbolAndPrice } from 'utils/utils';
import { ExpenseItem, Mode } from '../settings/interfaces';
import Item from 'antd/es/list/Item';
import { Card, Col, Flex, Progress, Statistic, Tag, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import Title from 'antd/es/typography/Title';
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import constants from 'settings/constants';
import ItemModal from './ItemModal';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

interface Props {
	mode: Mode;
	initialItem: ExpenseItem;
}

const ListItem: React.FC<Props> = observer(({ mode, initialItem }) => {
	const { id, category, date, title, price } = initialItem;
	const { isSmallScreen } = userStore;
	const { replaceItem, removeItem } = listStore;
	const { userOptions } = optionsStore;

	const { currency, language } = userOptions;

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

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	const updateCurrentItem = useCallback(
		(item: ExpenseItem) => {
			setCurrentItem(item);
			replaceItem(item);
			toggleIsModalOpened();
		},
		[setCurrentItem, replaceItem, toggleIsModalOpened]
	);

	const TitleJSX = (
		<Flex
			justify='center'
			style={{
				opacity: isItemDeleting || !currentItem.title ? '.5' : '1',
			}}
		>
			{isSmallScreen ? (
				<Typography.Text
					strong
					ellipsis
				>
					{currentItem.title || languages.noTitle[language]}
				</Typography.Text>
			) : (
				<Title
					ellipsis
					level={3}
					style={{ margin: 0 }}
				>
					{currentItem.title || languages.noTitle[language]}
				</Title>
			)}
		</Flex>
	);

	const DateJSX = (
		<Statistic
			value={currentItem.date.format('DD.MM.YY')}
			style={{
				scale: isSmallScreen ? '.75' : '1',
				opacity: isItemDeleting ? '.5' : '1',
			}}
		/>
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
						margin: 'auto',
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
					{getSymbolAndPrice(currency)}
					{Math.round(currentItem.price[currency])}
				</Typography.Text>
			) : (
				<Title
					level={3}
					style={{ margin: 0 }}
				>
					{getSymbolAndPrice(currency, currentItem.price[currency])}
				</Title>
			)}
		</Flex>
	);

	const DeleteJSX = isItemDeleting ? (
		<CloseOutlined
			onClick={toggleIsItemDeleting}
			style={{ scale: isSmallScreen ? '1' : '1.5' }}
		/>
	) : (
		<DeleteOutlined
			onClick={toggleIsItemDeleting}
			style={{ scale: isSmallScreen ? '1' : '1.5' }}
		/>
	);

	const ProgressJSX = (
		<Progress
			showInfo={false}
			percent={(deleteValue / constants.deleteDelay) * 100}
			status='exception'
		/>
	);

	const EditJSX = (
		<EditOutlined
			onClick={
				!isItemDeleting ? () => updateCurrentItem({ ...initialItem }) : () => {}
			}
			style={{ scale: isSmallScreen ? '1' : '1.5' }}
		/>
	);

	const ActionsJSX = (
		<Flex justify='space-evenly'>
			{EditJSX}
			{PriceJSX}
			{DeleteJSX}
		</Flex>
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
							<Col>{DateJSX}</Col>
							<Col span={9}>{TitleJSX}</Col>
							<Col span={3}>{CategoryJSX}</Col>
							<Col span={5}>{PriceJSX}</Col>
							<Col>{EditJSX}</Col>
							<Col>{DeleteJSX}</Col>
						</>
					) : (
						<>
							<Col span={21}>{ProgressJSX}</Col>
							<Col>{DeleteJSX}</Col>
						</>
					)}
				</Item>
			) : (
				<Card
					size={isSmallScreen ? 'small' : 'default'}
					bordered
					title={isItemDeleting ? ProgressJSX : TitleJSX}
					actions={[ActionsJSX]}
				>
					<Flex justify='center'>
						<Flex
							vertical
							align='stretch'
							gap={4}
						>
							{DateJSX}
							{CategoryJSX}
						</Flex>
					</Flex>
				</Card>
			)}
		</>
	);
});

export default ListItem;
