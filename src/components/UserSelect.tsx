import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Flex, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { cancelRequest, sendRequest } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import { MyIconWithTooltip } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';

const UserSelect: React.FC = observer(() => {
	const { isSmallScreen, user } = userStore;
	const { userOptions } = optionsStore;
	const { users, sentFriendRequests } = communityStore;

	const [open, setOpen] = useState<boolean>(false);

	const UserItem = useCallback(
		(key: string) => {
			return (
				<Flex justify='space-between'>
					{users[key]?.nickname}
					{sentFriendRequests && Object.keys(sentFriendRequests).includes(key)
						? MyIconWithTooltip(
								languages.sendRequest[userOptions.language],
								isSmallScreen,
								UserDeleteOutlined,
								false,
								() => {
									cancelRequest(user.uid, key);
								}
						  )
						: MyIconWithTooltip(
								languages.sendRequest[userOptions.language],
								isSmallScreen,
								UserAddOutlined,
								false,
								() => {
									sendRequest(user.uid, key);
								}
						  )}
				</Flex>
			);
		},
		[users, isSmallScreen, user.uid, userOptions.language, sentFriendRequests]
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
