import React, { useCallback, useEffect, useState } from 'react';
import { category } from '../settings/interfaces';
import useDebounce from '../hooks/useDebounce';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Col, ColorPicker, Flex } from 'antd';
import { Color } from 'antd/es/color-picker';
import Title from 'antd/es/typography/Title';
import Item from 'antd/es/list/Item';

interface Props {
	initialCategory: category;
}

const CategoryItem: React.FC<Props> = observer(({ initialCategory }) => {
	const { id, color, name } = initialCategory;
	const { replaceCategory, removeCategory } = categoryStore;
	const { refreshItemByCategory, clearListFromCategory } = listStore;

	const [category, setCategory] = useState<category>({
		id: id,
		color: color,
		name: name,
	});

	const handleNameChange = useCallback((value: string) => {
		setCategory((prevCategory) => ({
			...prevCategory,
			name: value,
		}));
	}, []);

	const handleColorChange = useCallback((value: Color) => {
		setCategory((prevCategory) => ({
			...prevCategory,
			color: `#${value.toHex()}`,
		}));
	}, []);

	const debouncedCategory = useDebounce(category);

	useEffect(() => {
		replaceCategory(debouncedCategory);
		refreshItemByCategory(debouncedCategory);
	}, [debouncedCategory, replaceCategory, refreshItemByCategory]);

	const deleteCategory = useCallback(() => {
		removeCategory(category);
		clearListFromCategory(category);
	}, [category, removeCategory, clearListFromCategory]);

	return (
		<Item>
			<Col span={1}>
				<ColorPicker
					value={category.color}
					format='hex'
					onChange={handleColorChange}
				/>
			</Col>
			<Col span={20}>
				<Flex justify='center'>
					<Title
						level={3}
						editable={{ onChange: handleNameChange }}
					>
						{category.name}
					</Title>
				</Flex>
			</Col>
			<Col span={2}>
				<Button onClick={deleteCategory}>🗑</Button>
			</Col>
		</Item>
	);
});

export default CategoryItem;
