import React, { useCallback, useState } from 'react';
import { category } from '../settings/interfaces';
import constants from 'settings/constants';
import ColorPicker, { Color } from 'antd/es/color-picker';
import { Button, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { BgColorsOutlined, CheckOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import Search from 'antd/es/input/Search';

const AddCategory: React.FC = observer(() => {
	const { addCategory } = categoryStore;
	const { isSmallScreen } = userStore;

	const [currentCategory, setCurrentCategory] = useState<category>(
		constants.defaultCategory
	);

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
		setCurrentCategory(constants.defaultCategory);
	}, [setCurrentCategory]);

	const addCurrentCategory = useCallback(() => {
		addCategory(currentCategory);
		clearCurrentCategory();
	}, [currentCategory, addCategory, clearCurrentCategory]);

	return (
		<Flex
			gap={32}
			style={{ inlineSize: 'min(100%, 560px)', margin: 'auto' }}
		>
			<Search
				enterButton={
					<Button style={{ background: currentCategory.color }}>
						<CheckOutlined style={{ scale: isSmallScreen ? '1' : '1.25' }} />
					</Button>
				}
				addonBefore={
					<ColorPicker
						value={currentCategory.color}
						format='hex'
						onChange={handleColorChange}
					>
						<BgColorsOutlined style={{ scale: isSmallScreen ? '1' : '1.25' }} />
					</ColorPicker>
				}
				size={isSmallScreen ? 'small' : 'middle'}
				type='text'
				value={currentCategory.name}
				onChange={handleNameChange}
				onSearch={addCurrentCategory}
			/>
		</Flex>
	);
});

export default AddCategory;
