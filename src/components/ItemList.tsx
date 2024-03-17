import React, { useMemo, memo } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, Options } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Empty, Flex, List, Pagination, Spin } from 'antd';
import { userStore } from 'utils/userStore';
import constants from 'settings/constants';
import {
	getFilteredList,
	getListToShowOnCurrentPage,
} from 'utils/transformData';

interface Props {
	options: Options;
	handlePageChanging: (arg0: number, arg1: number) => void;
}

const ItemList: React.FC<Props> = observer(
	({ options, handlePageChanging }) => {
		const { list, loading } = listStore;
		const { language, isSmallScreen } = userStore;

		const filteredList = useMemo(
			() => getFilteredList(options, list, language),
			[list, language, options]
		);

		const listToShowOnCurrentPage = useMemo(
			() => getListToShowOnCurrentPage(options, filteredList),
			[filteredList, options]
		);

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
				size={isSmallScreen ? 'small' : 'default'}
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
