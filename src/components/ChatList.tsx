import { List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { communityStore } from 'utils/communityStore';
import { MyTitle } from './Items';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import { Chat } from 'settings/interfaces';
import { getChatInfo } from 'utils/community';

interface Props {
	selectedChatId: string | null;
	setCurrentChatId: Dispatch<SetStateAction<string | null>>;
}

const ChatList: React.FC<Props> = observer(
	({ selectedChatId, setCurrentChatId }) => {
		const { myUser } = communityStore;

		const { user } = myUser;

		return (
			<List>
				{user?.chats &&
					Object.keys(user?.chats).map((key: string) => (
						<ChatListItem
							key={key}
							id={key}
							selected={selectedChatId === key}
							setCurrentChatId={setCurrentChatId}
						/>
					))}
			</List>
		);
	}
);

interface ItemProps {
	id: string;
	selected: boolean;
	setCurrentChatId: Dispatch<SetStateAction<string | null>>;
}

const ChatListItem: React.FC<ItemProps> = observer(
	({ id, selected, setCurrentChatId }) => {
		const { isSmallScreen } = userStore;
		const { userOptions } = optionsStore;

		const [chatInfo, setChatInfo] = useState<Chat['info'] | null>(null);

		useEffect(() => {
			getChatInfo(id, setChatInfo);
		}, [id]);

		const handleSelection = useCallback(() => {
			setCurrentChatId(id);
		}, [setCurrentChatId, id]);

		return (
			<Item
				style={{
					opacity: selected ? '.5' : '1',
					cursor: 'pointer',
					inlineSize: '100%',
				}}
				onClick={handleSelection}
			>
				{MyTitle(
					chatInfo?.title as string,
					null,
					isSmallScreen,
					userOptions.language,
					false,
					undefined
				)}
			</Item>
		);
	}
);

export default ChatList;
