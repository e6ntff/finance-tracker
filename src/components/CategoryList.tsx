import React, { memo, useMemo } from 'react';
import CategoryItem from './CategoryItem';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { Empty, Flex, Space } from 'antd';
import { userStore } from 'utils/userStore';
import LargeSpin from './LargeSpin';

const CategoryList: React.FC = observer(() => {
	const { categories, lastDeletedCategoryId } = categoryStore;
	const { loading } = userStore;

	const categoriesToShowIds = useMemo(
		() =>
			Object.keys(categories)
				.slice(1)
				.filter((key: string) => key !== lastDeletedCategoryId),
		[categories, lastDeletedCategoryId]
	);

	return (
		<Flex
			style={{ inlineSize: '100%' }}
			vertical
			gap={16}
		>
			{loading ? (
				<LargeSpin />
			) : Object.values(categories).length > 1 ? (
				<Space>
					{categoriesToShowIds.map((key: string) => (
						<CategoryItem
							key={key}
							initialCategoryId={key}
						/>
					))}
				</Space>
			) : (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={''}
				/>
			)}
		</Flex>
	);
});

export default memo(CategoryList);
