import React, { useEffect, useMemo } from 'react';
import ItemList from '../components/ItemList';
import { Flex } from 'antd';
import Selectors from 'components/Selectors';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { getFilteredList } from 'utils/transformData';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';

const Expenses: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { list } = listStore;
	const { listOptions, userOptions, handleModeChanging, handlePageChanging } =
		optionsStore;

	const { language } = userOptions;

	useEffect(() => {
		if (isSmallScreen) {
			handleModeChanging('grid');
		}
	}, [isSmallScreen, handleModeChanging]);

	useEffect(() => {
		handlePageChanging(1, listOptions.pageSize);
	}, [
		listOptions.years,
		listOptions.sortingAlgorithm,
		listOptions.isSortingReversed,
		listOptions.categoriesToFilter,
		listOptions.pageSize,
		handlePageChanging,
	]);

	const filteredList = useMemo(
		() => getFilteredList(listOptions, list, language),
		[list, language, listOptions]
	);

	return (
		<Flex
			vertical
			gap={16}
			align='center'
		>
			<Selectors total={filteredList.length} />
			<ItemList filteredList={filteredList} />
		</Flex>
	);
});

export default Expenses;
