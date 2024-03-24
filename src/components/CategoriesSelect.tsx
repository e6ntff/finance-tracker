import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select, Tag } from 'antd';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

const tagRender = (props: any, categories: { [key: number]: category }) => {
	const { label, value, onClose } = props;
	const onPreventMouseDown = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
	};

	return (
		<Tag
			color={categories[value].color}
			onMouseDown={onPreventMouseDown}
			closable={true}
			onClose={onClose}
			style={{
				marginInlineEnd: 4,
			}}
		>
			<span
				style={{
					color: categories[value].color,
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
			value={listOptions.categoriesToFilterIds}
			onChange={handleCategoriesToFilterChange}
		>
			{Object.keys(categories).map((key: string) => (
				<Select.Option
					key={Number(key)}
					value={Number(key)}
				>
					{categories[key as unknown as number].name}
				</Select.Option>
			))}
		</Select>
	);
});

export default CategoriesSelect;
