import { onValue, ref, remove, set } from 'firebase/database';
import { database } from './firebase';
import { Chat, Message, User } from 'settings/interfaces';
import uniqid from 'uniqid';
import dayjs from 'dayjs';
import constants from 'settings/constants';

export const updateUser = (uid: string, user?: User) => {
	try {
		set(ref(database, `users/${uid}`), user || constants.emptyUser);
	} catch (error) {
		alert(error);
	}
};

export const sendRequest = (
	uid: string,
	toSend: string,
	friendRequests: { [key: string]: true }
) => {
	try {
		if (Object.keys(friendRequests).includes(toSend)) {
			acceptRequest(uid, toSend);
		} else {
			set(ref(database, `users/${toSend}/friendRequests/${uid}`), true);
			set(ref(database, `users/${uid}/sentFriendRequests/${toSend}`), true);
		}
	} catch (error) {
		alert(error);
	}
};

export const cancelRequest = (uid: string, toCancel: string) => {
	try {
		remove(ref(database, `users/${toCancel}/friendRequests/${uid}`));
		remove(ref(database, `users/${uid}/sentFriendRequests/${toCancel}`));
	} catch (error) {
		alert(error);
	}
};

export const acceptRequest = (uid: string, toAccept: string) => {
	try {
		remove(ref(database, `users/${uid}/friendRequests/${toAccept}`));
		remove(ref(database, `users/${toAccept}/sentFriendRequests/${uid}`));
		set(ref(database, `users/${uid}/friends/${toAccept}`), true);
		set(ref(database, `users/${toAccept}/friends/${uid}`), true);
	} catch (error) {
		alert(error);
	}
};

export const declineRequest = (uid: string, toDecline: string) => {
	try {
		remove(ref(database, `users/${uid}/friendRequests/${toDecline}`));
		remove(ref(database, `users/${toDecline}/sentFriendRequests/${uid}`));
	} catch (error) {
		alert(error);
	}
};

export const removeFriend = (uid: string, toDelete: string) => {
	try {
		remove(ref(database, `users/${uid}/friends/${toDelete}`));
		remove(ref(database, `users/${toDelete}/friends/${uid}`));
	} catch (error) {
		alert(error);
	}
};

export const createChat = (uid: string, title: string, users?: string[]) => {
	try {
		const usersToAdd = users ? [...users, uid] : [uid];
		const chatId: string = uniqid();
		const chatInfo: Chat['info'] = {
			title: title,
			createdAt: dayjs().valueOf(),
			members: usersToAdd.reduce(
				(acc: { [key: string]: true }, key: string) => {
					acc[key] = true;
					return acc;
				},
				{}
			),
		};
		set(ref(database, `chats/${chatId}/info`), chatInfo);
		usersToAdd.forEach((user: string) => {
			set(ref(database, `users/${user}/chats/${chatId}`), true);
		});
	} catch (error) {
		alert(error);
	}
};

export const inviteFriendsToChat = (
	chatId: string,
	usersToInvite: string[]
) => {
	try {
		usersToInvite.forEach((id: string) => {
			set(ref(database, `chats/${chatId}/info/members/${id}`), true);
			set(ref(database, `users/${id}/chats/${chatId}`), true);
		});
	} catch (error) {
		alert(error);
	}
};

export const getChatInfo = (
	chatId: string | null,
	setChatInfo: (info: Chat['info']) => void
) => {
	try {
		onValue(ref(database, `chats/${chatId}/info`), (snapshot) => {
			const data = snapshot.val() || {};
			setChatInfo(data);
		});
	} catch (error) {
		alert(error);
	}
};

export const getAllUsers = (setUsers: (users: string[]) => void) => {
	try {
		onValue(ref(database, `users/`), (snapshot) => {
			const data = snapshot.val();
			setUsers(Object.keys(data) || {});
		});
	} catch (error) {
		alert(error);
	}
};

export const getMyUser = (
	id: string | null,
	setUserInfo: (info: User) => void
) => {
	try {
		onValue(ref(database, `users/${id}`), (snapshot) => {
			const data = snapshot.val();
			setUserInfo(data);
		});
	} catch (error) {
		alert(error);
	}
};

export const getUserInfo = (
	id: string | null,
	setUserInfo: (info: User['info']) => void
) => {
	try {
		onValue(ref(database, `users/${id}/info`), (snapshot) => {
			const data = snapshot.val();
			setUserInfo(data || {});
		});
	} catch (error) {
		alert(error);
	}
};

export const getUsersInfo = (
	ids: Chat['info']['members'],
	setUsersInfo: (info: { [key: string]: User['info'] }) => void
) => {
	try {
		const info: { [key: string]: User['info'] } = {};
		Object.keys(ids).forEach((id: string) => {
			onValue(ref(database, `users/${id}/info`), (snapshot) => {
				const data = snapshot.val();
				info[id] = data;
			});
		});
		setUsersInfo(info);
	} catch (error) {
		alert(error);
	}
};

export const deleteChat = (
	chatId: string,
	members: Chat['info']['members']
) => {
	try {
		remove(ref(database, `chats/${chatId}`));
		Object.keys(members).forEach((id: string) =>
			remove(ref(database, `users/${id}/chats/${chatId}`))
		);
	} catch (error) {
		alert(error);
	}
};

export const exitFromChat = (
	uid: string,
	chatId: string,
	members: { [key: string]: true }
) => {
	try {
		remove(ref(database, `chats/${chatId}/info/members/${uid}`));
		remove(ref(database, `users/${uid}/chats/${chatId}`));
		Object.keys(members).length === 1 && deleteChat(chatId, members);
	} catch (error) {
		alert(error);
	}
};

export const getChatMessages = (
	chatId: string,
	setMessages: (arg0: Chat['messages']) => void
) => {
	try {
		const unsubscribe = onValue(
			ref(database, `chats/${chatId}/messages`),
			(snapshot) => {
				const data = snapshot.val();
				setMessages(data);
			}
		);
		return unsubscribe;
	} catch (error) {
		alert(error);
	}
};

export const sendMessage = async (
	uid: string,
	chatId: string,
	text: string
) => {
	const message: Message = {
		sender: uid,
		text: text,
		sentAt: dayjs().valueOf(),
	};
	try {
		set(ref(database, `chats/${chatId}/messages/${uniqid()}`), message);
	} catch (error) {
		alert(error);
	}
};

export const editMessage = (
	chatId: string,
	messageId: string,
	text: string
) => {
	try {
		set(ref(database, `chats/${chatId}/messages/${messageId}/text`), text);
		set(
			ref(database, `chats/${chatId}/messages/${messageId}/editedAt`),
			dayjs().valueOf()
		);
	} catch (error) {
		alert(error);
	}
};

export const deleteMessage = (chatId: string | null, messageId: string) => {
	try {
		remove(ref(database, `chats/${chatId}/messages/${messageId}`));
	} catch (error) {
		alert(error);
	}
};
