import React, { memo, useEffect, useMemo, useState } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, ListOptions } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Col, Empty, List, Row, Spin } from 'antd';
import { getListToShowOnCurrentPage } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import useDebounce from 'hooks/useDebounce';
import constants from 'settings/constants';

interface Props {
	filteredList: ExpenseItem[];
}

const ItemList: React.FC<Props> = observer(({ filteredList }) => {
	const { loading } = listStore;
	const { width } = userStore;
	const { listOptions } = optionsStore;

	const debouncedOptions: ListOptions = useDebounce(listOptions);

	const [colNumber, setColNumber] = useState<number>(4);

	useEffect(() => {
		if (width < 360) {
			setColNumber(1);
			return;
		}
		if (width < 500) {
			setColNumber(2);
			return;
		}
		if (width < constants.maxAppWidthLarge) {
			setColNumber(3);
			return;
		}
		setColNumber(4);
	}, [setColNumber, width]);

	const listToShowOnCurrentPage = useMemo(
		() => getListToShowOnCurrentPage(debouncedOptions, filteredList),
		[filteredList, debouncedOptions]
	);

	const SplittedList = useMemo(() => {
		const result: ExpenseItem[][] = [];
		let row = -1;

		listToShowOnCurrentPage.forEach((item: ExpenseItem, col: number) => {
			if (col % colNumber === 0) {
				row++;
				result.push([]);
			}
			result[row].push(item);
		});

		return result;
	}, [colNumber, listToShowOnCurrentPage]);

	return (
		<>
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
			{debouncedOptions.mode === 'list' ? (
				<List style={{ inlineSize: '100%' }}>
					{listToShowOnCurrentPage.map((item: ExpenseItem) => (
						<ListItem
							key={item.id}
							mode={debouncedOptions.mode}
							initialIitem={item}
						/>
					))}
				</List>
			) : (
				SplittedList.map((row: ExpenseItem[]) => (
					<Row
						key={row[0].id}
						gutter={16}
						style={{ inlineSize: '100%' }}
					>
						{row.map((item: ExpenseItem) => (
							<Col
								key={item.id}
								span={24 / colNumber}
							>
								<ListItem
									mode={debouncedOptions.mode}
									initialIitem={item}
								/>
							</Col>
						))}
					</Row>
				))
			)}
		</>
	);
});

export default memo(ItemList);
