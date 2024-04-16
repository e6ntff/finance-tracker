import { Flex } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Unsubscribe } from 'firebase/database';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { Message } from 'settings/interfaces';
import { deleteMessage, getChatMessages } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars';
import { MyIcon, MyImage, MyTitle } from './Items';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
	chatId: string | null;
	scrollbarsRef: React.MutableRefObject<Scrollbars | null>;
	stuck: boolean;
	setHasNewMessages: Dispatch<SetStateAction<boolean>>;
	selected: string[];
	setSelected: Dispatch<SetStateAction<string[]>>;
}

const CurrentChat: React.FC<Props> = observer(
	({
		chatId,
		scrollbarsRef,
		stuck,
		setHasNewMessages,
		setSelected,
		selected,
	}) => {
		const { user, isSmallScreen } = userStore;
		const { messages, setMessages } = communityStore;

		const selectMessage = useCallback(
			(key: string) => () => {
				setSelected((prevSelected: string[]) => [...prevSelected, key]);
			},
			[setSelected]
		);

		const deselectMessage = useCallback(
			(key: string) => () => {
				setSelected((prevSelected: string[]) =>
					prevSelected.filter((item: string) => item !== key)
				);
			},
			[setSelected]
		);

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
							selected={selected.includes(key)}
							select={selectMessage(key)}
							deselect={deselectMessage(key)}
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
	selected: boolean;
	select: () => void;
	deselect: () => void;
}> = observer(
	({ messageId, message, uid, chatId, selected, select, deselect }) => {
		const { isSmallScreen } = userStore;
		const { users } = communityStore;
		const { sender, text, sentAt } = message;

		const isMyMessage = useMemo(() => uid === sender, [uid, sender]);

		const deleteMessageIcon = useMemo(
			() =>
				MyIcon(DeleteOutlined, isSmallScreen, {
					small: true,
					onClick: () => deleteMessage(chatId, messageId),
				}),
			[isSmallScreen, chatId, messageId]
		);

		const messageArea = useMemo(
			() => (
				<Flex
					vertical
					align={isMyMessage ? 'end' : 'start'}
				>
					{MyTitle(users[sender].nickname, null, isSmallScreen)}
					<TextArea
						variant='filled'
						size={isSmallScreen ? 'small' : 'middle'}
						autoSize
						minLength={5}
						showCount={{ formatter: () => dayjs(sentAt).format('HH:mm') }}
						style={{
							pointerEvents: 'none',
							background: selected ? '#0003' : '',
						}}
						value={text}
						prefix='sd'
					/>
				</Flex>
			),
			[isSmallScreen, text, sentAt, users, sender, isMyMessage, selected]
		);

		return (
			<Flex
				onContextMenu={selected ? deselect : select}
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
						{messageArea}
						<Flex
							justify='space-between'
							style={{ flexDirection: isMyMessage ? 'row' : 'row-reverse' }}
						>
							{isMyMessage && deleteMessageIcon}
						</Flex>
					</Flex>
					{MyImage(users[uid]?.image, isSmallScreen)}
				</Flex>
			</Flex>
		);
	}
);

export default CurrentChat;
