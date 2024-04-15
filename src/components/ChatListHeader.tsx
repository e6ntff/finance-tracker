import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MyIconWithTooltip, MyTitle } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { PlusOutlined } from '@ant-design/icons';
import { createChat } from 'utils/community';

const ChatListHeader: React.FC = observer(() => {
	const { userOptions } = optionsStore;
	const { isSmallScreen, user } = userStore;

	return (
		<Flex justify='space-between'>
			{MyTitle(
				languages.chats[userOptions.language],
				null,
				isSmallScreen,
				userOptions.language,
				false
			)}
			{MyIconWithTooltip(
				languages.createChat[userOptions.language],
				isSmallScreen,
				PlusOutlined,
				false,
				() => createChat(user.uid, `chat`)
			)}
		</Flex>
	);
});
export default ChatListHeader;
