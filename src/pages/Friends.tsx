import UsersList from 'components/UsersList';
import { observer } from 'mobx-react-lite';
import React from 'react';

const Friends: React.FC = observer(() => {
	return <UsersList />;
});

export default Friends;
