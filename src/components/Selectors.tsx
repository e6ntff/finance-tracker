import { Button, Divider, Flex, Pagination } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { memo, useMemo } from 'react';
import NewItemButton from './NewItemButton';
import YearSlider from './YearSlider';
import CategoriesSelect from './CategoriesSelect';
import SortSelect from './SortSelect';
import ModeSelect from './ModeSelect';
import { ReloadOutlined } from '@ant-design/icons';
import constants from 'settings/constants';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

interface Props {
	total: number;
}

const Selectors: React.FC<Props> = observer(({ total }) => {
	const { isSmallScreen, loading } = userStore;
	const {
		listOptions,
		defaultRange,
		resetListOptions: resetSettings,
		handlePageChanging,
		setRange,
		setIsAccurate,
	} = optionsStore;

	const {
		isSortingReversed,
		range,
		categoriesToFilterIds,
		pageSize,
		currentPage,
		sortingAlgorithm,
		isAccurate,
	} = listOptions;

	const isSettingsChanged = useMemo(
		() =>
			isSortingReversed ||
			categoriesToFilterIds.length > 0 ||
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
			categoriesToFilterIds,
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
						<Button
							disabled={!isSettingsChanged}
							onClick={resetSettings}
							size={isSmallScreen ? 'small' : 'middle'}
						>
							<ReloadOutlined />
						</Button>
					</Flex>
				</Flex>
				<YearSlider
					setIsAccurate={setIsAccurate}
					isAccurate={isAccurate}
					range={range}
					setRange={setRange}
				/>
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

export default memo(Selectors);
