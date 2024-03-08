import React, { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import YearSelect from '../components/YearSelect';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { Empty, Flex } from 'antd';
import DiagramBar from '../components/DiagramBar';
import DiagramPie from 'components/DiagramPie';

const Dashboard: React.FC = observer(() => {
	const { list } = listStore;
	const [year, setYear] = useState<string>(dayjs().year().toString());
	const [month, setMonth] = useState<string | null>(null);

	const filteredList = useMemo(
		() =>
			list.filter((item: ExpenseItem) => item.date.year().toString() === year),
		[year, list]
	);

	const handleYearChanging = useCallback(
		(value: string) => {
			setYear(value);
		},
		[setYear]
	);

	return (
		<Flex
			vertical
			gap={16}
		>
			<YearSelect
				year={year}
				handleYearChanging={handleYearChanging}
			/>
			{filteredList.length ? (
				<Flex
					align='center'
					justify='space-between'
				>
					<DiagramBar
						interval='month'
						list={filteredList}
						setInterval={setMonth}
					/>
					<DiagramPie
						list={filteredList}
						interval='month'
						intervalBig={year}
						intervalSmall={month}
					/>
				</Flex>
			) : (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={''}
				/>
			)}
		</Flex>
	);
});

export default Dashboard;
