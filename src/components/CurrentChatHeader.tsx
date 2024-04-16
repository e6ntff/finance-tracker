import { Flex, Popconfirm, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MyIcon, MyTitle } from './Items';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { deleteChat, getChatInfo, inviteFriendsToChat } from 'utils/community';
import { Chat } from 'settings/interfaces';
import {
	ArrowLeftOutlined,
	DeleteOutlined,
	LogoutOutlined,
	MoreOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import languages from 'settings/languages';
import { communityStore } from 'utils/communityStore';

interface Props {
	chatId: string;
	setCurrentChatId: Dispatch<SetStateAction<string | null>>;
}

const CurrentChatHeader: React.FC<Props> = observer(
	({ chatId, setCurrentChatId }) => {
		const { userOptions } = optionsStore;
		const { isSmallScreen } = userStore;
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
				_: null,
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

		const addFriendToChatSelect = useMemo(
			() => (
				<Select
					size={isSmallScreen ? 'small' : 'middle'}
					labelInValue
					onChange={handleChange}
					showSearch
					value={null}
					style={{ inlineSize: isSmallScreen ? '10em' : '15em' }}
					options={Object.keys(friends)
						.filter(
							(key: string) =>
								chatInfo.members &&
								!Object.keys(chatInfo?.members).includes(key)
						)
						.map((key: string) => ({
							value: key,
							label: users[key].nickname,
						}))}
				/>
			),
			[isSmallScreen, handleChange, chatInfo, users, friends]
		);

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
				MyIcon(ArrowLeftOutlined, isSmallScreen, false, () =>
					setCurrentChatId(null)
				),
			[isSmallScreen, setCurrentChatId]
		);

		const icons = useMemo(
			() => (
				<Flex gap={isSmallScreen ? 8 : 16}>
					{MyIcon(
						PlusOutlined,
						isSmallScreen,
						true,
						undefined,
						addFriendToChatSelect,
						false,
						'bottom',
						'click'
					)}
					<Popconfirm
						title={languages.deleteChatConfirm[language]}
						onConfirm={handleDeleting}
					>
						{MyIcon(DeleteOutlined, isSmallScreen, false)}
					</Popconfirm>
					<Popconfirm
						title={languages.exitChatConfirm[language]}
						onConfirm={handleDeleting}
					>
						{MyIcon(LogoutOutlined, isSmallScreen, false)}
					</Popconfirm>
					{MyIcon(
						MoreOutlined,
						isSmallScreen,
						false,
						undefined,
						<></>,
						false,
						'bottom',
						'contextMenu'
					)}
				</Flex>
			),
			[isSmallScreen, language, handleDeleting, addFriendToChatSelect]
		);

		return (
			<Flex
				style={{ inlineSize: '100%' }}
				justify='space-between'
			>
				{goBackArrow}
				{chatTitle}
				{chatId && chatInfo && icons}
			</Flex>
		);
	}
);

export default CurrentChatHeader;
