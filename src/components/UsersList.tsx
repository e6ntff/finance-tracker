import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import UserModeSelect from './UserModeSelect';
import { UserMode } from 'settings/interfaces';
import { communityStore } from 'utils/communityStore';
import { Col, Flex, List, Popconfirm } from 'antd';
import { userStore } from 'utils/userStore';
import Item from 'antd/es/list/Item';
import { MyIcon } from './Items';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import {
	acceptRequest,
	cancelRequest,
	declineRequest,
	removeFriend,
} from 'utils/community';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const UsersList: React.FC = observer(() => {
	const { isSmallScreen, user } = userStore;
	const { userOptions } = optionsStore;
	const { language } = userOptions;
	const { friends, friendRequests, sentFriendRequests, users } = communityStore;

	const [mode, setMode] = useState<UserMode>('friends');
	const list = useMemo(() => {
		if (mode === 'friends') return friends;
		else if (mode === 'requests') return friendRequests;
		else if (mode === 'myRequests') return sentFriendRequests;
		return {};
	}, [mode, friends, friendRequests, sentFriendRequests]);

	const icon = useCallback(
		(key: string) => {
			if (mode === 'friends')
				return (
					<Col span={1}>
						<Popconfirm
							title={languages.removeFriendConfirm[language]}
							onConfirm={() => removeFriend(user.uid, key)}
						>
							{MyIcon(UserDeleteOutlined, isSmallScreen, false)}
						</Popconfirm>
					</Col>
				);
			else if (mode === 'requests')
				return (
					<>
						<Col span={1}>
							<Popconfirm
								title={languages.declineRequestConfirm[language]}
								onConfirm={() => acceptRequest(user.uid, key)}
							>
								{MyIcon(UserAddOutlined, isSmallScreen, false)}
							</Popconfirm>
						</Col>
						<Col span={1}>
							<Popconfirm
								title={languages.declineRequestConfirm[language]}
								onConfirm={() => declineRequest(user.uid, key)}
							>
								{MyIcon(UserDeleteOutlined, isSmallScreen, false)}
							</Popconfirm>
						</Col>
					</>
				);
			else if (mode === 'myRequests')
				return (
					<Col span={1}>
						<Popconfirm
							title={languages.cancelRequestConfirm[language]}
							onConfirm={() => cancelRequest(user.uid, key)}
						>
							{MyIcon(UserDeleteOutlined, isSmallScreen, false)}
						</Popconfirm>
					</Col>
				);
		},
		[user.uid, isSmallScreen, mode, language]
	);

	return (
		<Flex
			style={{ inlineSize: isSmallScreen ? '100%' : '50%' }}
			vertical
			gap={isSmallScreen ? 8 : 16}
		>
			<UserModeSelect
				value={mode}
				onChange={setMode}
			/>
			<List style={{ inlineSize: '100%' }}>
				{Object.keys(list).map((key: string) => (
					<Item key={key}>
						<Col span={20}>{users[key]?.nickname}</Col>
						{icon(key)}
					</Item>
				))}
			</List>
		</Flex>
	);
});

export default UsersList;
