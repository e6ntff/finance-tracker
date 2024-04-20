import { Flex, Popconfirm } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MyIcon, MyTitle, addFriendToChatSelect, tooltipTitle } from './Items';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import {
	deleteChat,
	exitFromChat,
	getChatInfo,
	inviteFriendsToChat,
} from 'utils/community';
import {
	ArrowLeftOutlined,
	DeleteOutlined,
	InfoCircleOutlined,
	LogoutOutlined,
	MoreOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import languages from 'settings/languages';
import { communityStore } from 'utils/communityStore';
import { Chat } from 'settings/interfaces';

interface Props {
	chatId: string;
	setCurrentChatId: Dispatch<SetStateAction<string | null>>;
	setSelected: Dispatch<SetStateAction<string[]>>;
}

const CurrentChatHeader: React.FC<Props> = observer(
	({ chatId, setCurrentChatId, setSelected }) => {
		const { userOptions } = optionsStore;
		const { isSmallScreen } = userStore;
		const { myUser } = communityStore;

		const [chatInfo, setChatInfo] = useState<Chat['info']>();

		const { user, id } = myUser;

		const { language } = userOptions;

		useEffect(() => {
			getChatInfo(chatId, setChatInfo);
		}, [chatId]);

		const handleChange = useCallback(
			(
				_: null | string[],
				option:
					| {
							value: string;
							label: string;
					  }
					| {
							value: string;
							label: string;
					  }[]
			) => {
				if (!Array.isArray(option)) option = [option];
				chatId &&
					inviteFriendsToChat(
						chatId,
						option.map(({ value }: { value: string; label: string }) => value)
					);
			},
			[chatId]
		);

		const handleDeleting = useCallback(() => {
			setCurrentChatId(null);
			chatInfo && chatInfo && deleteChat(chatId, chatInfo?.members);
		}, [chatId, chatInfo, setCurrentChatId]);

		const handleExit = useCallback(() => {
			setCurrentChatId(null);
			chatInfo && exitFromChat(id, chatId, chatInfo?.members);
		}, [chatId, chatInfo, setCurrentChatId, id]);

		const chatTitle = useMemo(
			() =>
				MyTitle(
					chatInfo?.title || '',
					null,
					isSmallScreen,
					language,
					false,
					undefined
				),
			[chatInfo, isSmallScreen, language]
		);

		const goBackArrow = useMemo(
			() =>
				MyIcon(ArrowLeftOutlined, isSmallScreen, {
					onClick: () =>
						setSelected((prevSelected: string[]) => {
							if (prevSelected.length) {
								return [];
							}
							setCurrentChatId(null);
							return [];
						}),
				}),
			[isSmallScreen, setCurrentChatId, setSelected]
		);

		const icons = useMemo(
			() => (
				<Flex gap={isSmallScreen ? 4 : 8}>
					{MyIcon(PlusOutlined, isSmallScreen, {
						title: addFriendToChatSelect(
							isSmallScreen,
							handleChange,
							user?.friends,
							null,
							chatInfo
						),
						light: true,
						avatar: true,
						placement: 'bottom',
						trigger: 'click',
					})}
					<Popconfirm
						placement='bottom'
						title={languages.exitChatConfirm[language]}
						onConfirm={handleExit}
					>
						{MyIcon(LogoutOutlined, isSmallScreen, { avatar: true })}
					</Popconfirm>
					<Popconfirm
						placement='bottom'
						title={languages.deleteChatConfirm[language]}
						onConfirm={handleDeleting}
					>
						{MyIcon(DeleteOutlined, isSmallScreen, { avatar: true })}
					</Popconfirm>
					{MyIcon(InfoCircleOutlined, isSmallScreen, {
						title: tooltipTitle(chatInfo?.createdAt, undefined, language),
						placement: 'bottom',
						avatar: true,
					})}
				</Flex>
			),
			[
				chatInfo,
				isSmallScreen,
				language,
				handleDeleting,
				handleChange,
				handleExit,
				user?.friends,
			]
		);

		const moreIcon = useMemo(
			() =>
				MyIcon(MoreOutlined, isSmallScreen, {
					title: icons,
					light: true,
					placement: 'left',
					trigger: 'click',
				}),
			[isSmallScreen, icons]
		);

		return (
			<Flex
				style={{
					inlineSize: '100%',
					paddingInline: isSmallScreen ? '.5em' : '1em',
				}}
				justify='space-between'
			>
				{goBackArrow}
				{chatTitle}
				{chatId && chatInfo && moreIcon}
			</Flex>
		);
	}
);

export default CurrentChatHeader;
