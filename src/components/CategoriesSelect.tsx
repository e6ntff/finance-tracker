import React from 'react';
import { category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select, Tag, Tooltip } from 'antd';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const tagRender = (props: any, categories: { [key: number]: category }) => {
	const { label, value, onClose } = props;
	const onPreventMouseDown = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
	};
	const color =
		Object.keys(categories).length > 1 ? categories[value].color : '';

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
	const { listOptions, handleCategoriesToFilterChange, userOptions } =
		optionsStore;

	return (
		<Tooltip title={languages.categoriesSelect[userOptions.language]}>
			<Select
				size={isSmallScreen ? 'small' : 'middle'}
				mode='multiple'
				showSearch={false}
				tagRender={(props) => tagRender(props, categories)}
				style={{ minInlineSize: '10em' }}
				value={listOptions.categoriesToFilterIds}
				onChange={handleCategoriesToFilterChange}
				options={Object.keys(categories).map((key: string) => ({
					label: categories[key].name,
					value: key,
				}))}
			/>
		</Tooltip>
	);
});

export default CategoriesSelect;
