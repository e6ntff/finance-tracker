import React, {useMemo, memo } from 'react';
import ListItem from './ListItem';
import {
	ExpenseItem,
	Options,
	category,
} from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import {  Empty, Flex, List, Pagination, Spin } from 'antd';
import { sortBy } from 'utils/utils';
import { userStore } from 'utils/userStore';
import constants from 'settings/constants';

interface Props {
	options: Options;
	handlePageChanging: (arg0: number, arg1: number) => void;
}

const ItemList: React.FC<Props> = observer(
	({ options, handlePageChanging }) => {
		const { list, loading } = listStore;
		const { language } = userStore;

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

		const EmptyJSX = (
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={''}
			/>
		);

		const ListJSX =
			options.mode === 'list' ? (
				<List style={{ inlineSize: '100%' }}>
					{listToShowOnCurrentPage.map((item: ExpenseItem) => (
						<ListItem
							key={item.id}
							mode={options.mode}
							initialIitem={item}
						/>
					))}
				</List>
			) : (
				<Flex
					wrap='wrap'
					justify='space-between'
					gap={8}
				>
					{listToShowOnCurrentPage.map((item: ExpenseItem) => (
						<ListItem
							key={item.id}
							mode={options.mode}
							initialIitem={item}
						/>
					))}
				</Flex>
			);

		const PaginationJSX = !loading && (
			<Pagination
				showQuickJumper
				showSizeChanger
				pageSizeOptions={constants.pageSizeOptions}
				current={options.currentPage}
				pageSize={options.pageSize}
				total={filteredList.length}
				onChange={handlePageChanging}
				onShowSizeChange={handlePageChanging}
			/>
		);

		return (
			<>
				{PaginationJSX}
				{loading ? <Spin /> : !filteredList.length && EmptyJSX}
				{ListJSX}
				{((listToShowOnCurrentPage.length >= 10 && options.mode === 'list') ||
					listToShowOnCurrentPage.length >= 20) &&
					PaginationJSX}
			</>
		);
	}
);

export default memo(ItemList);
