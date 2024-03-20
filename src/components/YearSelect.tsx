import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { listStore } from 'utils/listStore';
import { ExpenseItem } from 'settings/interfaces';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

const YearSelect: React.FC = observer(() => {
	const { list } = listStore;
	const { isSmallScreen } = userStore;
	const { listOptions, handleYearChanging } = optionsStore;

	const years = useMemo(
		() =>
			list
				.reduce((acc: string[], item: ExpenseItem) => {
					const year = item.date.year().toString();
					if (!acc.find((item: string) => item === year)) return [...acc, year];
					return acc;
				}, [])
				.sort((prev, next) => Number(prev) - Number(next)),
		[list]
	);

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			<Select
				size={isSmallScreen ? 'small' : 'middle'}
				mode='multiple'
				showSearch={false}
				value={listOptions.years}
				onChange={handleYearChanging}
				style={{ minInlineSize: '7em' }}
			>
				{years.reverse().map((year: string) => (
					<Select.Option
						key={year}
						value={year}
					>
						{year}
					</Select.Option>
				))}
			</Select>
			<ClockCircleOutlined style={{ opacity: 0.5 }} />
		</Flex>
	);
});

export default YearSelect;
