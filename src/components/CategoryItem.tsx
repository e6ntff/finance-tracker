import React, { useCallback, useEffect, useState } from 'react';
import { category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, ColorPicker, Flex, Progress, Typography } from 'antd';
import { Color } from 'antd/es/color-picker';
import Title from 'antd/es/typography/Title';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

interface Props {
	initialCategoryId: string;
}

const CategoryItem: React.FC<Props> = observer(({ initialCategoryId }) => {
	const { replaceCategory, removeCategory, categories } = categoryStore;
	const { clearListFromCategory } = listStore;
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const [isCategoryItemDeleting, setIsCategoryItemDeleting] =
		useState<boolean>(false);
	const [deleteValue, setDeleteValue] = useState<number>(0);

	const [currentCategory, setCurrentCategory] = useState<category>(
		categories[initialCategoryId]
	);

	const deleteCategory = useCallback(() => {
		removeCategory(initialCategoryId);
		clearListFromCategory(initialCategoryId);
	}, [removeCategory, clearListFromCategory, initialCategoryId]);

	const startCategoryItemDeleting = useCallback(() => {
		setIsCategoryItemDeleting(true);
	}, [setIsCategoryItemDeleting]);

	const cancelCategoryItemDeleting = useCallback(() => {
		setIsCategoryItemDeleting(false);
	}, [setIsCategoryItemDeleting]);

	useEffect(() => {
		const deleteId = setInterval(() => {
			setDeleteValue((prevValue: number) => {
				const newValue = prevValue + 10;
				if (newValue >= userOptions.deleteDelay && isCategoryItemDeleting) {
					deleteCategory();
					clearInterval(deleteId);
				}
				return newValue;
			});
		}, 10);
		if (!isCategoryItemDeleting) {
			clearInterval(deleteId);
			setDeleteValue(0);
		}
		return () => clearInterval(deleteId);
	}, [isCategoryItemDeleting, deleteCategory, userOptions.deleteDelay]);

	const updateCurrentCategory = useCallback(
		(category: category) => {
			setCurrentCategory((precCategory: category) => {
				if (JSON.stringify(precCategory) !== JSON.stringify(category)) {
					replaceCategory(initialCategoryId, category);
					return category;
				}
				return precCategory;
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

	const DeleteButtonJSX = (
		<Button
			size={isSmallScreen ? 'small' : 'middle'}
			onClick={
				isCategoryItemDeleting
					? cancelCategoryItemDeleting
					: startCategoryItemDeleting
			}
		>
			{isCategoryItemDeleting ? <CloseOutlined /> : <DeleteOutlined />}
		</Button>
	);

	const ProgressJSX = (
		<Progress
			showInfo={false}
			percent={(deleteValue / userOptions.deleteDelay) * 100}
			status='exception'
		/>
	);

	return (
		<Card
			size={isSmallScreen ? 'small' : 'default'}
			title={isCategoryItemDeleting ? ProgressJSX : TitleJSX}
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
