import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

interface Props {
	values: string[];
	onChange: (arg0: string[]) => void;
}

const YearSelect: React.FC<Props> = observer(({ values, onChange }) => (
	<Flex
		gap={8}
		style={{ alignSelf: 'start' }}
	>
		<Select
			mode='multiple'
			allowClear
			value={values}
			onChange={onChange}
			style={{ minInlineSize: '7em' }}
		>
			<Select.Option value='2024'>2024</Select.Option>
			<Select.Option value='2023'>2023</Select.Option>
			<Select.Option value='2022'>2022</Select.Option>
			<Select.Option value='2021'>2021</Select.Option>
			<Select.Option value='2020'>2020</Select.Option>
		</Select>
		<ClockCircleOutlined style={{ opacity: 0.5 }} />
	</Flex>
));

export default YearSelect;
