import React from 'react';
import Navigation from './Navigation';
import Links from './Links';
import LogOutButton from './LogOutButton';
import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import SyncIcon from './SyncIcon';
import RandomizeButton from './RandomizeButton';

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
				gap={isSmallScreen ? 16 : 32}
				justify='space-between'
				align='center'
			>
				<RandomizeButton />
				<SyncIcon />
				<LogOutButton />
				<Links />
			</Flex>
		</Flex>
	);
});

export default AppHeader;
