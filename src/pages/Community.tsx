import { CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import Chats from './Chats';
import Friends from './Friends';
import { userStore } from 'utils/userStore';
import { communityStore } from 'utils/communityStore';
import { checkOnline } from 'utils/community';
import { Unsubscribe } from 'firebase/auth';

const Community: React.FC = observer(() => {
	const { userOptions } = optionsStore;
	const { isSmallScreen } = userStore;
	const {
		myUser,
		setOnlineFriend,
		clearOnlineFriends,
		messages,
		setChatUpdates,
	} = communityStore;

	const { language } = userOptions;

	const { id } = myUser;

	const [activeKey, setActiveKey] = useState<string>('0');

	useEffect(() => {
		const unsubscribes: (Unsubscribe | undefined)[] = [];
		Object.keys(myUser.user.friends).forEach((id: string) => {
			unsubscribes.push(checkOnline(id, setOnlineFriend));
		});

		return () => {
			unsubscribes.forEach(
				(unsubscribe: Unsubscribe | undefined) => unsubscribe && unsubscribe()
			);
			clearOnlineFriends();
		};
	}, [clearOnlineFriends, setOnlineFriend, myUser.user.friends]);

	const newMessages: number = useMemo(
		() =>
			messages &&
			Object.keys(messages).reduce(
				(acc: number, key: string) =>
					(messages[key]?.seenBy &&
						Object.keys(messages[key].seenBy).includes(id)) ||
					messages[key].sender === id
						? acc
						: acc + 1,
				0
			),
		[messages, id]
	);

	useEffect(() => {
		setChatUpdates(newMessages);
		// eslint-disable-next-line
	}, [newMessages]);

	return (
		<Tabs
			size={isSmallScreen ? 'small' : 'middle'}
			tabPosition={isSmallScreen ? 'top' : 'left'}
			activeKey={activeKey}
			destroyInactiveTabPane
			onChange={setActiveKey}
			items={[
				{
					key: '0',
					label: languages.chats[language],
					icon: <CommentOutlined />,
					children: <Chats />,
				},
				{
					key: '1',
					label: languages.friends[language],
					icon: <TeamOutlined />,
					children: <Friends />,
				},
			]}
		/>
	);
});

export default Community;
