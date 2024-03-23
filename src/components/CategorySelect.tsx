import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { userStore } from 'utils/userStore';

interface Props {
	id: number;
	onChange: (arg0: number) => void;
}

const CategorySelect: React.FC<Props> = observer(({ id, onChange }) => {
	const { categories, getCategoryById } = categoryStore;
	const { isSmallScreen } = userStore;

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			allowClear
			style={{ minInlineSize: '7em' }}
			onChange={onChange}
			value={id}
			suffixIcon={<EditFilled style={{ color: getCategoryById(id).color }} />}
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
