import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

interface Props {
	year: string | null;
	handleYearChanging: any;
}

const YearSelect: React.FC<Props> = observer(({ year, handleYearChanging }) => {
	const { language } = userStore;

	return (
		<Flex
			gap={16}
			align='center'
		>
			<Select
				value={year}
				onChange={handleYearChanging}
			>
				<Select.Option value='2024'>2024</Select.Option>
				<Select.Option value='2023'>2023</Select.Option>
				<Select.Option value='2022'>2022</Select.Option>
				<Select.Option value='2021'>2021</Select.Option>
				<Select.Option value='2020'>2020</Select.Option>
			</Select>
			<Typography.Text>{languages.filterByYear[language]}</Typography.Text>
		</Flex>
	);
});

export default YearSelect;
