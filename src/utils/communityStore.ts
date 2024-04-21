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
	onlineFriends: { [key: string]: boolean } = {};
	messages: Chat['messages'] = {};
	updates: { chat: number; friends: number } = { chat: 0, friends: 0 };

	setChatUpdates = (value: number) => {
		this.updates = { ...this.updates, chat: value };
	};

	setFriendsUpdates = (value: number) => {
		this.updates = { ...this.updates, friends: value };
	};

	setOnlineFriend = (id: string, value: boolean) => {
		this.onlineFriends[id] = value;
	};

	clearOnlineFriends = () => {
		this.onlineFriends = {};
	};

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
