import React, { memo, useMemo } from 'react';
import CategoryItem from './CategoryItem';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { Empty, Flex, Space } from 'antd';
import { userStore } from 'utils/userStore';
import LargeSpin from './LargeSpin';
import Templates from './Templates';

const CategoryList: React.FC = observer(() => {
	const { categories, lastDeletedCategoryIds } = categoryStore;
	const { loading, isSmallScreen, isTourStarted } = userStore;

	const categoriesToShowIds = useMemo(
		() =>
			Object.keys(categories)
				.slice(1)
				.filter(
					(key: string) =>
						!lastDeletedCategoryIds.includes(key) && !categories[key].deleted
				),
		[categories, lastDeletedCategoryIds]
	);

	return !isTourStarted ? (
		<Flex
			style={{ inlineSize: '100%' }}
			vertical
			gap={16}
		>
			{loading ? (
				<LargeSpin />
			) : Object.values(categories).length > 1 ? (
				<Space
					wrap
					size={isSmallScreen ? 8 : 16}
				>
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
	) : (
		<Templates list='category' />
	);
});

export default memo(CategoryList);
