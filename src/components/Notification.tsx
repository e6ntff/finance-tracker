import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import constants from 'settings/constants';
import { userStore } from 'utils/userStore';

const Notification: React.FC = observer(() => {
	const [messageApi, contextHolder] = message.useMessage();
	const { notificationStatus } = userStore;

	useEffect(() => {
		if (
			(notificationStatus.status === 'error' ||
				notificationStatus.status === 'success') &&
			notificationStatus.text
		) {
			messageApi.open({
				type: notificationStatus.status,
				content: <>{notificationStatus.text}</>,
				duration: constants.errorDelay / 1000,
			});
		}
		// eslint-disable-next-line
	}, [notificationStatus]);

	return contextHolder;
});

export default Notification;
