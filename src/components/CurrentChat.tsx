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
	useState,
} from 'react';
import { Chat, Message, User } from 'settings/interfaces';
import {
	deleteMessage,
	getChatInfo,
	getChatMessages,
	getUsersInfo,
} from 'utils/community';
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
		const { isSmallScreen } = userStore;
		const { messages, setMessages } = communityStore;

		const [chatInfo, setChatInfo] = useState<Chat['info'] | null>(null);

		const [currentChatMembersInfo, setCurrentChatMembersInfo] = useState<{
			[key: string]: User['info'];
		}>({});

		useEffect(() => {
			getChatInfo(chatId, setChatInfo);
		}, [chatId]);

		useEffect(() => {
			chatInfo && getUsersInfo(chatInfo?.members, setCurrentChatMembersInfo);
		}, [chatInfo?.members, chatInfo]);

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
							chatId={chatId}
							senderInfo={currentChatMembersInfo[messages[key].sender]}
							selected={selected.includes(key)}
							select={selectMessage(key)}
							deselect={deselectMessage(key)}
						/>
					))}
			</Flex>
		);
	}
);

interface ItemProps {
	messageId: string;
	message: Message;
	chatId: string | null;
	senderInfo: User['info'];
	selected: boolean;
	select: () => void;
	deselect: () => void;
}

const MessageItem: React.FC<ItemProps> = observer(
	({ messageId, message, chatId, senderInfo, selected, select, deselect }) => {
		const { isSmallScreen, UID } = userStore;
		const { sender, text, sentAt } = message;

		const isMyMessage = useMemo(() => UID === sender, [UID, sender]);

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
					{MyTitle(senderInfo?.nickname, null, isSmallScreen)}
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
			[isSmallScreen, text, sentAt, isMyMessage, selected, senderInfo]
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
					{MyImage(senderInfo?.image, isSmallScreen)}
				</Flex>
			</Flex>
		);
	}
);

export default CurrentChat;
