import { CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
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
	const { myUser, setOnlineFriend, clearOnlineFriends } = communityStore;

	const { language } = userOptions;

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
