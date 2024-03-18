import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ItemList from '../components/ItemList';
import { Flex } from 'antd';
import Selectors from 'components/Selectors';
import { observer } from 'mobx-react-lite';
import constants from 'settings/constants';
import { Mode, Options, Sort, category } from 'settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { userStore } from 'utils/userStore';
import useDebounce from 'hooks/useDebounce';
import { getFilteredList } from 'utils/transformData';
import { listStore } from 'utils/listStore';

const defaultOptions = {
	years: [],
	sortingAlgorithm: constants.defaultAlgoritm as Sort,
	isSortingReversed: false,
	pageSize: constants.defaultPageSize,
	currentPage: 1,
	categoriesToFilter: [],
	mode: constants.defaultMode as Mode,
};

const Expenses: React.FC = observer(() => {
	const { categories } = categoryStore;
	const { isSmallScreen, language } = userStore;
	const { list } = listStore;

	const [options, setOptions] = useState<Options>(
		JSON.parse(
			localStorage.getItem('options') || JSON.stringify(defaultOptions)
		)
	);

	useEffect(() => {
		if (isSmallScreen) {
			setOptions((prevOptions: Options) => ({ ...prevOptions, mode: 'grid' }));
		}
	}, [setOptions, isSmallScreen]);

	useEffect(() => {
		localStorage.setItem('options', JSON.stringify(options));
	}, [options]);

	useEffect(() => {
		setOptions((prevOptions: Options) => ({
			...prevOptions,
			isSortingReversed: false,
		}));
	}, [options.sortingAlgorithm]);

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

	const handleModeChanging = (value: Mode) => {
		setOptions((prevOptions: Options) => ({ ...prevOptions, mode: value }));
	};

	const isSettingsChanged = useMemo(
		() =>
			options.isSortingReversed ||
			options.years.length > 0 ||
			options.categoriesToFilter.length > 0 ||
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

	const filteredList = useMemo(
		() => getFilteredList(options, list, language),
		[list, language, options]
	);

	const debouncedOptions: Options = useDebounce(options);

	return (
		<Flex
			vertical
			gap={16}
			align='center'
		>
			<Selectors
				isSmallScreen={isSmallScreen}
				handlers={{
					handleYearChanging,
					handleCategoriesToFilterChange,
					handleSortAlgorithmChanging,
					toggleIsSortingReversed,
					handleModeChanging,
					resetSettings,
					handlePageChanging,
				}}
				isSettingsChanged={isSettingsChanged}
				filteredListLength={filteredList.length}
				options={options}
			/>
			<ItemList
				options={debouncedOptions}
				filteredList={filteredList}
			/>
		</Flex>
	);
});

export default Expenses;
