import {
	CheckOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
} from '@ant-design/icons';
import { Flex, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { cancelRequest, sendRequest } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import { MyIcon } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';

const UserSelect: React.FC = observer(() => {
	const { isSmallScreen, user } = userStore;
	const { userOptions } = optionsStore;
	const { users, sentFriendRequests, friends, friendRequests } = communityStore;

	const [open, setOpen] = useState<boolean>(false);

	const UserItem = useCallback(
		(key: string) => {
			return (
				<Flex justify='space-between'>
					{users[key]?.nickname}
					{Object.keys(sentFriendRequests).includes(key) ||
					Object.keys(friends).includes(key)
						? MyIcon(
								Object.keys(friends).includes(key)
									? CheckOutlined
									: UserDeleteOutlined,
								isSmallScreen,
								false,
								() => {
									!Object.keys(friends).includes(key) &&
										cancelRequest(user.uid, key);
								},
								Object.keys(friends).includes(key)
									? languages.alreadyFriends[userOptions.language]
									: languages.cancelRequest[userOptions.language]
						  )
						: MyIcon(
								UserAddOutlined,
								isSmallScreen,
								false,
								() => {
									sendRequest(user.uid, key, friendRequests);
								},
								languages.sendRequest[userOptions.language]
						  )}
				</Flex>
			);
		},
		[
			users,
			isSmallScreen,
			user.uid,
			userOptions.language,
			sentFriendRequests,
			friendRequests,
			friends,
		]
	);

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			onSearch={(value: string) => setOpen(!!value)}
			open={open}
			labelInValue
			showSearch
			value={null}
			style={{ inlineSize: isSmallScreen ? '100%' : '50%' }}
			options={Object.keys(users)
				.filter((key: string) => key !== user.uid)
				.map((key: string) => ({
					value: key,
					label: UserItem(key),
				}))}
		/>
	);
});

export default UserSelect;
