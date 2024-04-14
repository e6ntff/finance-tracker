import { observer } from 'mobx-react-lite';
import React from 'react';
import UserSelect from './UserSelect';
import { Flex } from 'antd';

const UsersList: React.FC = observer(() => {
	return (
		<Flex
			vertical
			align='end'
		>
			<UserSelect />
		</Flex>
	);
});

export default UsersList;
