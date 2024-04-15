import { Divider, Flex } from 'antd';
import ChatInput from 'components/ChatInput';
import ChatList from 'components/ChatList';
import ChatListHeader from 'components/ChatListHeader';
import CurrentChat from 'components/CurrentChat';
import CurrentChatHeader from 'components/CurrentChatHeader';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';

const Chats: React.FC = observer(() => {
	const scrollbarsRef = useRef<Scrollbars | null>(null);

	const [currentChatId, setCurrentChatId] = useState<string | null>(null);
	const [stuckToBottom, setStuckToBottom] = useState<boolean>(true);
	const [hasNewMessages, setHasNewMessages] = useState<boolean>(false);

	const onUpdate = (values: positionValues) => {
		setStuckToBottom(values.top >= 0.999);
		values.top >= 0.999 && setHasNewMessages(false);
	};

	return (
		<Flex style={{ blockSize: '75dvh' }}>
			<Flex
				vertical
				style={{ inlineSize: '25%' }}
			>
				<ChatListHeader />
				<Scrollbars autoHide>
					<ChatList
						selectedChatId={currentChatId}
						selectChat={setCurrentChatId}
					/>
				</Scrollbars>
			</Flex>
			<Divider
				type='vertical'
				style={{ height: 'unset', margin: 0 }}
			/>
			<Flex
				vertical
				style={{ inlineSize: '75%' }}
			>
				<CurrentChatHeader chatId={currentChatId} />
				<Divider />
				<Scrollbars
					onUpdate={onUpdate}
					autoHide
					ref={scrollbarsRef}
				>
					<CurrentChat
						chatId={currentChatId}
						scrollbarsRef={scrollbarsRef}
						stuck={stuckToBottom}
						setHasNewMessages={setHasNewMessages}
					/>
				</Scrollbars>
				{currentChatId && (
					<ChatInput
						chatId={currentChatId}
						scrollbarsRef={scrollbarsRef}
						stuck={stuckToBottom}
						hasNewMessages={hasNewMessages}
					/>
				)}
			</Flex>
		</Flex>
	);
});

export default Chats;
