import React, { useState, useCallback, useMemo, memo } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, Sort, category } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Button, Empty, Flex, List, Spin } from 'antd';
import YearSelect from './YearSelect';
import SortSelect from './SortSelect';
import { sortBy } from 'utils/utils';
import { userStore } from 'utils/userStore';
import { ReloadOutlined } from '@ant-design/icons';
import CategorySelect from './CategorySelect';
import { categoryStore } from 'utils/categoryStore';

const ItemList: React.FC = observer(() => {
	const { list, loading } = listStore;
	const { categories } = categoryStore;
	const { language } = userStore;
	const [year, setYear] = useState<string>('');
	const [sortingAlgorithm, setSortingAlgorithm] = useState<Sort>('date');
	const [isSortingReversed, setIsSortingReversed] = useState<boolean>(false);
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
			sortingAlgorithm !== 'date',
		[isSortingReversed, year, sortingAlgorithm, categoryToFilter]
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

	return (
		<>
			<Flex
				style={{ inlineSize: '100%' }}
				gap={32}
			>
				<YearSelect
					value={year}
					onChange={handleYearChanging}
				/>
				<CategorySelect
					category={categoryToFilter}
					handler={handleCategoryChange}
				/>
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
			{loading ? (
				<Spin />
			) : (
				!filteredList.length && (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={''}
					/>
				)
			)}
			<List style={{ inlineSize: '100%' }}>
				{filteredList.map((item: ExpenseItem) => {
					return (
						<ListItem
							key={item.id}
							initialIitem={item}
						/>
					);
				})}
			</List>
		</>
	);
});

export default memo(ItemList);
