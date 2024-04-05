import React, { useCallback, useMemo, useState } from 'react';
import { category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Card, ColorPicker, Flex, Tooltip } from 'antd';
import { Color } from 'antd/es/color-picker';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import ItemsModal from './ItemsModal';
import { MyDelete, MyInfoTooltip, MyTitle } from './Items';

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
		const { list } = listStore;
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

		const ColorPickerJSX = (
			<Tooltip title={languages.pickColor[language]}>
				<ColorPicker
					size={isSmallScreen ? 'small' : 'middle'}
					value={currentCategory.color}
					format='hex'
					onChangeComplete={handleColorChange}
				/>
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
				{MyInfoTooltip(tooltipTitle, isSmallScreen, () => {
					itemsWithCurrentCategory.length && setIsModalOpened(true);
				})}
				{ColorPickerJSX}
				{MyDelete(
					languages.delete[userOptions.language],
					isSmallScreen,
					deleteCategory
				)}
			</Flex>
		);

		return (
			<>
				<Card
					style={{
						inlineSize: isSmallScreen ? '8em' : '12em',
						pointerEvents: disabled ? 'none' : 'auto',
					}}
					size={isSmallScreen ? 'small' : 'default'}
					title={MyTitle(currentCategory.name, isSmallScreen, language, {
						onChange: handleNameChange,
					})}
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
