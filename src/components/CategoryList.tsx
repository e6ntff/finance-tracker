import React, { memo } from 'react';
import CategoryItem from './CategoryItem';
import { category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { List, Spin } from 'antd';
import { userStore } from 'utils/userStore';

const CategoryList: React.FC = observer(() => {
	const { categories } = categoryStore;
	const { loading } = userStore;
	return (
		<List style={{ inlineSize: '100%' }}>
			{loading && <Spin />}
			{categories
				.slice(1)
				.reverse()
				.map((category: category) => (
					<CategoryItem
						key={category.id}
						initialCategory={category}
					/>
				))}
		</List>
	);
});

export default memo(CategoryList);
