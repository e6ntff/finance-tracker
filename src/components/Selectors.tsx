import { Button, Divider, Flex, Pagination } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import NewItemButton from './NewItemButton';
import YearSelect from './YearSelect';
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
	const { listOptions, resetSettings, handlePageChanging } = optionsStore;

	const isSettingsChanged = useMemo(
		() =>
			listOptions.isSortingReversed ||
			listOptions.years.length > 0 ||
			listOptions.categoriesToFilter.length > 0 ||
			listOptions.pageSize !== constants.defaultPageSize ||
			listOptions.currentPage !== 1 ||
			listOptions.sortingAlgorithm !== 'date',
		[listOptions]
	);

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
					<YearSelect />
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
