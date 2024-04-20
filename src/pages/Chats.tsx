import { Flex } from 'antd';
import ChatList from 'components/ChatList';
import ChatListHeader from 'components/ChatListHeader';
import CurrentChat from 'components/CurrentChat';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

const Chats: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { communityOptions, setLastSelectedChatId } = optionsStore;

	const { lastSelectedChatId } = communityOptions;

	const [currentChatId, setCurrentChatId] = useState<string | null>(
		lastSelectedChatId
	);

	useEffect(() => {
		setLastSelectedChatId(currentChatId);
		// eslint-disable-next-line
	}, [currentChatId]);

	const chatList = useMemo(
		() => (
			<Flex
				vertical
				style={{
					inlineSize: currentChatId ? (isSmallScreen ? '100%' : '25%') : '100%',
				}}
			>
				<ChatListHeader />
				<Scrollbars autoHide>
					<ChatList
						selectedChatId={currentChatId}
						setCurrentChatId={setCurrentChatId}
					/>
				</Scrollbars>
			</Flex>
		),
		[setCurrentChatId, currentChatId, isSmallScreen]
	);

	return (
		<Flex style={{ blockSize: '75dvh' }}>
			{((isSmallScreen && !currentChatId) || !isSmallScreen) && chatList}
			{currentChatId && (
				<CurrentChat
					chatId={currentChatId}
					setChatId={setCurrentChatId}
				/>
			)}
		</Flex>
	);
});

export default Chats;
