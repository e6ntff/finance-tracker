import React from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented } from 'antd';
import { MenuOutlined, TableOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';

const ModeSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { listOptions, handleModeChanging } = optionsStore;

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
					{ label: <MenuOutlined />, value: 'list', disabled: isSmallScreen },
					{ label: <TableOutlined />, value: 'grid' },
				]}
			/>
		</Flex>
	);
});

export default ModeSelect;
