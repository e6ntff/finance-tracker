import React, { useCallback, useMemo, useState } from 'react';
import { ListType, category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Card, ColorPicker, Flex, Tooltip } from 'antd';
import { Color } from 'antd/es/color-picker';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import ItemsModal from './ItemsModal';
import { MyIcon, MyImage, MyTitle } from './Items';
import {
	DeleteOutlined,
	FallOutlined,
	InfoCircleOutlined,
	RiseOutlined,
} from '@ant-design/icons';
import constants from 'settings/constants';

interface Props {
	initialCategoryId: string;
	category?: category;
	disabled?: boolean;
}

const CategoryItem: React.FC<Props> = observer(
	({ initialCategoryId, category, disabled }) => {
		const {
			replaceCategory,
			categories,
			setLastDeletedCategoryIds,
			lastDeletedCategoryIds,
		} = categoryStore;
		const { list, setUserList } = listStore;
		const { isSmallScreen } = userStore;
		const { userOptions } = optionsStore;

		const { language } = userOptions;

		const [currentCategory, setCurrentCategory] = useState<category>(
			category || categories[initialCategoryId]
		);

		const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

		const itemsWithCurrentCategory = useMemo(
			() =>
				Object.keys(list).reduce(
					(acc: string[], key: string) =>
						list[key].categoryId === initialCategoryId
							? [...acc, key]
							: [...acc],
					[]
				),
			[list, initialCategoryId]
		);

		const deleteCategory = useCallback(() => {
			setLastDeletedCategoryIds([...lastDeletedCategoryIds, initialCategoryId]);
		}, [setLastDeletedCategoryIds, initialCategoryId, lastDeletedCategoryIds]);

		const updateCurrentCategory = useCallback(
			(category: category) => {
				setCurrentCategory((prevCategory: category) => {
					if (JSON.stringify(prevCategory) !== JSON.stringify(category)) {
						replaceCategory(initialCategoryId, category);
						return category;
					}
					return prevCategory;
				});
			},
			[setCurrentCategory, replaceCategory, initialCategoryId]
		);

		const handleNameChange = useCallback(
			(value: string) => {
				setCurrentCategory((prevCategory) => {
					const newCategory: category = {
						...prevCategory,
						name: value,
					};
					updateCurrentCategory(newCategory);
					return newCategory;
				});
			},
			[setCurrentCategory, updateCurrentCategory]
		);

		const handleColorChange = useCallback(
			(value: Color) => {
				setCurrentCategory((prevCategory) => {
					const newCategory: category = {
						...prevCategory,
						color: `#${value.toHex()}`,
					};
					updateCurrentCategory(newCategory);
					return newCategory;
				});
			},
			[setCurrentCategory, updateCurrentCategory]
		);

		const fixList = useCallback(
			(categoryId: string, type: ListType) => {
				const fixedList = list;
				Object.keys(list).forEach((key: string) => {
					if (list[key].categoryId === categoryId && list[key].type !== type) {
						fixedList[key].categoryId = '0';
					}
				});
				setUserList(fixedList);
			},
			[list, setUserList]
		);

		const handleTypeChange = useCallback(
			(value: ListType) => {
				setCurrentCategory((prevCategory) => {
					const newCategory: category = {
						...prevCategory,
						type: value,
					};
					fixList(initialCategoryId, newCategory.type);
					updateCurrentCategory(newCategory);
					return newCategory;
				});
			},
			[setCurrentCategory, initialCategoryId, updateCurrentCategory, fixList]
		);

		const ColorPickerJSX = disabled ? (
			MyImage(currentCategory.color, isSmallScreen, language)
		) : (
			<Tooltip title={languages.pickColor[language]}>
				<ColorPicker
					value={currentCategory.color}
					format='hex'
					onChangeComplete={handleColorChange}
				>
					{MyImage(currentCategory.color, isSmallScreen, language)}
				</ColorPicker>
			</Tooltip>
		);

		const tooltipTitle = useMemo(
			() =>
				`${languages.itemsWithCurrentCategory[language]}: ${itemsWithCurrentCategory.length}`,
			[itemsWithCurrentCategory, language]
		);

		const ActionsJSX = (
			<Flex
				align='center'
				justify='space-evenly'
			>
				{MyIcon(InfoCircleOutlined, isSmallScreen, {
					onClick: () =>
						itemsWithCurrentCategory.length && setIsModalOpened(true),
					title: tooltipTitle,
				})}
				{ColorPickerJSX}
				{MyIcon(DeleteOutlined, isSmallScreen, {
					onClick: deleteCategory,
					title: languages.delete[userOptions.language],
				})}
			</Flex>
		);

		const TypeChangeIconJSX =
			currentCategory.type === 'income' ? (
				<RiseOutlined
					style={{ color: constants.colors.income }}
					onClick={() => handleTypeChange('expense')}
				/>
			) : (
				<FallOutlined
					style={{ color: constants.colors.expense }}
					onClick={() => handleTypeChange('income')}
				/>
			);

		return (
			<>
				<Card
					style={{
						inlineSize: isSmallScreen ? '8em' : '12em',
						pointerEvents: disabled ? 'none' : 'auto',
					}}
					extra={TypeChangeIconJSX}
					size='small'
					title={MyTitle(
						currentCategory.name,
						currentCategory.type,
						isSmallScreen,
						language,
						disabled
							? false
							: {
									onChange: handleNameChange,
							  }
					)}
					actions={[ActionsJSX]}
					styles={{
						title: {
							padding: 10,
						},
						body: {
							padding: 0,
						},
					}}
				></Card>
				<ItemsModal
					opened={isModalOpened}
					setOpened={setIsModalOpened}
					itemIds={itemsWithCurrentCategory}
				/>
			</>
		);
	}
);

export default CategoryItem;
