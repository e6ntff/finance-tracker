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
	const { isSmallScreen } = userStore;
	const { myUser } = communityStore;

	const [mode, setMode] = useState<UserMode>('friends');

	const { user } = myUser;

	const list = useMemo(() => {
		if (mode === 'friends') return user?.friends;
		else if (mode === 'requests') return user?.friendRequests;
		else if (mode === 'myRequests') return user?.sentFriendRequests;
		return {};
	}, [mode, user?.friends, user?.friendRequests, user?.sentFriendRequests]);

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
							userId={key}
							mode={mode}
						/>
					))}
			</List>
		</Flex>
	);
});

interface ItemProps {
	userId: string;
	mode: UserMode;
}

const UserItem: React.FC<ItemProps> = observer(({ userId, mode }) => {
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;
	const { language } = userOptions;
	const { myUser } = communityStore;

	const { id } = myUser;

	const icon = useCallback(
		(key: string) => {
			if (mode === 'friends')
				return (
					<Col span={1}>
						<Popconfirm
							title={languages.removeFriendConfirm[language]}
							onConfirm={() => removeFriend(id, key)}
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
								title={languages.acceptRequestConfirm[language]}
								onConfirm={() => acceptRequest(id, key)}
							>
								{MyIcon(UserAddOutlined, isSmallScreen, {})}
							</Popconfirm>
						</Col>
						<Col span={1}>
							<Popconfirm
								title={languages.declineRequestConfirm[language]}
								onConfirm={() => declineRequest(id, key)}
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
							onConfirm={() => cancelRequest(id, key)}
						>
							{MyIcon(UserDeleteOutlined, isSmallScreen, {})}
						</Popconfirm>
					</Col>
				);
		},
		[isSmallScreen, mode, language, id]
	);
	return (
		<Item>
			<Col span={20}>{userId}</Col>
			{icon(userId)}
		</Item>
	);
});

export default UsersList;
