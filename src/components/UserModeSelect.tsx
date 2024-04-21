import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Badge, Drawer, Flex, Segmented } from 'antd';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';
import { UserMode } from 'settings/interfaces';
import { MyIcon } from './Items';
import { SearchOutlined } from '@ant-design/icons';
import UserSelect from './UserSelect';
import { communityStore } from 'utils/communityStore';

interface Props {
	value: UserMode;
	onChange: Dispatch<SetStateAction<UserMode>>;
}

const UserModeSelect: React.FC<Props> = observer(({ value, onChange }) => {
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;
	const { myUser } = communityStore;

	const { user } = myUser;

	const { language } = userOptions;

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const openModal = useCallback(() => {
		setIsModalOpened(true);
	}, [setIsModalOpened]);

	const closeModal = useCallback(() => {
		setIsModalOpened(false);
	}, [setIsModalOpened]);

	return (
		<Flex
			gap={8}
			justify='space-between'
		>
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={value}
				onChange={onChange}
				options={[
					{
						label: (
							<Badge
								size='small'
								count={Object.keys(user?.friendRequests).length}
							>
								{languages.requests[language]}
							</Badge>
						),
						value: 'requests',
					},
					{
						label: languages.myRequests[language],
						value: 'myRequests',
					},
					{
						label: languages.friends[language],
						value: 'friends',
					},
				]}
			/>
			{isSmallScreen &&
				MyIcon(SearchOutlined, isSmallScreen, {
					onClick: openModal,
					title: languages.searchFriends[language],
				})}
			<Drawer
				open={isModalOpened}
				onClose={closeModal}
			>
				<UserSelect />
			</Drawer>
		</Flex>
	);
});

export default UserModeSelect;
