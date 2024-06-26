import {
	DeleteOutlined,
	FolderOpenOutlined,
	UndoOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { Flex, Popconfirm, Segmented } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { MyIcon, MySearch } from './Items';

interface Props {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	debouncedQuery: string;
	isExpenses: boolean;
	setIsExpenses: Dispatch<SetStateAction<boolean>>;
}

const TrashPanel: React.FC<Props> = observer(
	({ query, setQuery, debouncedQuery, isExpenses, setIsExpenses }) => {
		const { deleteItem, restoreItem, list } = listStore;
		const { categories, deleteCategory, restoreCategory } = categoryStore;
		const { isSmallScreen } = userStore;
		const { userOptions } = optionsStore;

		const { language } = userOptions;

		const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

		const deleteAll = useCallback(() => {
			Object.keys(list).forEach((key: string) => {
				list[key].deleted && deleteItem(key);
			});

			Object.keys(categories).forEach((key: string) => {
				categories[key].deleted && deleteCategory(key);
			});
		}, [list, categories, deleteCategory, deleteItem]);

		const restoreAll = useCallback(() => {
			Object.keys(list).forEach((key: string) => {
				list[key].deleted && restoreItem(key);
			});

			Object.keys(categories).forEach((key: string) => {
				categories[key].deleted && restoreCategory(key);
			});
		}, [list, categories, restoreCategory, restoreItem]);

		const handleSearch = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				setQuery(event.target.value);
				setIsSearchLoading(true);
			},
			[setQuery, setIsSearchLoading]
		);

		useEffect(() => {
			setIsSearchLoading(false);
		}, [debouncedQuery]);

		return (
			<Flex
				align='center'
				gap={16}
				style={{ inlineSize: '100%' }}
			>
				<Popconfirm
					title={languages.deleteAllConfirm[language]}
					onConfirm={deleteAll}
				>
					{MyIcon(DeleteOutlined, isSmallScreen, {})}
				</Popconfirm>
				<Popconfirm
					title={languages.restoreAllConfirm[language]}
					onConfirm={restoreAll}
				>
					{MyIcon(UndoOutlined, isSmallScreen, {})}
				</Popconfirm>
				{isSmallScreen && (
					<Segmented
						onChange={setIsExpenses}
						value={isExpenses}
						options={[
							{
								label: <UnorderedListOutlined />,
								value: true,
							},
							{
								label: <FolderOpenOutlined />,
								value: false,
							},
						]}
					/>
				)}
				<Flex style={{ inlineSize: isSmallScreen ? '100%' : '50%' }}>
					{MySearch(handleSearch, query, isSearchLoading, isSmallScreen)}
				</Flex>
			</Flex>
		);
	}
);

export default TrashPanel;
