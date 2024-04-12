import React from 'react';
import Navigation from './Navigation';
import Links from './Links';
import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import SyncIcon from './SyncIcon';
import RatesTicker from './RatesTicker';

const AppHeader: React.FC = observer(() => {
	const { isSmallScreen, tourRefs } = userStore;

	return (
		<Flex
			style={{ inlineSize: '100%' }}
			justify='space-between'
			align='center'
			gap={isSmallScreen ? 8 : 16}
		>
			<Navigation />
			{!isSmallScreen && (
				<Flex
					style={{ inlineSize: '25%' }}
					vertical
					align='stretch'
				>
					<RatesTicker />
				</Flex>
			)}
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
