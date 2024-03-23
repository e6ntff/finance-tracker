import { Button, message } from 'antd';
import { ArgsProps } from 'antd/es/message';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Status } from 'settings/interfaces';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

const Notification: React.FC = observer(() => {
	const [messageApi, contextHolder] = message.useMessage();
	const { notificationStatus } = userStore;
	const { userOptions } = optionsStore;

	const notifications: { [key: string]: ArgsProps } = {
		success: {
			type: 'success',
			content: <>{languages.success[userOptions.language]}</>,
			duration: 1,
		},
		error: {
			type: 'error',
			content: <>{languages.error[userOptions.language]}</>,
			duration: 1,
		},
		loading: {
			type: 'loading',
			content: <>{languages.loading[userOptions.language]}</>,
			duration: 1,
		},
	};

	useEffect(() => {
		if (notificationStatus) {
			messageApi.open(notifications[notificationStatus as string]);
		}
	}, [notificationStatus]);

	return contextHolder;
});

export default Notification;
