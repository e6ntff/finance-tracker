import { Col, List, Tooltip } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import languages from 'settings/languages';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { categoryStore } from 'utils/categoryStore';
import {
	MyCheckbox,
	MyIconWithTooltip,
	MyImage,
	MyInfoTooltip,
	MyTitle,
	MyView,
} from './Items';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemWithSearch } from 'settings/interfaces';

interface DeletedItems {
	list: string[];
	categories: string[];
}

interface Props {
	mode: 'item' | 'category';
	ids: ItemWithSearch[];
}

const DeletedList: React.FC<Props> = observer(({ mode, ids }) => {
	const { list, restoreItem, deleteItem } = listStore;
	const { restoreCategory, deleteCategory, categories } = categoryStore;
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [selectedItemIds, setSelectedItemIds] = useState<DeletedItems>({
		list: [],
		categories: [],
	});

	const deleteSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: DeletedItems) => {
			prevSelected.list.forEach((key: string) => {
				deleteItem(key);
			});
			prevSelected.categories.forEach((key: string) => {
				deleteCategory(key);
			});
			return { list: [], categories: [] };
		});
	}, [deleteItem, deleteCategory]);

	const restoreSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: DeletedItems) => {
			prevSelected.list.forEach((key: string) => {
				restoreItem(key);
			});
			prevSelected.categories.forEach((key: string) => {
				restoreCategory(key);
			});
			return { list: [], categories: [] };
		});
	}, [restoreItem, restoreCategory]);

	const handleItemSelection = useCallback(
		(id: string) => (event: CheckboxChangeEvent) => {
			const value = event.target.checked;
			value
				? setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						list: [...prevSelected.list, id],
				  }))
				: setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						list: prevSelected.list.filter((item: string) => item !== id),
				  }));
		},
		[setSelectedItemIds]
	);

	const handleCategorySelection = useCallback(
		(id: string) => (event: CheckboxChangeEvent) => {
			const value = event.target.checked;
			value
				? setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						categories: [...prevSelected.categories, id],
				  }))
				: setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						categories: prevSelected.categories.filter(
							(item: string) => item !== id
						),
				  }));
		},
		[setSelectedItemIds]
	);

	const DeleteJSX = (callback: () => void) =>
		MyIconWithTooltip(
			languages.delete[userOptions.language],
			isSmallScreen,
			DeleteOutlined,
			callback
		);

	const CheckboxJSX = (
		key: string,
		handler: (key: string) => (event: CheckboxChangeEvent) => void
	) =>
		MyCheckbox(
			selectedItemIds.list.includes(key),
			language,
			isSmallScreen,
			handler(key),
			deleteSelectedItems,
			restoreSelectedItems
		);

	switch (mode) {
		case 'item':
			return (
				<List style={{ inlineSize: '100%' }}>
					{ids.map(({ id, overlaps }: ItemWithSearch) => {
						const currentItem = list[id];

						return (
							<Item key={id}>
								<Col span={1}>{CheckboxJSX(id, handleItemSelection)}</Col>
								<Col span={1}>
									{MyImage(currentItem.image, isSmallScreen, language)}
								</Col>
								<Col span={10}>
									{MyTitle(
										currentItem.title,
										isSmallScreen,
										language,
										false,
										overlaps
									)}
								</Col>
								<Col span={2}>
									{MyView(
										id,
										mode,
										isSmallScreen,
										selectedItemIds.list.includes(id)
									)}
								</Col>
								<Col span={2}>
									{MyInfoTooltip(<>{currentItem.deletedAt}</>, isSmallScreen)}
								</Col>
								<Col span={2}>
									{MyIconWithTooltip(id, isSmallScreen, UndoOutlined, () =>
										restoreItem(id)
									)}
								</Col>
								<Col span={2}>{DeleteJSX(() => deleteItem(id))}</Col>
							</Item>
						);
					})}
				</List>
			);

		case 'category':
			return (
				<List style={{ inlineSize: '100%' }}>
					{ids.map(({ id, overlaps }: ItemWithSearch) => {
						const currentCategory = categories[id];
						console.log(overlaps);
						return (
							<Item key={id}>
								{CheckboxJSX(id, handleCategorySelection)}
								<Col span={1}>
									{MyImage(currentCategory.color, isSmallScreen, language)}
								</Col>
								<Col span={10}>
									{MyTitle(
										currentCategory.name,
										isSmallScreen,
										language,
										false,
										overlaps
									)}
								</Col>
								<Col span={2}>
									{MyView(
										id,
										mode,
										isSmallScreen,
										selectedItemIds.categories.includes(id)
									)}
								</Col>
								<Col span={2}>
									{MyInfoTooltip(
										<>{currentCategory.deletedAt}</>,
										isSmallScreen
									)}
								</Col>
								<Col span={2}>
									{MyIconWithTooltip(id, isSmallScreen, UndoOutlined, () =>
										restoreItem(id)
									)}
								</Col>
								<Col span={2}>{DeleteJSX(() => deleteCategory(id))}</Col>
							</Item>
						);
					})}
				</List>
			);
	}
});

export default DeletedList;
