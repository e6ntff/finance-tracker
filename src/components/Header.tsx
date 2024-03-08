import React from 'react';
import Navigation from './Navigation';
import Links from './Links';
import SignOutButton from './SignOutButton';
import { Flex } from 'antd';
import ThemeCheckbox from './ThemeCheckbox';

const AppHeader: React.FC = () => {
	return (
		<Flex
			justify='space-between'
			align='center'
		>
			<Navigation />
			<Flex
				gap={32}
				justify='space-between'
				align='center'
			>
				<ThemeCheckbox />
				<SignOutButton />
				<Links />
			</Flex>
		</Flex>
	);
};

export default AppHeader;
