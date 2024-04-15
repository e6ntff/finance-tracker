import { Flex, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Unsubscribe } from 'firebase/database';
import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { Message } from 'settings/interfaces';
import { deleteMessage, getChatMessages } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars';
import { MyIconWithTooltip, MyImage } from './Items';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
	chatId: string | null;
	scrollbarsRef: React.MutableRefObject<Scrollbars | null>;
	stuck: boolean;
	setHasNewMessages: Dispatch<SetStateAction<boolean>>;
}

const CurrentChat: React.FC<Props> = observer(
	({ chatId, scrollbarsRef, stuck, setHasNewMessages }) => {
		const { user, isSmallScreen } = userStore;
		const { messages, setMessages } = communityStore;

		useEffect(() => {
			let unsubscribe: Unsubscribe | undefined = () => {};
			setMessages(null);
			if (chatId) unsubscribe = getChatMessages(chatId, setMessages);
			return () => unsubscribe && unsubscribe();
			// eslint-disable-next-line
		}, [chatId]);

		useEffect(() => {
			scrollbarsRef.current?.scrollToBottom();
			// eslint-disable-next-line
		}, [messages === null]);

		useEffect(() => {
			setHasNewMessages(true);
			stuck && scrollbarsRef.current?.scrollToBottom();
			// eslint-disable-next-line
		}, [messages]);

		return (
			<Flex
				vertical
				gap={isSmallScreen ? 8 : 16}
			>
				{messages &&
					Object.keys(messages).map((key: string) => (
						<MessageItem
							key={key}
							messageId={key}
							message={messages[key]}
							uid={user.uid}
							chatId={chatId}
						/>
					))}
			</Flex>
		);
	}
);

const MessageItem: React.FC<{
	messageId: string;
	message: Message;
	uid: string;
	chatId: string | null;
}> = observer(({ messageId, message, uid, chatId }) => {
	const { isSmallScreen } = userStore;
	const { users } = communityStore;
	const { sender, text } = message;

	const isMyMessage = useMemo(() => uid === sender, [uid, sender]);

	return (
		<Flex
			vertical
			align={isMyMessage ? 'end' : 'start'}
			style={{
				inlineSize: '100%',
			}}
		>
			<Flex
				align='end'
				gap={isSmallScreen ? 2 : 4}
				style={{ flexDirection: isMyMessage ? 'row' : 'row-reverse' }}
			>
				<Flex
					vertical
					gap={isSmallScreen ? 2 : 4}
				>
					<TextArea
						size={isSmallScreen ? 'small' : 'middle'}
						autoSize
						style={{ pointerEvents: 'none', inlineSize: 'min-content' }}
						value={text}
					/>
					<Flex
						justify='space-between'
						style={{ flexDirection: isMyMessage ? 'row' : 'row-reverse' }}
					>
						<Tag>
							<Flex gap={isSmallScreen ? 2 : 4}>
								{dayjs(message.sentAt).format('HH:mm')}
								{isMyMessage &&
									MyIconWithTooltip(
										'',
										isSmallScreen,
										DeleteOutlined,
										false,
										() => deleteMessage(chatId, messageId),
										undefined,
										true
									)}
							</Flex>
						</Tag>
						<Tag>{users[sender].nickname}</Tag>
					</Flex>
				</Flex>
				{MyImage(users[uid]?.image, isSmallScreen)}
			</Flex>
		</Flex>
	);
});

export default CurrentChat;
