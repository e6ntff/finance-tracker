import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { listStore } from 'utils/listStore';
import { ExpenseItem } from 'settings/interfaces';
import { userStore } from 'utils/userStore';

interface Props {
	values: string[];
	onChange: (arg0: string[]) => void;
}

const YearSelect: React.FC<Props> = observer(({ values, onChange }) => {
	const { list } = listStore;
	const { isSmallScreen } = userStore;

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
				value={values}
				onChange={onChange}
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
