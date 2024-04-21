import { ArrowDownOutlined, SendOutlined } from '@ant-design/icons';
import { Badge, Flex } from 'antd';
import Search from 'antd/es/input/Search';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { sendMessage } from 'utils/community';
import { userStore } from 'utils/userStore';
import { MyIcon } from './Items';
import Scrollbars from 'react-custom-scrollbars';
import { communityStore } from 'utils/communityStore';

interface Props {
	chatId: string;
	scrollbarsRef: React.MutableRefObject<Scrollbars | null>;
	stuck: boolean;
	hasNewMessages: boolean;
}

const ChatInput: React.FC<Props> = observer(
	({ chatId, scrollbarsRef, stuck, hasNewMessages }) => {
		const { isSmallScreen } = userStore;

		const { myUser, updates } = communityStore;

		const { id } = myUser;

		const [message, setMessage] = useState<string>('');

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				setMessage(event.target.value);
			},
			[setMessage]
		);

		const send = useCallback(() => {
			chatId &&
				sendMessage(id, chatId, message).then(() => {
					scrollbarsRef.current?.scrollToBottom();
					setMessage('');
				});
		}, [id, chatId, message, scrollbarsRef]);

		const scrollDownArrow = useMemo(
			() =>
				MyIcon(ArrowDownOutlined, isSmallScreen, {
					onClick: () => scrollbarsRef.current?.scrollToBottom(),
				}),
			[isSmallScreen, scrollbarsRef]
		);

		const chatInput = useMemo(
			() => (
				<Search
					value={message}
					onChange={handleChange}
					enterButton={<SendOutlined />}
					size='large'
					onSearch={send}
				/>
			),
			[message, handleChange, send]
		);

		return (
			<Flex
				style={{
					position: 'relative',
					paddingInline: isSmallScreen ? '.5em' : '1em',
				}}
			>
				{!stuck && (
					<Flex style={{ position: 'absolute', right: '0', bottom: '4em' }}>
						<Badge count={updates.chat}>{scrollDownArrow}</Badge>
					</Flex>
				)}
				{chatInput}
			</Flex>
		);
	}
);

export default ChatInput;
