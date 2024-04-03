import { Empty, Flex } from 'antd';
import DeletedList from 'components/DeletedList';
import TrashPanel from 'components/TrashPanel';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';

const Trash: React.FC = observer(() => {
	const { userList: list, listTemplate } = listStore;
	const { userCategories: categories, categoriesTemplate } = categoryStore;
	const { isSmallScreen, isTourStarted, tourRefs } = userStore;

	const deletedItemIds: string[] = useMemo(() => {
		const currentList = isTourStarted ? listTemplate : list;
		return Object.keys(currentList).reduce(
			(acc: string[], key: string) =>
				currentList[key].deleted === true ? [...acc, key] : acc,
			[]
		);
	}, [list, listTemplate, isTourStarted]);

	const deletedCategoryIds: string[] = useMemo(() => {
		const currentCategories = isTourStarted ? categoriesTemplate : categories;
		return Object.keys(currentCategories).reduce(
			(acc: string[], key: string) =>
				currentCategories[key].deleted === true ? [...acc, key] : acc,
			[]
		);
	}, [categories, categoriesTemplate, isTourStarted]);

	if (!deletedItemIds.length && !deletedCategoryIds.length)
		return (
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={''}
			/>
		);

	return (
		<Flex vertical>
			<TrashPanel />
			<Flex
				ref={tourRefs[4]}
				vertical={isSmallScreen}
				gap={isSmallScreen ? 16 : 32}
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
		</Flex>
	);
});

export default Trash;
