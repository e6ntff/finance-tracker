import { makeAutoObservable } from 'mobx';
import { configure } from 'mobx';
import constants from 'settings/constants';
import { Chat, User } from 'settings/interfaces';

configure({
	enforceActions: 'never',
});

class CommunityStore {
	user: User = constants.emptyUser;
	usersInfo: { [key: string]: User['info'] } = {};
	messages: Chat['messages'] | null = null;

	setUsersInfo = (info: typeof this.usersInfo) => {
		this.usersInfo = info;
	};

	setMessages = (messages: typeof this.messages) => {
		this.messages = messages;
	};

	setUser = (user: typeof this.user) => {
		this.user = {
			info: {
				nickname: user.info.nickname || '',
				createdAt: user.info.createdAt || 0,
				image: user.info.image || '',
			},
			friends: user.friends || {},
			friendRequests: user.friendRequests || {},
			sentFriendRequests: user.sentFriendRequests || {},
			chats: user.chats || {},
		};
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const communityStore = new CommunityStore();
