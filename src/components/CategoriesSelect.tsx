import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select } from 'antd';

interface Props {
	values: category[];
	onChange: (arg0: number[]) => void;
}

const CategoriesSelect: React.FC<Props> = observer(({ values, onChange }) => {
	const { categories } = categoryStore;

	return (
		<Select
			mode='multiple'
			allowClear
			style={{ minInlineSize: '9em' }}
			value={values.map((value: category) => value.id)}
			onChange={onChange}
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

export default CategoriesSelect;
