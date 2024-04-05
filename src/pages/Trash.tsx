import { Empty, Flex } from 'antd';
import DeletedList from 'components/DeletedList';
import TrashPanel from 'components/TrashPanel';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import constants from 'settings/constants';
import { ItemWithSearch } from 'settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import { search } from 'utils/utils';

const Trash: React.FC = observer(() => {
	const { list } = listStore;
	const { categories } = categoryStore;
	const { isSmallScreen, tourRefs } = userStore;

	const [query, setQuery] = useState<string>('');
	const [debouncedQuery, setDebouncedQuery] = useState<string>('');

	const debouncedSetQuery = useMemo(
		() =>
			debounce(
				(query: string) => setDebouncedQuery(query),
				constants.optionsDebounceDelay
			),
		[]
	);

	useEffect(() => {
		debouncedSetQuery(query);
		return () => {
			debouncedSetQuery.cancel();
		};
	}, [query, debouncedSetQuery]);

	const deletedItemIds: ItemWithSearch[] = useMemo(() => {
		return Object.keys(list).reduce((acc: ItemWithSearch[], key: string) => {
			if (list[key].deleted === true) {
				const overlaps = search(debouncedQuery, list[key].title);
				if (overlaps?.length !== 0) {
					return [...acc, { id: key, overlaps: overlaps }];
				}
			}
			return acc;
		}, []);
	}, [list, debouncedQuery]);

	const deletedCategoryIds: ItemWithSearch[] = useMemo(() => {
		return Object.keys(categories).reduce(
			(acc: ItemWithSearch[], key: string) => {
				if (categories[key].deleted === true) {
					const overlaps = search(debouncedQuery, categories[key].name);
					if (overlaps?.length !== 0) {
						return [...acc, { id: key, overlaps: overlaps }];
					}
				}
				return acc;
			},
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
			<TrashPanel
				query={query}
				setQuery={setQuery}
				debouncedQuery={debouncedQuery}
			/>
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
