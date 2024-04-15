import { Divider, Flex } from 'antd';
import ChatInput from 'components/ChatInput';
import ChatList from 'components/ChatList';
import ChatListHeader from 'components/ChatListHeader';
import CurrentChat from 'components/CurrentChat';
import CurrentChatHeader from 'components/CurrentChatHeader';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef, useState } from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import { userStore } from 'utils/userStore';

const Chats: React.FC = observer(() => {
	const { isSmallScreen } = userStore;

	const scrollbarsRef = useRef<Scrollbars | null>(null);

	const [currentChatId, setCurrentChatId] = useState<string | null>(null);
	const [stuckToBottom, setStuckToBottom] = useState<boolean>(true);
	const [hasNewMessages, setHasNewMessages] = useState<boolean>(false);

	const onUpdate = useCallback(
		(values: positionValues) => {
			console.log(values);
			const flag =
				values.top >= 0.999 || values.clientHeight === values.scrollHeight;
			setStuckToBottom(flag);
			flag && setHasNewMessages(false);
		},
		[setStuckToBottom, setHasNewMessages]
	);

	return (
		<Flex style={{ blockSize: '75dvh' }}>
			{((isSmallScreen && !currentChatId) || !isSmallScreen) && (
				<Flex
					vertical
					style={{ inlineSize: isSmallScreen ? '100%' : '25%' }}
				>
					<ChatListHeader />
					<Scrollbars autoHide>
						<ChatList
							selectedChatId={currentChatId}
							selectChat={setCurrentChatId}
						/>
					</Scrollbars>
				</Flex>
			)}
			{!isSmallScreen && (
				<Divider
					type='vertical'
					style={{ height: 'unset', margin: 0 }}
				/>
			)}
			{(!isSmallScreen || currentChatId) && (
				<Flex
					vertical
					style={{ inlineSize: isSmallScreen ? '100%' : '75%' }}
				>
					<CurrentChatHeader
						chatId={currentChatId}
						setCurrentChatId={setCurrentChatId}
					/>
					<Divider />
					<Scrollbars
						onUpdate={onUpdate}
						autoHide
						ref={scrollbarsRef}
					>
						<CurrentChat
							chatId={currentChatId}
							scrollbarsRef={scrollbarsRef}
							stuck={stuckToBottom}
							setHasNewMessages={setHasNewMessages}
						/>
					</Scrollbars>
					{currentChatId && (
						<ChatInput
							chatId={currentChatId}
							scrollbarsRef={scrollbarsRef}
							stuck={stuckToBottom}
							hasNewMessages={hasNewMessages}
						/>
					)}
				</Flex>
			)}
		</Flex>
	);
});

export default Chats;
