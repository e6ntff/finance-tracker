import { Col, Empty, List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import {
	DeleteOutlined,
	ExportOutlined,
	InfoCircleOutlined,
	UndoOutlined,
} from '@ant-design/icons';
import { categoryStore } from 'utils/categoryStore';
import { MyCheckbox, MyIconWithTooltip, MyTitle } from './Items';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemWithSearch } from 'settings/interfaces';
import { search } from 'utils/utils';
import dayjs from 'dayjs';
import CategoryItem from './CategoryItem';

interface Props {
	query: string;
}

const DeletedCategories: React.FC<Props> = observer(({ query }) => {
	const { restoreCategory, deleteCategory, categories } = categoryStore;
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

	const deletedCategoryIds: ItemWithSearch[] = useMemo(() => {
		return Object.keys(categories).reduce(
			(acc: ItemWithSearch[], key: string) => {
				if (categories[key].deleted === true) {
					const overlaps = search(query, categories[key].name);
					if (overlaps?.length !== 0) {
						return [...acc, { id: key, overlaps: overlaps }];
					}
				}
				return acc;
			},
			[]
		);
	}, [categories, query]);

	const deleteSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: string[]) => {
			prevSelected.forEach((key: string) => {
				deleteCategory(key);
			});
			return [];
		});
	}, [deleteCategory]);

	const restoreSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: string[]) => {
			prevSelected.forEach((key: string) => {
				restoreCategory(key);
			});
			return [];
		});
	}, [restoreCategory]);

	const handleCategorySelection = useCallback(
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
		MyIconWithTooltip(
			languages.delete[userOptions.language],
			isSmallScreen,
			DeleteOutlined,
			false,
			callback
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

	if (!deletedCategoryIds.length)
		return (
			<Empty
				style={{ margin: 'auto' }}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={''}
			/>
		);

	return (
		<List style={{ inlineSize: '100%' }}>
			{deletedCategoryIds.map(({ id, overlaps }: ItemWithSearch) => {
				const currentCategory = categories[id];

				return (
					<Item key={id}>
						<Col span={1}>{CheckboxJSX(id, handleCategorySelection)}</Col>
						<Col span={16}>
							{MyTitle(
								currentCategory?.name,
								isSmallScreen,
								language,
								false,
								overlaps
							)}
						</Col>
						<Col span={1}>
							{MyIconWithTooltip(
								<CategoryItem
									initialCategoryId={id}
									disabled
								/>,
								isSmallScreen,
								ExportOutlined,
								true
							)}
						</Col>
						<Col span={1}>
							{MyIconWithTooltip(
								`${languages.deletedAt[language]}: ${dayjs(
									currentCategory?.deletedAt
								).format('HH:mm:ss DD.MM.YY')}`,
								isSmallScreen,
								InfoCircleOutlined,
								false
							)}
						</Col>
						<Col span={1}>
							{MyIconWithTooltip(
								languages.restore[language],
								isSmallScreen,
								UndoOutlined,
								false,
								() => restoreCategory(id)
							)}
						</Col>
						<Col span={1}>{DeleteJSX(() => deleteCategory(id))}</Col>
					</Item>
				);
			})}
		</List>
	);
});

export default DeletedCategories;
