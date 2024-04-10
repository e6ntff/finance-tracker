import React, { memo, useCallback, useMemo, useState } from 'react';
import ListItem from './ListItem';
import { ItemWithSearch, ListOptions } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Empty, Flex, List } from 'antd';
import { getListToShowOnCurrentPageIds } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import LargeSpin from './LargeSpin';
import { listStore } from 'utils/listStore';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { debounce } from 'lodash';

interface Props {
	filteredListIds: ItemWithSearch[];
}

const ItemList: React.FC<Props> = observer(({ filteredListIds }) => {
	const { loading, isSmallScreen, tourRefs } = userStore;
	const { listOptions } = optionsStore;
	const { lastDeletedItemIds, setLastDeletedItemIds } = listStore;

	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

	const deleteSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: string[]) => {
			setLastDeletedItemIds([...lastDeletedItemIds, ...prevSelected]);
			return [];
		});
	}, [setLastDeletedItemIds, lastDeletedItemIds]);

	const handleSelection = useCallback(
		(id: string) => (event: CheckboxChangeEvent) => {
			const value = event.target.checked;
			value
				? setSelectedItemIds((prevSelected: string[]) => [...prevSelected, id])
				: setSelectedItemIds((prevSelected: string[]) =>
						prevSelected.filter((item: string) => item !== id)
				  );
		},
		[setSelectedItemIds]
	);

	const debouncedOptions: ListOptions =
		debounce(() => listOptions)() || listOptions;

	const listToShowOnCurrentPageIds = useMemo(
		() =>
			getListToShowOnCurrentPageIds(debouncedOptions, filteredListIds).filter(
				(value: ItemWithSearch) => !lastDeletedItemIds.includes(value.id)
			),
		[filteredListIds, debouncedOptions, lastDeletedItemIds]
	);

	const Items = listToShowOnCurrentPageIds.map((value: ItemWithSearch) => (
		<ListItem
			key={value.id}
			mode={debouncedOptions.mode}
			deleteAll={deleteSelectedItems}
			handleSelection={handleSelection(value.id)}
			initialItem={value}
			selected={selectedItemIds.includes(value.id)}
			transparent={
				selectedItemIds.length !== 0 && !selectedItemIds.includes(value.id)
			}
		/>
	));

	return loading ? (
		<LargeSpin />
	) : !filteredListIds.length ? (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={''}
		/>
	) : debouncedOptions.mode === 'list' ? (
		<Flex
			style={{ inlineSize: '100%' }}
			ref={tourRefs[1]}
		>
			<List style={{ inlineSize: '100%' }}>{Items}</List>
		</Flex>
	) : (
		<Flex
			ref={tourRefs[1]}
			wrap='wrap'
			justify='center'
			gap={isSmallScreen ? 8 : 16}
		>
			{Items}
		</Flex>
	);
});

export default memo(ItemList);
