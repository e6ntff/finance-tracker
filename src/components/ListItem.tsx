import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getSymbolAndPrice } from 'utils/utils';
import { ExpenseItem, Mode } from '../settings/interfaces';
import Item from 'antd/es/list/Item';
import {
	Card,
	Col,
	Flex,
	Progress,
	Statistic,
	Tag,
	Tooltip,
	Typography,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import Title from 'antd/es/typography/Title';
import {
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import ItemModal from './ItemModal';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import dayjs from 'dayjs';

interface Props {
	mode: Mode;
	initialItemId: string;
}

const ListItem: React.FC<Props> = observer(({ mode, initialItemId }) => {
	const { isSmallScreen } = userStore;
	const { replaceItem, removeItem, list } = listStore;
	const { userOptions } = optionsStore;
	const { categories } = categoryStore;

	const { currency, language } = userOptions;

	const [isItemDeleting, setIsItemDeleting] = useState<boolean>(false);
	const [deleteValue, setDeleteValue] = useState<number>(0);
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [currentItem, setCurrentItem] = useState<ExpenseItem>(
		list[initialItemId]
	);

	const toggleIsItemDeleting = () => {
		setIsItemDeleting((prevValue: boolean) => !prevValue);
	};

	useEffect(() => {
		const deleteId = setInterval(() => {
			setDeleteValue((prevValue: number) => {
				const newValue = prevValue + 10;
				if (newValue >= userOptions.deleteDelay && isItemDeleting) {
					removeItem(initialItemId);
					clearInterval(deleteId);
				}
				return newValue;
			});
		}, 10);
		if (!isItemDeleting) {
			clearInterval(deleteId);
			setDeleteValue(0);
		}
		return () => clearInterval(deleteId);
	}, [
		isItemDeleting,
		currentItem,
		removeItem,
		userOptions.deleteDelay,
		initialItemId,
	]);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	const updateCurrentItem = useCallback(
		(item: ExpenseItem) => {
			setCurrentItem((prevItem: ExpenseItem) => {
				if (JSON.stringify(prevItem) !== JSON.stringify(item)) {
					const newItem: ExpenseItem = {
						...currentItem,
						updatedAt: dayjs().valueOf(),
					};
					replaceItem(initialItemId, newItem);
					return newItem;
				}
				return prevItem;
			});
			toggleIsModalOpened();
		},
		[
			setCurrentItem,
			replaceItem,
			toggleIsModalOpened,
			initialItemId,
			currentItem,
		]
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
			value={dayjs(currentItem.date).format('DD.MM.YY')}
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
			<Tag color={categories[currentItem.categoryId].color}>
				<span
					style={{
						margin: 'auto',
						color: categories[currentItem.categoryId].color,
						filter: 'invert(1)',
					}}
				>
					{categories[currentItem.categoryId].name}
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
			percent={(deleteValue / userOptions.deleteDelay) * 100}
			status='exception'
		/>
	);

	const EditJSX = (
		<EditOutlined
			onClick={!isItemDeleting ? () => toggleIsModalOpened() : () => {}}
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

	const tooltipTitle = useMemo(() => {
		if (currentItem.createdAt === currentItem.updatedAt) {
			return (
				<>
					{`${languages.createdAt[language]} ${dayjs(
						currentItem.createdAt
					).format('HH:mm:ss DD.MM.YY')}`}
				</>
			);
		} else {
			return (
				<>
					{`${languages.createdAt[language]} ${dayjs(
						currentItem.createdAt
					).format('HH:mm:ss DD.MM.YY')}`}
					<br></br>
					{`${languages.updatedAt[language]} ${dayjs(
						currentItem.updatedAt
					).format('HH:mm:ss DD.MM.YY')}`}
				</>
			);
		}
	}, [currentItem, language]);

	const TooltipJSX = (
		<Tooltip title={tooltipTitle}>
			<InfoCircleOutlined />
		</Tooltip>
	);

	return (
		<>
			<ItemModal
				opened={isModalOpened}
				initialItemId={initialItemId}
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
						</>
					) : (
						<Col span={21}>{ProgressJSX}</Col>
					)}
					<Col>{DeleteJSX}</Col>
					<Col>{TooltipJSX}</Col>
				</Item>
			) : (
				<Card
					extra={[TooltipJSX]}
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
