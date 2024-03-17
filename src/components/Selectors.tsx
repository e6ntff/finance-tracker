import { Button, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import NewItemButton from './NewItemButton';
import YearSelect from './YearSelect';
import CategoriesSelect from './CategoriesSelect';
import SortSelect from './SortSelect';
import ModeSelect from './ModeSelect';
import { Mode, Options, Sort } from 'settings/interfaces';
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
	isSmallScreen: boolean;
	handleYearChanging: (value: string[]) => void;
	handleCategoriesToFilterChange: (value: number[]) => void;
	handleSortAlgorithmChanging: (value: Sort) => void;
	toggleIsSortingReversed: () => void;
	handleModeChanging: (value: Mode) => void;
	resetSettings: () => void;
	isSettingsChanged: boolean;
	options: Options;
}

const Selectors: React.FC<Props> = observer(
	({
		isSmallScreen,
		handleYearChanging,
		handleCategoriesToFilterChange,
		handleSortAlgorithmChanging,
		toggleIsSortingReversed,
		handleModeChanging,
		resetSettings,
		isSettingsChanged,
		options,
	}) => {
		return (
			<Flex
				style={{ inlineSize: '100%' }}
				gap={16}
				vertical={isSmallScreen}
			>
				<NewItemButton />
				<YearSelect
					values={options.years}
					onChange={handleYearChanging}
				/>
				<CategoriesSelect
					values={options.categoriesToFilter}
					onChange={handleCategoriesToFilterChange}
				/>
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
					<Button onClick={resetSettings}>
						<ReloadOutlined />
					</Button>
				)}
			</Flex>
		);
	}
);

export default Selectors;
