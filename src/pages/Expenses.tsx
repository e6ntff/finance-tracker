import React, { useEffect, useMemo } from 'react';
import ItemList from '../components/ItemList';
import { Flex } from 'antd';
import Selectors from 'components/Selectors';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { getFilteredListIds } from 'utils/transformData';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';

const Expenses: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { listOptions, userOptions, handleModeChanging, handlePageChanging } =
		optionsStore;

	const { language } = userOptions;

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

	const filteredListIds = useMemo(
		() => getFilteredListIds(listOptions, list, language),
		[list, language, listOptions]
	);

	return (
		<Flex
			vertical
			gap={16}
			align='center'
		>
			<Selectors total={filteredListIds.length} />
			<ItemList filteredListIds={filteredListIds} />
		</Flex>
	);
});

export default Expenses;
