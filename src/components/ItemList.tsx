import React, { useState, useCallback, useMemo, memo } from 'react';
import dayjs from 'dayjs';
import ListItem from './ListItem';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Divider, Empty, List, Spin } from 'antd';
import YearSelect from './YearSelect';
import { userStore } from 'utils/userStore';

const ItemList: React.FC = observer(() => {
	const { list } = listStore;
	const { loading } = userStore;
	const [year, setYear] = useState<string>(dayjs().year().toString());

	const filteredList = useMemo(
		() =>
			list.slice().filter((item: any) => item.date.year().toString() === year),
		[year, list]
	);

	const handleYearChanging = useCallback(
		(value: string) => {
			setYear(value);
		},
		[setYear]
	);

	return (
		<>
			<Divider />
			<YearSelect
				year={year}
				handleYearChanging={handleYearChanging}
			/>
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
			<List style={{ inlineSize: 'min(100%, 768px)' }}>
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
