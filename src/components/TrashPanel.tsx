import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Flex, Popconfirm, Tooltip } from 'antd';
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
import { MySearch } from './Items';

interface Props {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	debouncedQuery: string;
}

const TrashPanel: React.FC<Props> = observer(
	({ query, setQuery, debouncedQuery }) => {
		const { deleteItem, restoreItem, list } = listStore;
		const { categories, deleteCategory, restoreCategory } = categoryStore;
		const { isSmallScreen, tourRefs } = userStore;
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
				gap={16}
				ref={tourRefs[5]}
				style={{ inlineSize: isSmallScreen ? '100%' : '50%' }}
			>
				<Tooltip title={languages.deleteAll[language]}>
					<Popconfirm
						title={languages.deleteAllConfirm[language]}
						onConfirm={deleteAll}
					>
						<Button size={isSmallScreen ? 'small' : 'middle'}>
							<DeleteOutlined style={{ scale: isSmallScreen ? '1' : '1.5' }} />
						</Button>
					</Popconfirm>
				</Tooltip>
				<Tooltip title={languages.restoreAll[language]}>
					<Popconfirm
						title={languages.restoreAllConfirm[language]}
						onConfirm={restoreAll}
					>
						<Button size={isSmallScreen ? 'small' : 'middle'}>
							<UndoOutlined style={{ scale: isSmallScreen ? '1' : '1.5' }} />
						</Button>
					</Popconfirm>
				</Tooltip>
				{MySearch(handleSearch, query, isSearchLoading, isSmallScreen)}
			</Flex>
		);
	}
);

export default TrashPanel;
