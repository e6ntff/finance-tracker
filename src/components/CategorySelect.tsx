import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select } from 'antd';

interface Props {
	id: number;
	handler: any;
}

const CategorySelect: React.FC<Props> = observer(({ id, handler }) => {
	const { categories } = categoryStore;

	return (
		<Select
			value={id}
			onChange={handler}
		>
			{categories.map((cat: category) => (
				<Select.Option
					key={cat.id}
					value={cat.id}
				>
					{cat.name}
				</Select.Option>
			))}
		</Select>
	);
});

export default CategorySelect;
