import { Input, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { userStore } from 'utils/userStore';
import { updateUser } from 'utils/community';
import { communityStore } from 'utils/communityStore';

const NicknameModal: React.FC = observer(() => {
	const {
		isNicknameModalOpened,
		setIsTourStarted,
		UID,
		setIsNicknameModalOpened,
		setLogged,
	} = userStore;

	const { user } = communityStore;

	const [nickname, setNickname] = useState<string>('');

	const handleSubmit = useCallback(() => {
		updateUser(UID, { ...user, info: { ...user.info, nickname: nickname } });
		setIsNicknameModalOpened(false);
		setLogged(true);
		setIsTourStarted(true);
	}, [
		setIsNicknameModalOpened,
		nickname,
		UID,
		setLogged,
		setIsTourStarted,
		user,
	]);

	return (
		<Modal
			open={isNicknameModalOpened}
			onOk={handleSubmit}
		>
			<Input
				placeholder='Nickname'
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					setNickname(event.target.value)
				}
			></Input>
		</Modal>
	);
});

export default NicknameModal;
