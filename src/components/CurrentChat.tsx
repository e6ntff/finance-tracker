import { Divider, Flex } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Unsubscribe } from 'firebase/database';
import { observer } from 'mobx-react-lite';
import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Message } from 'settings/interfaces';
import { deleteMessage, editMessage, getChatMessages } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import { MyIcon, MyTitle } from './Items';
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	HeartFilled,
} from '@ant-design/icons';
import ChatInput from './ChatInput';
import CurrentChatHeader from './CurrentChatHeader';

interface Props {
	chatId: string;
	setChatId: Dispatch<SetStateAction<string | null>>;
}

const CurrentChat: React.FC<Props> = observer(({ chatId, setChatId }) => {
	const { isSmallScreen } = userStore;
	const { messages, setMessages, onlineFriends } = communityStore;

	const scrollbarsRef = useRef<Scrollbars | null>(null);

	const [stuckToBottom, setStuckToBottom] = useState<boolean>(true);
	const [hasNewMessages, setHasNewMessages] = useState<boolean>(false);

	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

	const onUpdate = useCallback(
		(values: positionValues) => {
			const stuck =
				values.top >= 0.99 || values.clientHeight === values.scrollHeight;
			setStuckToBottom(stuck);
			stuck && setHasNewMessages(false);
		},
		[setStuckToBottom, setHasNewMessages]
	);

	const select = useCallback(
		(key: string) => () => {
			setSelectedMessages((prevSelected: string[]) => [...prevSelected, key]);
		},
		[setSelectedMessages]
	);

	const deselect = useCallback(
		(key: string) => () => {
			setSelectedMessages((prevSelected: string[]) =>
				prevSelected.filter((item: string) => item !== key)
			);
		},
		[setSelectedMessages]
	);

	const edit = useCallback(
		(chatId: string | null, messageId: string) => (text: string) =>
			editMessage(chatId, messageId, text),
		[]
	);

	const remove = useCallback(
		(chatId: string | null, messageId: string) => () =>
			deleteMessage(chatId, messageId),
		[]
	);

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined = () => {};
		setMessages({});
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
		stuckToBottom && scrollbarsRef.current?.scrollToBottom();
		// eslint-disable-next-line
	}, [messages]);

	return (
		<>
			{!isSmallScreen && (
				<Divider
					type='vertical'
					style={{ height: 'unset', margin: 0 }}
				/>
			)}
			<Flex
				vertical
				style={{ inlineSize: isSmallScreen ? '100%' : '75%', padding: '1em' }}
			>
				<CurrentChatHeader
					setSelected={setSelectedMessages}
					chatId={chatId}
					setCurrentChatId={setChatId}
				/>
				<Divider />
				<Scrollbars
					onUpdate={onUpdate}
					autoHide
					ref={scrollbarsRef}
				>
					<Flex
						vertical
						gap={isSmallScreen ? 8 : 16}
					>
						{messages &&
							Object.keys(messages).map((key: string) => (
								<MessageItem
									key={key}
									message={messages[key]}
									selected={selectedMessages.includes(key)}
									online={onlineFriends[messages[key].sender]}
									select={select(key)}
									deselect={deselect(key)}
									edit={edit(chatId, key)}
									remove={remove(chatId, key)}
								/>
							))}
					</Flex>
				</Scrollbars>
				<ChatInput
					chatId={chatId}
					scrollbarsRef={scrollbarsRef}
					stuck={stuckToBottom}
					hasNewMessages={hasNewMessages}
				/>
			</Flex>
		</>
	);
});

interface ItemProps {
	message: Message;
	selected: boolean;
	online: boolean;
	select: () => void;
	deselect: () => void;
	edit: (text: string) => void;
	remove: () => void;
}

const MessageItem: React.FC<ItemProps> = observer(
	({ message, selected, online, select, deselect, edit, remove }) => {
		const { isSmallScreen } = userStore;
		const { sender, text, sentAt } = message;

		const [editMode, setEditMode] = useState<boolean>(false);

		const [currentText, setCurrentText] = useState<string>(text);

		useEffect(() => {
			setCurrentText(text);
		}, [text]);

		const enterEditMode = useCallback(() => {
			setEditMode(true);
		}, [setEditMode]);

		const exitEditModeWithCancel = useCallback(() => {
			setEditMode(false);
			setCurrentText(text);
		}, [setEditMode, text]);

		const exitEditModeWithSubmit = useCallback(() => {
			setEditMode(false);
			currentText !== text && edit(currentText);
		}, [setEditMode, currentText, edit, text]);

		const { myUser } = communityStore;

		const { id } = myUser;

		const isMyMessage = useMemo(() => id === sender, [id, sender]);

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLTextAreaElement>) => {
				setCurrentText(event.target.value);
			},
			[setCurrentText]
		);

		const submitIcon = useMemo(
			() =>
				MyIcon(CheckOutlined, isSmallScreen, {
					small: true,
					onClick: exitEditModeWithSubmit,
				}),
			[exitEditModeWithSubmit, isSmallScreen]
		);

		const cancelIcon = useMemo(
			() =>
				MyIcon(CloseOutlined, isSmallScreen, {
					small: true,
					onClick: exitEditModeWithCancel,
				}),
			[exitEditModeWithCancel, isSmallScreen]
		);

		const editIcon = useMemo(
			() =>
				MyIcon(EditOutlined, isSmallScreen, {
					small: true,
					onClick: enterEditMode,
				}),
			[enterEditMode, isSmallScreen]
		);

		const editMessageIcons = useMemo(
			() =>
				editMode ? (
					<Flex>
						{submitIcon}
						{cancelIcon}
					</Flex>
				) : (
					editIcon
				),
			[editMode, submitIcon, cancelIcon, editIcon]
		);

		const deleteMessageIcon = useMemo(
			() =>
				MyIcon(DeleteOutlined, isSmallScreen, {
					small: true,
					onClick: remove,
				}),
			[isSmallScreen, remove]
		);

		const onlineDot = useMemo(
			() => (
				<HeartFilled
					style={{
						color: '#f00',
						fontSize: isSmallScreen ? '.33em' : '.5em',
					}}
				/>
			),
			[isSmallScreen]
		);

		const titleWithDot = useMemo(
			() => (
				<Flex
					align='center'
					gap={isSmallScreen ? 2 : 4}
					style={{ flexDirection: isMyMessage ? 'row' : 'row-reverse' }}
				>
					{online && onlineDot}
					{MyTitle(sender, null, isSmallScreen)}
				</Flex>
			),
			[sender, isSmallScreen, isMyMessage, onlineDot, online]
		);

		const icons = useMemo(
			() => (
				<Flex>
					{editMessageIcons}
					{!editMode && deleteMessageIcon}
				</Flex>
			),
			[editMessageIcons, deleteMessageIcon, editMode]
		);

		const messageArea = useMemo(
			() => (
				<Flex
					vertical
					align={isMyMessage ? 'end' : 'start'}
				>
					{titleWithDot}
					<TextArea
						variant={editMode ? 'outlined' : 'filled'}
						size={isSmallScreen ? 'small' : 'middle'}
						autoSize
						showCount={{ formatter: () => dayjs(sentAt).format('HH:mm') }}
						styles={{ count: { marginInlineEnd: 'auto' } }}
						style={{
							pointerEvents: editMode ? 'auto' : 'none',
							background: selected ? '#0003' : '',
						}}
						value={currentText}
						onChange={handleChange}
					/>
				</Flex>
			),
			[
				editMode,
				isSmallScreen,
				sentAt,
				isMyMessage,
				selected,
				currentText,
				handleChange,
				titleWithDot,
			]
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
						{isMyMessage && icons}
					</Flex>
				</Flex>
			</Flex>
		);
	}
);

export default CurrentChat;
