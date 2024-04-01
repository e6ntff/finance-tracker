import { Empty, Flex } from 'antd';
import DeletedList from 'components/DeletedList';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';

const Trash: React.FC = observer(() => {
	const { list } = listStore;
	const { categories } = categoryStore;
	const { isSmallScreen } = userStore;

	const deletedItemIds: string[] = useMemo(
		() =>
			Object.keys(list).reduce(
				(acc: string[], key: string) =>
					list[key].deleted === true ? [...acc, key] : acc,
				[]
			),
		[list]
	);

	const deletedCategoryIds: string[] = useMemo(
		() =>
			Object.keys(categories).reduce(
				(acc: string[], key: string) =>
					categories[key].deleted === true ? [...acc, key] : acc,
				[]
			),
		[categories]
	);

	if (!deletedItemIds.length && !deletedCategoryIds.length)
		return (
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={''}
			/>
		);

	return (
		<Flex
			vertical={isSmallScreen}
			gap={isSmallScreen ? 8 : 16}
			style={{ inlineSize: '100%' }}
		>
			<DeletedList
				mode='item'
				ids={deletedItemIds}
			/>
			<DeletedList
				mode='category'
				ids={deletedCategoryIds}
			/>
		</Flex>
	);
});

export default Trash;
