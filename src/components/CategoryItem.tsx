import React, { useCallback, useEffect, useState } from 'react';
import { category } from '../settings/interfaces';
import useDebounce from '../hooks/useDebounce';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Card, ColorPicker, Flex, Progress, Typography } from 'antd';
import { Color } from 'antd/es/color-picker';
import Title from 'antd/es/typography/Title';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import constants from 'settings/constants';
import { userStore } from 'utils/userStore';

interface Props {
	initialCategory: category;
}

const CategoryItem: React.FC<Props> = observer(({ initialCategory }) => {
	const { id, color, name } = initialCategory;
	const { replaceCategory, removeCategory } = categoryStore;
	const { refreshItemByCategory, clearListFromCategory } = listStore;
	const { isSmallScreen } = userStore;
	const [isCategoryItemDeleting, setIsCategoryItemDeleting] =
		useState<boolean>(false);
	const [deleteValue, setDeleteValue] = useState<number>(0);

	const [currentCategory, setCurrentCategory] = useState<category>({
		id: id,
		color: color,
		name: name,
	});

	const deleteCategory = useCallback(() => {
		removeCategory(currentCategory);
		clearListFromCategory(currentCategory);
	}, [currentCategory, removeCategory, clearListFromCategory]);

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
				if (newValue >= constants.deleteDelay && isCategoryItemDeleting) {
					deleteCategory();
				}
				return newValue;
			});
		}, 10);
		if (!isCategoryItemDeleting) {
			clearInterval(deleteId);
			setDeleteValue(0);
		}
		return () => clearInterval(deleteId);
	}, [isCategoryItemDeleting, deleteCategory]);

	const handleNameChange = useCallback((value: string) => {
		setCurrentCategory((prevCategory) => ({
			...prevCategory,
			name: value,
		}));
	}, []);

	const handleColorChange = useCallback((value: Color) => {
		setCurrentCategory((prevCategory) => ({
			...prevCategory,
			color: `#${value.toHex()}`,
		}));
	}, []);

	const debouncedCategory = useDebounce(currentCategory);

	useEffect(() => {
		replaceCategory(debouncedCategory);
		refreshItemByCategory(debouncedCategory);
	}, [debouncedCategory, replaceCategory, refreshItemByCategory]);

	const ColorPickerJSX = (
		<ColorPicker
			size={isSmallScreen ? 'small' : 'middle'}
			value={currentCategory.color}
			format='hex'
			onChange={handleColorChange}
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
			percent={(deleteValue / constants.deleteDelay) * 100}
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
