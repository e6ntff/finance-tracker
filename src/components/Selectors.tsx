import { Divider, Flex, Pagination, Segmented, Tooltip } from 'antd';
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
import constants from 'settings/constants';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import { MyIcon, MySearch } from './Items';
import {
	CalendarOutlined,
	DollarOutlined,
	FontColorsOutlined,
	MenuOutlined,
	ReloadOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
	TableOutlined,
} from '@ant-design/icons';
import languages from 'settings/languages';
import TypeSelect from './TypeSelect';
import { SegmentedOptions } from 'antd/es/segmented';
import { Mode, Sort } from 'settings/interfaces';

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
			setListType,
		} = optionsStore;

		const {
			isSortingReversed,
			range,
			categoriesToFilterIds,
			pageSize,
			currentPage,
			sortingAlgorithm,
			type,
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
					gap={16}
				>
					<Flex
						gap={isSmallScreen ? 8 : 16}
						vertical={isSmallScreen}
					>
						<Flex gap={isSmallScreen ? 8 : 16}>
							<NewItemButton />
							<CategoriesSelect />
							<ModeSelect />
							<TypeSelect
								type={type}
								onChange={setListType}
								extra
							/>
						</Flex>
						<Flex gap={isSmallScreen ? 8 : 16}>
							<SortSelect />
							{MySearch(handleSearch, query, isSearchLoading, isSmallScreen)}
							{isSettingsChanged &&
								MyIcon(
									ReloadOutlined,
									false,
									false,
									resetAll,
									languages.reset[userOptions.language]
								)}
						</Flex>
					</Flex>
					<YearSlider
						range={range}
						type={type}
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

const ModeSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { listOptions, handleModeChanging, userOptions } = optionsStore;

	const { language } = userOptions;

	const options: SegmentedOptions<Mode> = useMemo(
		() => [
			{
				label: (
					<Tooltip title={languages.layout.list[language]}>
						<MenuOutlined />
					</Tooltip>
				),
				value: 'list',
				disabled: isSmallScreen,
			},
			{
				label: (
					<Tooltip title={languages.layout.grid[language]}>
						<TableOutlined />
					</Tooltip>
				),
				value: 'grid',
			},
		],
		[language, isSmallScreen]
	);

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={listOptions.mode}
				onChange={handleModeChanging}
				options={options}
			/>
		</Flex>
	);
});

const SortSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const {
		setIsSortingReversed,
		listOptions,
		userOptions,
		handleSortAlgorithmChanging,
	} = optionsStore;

	const { isSortingReversed } = listOptions;
	const { language } = userOptions;

	const toggleIsSortingReversed = useCallback(
		() => setIsSortingReversed(!isSortingReversed),
		[setIsSortingReversed, isSortingReversed]
	);

	const sortingIcon = useMemo(
		() =>
			isSortingReversed ? (
				<SortDescendingOutlined onClick={toggleIsSortingReversed} />
			) : (
				<SortAscendingOutlined onClick={toggleIsSortingReversed} />
			),
		[isSortingReversed, toggleIsSortingReversed]
	);

	const options: SegmentedOptions<Sort> = useMemo(
		() => [
			{
				label: (
					<Tooltip title={languages.sort.byDate[language]}>
						<CalendarOutlined />
					</Tooltip>
				),
				value: 'date',
			},
			{
				label: (
					<Tooltip title={languages.sort.byTitle[language]}>
						<FontColorsOutlined />
					</Tooltip>
				),
				value: 'title',
			},
			{
				label: (
					<Tooltip title={languages.sort.byPrice[language]}>
						<DollarOutlined />
					</Tooltip>
				),
				value: 'price',
			},
		],
		[language]
	);

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			<Tooltip title={languages.sort.reverse[language]}>{sortingIcon}</Tooltip>
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={listOptions.sortingAlgorithm}
				onChange={handleSortAlgorithmChanging}
				options={options}
			/>
		</Flex>
	);
});
