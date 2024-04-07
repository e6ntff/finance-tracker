import React, { memo, useMemo } from 'react';
import CategoryItem from './CategoryItem';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { Empty, Flex } from 'antd';
import { userStore } from 'utils/userStore';
import LargeSpin from './LargeSpin';

const CategoryList: React.FC = observer(() => {
	const { categories, lastDeletedCategoryIds } = categoryStore;
	const { loading, isSmallScreen } = userStore;

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

	return (
		<Flex
			style={{ inlineSize: '100%' }}
			vertical
			gap={16}
		>
			{loading ? (
				<LargeSpin />
			) : Object.values(categories).length > 1 ? (
				<Flex
					wrap='wrap'
					justify='center'
					gap={isSmallScreen ? 8 : 16}
				>
					{categoriesToShowIds.map((key: string) => (
						<CategoryItem
							key={key}
							initialCategoryId={key}
						/>
					))}
				</Flex>
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
