import { CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import Chats from './Chats';
import Friends from './Friends';
import { userStore } from 'utils/userStore';

const Community: React.FC = observer(() => {
	const { userOptions } = optionsStore;
	const { isSmallScreen, UID } = userStore;

	const { language } = userOptions;

	const [activeKey, setActiveKey] = useState<string>('0');

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
		></Tabs>
	);
});

export default Community;
