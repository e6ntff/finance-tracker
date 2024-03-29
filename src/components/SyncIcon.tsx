import { SyncOutlined } from '@ant-design/icons';
import { Avatar, Badge, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

const SyncIcon: React.FC = observer(() => {
	const { notificationStatus, isDataChanged, isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	const status = useMemo(() => {
		if (notificationStatus.status === 'error') {
			return 'error';
		} else if (isDataChanged) {
			return 'processing';
		} else if (notificationStatus.status === 'success') {
			return 'success';
		} else return undefined;
	}, [notificationStatus, isDataChanged]);

	return (
		<Badge
			size={isSmallScreen ? 'small' : 'default'}
			status={status}
			offset={[-5, 20]}
			dot={notificationStatus.status !== 'loading'}
		>
			<Tooltip title={status && languages[status][userOptions.language]}>
				<Avatar
					style={{ background: '#0000' }}
					size={isSmallScreen ? 'small' : 'default'}
					icon={<SyncOutlined spin={notificationStatus.status === 'loading'} />}
				/>
			</Tooltip>
		</Badge>
	);
});

export default SyncIcon;
