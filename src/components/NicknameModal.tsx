import { Input, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { userStore } from 'utils/userStore';
import { updateUser } from 'utils/community';

const NicknameModal: React.FC = observer(() => {
	const {
		isNicknameModalOpened,
		setIsTourStarted,
		setIsNicknameModalOpened,
		setLogged,
		UID,
	} = userStore;

	const [nickname, setNickname] = useState<string>('');

	const handleSubmit = useCallback(() => {
		updateUser(UID, nickname);
		setIsNicknameModalOpened(false);
		setLogged(true);
		setIsTourStarted(true);
	}, [setIsNicknameModalOpened, nickname, setLogged, setIsTourStarted, UID]);

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
