import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented } from 'antd';
import {
	CalendarOutlined,
	DollarOutlined,
	FontColorsOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import { Sort } from 'settings/interfaces';
import { userStore } from 'utils/userStore';

interface Props {
	value: Sort;
	onChange: (arg0: Sort) => void;
	isSortingReversed: boolean;
	toggleIsSortingReversed: () => void;
}

const SortSelect: React.FC<Props> = observer(
	({ value, onChange, isSortingReversed, toggleIsSortingReversed }) => {
		const { isSmallScreen } = userStore;
		return (
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
					size={isSmallScreen ? 'small' : 'middle'}
					value={value}
					onDoubleClick={toggleIsSortingReversed}
					onChange={onChange}
					options={[
						{ label: <CalendarOutlined />, value: 'date' },
						{ label: <FontColorsOutlined />, value: 'title' },
						{ label: <DollarOutlined />, value: 'price' },
					]}
				/>
			</Flex>
		);
	}
);

export default SortSelect;
