import React from 'react';
import Navigation from './Navigation';
import Links from './Links';
import SignOutButton from './SignOutButton';
import { Flex } from 'antd';
import ThemeCheckbox from './ThemeCheckbox';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';

const AppHeader: React.FC = observer(() => {
	const { isSmallScreen } = userStore;

	return (
		<Flex
			justify='space-between'
			align='center'
		>
			<Navigation />
			<Flex
				gap={isSmallScreen ? 16 : 32}
				justify='space-between'
				align='center'
			>
				<ThemeCheckbox />
				<SignOutButton />
				<Links />
			</Flex>
		</Flex>
	);
});

export default AppHeader;
