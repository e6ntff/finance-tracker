import React, { useEffect, useMemo, useState } from 'react';
import ItemList from '../components/ItemList';
import { Flex } from 'antd';
import Selectors from 'components/Selectors';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { getFilteredListIds } from 'utils/transformData';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { debounce } from 'lodash';
import constants from 'settings/constants';

const List: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { listOptions, userOptions, handleModeChanging, handlePageChanging } =
		optionsStore;

	const { language } = userOptions;

	const [query, setQuery] = useState<string>('');
	const [debouncedQuery, setDebouncedQuery] = useState<string>('');

	const {
		range,
		sortingAlgorithm,
		isSortingReversed,
		categoriesToFilterIds,
		pageSize,
	} = listOptions;

	useEffect(() => {
		if (isSmallScreen) {
			handleModeChanging('grid');
		}
	}, [isSmallScreen, handleModeChanging]);

	useEffect(() => {
		handlePageChanging(1, pageSize);
	}, [
		range,
		sortingAlgorithm,
		isSortingReversed,
		categoriesToFilterIds,
		pageSize,
		handlePageChanging,
	]);

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

	const filteredListIds = useMemo(
		() => getFilteredListIds(listOptions, list, language, debouncedQuery),
		[list, language, listOptions, debouncedQuery]
	);

	return (
		<Flex
			vertical
			gap={16}
			align='center'
		>
			<Selectors
				total={filteredListIds.length}
				query={query}
				setQuery={setQuery}
				debouncedQuery={debouncedQuery}
			/>
			<ItemList filteredListIds={filteredListIds} />
		</Flex>
	);
});

export default List;
