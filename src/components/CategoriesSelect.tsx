import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select, Tag } from 'antd';

interface Props {
	values: category[];
	onChange: (arg0: number[]) => void;
}

const tagRender = (props: any, categories: category[]) => {
	const { label, value, onClose } = props;
	const onPreventMouseDown = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const color = categories.find(
		(category: category) => category.id === value
	)?.color;

	return (
		<Tag
			color={color}
			onMouseDown={onPreventMouseDown}
			closable={true}
			onClose={onClose}
			style={{
				marginInlineEnd: 4,
			}}
		>
			<span
				style={{
					color: color,
					filter: 'invert(1)',
				}}
			>
				{label}
			</span>
		</Tag>
	);
};

const CategoriesSelect: React.FC<Props> = observer(({ values, onChange }) => {
	const { categories } = categoryStore;

	return (
		<Select
			mode='multiple'
			showSearch={false}
			tagRender={(props) => tagRender(props, categories)}
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
