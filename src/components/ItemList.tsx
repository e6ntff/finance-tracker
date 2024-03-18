import React, { memo } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, Options } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Empty, Flex, List, Spin } from 'antd';

interface Props {
	options: Options;
	filteredListLength: number;
	listToShowOnCurrentPage: ExpenseItem[];
}

const ItemList: React.FC<Props> = observer(
	({ options, filteredListLength, listToShowOnCurrentPage }) => {
		const { loading } = listStore;

		return (
			<>
				{loading ? (
					<Spin />
				) : (
					!filteredListLength && (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={''}
						/>
					)
				)}
				{options.mode === 'list' ? (
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
				)}
			</>
		);
	}
);

export default memo(ItemList);
