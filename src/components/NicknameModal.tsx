import { Flex, Form, Input, Modal, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { userStore } from 'utils/userStore';
import { findUser, updateUser } from 'utils/community';
import { WarningOutlined } from '@ant-design/icons';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';

const NicknameModal: React.FC = observer(() => {
	const {
		isNicknameModalOpened,
		setIsTourStarted,
		setIsNicknameModalOpened,
		setLogged,
		UID,
	} = userStore;

	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [nickname, setNickname] = useState<string>('');

	const [inUse, setInUse] = useState<boolean>(false);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setInUse(false);
			setNickname(event.target.value);
		},
		[setInUse, setNickname]
	);

	const alreadyInUseText = useMemo(
		() => (
			<Flex gap={4}>
				<WarningOutlined />
				<Typography.Text type='danger'>
					{languages.nicknameInUse[language]}
				</Typography.Text>
			</Flex>
		),
		[language]
	);

	const handleSubmit = useCallback(() => {
		findUser(nickname)
			.then(() => {
				setInUse(true);
			})
			.catch(() => {
				updateUser(UID, nickname);
				setIsNicknameModalOpened(false);
				setLogged(true);
				setIsTourStarted(true);
			});
	}, [setIsNicknameModalOpened, nickname, setLogged, setIsTourStarted, UID]);

	return (
		<Modal
			open={isNicknameModalOpened}
			onOk={handleSubmit}
		>
			<Form>
				<Form.Item label={languages.nickname[language]}>
					<Input
						placeholder='Nickname'
						onChange={handleChange}
					/>
				</Form.Item>
				{inUse && alreadyInUseText}
			</Form>
		</Modal>
	);
});

export default NicknameModal;
