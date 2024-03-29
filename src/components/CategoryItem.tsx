import React, { useCallback, useMemo, useState } from 'react';
import { category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, ColorPicker, Flex, Tooltip, Typography } from 'antd';
import { Color } from 'antd/es/color-picker';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';

interface Props {
	initialCategoryId: string;
}

const CategoryItem: React.FC<Props> = observer(({ initialCategoryId }) => {
	const { replaceCategory, removeCategory, categories } = categoryStore;
	const { clearListFromCategory, list } = listStore;
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [currentCategory, setCurrentCategory] = useState<category>(
		categories[initialCategoryId]
	);

	const itemsWithCurrentCategory = useMemo(
		() =>
			Object.keys(list).reduce(
				(acc: string[], key: string) =>
					list[key].categoryId === initialCategoryId ? [...acc, key] : [...acc],
				[]
			),
		[list, initialCategoryId]
	);

	const deleteCategory = useCallback(() => {
		removeCategory(initialCategoryId, itemsWithCurrentCategory);
		clearListFromCategory(initialCategoryId);
	}, [
		removeCategory,
		clearListFromCategory,
		initialCategoryId,
		itemsWithCurrentCategory,
	]);

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
		<ColorPicker
			size={isSmallScreen ? 'small' : 'middle'}
			value={currentCategory.color}
			format='hex'
			onChangeComplete={handleColorChange}
		/>
	);

	const TitleJSX = (
		<Flex justify='center'>
			{isSmallScreen ? (
				<Typography.Text
					strong
					editable={{ onChange: handleNameChange }}
				>
					{currentCategory.name}
				</Typography.Text>
			) : (
				<Title
					level={isSmallScreen ? 5 : 3}
					editable={{ onChange: handleNameChange }}
					style={{ margin: 0 }}
				>
					{currentCategory.name}
				</Title>
			)}
		</Flex>
	);

	const tooltipTitle = useMemo(
		() =>
			`${languages.itemsWithCurrentCategory[language]} ${itemsWithCurrentCategory.length}`,
		[itemsWithCurrentCategory, language]
	);

	const TooltipJSX = (
		<Tooltip title={tooltipTitle}>
			<InfoCircleOutlined />
		</Tooltip>
	);

	const DeleteButtonJSX = (
		<Button
			size={isSmallScreen ? 'small' : 'middle'}
			onClick={deleteCategory}
		>
			<DeleteOutlined />
		</Button>
	);

	return (
		<Card
			extra={TooltipJSX}
			size={isSmallScreen ? 'small' : 'default'}
			title={TitleJSX}
			actions={[ColorPickerJSX, DeleteButtonJSX]}
			styles={{
				title: {
					padding: 10,
				},
				body: {
					padding: 0,
				},
			}}
		></Card>
	);
});

export default CategoryItem;
