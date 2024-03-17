import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { userStore } from 'utils/userStore';

interface Props {
	value: category;
	onChange: (arg0: number) => void;
}

const CategorySelect: React.FC<Props> = observer(({ value, onChange }) => {
	const { categories } = categoryStore;
	const { isSmallScreen } = userStore;

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			allowClear
			style={{ minInlineSize: '7em' }}
			onChange={onChange}
			value={value?.id}
			suffixIcon={<EditFilled style={{ color: value?.color }} />}
		>
			{categories.map((category: category) => (
				<Select.Option
					key={category.id}
					value={category.id}
				>
					{category.name}
				</Select.Option>
			))}
		</Select>
	);
});

export default CategorySelect;
