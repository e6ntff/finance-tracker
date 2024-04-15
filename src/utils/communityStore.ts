import { makeAutoObservable } from 'mobx';
import { configure } from 'mobx';
import { User } from 'settings/interfaces';

configure({
	enforceActions: 'never',
});

class CommunityStore {
	users: { [key: string]: User } = {};
	friends: { [key: string]: true } = {};
	friendRequests: { [key: string]: true } = {};
	sentFriendRequests: { [key: string]: true } = {};
	chats: { [key: string]: true } = {};

	setChats = (chats: typeof this.chats) => {
		this.chats = chats;
	};

	setUsers = (users: typeof this.users) => {
		this.users = users;
	};

	setFriends = (friends: typeof this.friends) => {
		this.friends = friends;
	};

	setFriendRequests = (friendRequests: typeof this.friendRequests) => {
		this.friendRequests = friendRequests;
	};

	setSentFriendRequests = (
		sentFriendRequests: typeof this.sentFriendRequests
	) => {
		this.sentFriendRequests = sentFriendRequests;
	};

	constructor() {
		makeAutoObservable(this);
	}
}

export const communityStore = new CommunityStore();
