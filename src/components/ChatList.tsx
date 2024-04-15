import { Col, List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Chat } from 'settings/interfaces';
import { deleteChat, getChatInfo } from 'utils/community';
import { communityStore } from 'utils/communityStore';
import { MyIconWithTooltip, MyTitle } from './Items';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
	selectedChatId: string | null;
	selectChat: Dispatch<SetStateAction<string | null>>;
}

const ChatList: React.FC<Props> = observer(({ selectedChatId, selectChat }) => {
	const { chats } = communityStore;

	return (
		<List>
			{Object.keys(chats).map((key: string) => (
				<ChatListItem
					key={key}
					id={key}
					selected={selectedChatId === key}
					onClick={() => selectChat(key)}
				/>
			))}
		</List>
	);
});

interface ItemProps {
	id: string;
	selected: boolean;
	onClick: () => void;
}

const ChatListItem: React.FC<ItemProps> = observer(
	({ id, selected, onClick }) => {
		const { isSmallScreen } = userStore;
		const { userOptions } = optionsStore;
		const [chatInfo, setChatInfo] = useState<Chat['info']>();

		useEffect(() => {
			getChatInfo(id, setChatInfo);
			// eslint-disable-next-line
		}, []);

		const handleDeleting = useCallback(() => {
			deleteChat(id, chatInfo?.members as Chat['info']['members']);
		}, [id, chatInfo]);

		return (
			<Item
				style={{
					opacity: selected ? '.5' : '1',
					cursor: 'pointer',
					inlineSize: '100%',
				}}
				onClick={onClick}
			>
				<Col span={16}>
					{MyTitle(
						chatInfo?.title as string,
						null,
						isSmallScreen,
						userOptions.language,
						false,
						undefined
					)}
				</Col>
				<Col span={2}>
					{MyIconWithTooltip(
						languages.deleteChat[userOptions.language],
						isSmallScreen,
						DeleteOutlined,
						false,
						handleDeleting
					)}
				</Col>
			</Item>
		);
	}
);

export default ChatList;
