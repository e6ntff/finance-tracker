import { Flex, Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import { MyIcon, MyTitle, addFriendToChatSelect } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { createChat } from 'utils/community';
import { communityStore } from 'utils/communityStore';

const ChatListHeader: React.FC = observer(() => {
	const { userOptions } = optionsStore;
	const { isSmallScreen, user } = userStore;
	const { language } = userOptions;
	const { friends, users } = communityStore;

	const [newChat, setNewChat] = useState<{ title: string; users: string[] }>({
		title: '',
		users: [],
	});

	const handleTitleChange = useCallback(
		(event: any) => {
			setNewChat((prevChat: { title: string; users: string[] }) => ({
				...prevChat,
				title: event.target.value,
			}));
		},
		[setNewChat]
	);

	const handleUsersChange = useCallback(
		(
			_: null | string[],
			option:
				| {
						value: string;
						label: any;
				  }
				| {
						value: string;
						label: any;
				  }[]
		) => {
			setNewChat((prevChat: { title: string; users: string[] }) => ({
				...prevChat,
				users: [
					...prevChat.users,
					!Array.isArray(option) ? option.value : option[0].value,
				],
			}));
		},
		[]
	);

	const addChatForm = useMemo(
		() => (
			<Form
				size={isSmallScreen ? 'small' : 'middle'}
				layout='vertical'
			>
				<Form.Item label={languages.title[language]}>
					<Input
						required
						value={newChat.title}
						onInput={handleTitleChange}
					/>
				</Form.Item>
				<Form.Item>
					{addFriendToChatSelect(
						isSmallScreen,
						handleUsersChange,
						friends,
						users,
						newChat.users
					)}
				</Form.Item>
				<Flex justify='space-between'>
					<Form.Item>
						{MyIcon(CloseOutlined, isSmallScreen, false, () =>
							setNewChat({ title: '', users: [] })
						)}
					</Form.Item>
					<Form.Item>
						{MyIcon(CheckOutlined, isSmallScreen, false, () =>
							createChat(user.uid, newChat.title, newChat.users)
						)}
					</Form.Item>
				</Flex>
			</Form>
		),
		[
			isSmallScreen,
			friends,
			handleTitleChange,
			handleUsersChange,
			newChat,
			language,
			user.uid,
			users,
		]
	);

	return (
		<Flex justify='space-between'>
			{MyTitle(languages.chats[language], null, isSmallScreen, language, false)}
			{MyIcon(
				PlusOutlined,
				isSmallScreen,
				false,
				undefined,
				addChatForm,
				true,
				'bottom',
				'click'
			)}
		</Flex>
	);
});
export default ChatListHeader;
