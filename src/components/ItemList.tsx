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

const ItemList: React.FC = observer(() => {
	const { list, loading } = listStore;
	const { categories } = categoryStore;
	const { language, isSmallScreen } = userStore;
	const [years, setYears] = useState<string[]>([]);
	const [sortingAlgorithm, setSortingAlgorithm] = useState<Sort>('date');
	const [isSortingReversed, setIsSortingReversed] = useState<boolean>(false);
	const [pageSize, setPageSize] = useState<number>(constants.defaultPageSize);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [categoriesToFilter, setCategoriesToFilter] = useState<category[]>([]);

	const filteredList = useMemo(() => {
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
	}, [
		years,
		list,
		sortingAlgorithm,
		isSortingReversed,
		language,
		categoriesToFilter,
	]);

	const listToShowOnCurrentPage = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return filteredList.slice(startIndex, endIndex);
	}, [filteredList, currentPage, pageSize]);

	const handleYearChanging = useCallback(
		(values: string[]) => {
			setYears(values);
		},
		[setYears]
	);

	const handleSortAlgorithmChanging = useCallback(
		(value: Sort) => {
			setSortingAlgorithm(value);
		},
		[setSortingAlgorithm]
	);

	const toggleIsSortingReversed = useCallback(() => {
		setIsSortingReversed((prevValue: boolean) => !prevValue);
	}, [setIsSortingReversed]);

	const isSettingsChanged = useMemo(
		() =>
			isSortingReversed ||
			years ||
			categoriesToFilter ||
			pageSize !== constants.defaultPageSize ||
			currentPage !== 1 ||
			sortingAlgorithm !== 'date',
		[
			isSortingReversed,
			years,
			sortingAlgorithm,
			categoriesToFilter,
			pageSize,
			currentPage,
		]
	);

	const resetSettings = useCallback(() => {
		setIsSortingReversed(false);
		setSortingAlgorithm('date');
		setYears([]);
		setCategoriesToFilter([]);
		handlePageChanging(1, constants.defaultPageSize);
	}, [
		setIsSortingReversed,
		setSortingAlgorithm,
		setYears,
		setCategoriesToFilter,
	]);

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

			setCategoriesToFilter(foundCategories);
		},
		[setCategoriesToFilter, categories]
	);

	const handlePageChanging = (value: number, size: number) => {
		setCurrentPage(value);
		setPageSize(size);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [years, sortingAlgorithm, isSortingReversed, categoriesToFilter]);

	const SelectorsJSX = (
		<Flex
			style={{ inlineSize: '100%' }}
			gap={16}
			vertical={isSmallScreen}
		>
			<Flex gap={16}>
				<YearSelect
					values={years}
					onChange={handleYearChanging}
				/>
				<CategoriesSelect
					values={categoriesToFilter}
					onChange={handleCategoriesToFilterChange}
				/>
			</Flex>
			<Flex gap={16}>
				<SortSelect
					onChange={handleSortAlgorithmChanging}
					isSortingReversed={isSortingReversed}
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
			current={currentPage}
			pageSize={pageSize}
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
