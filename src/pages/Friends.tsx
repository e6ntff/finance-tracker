import { Flex } from 'antd';
import UserSelect from 'components/UserSelect';
import UsersList from 'components/UsersList';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { userStore } from 'utils/userStore';

const Friends: React.FC = observer(() => {
	const { isSmallScreen } = userStore;

	return (
		<Flex
			vertical
			align='center'
		>
			<Flex
				style={{ inlineSize: '100%' }}
				gap={isSmallScreen ? 8 : 16}
				justify='space-between'
				align='start'
			>
				<UsersList />
				{!isSmallScreen && <UserSelect />}
			</Flex>
		</Flex>
	);
});

export default Friends;
