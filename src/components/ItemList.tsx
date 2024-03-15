import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, Sort, category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Empty, Flex, List, Pagination, Spin } from 'antd';
import YearSelect from './YearSelect';
import SortSelect from './SortSelect';
import { sortBy } from 'utils/utils';
import { userStore } from 'utils/userStore';
import { ReloadOutlined } from '@ant-design/icons';
import { categoryStore } from 'utils/categoryStore';
import constants from 'settings/constants';
import CategoriesSelect from './CategoriesSelect';

interface Options {
	years: string[];
	sortingAlgorithm: Sort;
	isSortingReversed: boolean;
	pageSize: number;
	currentPage: number;
	categoriesToFilter: category[];
}

const defaultOptions = {
	years: [],
	sortingAlgorithm: constants.defaultAlgoritm as Sort,
	isSortingReversed: false,
	pageSize: constants.defaultPageSize,
	currentPage: 1,
	categoriesToFilter: [],
};

const ItemList: React.FC = observer(() => {
	const { list, loading } = listStore;
	const { categories } = categoryStore;
	const { language, isSmallScreen } = userStore;
	const [options, setOptions] = useState<Options>(
		JSON.parse(
			localStorage.getItem('options') || JSON.stringify(defaultOptions)
		)
	);

	useEffect(() => {
		localStorage.setItem('options', JSON.stringify(options));
	}, [options]);

	const filteredList = useMemo(() => {
		const { years, categoriesToFilter, sortingAlgorithm, isSortingReversed } =
			options;
		if (years || categoriesToFilter) {
			return sortBy(
				list.filter((item: ExpenseItem) => {
					if (!categoriesToFilter.length && years.length)
						return years.some(
							(year: string) => item.date.year().toString() === year
						);
					if (!years.length && categoriesToFilter.length)
						return categoriesToFilter.some(
							(category: category) => item.category.id === category.id
						);
					if (years.length && categoriesToFilter.length)
						return (
							years.some(
								(year: string) => item.date.year().toString() === year
							) &&
							categoriesToFilter.some(
								(category: category) => item.category.id === category.id
							)
						);
					return item;
				}),
				sortingAlgorithm,
				isSortingReversed,
				language
			);
		} else {
			return sortBy(list, sortingAlgorithm, isSortingReversed, language);
		}
	}, [list, language, options]);

	const listToShowOnCurrentPage = useMemo(() => {
		const { currentPage, pageSize } = options;
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return filteredList.slice(startIndex, endIndex);
	}, [filteredList, options]);

	const handleYearChanging = useCallback(
		(values: string[]) => {
			setOptions((prevOptions: Options) => ({ ...prevOptions, years: values }));
		},
		[setOptions]
	);

	const handleSortAlgorithmChanging = useCallback(
		(value: Sort) => {
			setOptions((prevOptions: Options) => ({
				...prevOptions,
				sortingAlgorithm: value,
			}));
		},
		[setOptions]
	);

	const toggleIsSortingReversed = useCallback(() => {
		setOptions((prevOptions: Options) => ({
			...prevOptions,
			isSortingReversed: !prevOptions.isSortingReversed,
		}));
	}, [setOptions]);

	const isSettingsChanged = useMemo(
		() =>
			options.isSortingReversed ||
			options.years ||
			options.categoriesToFilter ||
			options.pageSize !== constants.defaultPageSize ||
			options.currentPage !== 1 ||
			options.sortingAlgorithm !== 'date',
		[options]
	);

	const resetSettings = useCallback(() => {
		setOptions(defaultOptions);
	}, [setOptions]);

	const handleCategoriesToFilterChange = useCallback(
		(values: number[]) => {
			const foundCategories: category[] = values.reduce(
				(acc: category[], value: number) => {
					const foundCategory = categories.find(
						(category: category) => category.id === value
					);
					if (foundCategory) {
						acc.push(foundCategory);
					}
					return acc;
				},
				[]
			);

			setOptions((prevOptions: Options) => ({
				...prevOptions,
				categoriesToFilter: foundCategories,
			}));
		},
		[setOptions, categories]
	);

	const handlePageChanging = useCallback(
		(value: number, size: number) => {
			setOptions((prevOptions: Options) => ({
				...prevOptions,
				currentPage: value,
				pageSize: size,
			}));
		},
		[setOptions]
	);

	useEffect(() => {
		setOptions((prevOptions: Options) => ({ ...prevOptions, currentPage: 1 }));
	}, [
		options.years,
		options.sortingAlgorithm,
		options.isSortingReversed,
		options.categoriesToFilter,
	]);

	const SelectorsJSX = (
		<Flex
			style={{ inlineSize: '100%' }}
			gap={16}
			vertical={isSmallScreen}
		>
			<Flex gap={16}>
				<YearSelect
					values={options.years}
					onChange={handleYearChanging}
				/>
				<CategoriesSelect
					values={options.categoriesToFilter}
					onChange={handleCategoriesToFilterChange}
				/>
			</Flex>
			<Flex gap={16}>
				<SortSelect
					onChange={handleSortAlgorithmChanging}
					isSortingReversed={options.isSortingReversed}
					toggleIsSortingReversed={toggleIsSortingReversed}
				/>
				{isSettingsChanged && (
					<Button onClick={resetSettings}>
						<ReloadOutlined />
					</Button>
				)}
			</Flex>
		</Flex>
	);

	const EmptyJSX = (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={''}
		/>
	);

	const ListJSX = (
		<List style={{ inlineSize: '100%' }}>
			{listToShowOnCurrentPage.map((item: ExpenseItem) => {
				return (
					<ListItem
						key={item.id}
						initialIitem={item}
					/>
				);
			})}
		</List>
	);

	const PaginationJSX = !loading && (
		<Pagination
			showQuickJumper
			showSizeChanger
			current={options.currentPage}
			pageSize={options.pageSize}
			total={filteredList.length}
			onChange={handlePageChanging}
			onShowSizeChange={handlePageChanging}
		/>
	);

	return (
		<>
			{SelectorsJSX}
			{PaginationJSX}
			{loading ? <Spin /> : !filteredList.length && EmptyJSX}
			{ListJSX}
			{listToShowOnCurrentPage.length >= 10 && PaginationJSX}
		</>
	);
});

export default memo(ItemList);
