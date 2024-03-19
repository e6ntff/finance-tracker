import { Button, Divider, Flex, Pagination } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import NewItemButton from './NewItemButton';
import YearSelect from './YearSelect';
import CategoriesSelect from './CategoriesSelect';
import SortSelect from './SortSelect';
import ModeSelect from './ModeSelect';
import { Mode, Options, Sort } from 'settings/interfaces';
import { ReloadOutlined } from '@ant-design/icons';
import { listStore } from 'utils/listStore';
import constants from 'settings/constants';

interface Props {
	isSmallScreen: boolean;
	isSettingsChanged: boolean;
	filteredListLength: number;
	options: Options;
	handlers: {
		handleYearChanging: (value: string[]) => void;
		handleCategoriesToFilterChange: (value: number[]) => void;
		handleSortAlgorithmChanging: (value: Sort) => void;
		toggleIsSortingReversed: () => void;
		handleModeChanging: (value: Mode) => void;
		resetSettings: () => void;
		handlePageChanging: (arg0: number, arg1: number) => void;
	};
}

const Selectors: React.FC<Props> = observer(
	({
		isSmallScreen,
		handlers,
		isSettingsChanged,
		filteredListLength,
		options,
	}) => {
		const { loading } = listStore;
		const {
			handleYearChanging,
			handleCategoriesToFilterChange,
			handleSortAlgorithmChanging,
			toggleIsSortingReversed,
			handleModeChanging,
			resetSettings,
			handlePageChanging,
		} = handlers;

		return (
			<Flex
				style={{ inlineSize: '100%' }}
				vertical
				gap={16}
			>
				<Flex
					style={{ inlineSize: '100%' }}
					gap={16}
					vertical={isSmallScreen}
				>
					<Flex gap={16}>
						<NewItemButton />
						<YearSelect
							values={options.years}
							onChange={handleYearChanging}
						/>
						<CategoriesSelect
							values={options.categoriesToFilter}
							onChange={handleCategoriesToFilterChange}
						/>
					</Flex>
					<Flex gap={16}>
						<SortSelect
							value={options.sortingAlgorithm}
							onChange={handleSortAlgorithmChanging}
							isSortingReversed={options.isSortingReversed}
							toggleIsSortingReversed={toggleIsSortingReversed}
						/>
						<ModeSelect
							value={options.mode}
							onChange={handleModeChanging}
						/>
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
				<Divider />
				{!loading && (
					<Pagination
						style={{ alignSelf: 'center' }}
						size={isSmallScreen ? 'small' : 'default'}
						showSizeChanger
						pageSizeOptions={constants.pageSizeOptions}
						current={options.currentPage}
						pageSize={options.pageSize}
						total={filteredListLength}
						onChange={handlePageChanging}
						onShowSizeChange={handlePageChanging}
					/>
				)}
			</Flex>
		);
	}
);

export default Selectors;
