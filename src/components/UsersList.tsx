import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserModeSelect from './UserModeSelect';
import { User, UserMode } from 'settings/interfaces';
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
	getUserInfo,
	removeFriend,
} from 'utils/community';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const UsersList: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { user } = communityStore;

	const { friends, friendRequests, sentFriendRequests } = user;

	const [mode, setMode] = useState<UserMode>('friends');

	const list = useMemo(() => {
		if (mode === 'friends') return friends;
		else if (mode === 'requests') return friendRequests;
		else if (mode === 'myRequests') return sentFriendRequests;
		return {};
	}, [mode, friends, friendRequests, sentFriendRequests]);

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
				{list &&
					Object.keys(list).map((key: string) => (
						<UserItem
							key={key}
							id={key}
							mode={mode}
						/>
					))}
			</List>
		</Flex>
	);
});

interface ItemProps {
	id: string;
	mode: UserMode;
}

const UserItem: React.FC<ItemProps> = observer(({ id, mode }) => {
	const { isSmallScreen, UID } = userStore;
	const { userOptions } = optionsStore;
	const { language } = userOptions;

	const [userInfo, setUserInfo] = useState<User['info'] | null>(null);

	useEffect(() => {
		getUserInfo(id, setUserInfo);
	}, [id]);

	const icon = useCallback(
		(key: string) => {
			if (mode === 'friends')
				return (
					<Col span={1}>
						<Popconfirm
							title={languages.removeFriendConfirm[language]}
							onConfirm={() => removeFriend(UID, key)}
						>
							{MyIcon(UserDeleteOutlined, isSmallScreen, {})}
						</Popconfirm>
					</Col>
				);
			else if (mode === 'requests')
				return (
					<>
						<Col span={1}>
							<Popconfirm
								title={languages.declineRequestConfirm[language]}
								onConfirm={() => acceptRequest(UID, key)}
							>
								{MyIcon(UserAddOutlined, isSmallScreen, {})}
							</Popconfirm>
						</Col>
						<Col span={1}>
							<Popconfirm
								title={languages.declineRequestConfirm[language]}
								onConfirm={() => declineRequest(UID, key)}
							>
								{MyIcon(UserDeleteOutlined, isSmallScreen, {})}
							</Popconfirm>
						</Col>
					</>
				);
			else if (mode === 'myRequests')
				return (
					<Col span={1}>
						<Popconfirm
							title={languages.cancelRequestConfirm[language]}
							onConfirm={() => cancelRequest(UID, key)}
						>
							{MyIcon(UserDeleteOutlined, isSmallScreen, {})}
						</Popconfirm>
					</Col>
				);
		},
		[UID, isSmallScreen, mode, language]
	);
	return (
		<Item>
			<Col span={20}>{userInfo?.nickname}</Col>
			{icon(id)}
		</Item>
	);
});

export default UsersList;
