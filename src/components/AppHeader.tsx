import React from 'react';
import Navigation from './Navigation';
import Links from './Links';
import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import SyncIcon from './SyncIcon';

const AppHeader: React.FC = observer(() => {
	const { isSmallScreen, tourRefs } = userStore;

	return (
		<Flex
			justify='space-between'
			align='center'
		>
			<Navigation />
			<Flex
				ref={tourRefs[9]}
				gap={isSmallScreen ? 8 : 16}
				justify='space-between'
				align='center'
			>
				<SyncIcon />
				<Links />
			</Flex>
		</Flex>
	);
});

export default AppHeader;
