import { Flex } from 'antd';
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
	useState,
} from 'react';
import { Message } from 'settings/interfaces';
import { deleteMessage, editMessage, getChatMessages } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars';
import { MyIcon, MyTitle } from './Items';
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';

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

		const select = useCallback(
			(key: string) => () => {
				setSelected((prevSelected: string[]) => [...prevSelected, key]);
			},
			[setSelected]
		);

		const deselect = useCallback(
			(key: string) => () => {
				setSelected((prevSelected: string[]) =>
					prevSelected.filter((item: string) => item !== key)
				);
			},
			[setSelected]
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
							message={messages[key]}
							selected={selected.includes(key)}
							select={select(key)}
							deselect={deselect(key)}
							edit={edit(chatId, key)}
							remove={remove(chatId, key)}
						/>
					))}
			</Flex>
		);
	}
);

interface ItemProps {
	message: Message;
	selected: boolean;
	select: () => void;
	deselect: () => void;
	edit: (text: string) => void;
	remove: () => void;
}

const MessageItem: React.FC<ItemProps> = observer(
	({ message, selected, select, deselect, edit, remove }) => {
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
			edit(currentText);
		}, [setEditMode, currentText, edit]);

		const { myUser } = communityStore;

		const { id } = myUser;

		const isMyMessage = useMemo(() => id === sender, [id, sender]);

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLTextAreaElement>) => {
				setCurrentText(event.target.value);
			},
			[setCurrentText]
		);

		const editMessageIcons = useMemo(
			() =>
				editMode ? (
					<Flex>
						{MyIcon(CheckOutlined, isSmallScreen, {
							small: true,
							onClick: exitEditModeWithSubmit,
						})}
						{MyIcon(CloseOutlined, isSmallScreen, {
							small: true,
							onClick: exitEditModeWithCancel,
						})}
					</Flex>
				) : (
					MyIcon(EditOutlined, isSmallScreen, {
						small: true,
						onClick: enterEditMode,
					})
				),
			[
				editMode,
				isSmallScreen,
				exitEditModeWithCancel,
				enterEditMode,
				exitEditModeWithSubmit,
			]
		);

		const deleteMessageIcon = useMemo(
			() =>
				MyIcon(DeleteOutlined, isSmallScreen, {
					small: true,
					onClick: remove,
				}),
			[isSmallScreen, remove]
		);

		const messageArea = useMemo(
			() => (
				<Flex
					vertical
					align={isMyMessage ? 'end' : 'start'}
				>
					{MyTitle(sender, null, isSmallScreen)}
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
				sender,
				currentText,
				handleChange,
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
						<Flex
							justify='space-between'
							style={{ flexDirection: isMyMessage ? 'row' : 'row-reverse' }}
						>
							{isMyMessage && (
								<Flex>
									{editMessageIcons}
									{deleteMessageIcon}
								</Flex>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		);
	}
);

export default CurrentChat;
