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
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

const SortSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { setIsSortingReversed, listOptions, handleSortAlgorithmChanging } =
		optionsStore;

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			{listOptions.isSortingReversed ? (
				<SortDescendingOutlined />
			) : (
				<SortAscendingOutlined />
			)}
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={listOptions.sortingAlgorithm}
				onDoubleClick={() =>
					setIsSortingReversed(!listOptions.isSortingReversed)
				}
				onChange={handleSortAlgorithmChanging}
				options={[
					{ label: <CalendarOutlined />, value: 'date' },
					{ label: <FontColorsOutlined />, value: 'title' },
					{ label: <DollarOutlined />, value: 'price' },
				]}
			/>
		</Flex>
	);
});

export default SortSelect;
