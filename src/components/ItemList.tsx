import React, { memo, useEffect, useMemo, useState } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, Options } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Col, Empty, List, Row, Spin } from 'antd';
import { getListToShowOnCurrentPage } from 'utils/transformData';
import { userStore } from 'utils/userStore';

interface Props {
	options: Options;
	filteredList: ExpenseItem[];
}

const ItemList: React.FC<Props> = observer(({ options, filteredList }) => {
	const { loading } = listStore;
	const { width } = userStore;
	const [colNumber, setColNumber] = useState<number>(3);

	useEffect(() => {
		if (width < 380) {
			setColNumber(1);
			return;
		}
		if (width < 577) {
			setColNumber(2);
			return;
		}
		setColNumber(3);
	}, [setColNumber, width]);

	const listToShowOnCurrentPage = useMemo(
		() => getListToShowOnCurrentPage(options, filteredList),
		[filteredList, options]
	);

	const SplittedList = useMemo(() => {
		const result: ExpenseItem[][] = [];
		let row = -1;

		filteredList.forEach((item: ExpenseItem, col: number) => {
			if (col % colNumber === 0) {
				row++;
				result.push([]);
			}
			result[row].push(item);
		});

		return result;
	}, [filteredList, colNumber]);

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
				SplittedList.map((row: ExpenseItem[]) => (
					<Row
						gutter={16}
						style={{ inlineSize: '100%' }}
					>
						{row.map((item: ExpenseItem) => (
							<Col span={24 / colNumber}>
								<ListItem
									key={item.id}
									mode={options.mode}
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
