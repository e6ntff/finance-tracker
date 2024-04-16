import { Col, Empty, List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import languages from 'settings/languages';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import {
	DeleteOutlined,
	ExportOutlined,
	InfoCircleOutlined,
	UndoOutlined,
} from '@ant-design/icons';
import { MyCheckbox, MyIcon, MyTitle } from './Items';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemWithSearch } from 'settings/interfaces';
import { search } from 'utils/utils';
import dayjs from 'dayjs';
import ListItem from './ListItem';

interface Props {
	query: string;
}

const DeletedItems: React.FC<Props> = observer(({ query }) => {
	const { list, restoreItem, deleteItem } = listStore;
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

	const deletedItemIds: ItemWithSearch[] = useMemo(() => {
		return Object.keys(list).reduce((acc: ItemWithSearch[], key: string) => {
			if (list[key].deleted === true) {
				const overlaps = search(query, list[key].title);
				if (overlaps?.length !== 0) {
					return [...acc, { id: key, overlaps: overlaps }];
				}
			}
			return acc;
		}, []);
	}, [list, query]);

	const deleteSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: string[]) => {
			prevSelected.forEach((key: string) => {
				deleteItem(key);
			});
			return [];
		});
	}, [deleteItem]);

	const restoreSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: string[]) => {
			prevSelected.forEach((key: string) => {
				restoreItem(key);
			});
			return [];
		});
	}, [restoreItem]);

	const handleItemSelection = useCallback(
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

	const DeleteJSX = (callback: () => void) =>
		MyIcon(
			DeleteOutlined,
			isSmallScreen,
			false,
			callback,
			languages.delete[userOptions.language]
		);

	const CheckboxJSX = (
		key: string,
		handler: (key: string) => (event: CheckboxChangeEvent) => void
	) =>
		MyCheckbox(
			selectedItemIds.includes(key),
			language,
			isSmallScreen,
			handler(key),
			deleteSelectedItems,
			restoreSelectedItems
		);

	if (!deletedItemIds.length)
		return (
			<Empty
				style={{ margin: 'auto' }}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={''}
			/>
		);

	return (
		<List style={{ inlineSize: '100%' }}>
			{deletedItemIds.map(({ id, overlaps }: ItemWithSearch) => {
				const currentItem = list[id];

				return (
					<Item
						key={id}
						style={{
							opacity:
								selectedItemIds.length && !selectedItemIds.includes(id)
									? '.5'
									: '1',
						}}
					>
						<Col span={1}>{CheckboxJSX(id, handleItemSelection)}</Col>
						<Col span={16}>
							{MyTitle(
								currentItem?.title,
								currentItem?.type,
								isSmallScreen,
								language,
								false,
								overlaps
							)}
						</Col>
						<Col span={1}>
							{MyIcon(
								ExportOutlined,
								isSmallScreen,
								true,
								undefined,
								<ListItem
									initialItem={{ id, overlaps }}
									mode='grid'
									selected={selectedItemIds.includes(id)}
									disabled
								/>
							)}
						</Col>
						<Col span={1}>
							{MyIcon(
								InfoCircleOutlined,
								isSmallScreen,
								false,
								undefined,
								`${languages.deletedAt[language]}: ${dayjs(
									currentItem?.deletedAt
								).format('HH:mm:ss DD.MM.YY')}`
							)}
						</Col>
						<Col span={1}>
							{MyIcon(
								UndoOutlined,
								isSmallScreen,
								false,
								() => restoreItem(id),
								languages.restore[language]
							)}
						</Col>
						<Col span={1}>{DeleteJSX(() => deleteItem(id))}</Col>
					</Item>
				);
			})}
		</List>
	);
});

export default DeletedItems;
