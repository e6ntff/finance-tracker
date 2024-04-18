import {
	CheckOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
} from '@ant-design/icons';
import { Flex, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
	cancelRequest,
	getAllUsers,
	getUserInfo,
	sendRequest,
} from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import { MyIcon } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { User } from 'settings/interfaces';

const UserSelect: React.FC = observer(() => {
	const { isSmallScreen, UID } = userStore;

	const [users, setUsers] = useState<string[]>([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, []);

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			labelInValue
			showSearch
			value={null}
			style={{ inlineSize: isSmallScreen ? '100%' : '50%' }}
			options={users
				.filter((key: string) => key !== UID)
				.map((key: string) => ({
					value: key,
					label: <UserItem id={key} />,
				}))}
		/>
	);
});

export default UserSelect;

interface ItemProps {
	id: string;
}

const UserItem: React.FC<ItemProps> = observer(({ id }) => {
	const { isSmallScreen, UID } = userStore;
	const { userOptions } = optionsStore;
	const { language } = userOptions;
	const { user } = communityStore;

	const { sentFriendRequests, friends, friendRequests } = user;

	const [userInfo, setUserInfo] = useState<User['info'] | null>(null);

	useEffect(() => {
		getUserInfo(id, setUserInfo);
		// eslint-disable-next-line
	}, []);

	console.log(userInfo);

	return (
		<Flex justify='space-between'>
			{userInfo?.nickname}
			{Object.keys(sentFriendRequests).includes(id) ||
			Object.keys(friends).includes(id)
				? MyIcon(
						Object.keys(friends).includes(id)
							? CheckOutlined
							: UserDeleteOutlined,
						isSmallScreen,
						{
							onClick: () => {
								!Object.keys(friends).includes(id) && cancelRequest(UID, id);
							},
							title: Object.keys(friends).includes(id)
								? languages.alreadyFriends[language]
								: languages.cancelRequest[language],
						}
				  )
				: MyIcon(UserAddOutlined, isSmallScreen, {
						onClick: () => {
							sendRequest(UID, id, friendRequests);
						},
						title: languages.sendRequest[language],
				  })}
		</Flex>
	);
});
