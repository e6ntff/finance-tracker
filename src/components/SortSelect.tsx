import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented, Tooltip } from 'antd';
import {
	CalendarOutlined,
	DollarOutlined,
	FontColorsOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const SortSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const {
		setIsSortingReversed,
		listOptions,
		userOptions,
		handleSortAlgorithmChanging,
	} = optionsStore;

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			<Tooltip title={languages.sort.reverse[userOptions.language]}>
				{listOptions.isSortingReversed ? (
					<SortDescendingOutlined
						onClick={() => setIsSortingReversed(!listOptions.isSortingReversed)}
					/>
				) : (
					<SortAscendingOutlined
						onClick={() => setIsSortingReversed(!listOptions.isSortingReversed)}
					/>
				)}
			</Tooltip>
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={listOptions.sortingAlgorithm}
				onChange={handleSortAlgorithmChanging}
				options={[
					{
						label: (
							<Tooltip title={languages.sort.byDate[userOptions.language]}>
								<CalendarOutlined />
							</Tooltip>
						),
						value: 'date',
					},
					{
						label: (
							<Tooltip title={languages.sort.byTitle[userOptions.language]}>
								<FontColorsOutlined />
							</Tooltip>
						),
						value: 'title',
					},
					{
						label: (
							<Tooltip title={languages.sort.byPrice[userOptions.language]}>
								<DollarOutlined />
							</Tooltip>
						),
						value: 'price',
					},
				]}
			/>
		</Flex>
	);
});

export default SortSelect;
