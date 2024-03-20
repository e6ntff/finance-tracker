import React from 'react';
import Navigation from './Navigation';
import Links from './Links';
import LogOutButton from './LogOutButton';
import { Flex, FloatButton } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { BgColorsOutlined } from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';

const AppHeader: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { userOptions, toggleTheme } = optionsStore;
	const { theme } = userOptions;

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
				<LogOutButton />
				<Links />
			</Flex>
			<FloatButton
				type={theme === 'default' ? 'default' : 'primary'}
				onClick={toggleTheme}
				icon={<BgColorsOutlined />}
			/>
		</Flex>
	);
});

export default AppHeader;
