import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented } from 'antd';
import {
	CalendarOutlined,
	FontColorsOutlined,
	PoundCircleOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import { Sort } from 'settings/interfaces';

interface Props {
	onChange: (arg0: Sort) => void;
	isSortingReversed: boolean;
	toggleIsSortingReversed: () => void;
}

const SortSelect: React.FC<Props> = observer(
	({ onChange, isSortingReversed, toggleIsSortingReversed }) => (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			{isSortingReversed ? (
				<SortDescendingOutlined />
			) : (
				<SortAscendingOutlined />
			)}
			<Segmented
				onDoubleClick={toggleIsSortingReversed}
				onChange={onChange}
				options={[
					{ label: <CalendarOutlined />, value: 'date' },
					{ label: <FontColorsOutlined />, value: 'title' },
					{ label: <PoundCircleOutlined />, value: 'price' },
				]}
			/>
		</Flex>
	)
);

export default SortSelect;
