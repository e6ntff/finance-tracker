import { SyncOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { userStore } from 'utils/userStore';

const SyncIcon: React.FC = observer(() => {
	const { notificationStatus, recentChanges, isSmallScreen } = userStore;

	return (
		<Badge
			size={isSmallScreen ? 'small' : 'default'}
			count={recentChanges}
		>
			<Avatar
				style={{ background: '#0000' }}
				size={isSmallScreen ? 'small' : 'default'}
				icon={<SyncOutlined spin={notificationStatus === 'loading'} />}
			/>
		</Badge>
	);
});

export default SyncIcon;
