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
import { Chat } from 'settings/interfaces';
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

interface Props {
	chatId: string;
	setCurrentChatId: Dispatch<SetStateAction<string | null>>;
	setSelected: Dispatch<SetStateAction<string[]>>;
}

const CurrentChatHeader: React.FC<Props> = observer(
	({ chatId, setCurrentChatId, setSelected }) => {
		const { userOptions } = optionsStore;
		const { isSmallScreen, user } = userStore;
		const { friends, users } = communityStore;

		const { language } = userOptions;

		const [chatInfo, setChatInfo] = useState<Chat['info']>({
			title: '',
			createdAt: 0,
			members: {},
		});

		useEffect(() => {
			chatId && getChatInfo(chatId, setChatInfo);
			// eslint-disable-next-line
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
			deleteChat(chatId, chatInfo?.members as Chat['info']['members']);
		}, [chatId, chatInfo, setCurrentChatId]);

		const handleExit = useCallback(() => {
			setCurrentChatId(null);
			exitFromChat(
				user.uid,
				chatId,
				chatInfo?.members as Chat['info']['members']
			);
		}, [user.uid, chatId, chatInfo, setCurrentChatId]);

		const chatTitle = useMemo(
			() =>
				MyTitle(
					chatInfo?.title as string,
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
				<Flex
					vertical
					gap={isSmallScreen ? 4 : 8}
				>
					{MyIcon(PlusOutlined, isSmallScreen, {
						title: addFriendToChatSelect(
							isSmallScreen,
							handleChange,
							friends,
							users,
							null,
							chatInfo
						),
						light: true,
						avatar: true,
						placement: 'left',
						trigger: 'click',
					})}
					<Popconfirm
						title={languages.exitChatConfirm[language]}
						onConfirm={handleExit}
					>
						{MyIcon(LogoutOutlined, isSmallScreen, { avatar: true })}
					</Popconfirm>
					<Popconfirm
						title={languages.deleteChatConfirm[language]}
						onConfirm={handleDeleting}
					>
						{MyIcon(DeleteOutlined, isSmallScreen, { avatar: true })}
					</Popconfirm>
					{MyIcon(InfoCircleOutlined, isSmallScreen, {
						title: tooltipTitle(chatInfo.createdAt, undefined, language),
						placement: 'left',
						avatar: true,
					})}
				</Flex>
			),
			[
				chatInfo,
				isSmallScreen,
				language,
				handleDeleting,
				friends,
				handleChange,
				users,
				handleExit,
			]
		);

		const moreIcon = useMemo(
			() =>
				MyIcon(MoreOutlined, isSmallScreen, {
					title: icons,
					light: true,
					placement: 'bottom',
					trigger: 'click',
				}),
			[isSmallScreen, icons]
		);

		return (
			<Flex
				style={{ inlineSize: '100%' }}
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
