import React, { memo, useMemo } from 'react';
import ListItem from './ListItem';
import { ListOptions } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Empty, List, Space } from 'antd';
import { getListToShowOnCurrentPageIds } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import useDebounce from 'hooks/useDebounce';
import LargeSpin from './LargeSpin';
import { listStore } from 'utils/listStore';

interface Props {
	filteredListIds: string[];
}

const ItemList: React.FC<Props> = observer(({ filteredListIds }) => {
	const { loading, isSmallScreen } = userStore;
	const { listOptions } = optionsStore;
	const { lastDeletedItemIds } = listStore;

	const debouncedOptions: ListOptions = useDebounce(listOptions);

	const listToShowOnCurrentPageIds = useMemo(
		() =>
			getListToShowOnCurrentPageIds(debouncedOptions, filteredListIds).filter(
				(key: string) => !lastDeletedItemIds.includes(key)
			),
		[filteredListIds, debouncedOptions, lastDeletedItemIds]
	);

	return (
		<>
			{loading ? (
				<LargeSpin />
			) : !filteredListIds.length ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={''}
				/>
			) : debouncedOptions.mode === 'list' ? (
				<List style={{ inlineSize: '100%' }}>
					{listToShowOnCurrentPageIds.map((key: string) => (
						<ListItem
							key={key}
							mode={debouncedOptions.mode}
							initialItemId={key}
						/>
					))}
				</List>
			) : (
				<Space
					wrap
					size={isSmallScreen ? 8 : 16}
					// align='center'
					// style={{ justifyContent: 'center' }}
				>
					{listToShowOnCurrentPageIds.map((key: string) => (
						<ListItem
							key={key}
							mode={debouncedOptions.mode}
							initialItemId={key}
						/>
					))}
				</Space>
			)}
		</>
	);
});

export default memo(ItemList);
