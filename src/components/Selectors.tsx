import { Divider, Flex, Pagination } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import NewItemButton from './NewItemButton';
import YearSlider from './YearSlider';
import CategoriesSelect from './CategoriesSelect';
import SortSelect from './SortSelect';
import ModeSelect from './ModeSelect';
import constants from 'settings/constants';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import { MyIconWithTooltip, MySearch } from './Items';
import { ReloadOutlined } from '@ant-design/icons';
import languages from 'settings/languages';

interface Props {
	total: number;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	debouncedQuery: string;
}

const Selectors: React.FC<Props> = observer(
	({ total, query, setQuery, debouncedQuery }) => {
		const { isSmallScreen, loading, tourRefs } = userStore;
		const {
			listOptions,
			userOptions,
			defaultRange,
			resetListOptions,
			handlePageChanging,
			setRange,
		} = optionsStore;

		const {
			isSortingReversed,
			range,
			categoriesToFilterIds,
			pageSize,
			currentPage,
			sortingAlgorithm,
		} = listOptions;

		const resetAll = useCallback(() => {
			resetListOptions();
			setQuery('');
		}, [resetListOptions, setQuery]);

		const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

		const isSettingsChanged = useMemo(
			() =>
				query.length ||
				isSortingReversed ||
				categoriesToFilterIds.length > 0 ||
				pageSize !== constants.defaultPageSize ||
				currentPage !== 1 ||
				(range[0] &&
					range[1] &&
					(range[0] !== defaultRange[0] || range[1]) !== defaultRange[1]) ||
				sortingAlgorithm !== 'date',
			[
				query,
				range,
				defaultRange,
				isSortingReversed,
				categoriesToFilterIds,
				pageSize,
				currentPage,
				sortingAlgorithm,
			]
		);

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
				ref={tourRefs[2]}
				vertical
				style={{ inlineSize: '100%' }}
			>
				<Flex
					vertical
					gap={32}
				>
					<Flex
						gap={16}
						vertical={isSmallScreen}
					>
						<Flex gap={16}>
							<NewItemButton />
							<CategoriesSelect />
						</Flex>
						<Flex gap={16}>
							<SortSelect />
							<ModeSelect />
							{MySearch(handleSearch, query, isSearchLoading, isSmallScreen)}
							{isSettingsChanged &&
								MyIconWithTooltip(
									languages.reset[userOptions.language],
									false,
									ReloadOutlined,
									false,
									resetAll
								)}
						</Flex>
					</Flex>
					<YearSlider
						range={range}
						setRange={setRange}
					/>
				</Flex>
				<Divider />
				{!loading && (
					<Pagination
						style={{ alignSelf: 'center' }}
						size={isSmallScreen ? 'small' : 'default'}
						showSizeChanger
						pageSizeOptions={constants.pageSizeOptions}
						current={listOptions.currentPage}
						pageSize={listOptions.pageSize}
						total={total}
						onChange={handlePageChanging}
						onShowSizeChange={handlePageChanging}
					/>
				)}
			</Flex>
		);
	}
);

export default memo(Selectors);
