import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented, Tooltip } from 'antd';
import { MenuOutlined, TableOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const ModeSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { listOptions, handleModeChanging, userOptions } = optionsStore;

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={listOptions.mode}
				onChange={handleModeChanging}
				options={[
					{
						label: (
							<Tooltip title={languages.layout.list[userOptions.language]}>
								<MenuOutlined />
							</Tooltip>
						),
						value: 'list',
						disabled: isSmallScreen,
					},
					{
						label: (
							<Tooltip title={languages.layout.grid[userOptions.language]}>
								<TableOutlined />
							</Tooltip>
						),
						value: 'grid',
					},
				]}
			/>
		</Flex>
	);
});

export default ModeSelect;
