import React, { useState, useCallback, useMemo } from 'react';
import { getSymbolAndPrice } from 'utils/utils';
import { ExpenseItem, Mode } from '../settings/interfaces';
import Item from 'antd/es/list/Item';
import { Card, Col, Flex, Statistic, Tag, Tooltip, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import Title from 'antd/es/typography/Title';
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ItemModal from './ItemModal';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import dayjs from 'dayjs';
import DeleteButton from './DeleteButton';

interface Props {
	mode: Mode;
	initialItemId: string;
}

const ListItem: React.FC<Props> = observer(({ mode, initialItemId }) => {
	const { isSmallScreen } = userStore;
	const { replaceItem, list, setLastDeletedItemIds, lastDeletedItemIds } =
		listStore;
	const { userOptions } = optionsStore;
	const { categories } = categoryStore;

	const { currency, language } = userOptions;

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [currentItem, setCurrentItem] = useState<ExpenseItem>(
		list[initialItemId]
	);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	const updateCurrentItem = useCallback(
		(item: ExpenseItem) => {
			setCurrentItem((prevItem: ExpenseItem) => {
				if (JSON.stringify(prevItem) !== JSON.stringify(item)) {
					const newItem: ExpenseItem = {
						...item,
						updatedAt: dayjs().valueOf(),
					};
					replaceItem(initialItemId, newItem);
					return newItem;
				}
				return prevItem;
			});
			toggleIsModalOpened();
		},
		[setCurrentItem, replaceItem, toggleIsModalOpened, initialItemId]
	);

	const deleteItem = useCallback(() => {
		setLastDeletedItemIds([...lastDeletedItemIds, initialItemId]);
	}, [setLastDeletedItemIds, initialItemId, lastDeletedItemIds]);

	const TitleJSX = (
		<Flex
			justify='center'
			style={{
				opacity: !currentItem.title ? '.5' : '1',
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
			}}
		/>
	);

	const CategoryJSX = (
		<Flex
			vertical
			align='stretch'
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
		<Flex justify='center'>
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

	const DeleteJSX = <DeleteButton remove={deleteItem} />;

	const EditJSX = (
		<Tooltip title={languages.edit[language]}>
			<EditOutlined
				onClick={toggleIsModalOpened}
				style={{ scale: isSmallScreen ? '1' : '1.5' }}
			/>
		</Tooltip>
	);

	const ActionsJSX = (
		<Flex justify='space-evenly'>
			{EditJSX}
			{PriceJSX}
			{DeleteJSX}
		</Flex>
	);

	const tooltipTitle = useMemo(() => {
		if (!currentItem.updatedAt) {
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
			<InfoCircleOutlined
				style={{
					scale: isSmallScreen ? '1' : '1.5',
					opacity: mode === 'grid' ? '.45' : '1',
				}}
			/>
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
					<Col>{DateJSX}</Col>
					<Col span={9}>{TitleJSX}</Col>
					<Col span={3}>{CategoryJSX}</Col>
					<Col span={5}>{PriceJSX}</Col>
					<Col>{EditJSX}</Col>
					<Col>{DeleteJSX}</Col>
					<Col>{TooltipJSX}</Col>
				</Item>
			) : (
				<Card
					extra={[TooltipJSX]}
					size={isSmallScreen ? 'small' : 'default'}
					bordered
					title={TitleJSX}
					actions={[ActionsJSX]}
					style={{ inlineSize: isSmallScreen ? '8em' : '12em' }}
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
