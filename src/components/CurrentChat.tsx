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
import {
	deleteMessage,
	editMessage,
	getChatMessages,
	viewMessage,
} from 'utils/community';
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
	EyeOutlined,
	HeartFilled,
} from '@ant-design/icons';
import ChatInput from './ChatInput';
import CurrentChatHeader from './CurrentChatHeader';
import { useInView } from 'react-intersection-observer';

interface Props {
	chatId: string;
	setChatId: Dispatch<SetStateAction<string | null>>;
}

const CurrentChat: React.FC<Props> = observer(({ chatId, setChatId }) => {
	const { isSmallScreen } = userStore;
	const { messages, setMessages, onlineFriends, myUser } = communityStore;

	const { id } = myUser;

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

	const view = useCallback(
		(messageId: string) => () => {
			viewMessage(chatId, messageId, id);
		},
		[chatId, id]
	);

	const edit = useCallback(
		(messageId: string) => (text: string) =>
			editMessage(chatId, messageId, text),
		[chatId]
	);

	const remove = useCallback(
		(messageId: string) => () => deleteMessage(chatId, messageId),
		[chatId]
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
									view={view(key)}
									edit={edit(key)}
									remove={remove(key)}
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
	view: () => void;
	edit: (text: string) => void;
	remove: () => void;
}

const MessageItem: React.FC<ItemProps> = observer(
	({ message, selected, online, select, deselect, view, edit, remove }) => {
		const { isSmallScreen } = userStore;
		const { sender, text, sentAt } = message;

		const { myUser } = communityStore;

		const { id } = myUser;

		const [editMode, setEditMode] = useState<boolean>(false);

		const [currentText, setCurrentText] = useState<string>(text);

		const { ref, inView } = useInView();

		const isMyMessage = useMemo(() => id === sender, [id, sender]);

		useEffect(() => {
			inView && !isMyMessage && view();
			// eslint-disable-next-line
		}, [inView, isMyMessage]);

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

		const seenByIcon = useMemo(() => {
			const members =
				message.seenBy &&
				Object.keys(message.seenBy).map((item: string) => (
					<p key={item}>{item}</p>
				));

			if (!message.seenBy) return <></>;

			return MyIcon(EyeOutlined, isSmallScreen, {
				small: true,
				title: <Flex vertical>{members}</Flex>,
				placement: 'left',
			});
		}, [message.seenBy, isSmallScreen]);

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
					{!editMode && seenByIcon}
					{editMessageIcons}
					{!editMode && deleteMessageIcon}
				</Flex>
			),
			[editMessageIcons, deleteMessageIcon, editMode, seenByIcon]
		);

		const messageArea = useMemo(
			() => (
				<Flex
					ref={ref}
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
				ref,
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
