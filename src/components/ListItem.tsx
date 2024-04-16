import React, { useState, useCallback } from 'react';
import { ExpenseItem, ItemWithSearch, Mode } from '../settings/interfaces';
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
	MyIcon,
	MyImage,
	MyPrice,
	MyTitle,
	tooltipTitle,
} from './Items';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
	DeleteOutlined,
	EditOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';

interface Props {
	mode: Mode;
	initialItem: ItemWithSearch;
	deleteAll?: () => void;
	restoreAll?: () => void;
	handleSelection?: (event: CheckboxChangeEvent) => void;
	selected?: boolean;
	disabled?: boolean;
	transparent?: boolean;
}

const ListItem: React.FC<Props> = observer(
	({
		mode,
		initialItem,
		deleteAll,
		handleSelection,
		selected,
		disabled,
		transparent,
	}) => {
		const { isSmallScreen } = userStore;
		const { replaceItem, setLastDeletedItemIds, lastDeletedItemIds, list } =
			listStore;
		const { userOptions } = optionsStore;
		const { categories } = categoryStore;

		const { currency, language } = userOptions;

		const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
		const [currentItem, setCurrentItem] = useState<ExpenseItem>(
			list[initialItem.id]
		);

		const {
			type,
			date,
			title,
			categoryId,
			price,
			image,
			createdAt,
			updatedAt,
		} = currentItem;

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
						replaceItem(initialItem.id, newItem);
						return newItem;
					}
					return prevItem;
				});
				toggleIsModalOpened();
			},
			[setCurrentItem, replaceItem, toggleIsModalOpened, initialItem.id]
		);

		const deleteItem = useCallback(() => {
			setLastDeletedItemIds([...lastDeletedItemIds, initialItem.id]);
		}, [setLastDeletedItemIds, initialItem.id, lastDeletedItemIds]);

		const ActionsJSX = (
			<Flex justify='space-evenly'>
				{MyCheckbox(
					selected,
					language,
					isSmallScreen,
					handleSelection,
					deleteAll
				)}
				{MyIcon(DeleteOutlined, isSmallScreen, {
					onClick: deleteItem,
					title: languages.delete[language],
				})}
				{MyPrice(price, type, isSmallScreen, currency)}
				{MyIcon(EditOutlined, isSmallScreen, {
					onClick: toggleIsModalOpened,
					title: languages.edit[language],
				})}
				{MyIcon(InfoCircleOutlined, isSmallScreen, {
					title: tooltipTitle(createdAt, updatedAt, language),
				})}
			</Flex>
		);

		return (
			<>
				<ItemModal
					opened={isModalOpened}
					initialItemId={initialItem.id}
					toggleOpened={toggleIsModalOpened}
					submitItem={updateCurrentItem}
				/>
				{mode === 'list' ? (
					<Item
						style={{
							pointerEvents: disabled ? 'none' : 'auto',
							opacity: transparent ? '.5' : '1',
						}}
					>
						<Col span={1}>
							{MyCheckbox(
								selected,
								language,
								isSmallScreen,
								handleSelection,
								deleteAll
							)}
						</Col>
						<Col span={1}>
							{MyImage(image, isSmallScreen, language, toggleIsModalOpened)}
						</Col>
						<Col span={3}>{MyDate(date, isSmallScreen)}</Col>
						<Col span={7}>
							{MyTitle(
								title,
								type,
								isSmallScreen,
								language,
								false,
								initialItem.overlaps
							)}
						</Col>
						<Col span={4}>{MyCategory(categories[categoryId])}</Col>
						<Col span={4}>{MyPrice(price, type, isSmallScreen, currency)}</Col>
						<Col span={1}>
							{MyIcon(EditOutlined, isSmallScreen, {
								onClick: toggleIsModalOpened,
								title: languages.edit[language],
							})}
						</Col>
						<Col span={1}>
							{MyIcon(DeleteOutlined, isSmallScreen, {
								onClick: deleteItem,
								title: languages.delete[language],
							})}
						</Col>
						<Col span={1}>
							{MyIcon(InfoCircleOutlined, isSmallScreen, {
								title: tooltipTitle(createdAt, updatedAt, language),
							})}
						</Col>
					</Item>
				) : (
					<Card
						styles={{ title: { fontWeight: '400' } }}
						size='small'
						bordered
						title={MyTitle(
							title,
							type,
							isSmallScreen,
							language,
							false,
							initialItem.overlaps
						)}
						actions={[ActionsJSX]}
						style={{
							inlineSize: isSmallScreen ? '10em' : '13em',
							pointerEvents: disabled ? 'none' : 'auto',
							opacity: transparent ? '.5' : '1',
						}}
					>
						<Flex justify='center'>
							<Flex
								vertical
								align='stretch'
								gap={4}
							>
								<Flex align='center'>
									{MyImage(image, isSmallScreen, language, toggleIsModalOpened)}
									{MyDate(date, isSmallScreen)}
								</Flex>
								{MyCategory(categories[categoryId])}
							</Flex>
						</Flex>
					</Card>
				)}
			</>
		);
	}
);

export default ListItem;
