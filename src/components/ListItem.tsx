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
	MyCheckbox,
	MyDate,
	MyDelete,
	MyEdit,
	MyImage,
	MyInfoTooltip,
	MyPrice,
	MyTitle,
} from './Items';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface Props {
	mode: Mode;
	initialItemId: string;
	deleteAll: () => void;
	restoreAll?: () => void;
	handleSelection: (event: CheckboxChangeEvent) => void;
	selected: boolean;
	disabled?: boolean;
}

const ListItem: React.FC<Props> = observer(
	({ mode, initialItemId, deleteAll, handleSelection, selected, disabled }) => {
		const { isSmallScreen, isTourStarted } = userStore;
		const {
			replaceItem,
			userList,
			setLastDeletedItemIds,
			lastDeletedItemIds,
			listTemplate,
		} = listStore;
		const { userOptions } = optionsStore;
		const { userCategories, categoriesTemplate } = categoryStore;

		const list = useMemo(
			() => (isTourStarted ? listTemplate : userList),
			[isTourStarted, listTemplate, userList]
		);

		const categories = useMemo(
			() => (isTourStarted ? categoriesTemplate : userCategories),
			[isTourStarted, userCategories, categoriesTemplate]
		);

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

		const ActionsJSX = (
			<Flex justify='space-evenly'>
				{MyEdit(languages.edit[language], isSmallScreen, toggleIsModalOpened)}
				{MyPrice(currentItem.price, isSmallScreen, currency)}
				{MyDelete(languages.delete[language], isSmallScreen, deleteItem)}
			</Flex>
		);

		const ImageAndDateJSX = (
			<Flex align='center'>
				{MyImage(
					currentItem.image,
					isSmallScreen,
					toggleIsModalOpened,
					language
				)}
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

		const CheckboxAndTitle = (
			<Flex>
				{MyCheckbox(
					selected,
					language,
					isSmallScreen,
					handleSelection,
					deleteAll
				)}
				{MyTitle(currentItem.title, isSmallScreen, language, false)}
			</Flex>
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
					<Item style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
						<Col span={1}>
							{MyCheckbox(
								selected,
								language,
								isSmallScreen,
								handleSelection,
								deleteAll
							)}
						</Col>
						<Col>{ImageAndDateJSX}</Col>
						<Col span={8}>
							{MyTitle(currentItem.title, isSmallScreen, language, false)}
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
						title={CheckboxAndTitle}
						actions={[ActionsJSX]}
						style={{
							inlineSize: isSmallScreen ? '9em' : '12em',
							pointerEvents: disabled ? 'none' : 'auto',
						}}
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
		);
	}
);

export default ListItem;
