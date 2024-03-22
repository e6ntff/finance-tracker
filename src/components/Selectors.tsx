import { Button, Divider, Flex, Pagination } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import NewItemButton from './NewItemButton';
import YearSlider from './YearSlider';
import CategoriesSelect from './CategoriesSelect';
import SortSelect from './SortSelect';
import ModeSelect from './ModeSelect';
import { ReloadOutlined } from '@ant-design/icons';
import { listStore } from 'utils/listStore';
import constants from 'settings/constants';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

interface Props {
	total: number;
}

const Selectors: React.FC<Props> = observer(({ total }) => {
	const { loading } = listStore;
	const { isSmallScreen } = userStore;
	const {
		listOptions,
		resetSettings,
		handlePageChanging,
		setRange,
		setDefaultRange,
		setIsAccurate,
	} = optionsStore;

	const {
		isSortingReversed,
		range,
		defaultRange,
		categoriesToFilter,
		pageSize,
		currentPage,
		sortingAlgorithm,
		isAccurate,
	} = listOptions;

	const isSettingsChanged = useMemo(
		() =>
			isSortingReversed ||
			categoriesToFilter.length > 0 ||
			pageSize !== constants.defaultPageSize ||
			currentPage !== 1 ||
			(range[0] &&
				range[1] &&
				(range[0] !== defaultRange[0] || range[1]) !== defaultRange[1]) ||
			sortingAlgorithm !== 'date',
		[
			range,
			defaultRange,
			isSortingReversed,
			categoriesToFilter,
			pageSize,
			currentPage,
			sortingAlgorithm,
		]
	);

	return (
		<Flex
			vertical
			style={{ inlineSize: '100%' }}
		>
			<Flex
				vertical
				gap={32}
			>
				<Flex
					gap={16}
					vertical={isSmallScreen}
				>
					<Flex gap={16}>
						<NewItemButton />
						<CategoriesSelect />
					</Flex>
					<Flex gap={16}>
						<SortSelect />
						<ModeSelect />
						{isSettingsChanged && (
							<Button
								onClick={resetSettings}
								size={isSmallScreen ? 'small' : 'middle'}
							>
								<ReloadOutlined />
							</Button>
						)}
					</Flex>
				</Flex>
				{!loading && (
					<YearSlider
						setIsAccurate={setIsAccurate}
						isAccurate={isAccurate}
						range={range}
						defaultRange={defaultRange}
						setRange={setRange}
						setDefaultRange={setDefaultRange}
					/>
				)}
			</Flex>
			<Divider />
			{!loading && (
				<Pagination
					style={{ alignSelf: 'center' }}
					size={isSmallScreen ? 'small' : 'default'}
					showSizeChanger
					pageSizeOptions={constants.pageSizeOptions}
					current={listOptions.currentPage}
					pageSize={listOptions.pageSize}
					total={total}
					onChange={handlePageChanging}
					onShowSizeChange={handlePageChanging}
				/>
			)}
		</Flex>
	);
});

export default Selectors;
