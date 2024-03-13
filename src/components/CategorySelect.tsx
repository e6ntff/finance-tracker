import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select } from 'antd';
import { EditFilled } from '@ant-design/icons';

interface Props {
	category: category | null;
	handler: (arg0: number) => void;
}

const CategorySelect: React.FC<Props> = observer(({ category, handler }) => {
	const { categories } = categoryStore;

	return (
		<Select
			allowClear
			style={{ minInlineSize: '9em' }}
			value={category?.id}
			onChange={handler}
			suffixIcon={<EditFilled style={{ color: category?.color }} />}
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
