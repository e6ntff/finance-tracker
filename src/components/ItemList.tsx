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
import CategorySelect from './CategorySelect';
import { categoryStore } from 'utils/categoryStore';
import constants from 'settings/constants';

const ItemList: React.FC = observer(() => {
	const { list, loading } = listStore;
	const { categories } = categoryStore;
	const { language, isSmallScreen } = userStore;
	const [year, setYear] = useState<string>('');
	const [sortingAlgorithm, setSortingAlgorithm] = useState<Sort>('date');
	const [isSortingReversed, setIsSortingReversed] = useState<boolean>(false);
	const [pageSize, setPageSize] = useState<number>(constants.defaultPageSize);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [categoryToFilter, setCategoryToFilter] = useState<category | null>(
		null
	);

	const filteredList = useMemo(() => {
		if (year || categoryToFilter) {
			return sortBy(
				list.filter((item: ExpenseItem) => {
					if (!categoryToFilter) return item.date.year().toString() === year;
					if (!year) return item.category.id === categoryToFilter.id;
					return (
						item.date.year().toString() === year &&
						item.category.id === categoryToFilter.id
					);
				}),
				sortingAlgorithm,
				isSortingReversed,
				language
			);
		} else {
			return sortBy(list, sortingAlgorithm, isSortingReversed, language);
		}
	}, [
		year,
		list,
		sortingAlgorithm,
		isSortingReversed,
		language,
		categoryToFilter,
	]);

	const listToShowOnCurrentPage = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return filteredList.slice(startIndex, endIndex);
	}, [filteredList, currentPage, pageSize]);

	const handleYearChanging = useCallback(
		(value: string) => {
			setYear(value);
		},
		[setYear]
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
			year ||
			categoryToFilter ||
			pageSize !== constants.defaultPageSize ||
			currentPage !== 1 ||
			sortingAlgorithm !== 'date',
		[
			isSortingReversed,
			year,
			sortingAlgorithm,
			categoryToFilter,
			pageSize,
			currentPage,
		]
	);

	const resetSettings = useCallback(() => {
		setIsSortingReversed(false);
		setSortingAlgorithm('date');
		setYear('');
		setCategoryToFilter(null);
	}, [setIsSortingReversed, setSortingAlgorithm, setYear, setCategoryToFilter]);

	const handleCategoryChange = useCallback(
		(id: number) => {
			const foundCategory = categories.find((cat: category) => cat.id === id);
			setCategoryToFilter(foundCategory || null);
		},
		[setCategoryToFilter, categories]
	);

	const handlePageChanging = (value: number, size: number) => {
		setCurrentPage(value);
		setPageSize(size);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [year, sortingAlgorithm, isSortingReversed, categoryToFilter]);

	const SelectorsJSX = (
		<Flex
			style={{ inlineSize: '100%' }}
			gap={16}
			vertical={isSmallScreen}
		>
			<Flex gap={16}>
				<YearSelect
					value={year}
					onChange={handleYearChanging}
				/>
				<CategorySelect
					category={categoryToFilter}
					handler={handleCategoryChange}
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
