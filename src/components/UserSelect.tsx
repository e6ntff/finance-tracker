import {
	CheckOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
} from '@ant-design/icons';
import { Flex, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { cancelRequest, findUser, sendRequest } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { userStore } from 'utils/userStore';
import { MyIcon } from './Items';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { debounce } from 'lodash';
import constants from 'settings/constants';

const UserSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;

	const { myUser } = communityStore;

	const [userId, setUser] = useState<string | null>(null);

	const handleSearch = useCallback((id: string) => {
		findUser(id)
			.then(() => setUser(id))
			.catch(() => setUser(null));
	}, []);

	const debouncedHandleSearch = debounce(
		handleSearch,
		constants.optionsDebounceDelay
	);

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			labelInValue
			showSearch
			onSearch={debouncedHandleSearch}
			value={null}
			style={{ inlineSize: isSmallScreen ? '100%' : '50%' }}
			options={
				userId !== myUser.id && userId
					? [
							{
								value: userId,
								label: <UserItem userId={userId} />,
							},
					  ]
					: []
			}
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
