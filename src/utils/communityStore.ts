import { makeAutoObservable } from 'mobx';
import { configure } from 'mobx';
import { Chat, User } from 'settings/interfaces';

configure({
	enforceActions: 'never',
});

class CommunityStore {
	myUser: {
		id: string;
		user: User;
	} = {
		id: '',
		user: {
			friends: {},
			friendRequests: {},
			sentFriendRequests: {},
			chats: {},
		},
	};
	messages: Chat['messages'] = {};

	setMessages = (messages: typeof this.messages) => {
		this.messages = messages;
	};

	setUserUser = (user: typeof this.myUser.user) => {
		if (user) {
			this.myUser = {
				...this.myUser,
				user: {
					friends: user?.friends || {},
					friendRequests: user?.friendRequests || {},
					sentFriendRequests: user?.sentFriendRequests || {},
					chats: user?.chats || {},
				},
			};
		}
	};

	setUserId = (id: typeof this.myUser.id) => {
		if (id) {
			this.myUser = {
				...this.myUser,
				id: id,
			};
		}
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const communityStore = new CommunityStore();
