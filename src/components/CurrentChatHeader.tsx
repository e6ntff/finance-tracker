import { Flex, Select, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { MyIconWithTooltip, MyTitle } from './Items';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { getChatInfo, inviteFriendsToChat } from 'utils/community';
import { Chat } from 'settings/interfaces';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import languages from 'settings/languages';
import { communityStore } from 'utils/communityStore';

interface Props {
	chatId: string | null;
	setCurrentChatId: Dispatch<SetStateAction<string | null>>;
}

const CurrentChatHeader: React.FC<Props> = observer(
	({ chatId, setCurrentChatId }) => {
		const { userOptions } = optionsStore;
		const { isSmallScreen } = userStore;
		const { friends, users } = communityStore;

		const [chatInfo, setChatInfo] = useState<Chat['info']>({
			title: '',
			createdAt: 0,
			members: {},
		});

		useEffect(() => {
			chatId && getChatInfo(chatId, setChatInfo);
			// eslint-disable-next-line
		}, [chatId]);

		const handleChange = useCallback(
			(
				_: null,
				option:
					| {
							value: string;
							label: string;
					  }
					| {
							value: string;
							label: string;
					  }[]
			) => {
				if (!Array.isArray(option)) option = [option];
				chatId &&
					inviteFriendsToChat(
						chatId,
						option.map(({ value }: { value: string; label: string }) => value)
					);
			},
			[chatId]
		);

		return (
			<Flex
				style={{ inlineSize: '100%' }}
				justify='space-between'
			>
				{isSmallScreen &&
					MyIconWithTooltip('', isSmallScreen, ArrowLeftOutlined, false, () =>
						setCurrentChatId(null)
					)}
				{MyTitle(
					chatInfo?.title as string,
					null,
					isSmallScreen,
					userOptions.language,
					false,
					undefined
				)}
				{chatId && chatInfo && (
					<Tooltip
						trigger='click'
						title={
							<Select
								size={isSmallScreen ? 'small' : 'middle'}
								labelInValue
								onChange={handleChange}
								showSearch
								value={null}
								style={{ inlineSize: isSmallScreen ? '10em' : '15em' }}
								options={Object.keys(friends)
									.filter(
										(key: string) =>
											chatInfo.members &&
											!Object.keys(chatInfo?.members).includes(key)
									)
									.map((key: string) => ({
										value: key,
										label: users[key].nickname,
									}))}
							/>
						}
					>
						{MyIconWithTooltip(
							languages.inviteToChat[userOptions.language],
							isSmallScreen,
							PlusOutlined,
							false,
							undefined,
							'bottom'
						)}
					</Tooltip>
				)}
			</Flex>
		);
	}
);

export default CurrentChatHeader;
