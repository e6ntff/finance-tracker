import { Empty, Flex } from 'antd';
import DeletedList from 'components/DeletedList';
import TrashPanel from 'components/TrashPanel';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';

const Trash: React.FC = observer(() => {
	const { userList, listTemplate } = listStore;
	const { userCategories, categoriesTemplate } = categoryStore;
	const { isSmallScreen, isTourStarted, tourRefs } = userStore;

	const list = useMemo(
		() => (isTourStarted ? listTemplate : userList),
		[isTourStarted, listTemplate, userList]
	);

	const categories = useMemo(
		() => (isTourStarted ? categoriesTemplate : userCategories),
		[isTourStarted, userCategories, categoriesTemplate]
	);

	const deletedItemIds: string[] = useMemo(() => {
		return Object.keys(list).reduce(
			(acc: string[], key: string) =>
				list[key].deleted === true ? [...acc, key] : acc,
			[]
		);
	}, [list]);

	const deletedCategoryIds: string[] = useMemo(() => {
		return Object.keys(categories).reduce(
			(acc: string[], key: string) =>
				categories[key].deleted === true ? [...acc, key] : acc,
			[]
		);
	}, [categories]);

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
