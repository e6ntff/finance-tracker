import React, { useCallback, useState } from 'react';
import { category } from '../settings/interfaces';
import constants from 'settings/constants';
import ColorPicker, { Color } from 'antd/es/color-picker';
import { Button, Flex, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { CheckOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';

const AddCategory: React.FC = observer(() => {
	const { addCategory } = categoryStore;
	const { isSmallScreen } = userStore;

	const [currentCategory, setCurrentCategory] = useState<category>({
		id: Math.random(),
		color: '#fff',
		name: '',
	});

	const handleNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setCurrentCategory((prevCategory) => ({
				...prevCategory,
				name: value,
			}));
		},
		[setCurrentCategory]
	);

	const handleColorChange = useCallback(
		(value: Color) => {
			setCurrentCategory((prevCategory) => ({
				...prevCategory,
				color: `#${value.toHex()}`,
			}));
		},
		[setCurrentCategory]
	);

	const clearCurrentCategory = useCallback(() => {
		setCurrentCategory({ ...constants.defaultCategory, id: Math.random() });
	}, [setCurrentCategory]);

	const addCurrentCategory = useCallback(() => {
		addCategory(currentCategory);
		clearCurrentCategory();
	}, [currentCategory, addCategory, clearCurrentCategory]);

	return (
		<Flex
			gap={32}
			style={{ inlineSize: '100%' }}
		>
			<ColorPicker
				size={isSmallScreen ? 'small' : 'middle'}
				value={currentCategory.color}
				format='hex'
				onChange={handleColorChange}
			/>
			<Input
				size={isSmallScreen ? 'small' : 'middle'}
				type='text'
				value={currentCategory.name}
				onChange={handleNameChange}
			/>
			<Button
				onClick={addCurrentCategory}
				size={isSmallScreen ? 'small' : 'middle'}
			>
				<CheckOutlined />
			</Button>
		</Flex>
	);
});

export default AddCategory;
