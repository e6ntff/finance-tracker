import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import constants from 'settings/constants';

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

	const [options, setOptions] = useState<ListOptions>(listOptions);
	// eslint-disable-next-line
	const debouncedSetOptions = debounce(
		setOptions,
		constants.optionsDebounceDelay
	);

	useEffect(() => {
		debouncedSetOptions(listOptions);
		// eslint-disable-next-line
	}, [listOptions]);

	const listToShowOnCurrentPageIds = useMemo(
		() =>
			getListToShowOnCurrentPageIds(options, filteredListIds).filter(
				(value: ItemWithSearch) => !lastDeletedItemIds.includes(value.id)
			),
		[filteredListIds, options, lastDeletedItemIds]
	);

	const items = useMemo(
		() =>
			listToShowOnCurrentPageIds.map((value: ItemWithSearch) => (
				<ListItem
					key={value.id}
					mode={options.mode}
					deleteAll={deleteSelectedItems}
					handleSelection={handleSelection(value.id)}
					initialItem={value}
					selected={selectedItemIds.includes(value.id)}
					transparent={
						selectedItemIds.length !== 0 && !selectedItemIds.includes(value.id)
					}
				/>
			)),
		[
			listToShowOnCurrentPageIds,
			options.mode,
			deleteSelectedItems,
			handleSelection,
			selectedItemIds,
		]
	);

	return loading ? (
		<LargeSpin />
	) : !filteredListIds.length ? (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={''}
		/>
	) : options.mode === 'list' ? (
		<Flex
			style={{ inlineSize: '100%' }}
			ref={tourRefs[1]}
		>
			<List style={{ inlineSize: '100%' }}>{items}</List>
		</Flex>
	) : (
		<Flex
			ref={tourRefs[1]}
			wrap='wrap'
			justify='center'
			gap={isSmallScreen ? 8 : 16}
		>
			{items}
		</Flex>
	);
});

export default memo(ItemList);
