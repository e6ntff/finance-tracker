import React, { useState, useCallback, useMemo } from 'react';
import { ExpenseItem, Mode } from '../settings/interfaces';
import Item from 'antd/es/list/Item';
import { Card, Col, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import ItemModal from './ItemModal';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import dayjs from 'dayjs';
import {
	MyCategory,
	MyDate,
	MyDelete,
	MyEdit,
	MyImage,
	MyInfoTooltip,
	MyPrice,
	MyTitle,
} from './Items';

interface Props {
	mode: Mode;
	initialItemId: string;
	item?: ExpenseItem;
}

const ListItem: React.FC<Props> = observer(({ mode, initialItemId, item }) => {
	const { isSmallScreen, isTourStarted } = userStore;
	const { replaceItem, list, setLastDeletedItemIds, lastDeletedItemIds } =
		listStore;
	const { userOptions } = optionsStore;
	const { categories: userCategories, categoriesTemplate } = categoryStore;

	const categories = useMemo(
		() => (isTourStarted ? categoriesTemplate : userCategories),
		[isTourStarted, userCategories, categoriesTemplate]
	);

	const { currency, language } = userOptions;

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [currentItem, setCurrentItem] = useState<ExpenseItem>(
		item || list[initialItemId]
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

	const ActionsJSX = (
		<Flex justify='space-evenly'>
			{MyEdit(languages.edit[language], isSmallScreen, toggleIsModalOpened)}
			{MyPrice(currentItem.price, isSmallScreen, currency)}
			{MyDelete(languages.delete[language], isSmallScreen, deleteItem)}
		</Flex>
	);

	const ImageAndDateJSX = (
		<Flex align='center'>
			{MyImage(currentItem.image, isSmallScreen, toggleIsModalOpened, language)}
			{MyDate(currentItem.date, isSmallScreen)}
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

	return !item?.deleted ? (
		<>
			{!item && (
				<ItemModal
					opened={isModalOpened}
					initialItemId={initialItemId}
					toggleOpened={toggleIsModalOpened}
					submitItem={updateCurrentItem}
				/>
			)}
			{mode === 'list' ? (
				<Item>
					<Col>{ImageAndDateJSX}</Col>
					<Col span={9}>
						{MyTitle(currentItem.title, isSmallScreen, language)}
					</Col>
					<Col span={3}>{MyCategory(categories[currentItem.categoryId])}</Col>
					<Col span={5}>
						{MyPrice(currentItem.price, isSmallScreen, currency)}
					</Col>
					<Col span={1}>
						{MyEdit(
							languages.edit[language],
							isSmallScreen,
							toggleIsModalOpened
						)}
					</Col>
					<Col span={1}>
						{MyDelete(languages.delete[language], isSmallScreen, deleteItem)}
					</Col>
					<Col span={1}>{MyInfoTooltip(tooltipTitle, isSmallScreen)}</Col>
				</Item>
			) : (
				<Card
					extra={[MyInfoTooltip(tooltipTitle, isSmallScreen)]}
					size={isSmallScreen ? 'small' : 'default'}
					bordered
					title={MyTitle(currentItem.title, isSmallScreen, language)}
					actions={[ActionsJSX]}
					style={{ inlineSize: isSmallScreen ? '9em' : '12em' }}
				>
					<Flex justify='center'>
						<Flex
							vertical
							align='stretch'
							gap={4}
						>
							{ImageAndDateJSX}
							{MyCategory(categories[currentItem.categoryId])}
						</Flex>
					</Flex>
				</Card>
			)}
		</>
	) : (
		<></>
	);
});

export default ListItem;
