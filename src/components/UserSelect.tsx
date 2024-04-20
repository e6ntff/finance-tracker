import {
	CheckOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
} from '@ant-design/icons';
import { Flex, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { cancelRequest, getAllUsers, sendRequest } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import { MyIcon } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';

const UserSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;

	const { myUser } = communityStore;

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
				.filter((key: string) => key !== myUser.id)
				.map((key: string) => ({
					value: key,
					label: <UserItem userId={key} />,
				}))}
		/>
	);
});

export default UserSelect;

interface ItemProps {
	userId: string;
}

const UserItem: React.FC<ItemProps> = observer(({ userId }) => {
	const { isSmallScreen, UID } = userStore;
	const { userOptions } = optionsStore;
	const { language } = userOptions;
	const { myUser } = communityStore;

	const { id, user } = myUser;

	return (
		<Flex justify='space-between'>
			{userId}
			{Object.keys(user?.sentFriendRequests).includes(id) ||
			Object.keys(user?.friends).includes(id)
				? MyIcon(
						Object.keys(user?.friends).includes(id)
							? CheckOutlined
							: UserDeleteOutlined,
						isSmallScreen,
						{
							onClick: () => {
								!Object.keys(user?.friends).includes(id) &&
									cancelRequest(UID, id);
							},
							title: Object.keys(user?.friends).includes(id)
								? languages.alreadyFriends[language]
								: languages.cancelRequestConfirm[language],
						}
				  )
				: MyIcon(UserAddOutlined, isSmallScreen, {
						onClick: () => {
							sendRequest(id, userId, user?.friendRequests);
						},
						title: languages.sendRequest[language],
				  })}
		</Flex>
	);
});
