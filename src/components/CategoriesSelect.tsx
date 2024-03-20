import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select, Tag } from 'antd';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

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

const CategoriesSelect: React.FC = observer(() => {
	const { categories } = categoryStore;
	const { isSmallScreen } = userStore;
	const { listOptions, handleCategoriesToFilterChange } = optionsStore;

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			mode='multiple'
			showSearch={false}
			tagRender={(props) => tagRender(props, categories)}
			style={{ minInlineSize: '10em' }}
			value={listOptions.categoriesToFilter.map((value: category) => value.id)}
			onChange={handleCategoriesToFilterChange}
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
