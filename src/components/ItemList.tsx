import React, { memo, useCallback, useMemo, useState } from 'react';
import ListItem from './ListItem';
import { ListOptions } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Empty, Flex, List, Space } from 'antd';
import { getListToShowOnCurrentPageIds } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import useDebounce from 'hooks/useDebounce';
import LargeSpin from './LargeSpin';
import { listStore } from 'utils/listStore';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface Props {
	filteredListIds: string[];
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

	const debouncedOptions: ListOptions = useDebounce(listOptions);

	const listToShowOnCurrentPageIds = useMemo(
		() =>
			getListToShowOnCurrentPageIds(debouncedOptions, filteredListIds).filter(
				(key: string) => !lastDeletedItemIds.includes(key)
			),
		[filteredListIds, debouncedOptions, lastDeletedItemIds]
	);

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
			<List style={{ inlineSize: '100%' }}>
				{listToShowOnCurrentPageIds.map((key: string) => (
					<ListItem
						key={key}
						mode={debouncedOptions.mode}
						deleteAll={deleteSelectedItems}
						handleSelection={handleSelection(key)}
						initialItemId={key}
						selected={selectedItemIds.includes(key)}
					/>
				))}
			</List>
		</Flex>
	) : (
		<Space
			ref={tourRefs[1]}
			wrap
			size={isSmallScreen ? 8 : 16}
		>
			{listToShowOnCurrentPageIds.map((key: string) => (
				<ListItem
					key={key}
					mode={debouncedOptions.mode}
					deleteAll={deleteSelectedItems}
					handleSelection={handleSelection(key)}
					initialItemId={key}
					selected={selectedItemIds.includes(key)}
				/>
			))}
		</Space>
	);
});

export default memo(ItemList);
