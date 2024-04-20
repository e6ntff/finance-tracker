import { onValue, ref, remove, set } from 'firebase/database';
import { database } from './firebase';
import { Chat, Message, User } from 'settings/interfaces';
import uniqid from 'uniqid';
import dayjs from 'dayjs';

export const updateUser = (UID: string, id: string) => {
	try {
		set(ref(database, `pairs/${UID}`), id);
	} catch (error) {
		console.error(error);
	}
};

export const sendRequest = (
	id: string,
	toSend: string,
	friendRequests: { [key: string]: true }
) => {
	try {
		if (Object.keys(friendRequests).includes(toSend)) {
			acceptRequest(id, toSend);
		} else {
			set(ref(database, `users/${toSend}/friendRequests/${id}`), true);
			set(ref(database, `users/${id}/sentFriendRequests/${toSend}`), true);
		}
	} catch (error) {
		console.error(error);
	}
};

export const cancelRequest = (id: string, toCancel: string) => {
	try {
		remove(ref(database, `users/${toCancel}/friendRequests/${id}`));
		remove(ref(database, `users/${id}/sentFriendRequests/${toCancel}`));
	} catch (error) {
		console.error(error);
	}
};

export const acceptRequest = (id: string, toAccept: string) => {
	try {
		remove(ref(database, `users/${id}/friendRequests/${toAccept}`));
		remove(ref(database, `users/${toAccept}/sentFriendRequests/${id}`));
		set(ref(database, `users/${id}/friends/${toAccept}`), true);
		set(ref(database, `users/${toAccept}/friends/${id}`), true);
	} catch (error) {
		console.error(error);
	}
};

export const declineRequest = (id: string, toDecline: string) => {
	try {
		remove(ref(database, `users/${id}/friendRequests/${toDecline}`));
		remove(ref(database, `users/${toDecline}/sentFriendRequests/${id}`));
	} catch (error) {
		console.error(error);
	}
};

export const removeFriend = (id: string, toDelete: string) => {
	try {
		remove(ref(database, `users/${id}/friends/${toDelete}`));
		remove(ref(database, `users/${toDelete}/friends/${id}`));
	} catch (error) {
		console.error(error);
	}
};

export const createChat = (id: string, title: string, users?: string[]) => {
	try {
		const usersToAdd = users ? [...users, id] : [id];
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
	}
};

export const findUser: (id: string) => Promise<void> = (id: string) =>
	new Promise((res, rej) => {
		try {
			onValue(ref(database, `users/${id}`), (snapshot) => {
				const data = snapshot.val();
				data ? res() : rej();
			});
		} catch (error) {
			console.error(error);
		}
	});

export const getMyUserId: (
	UID: string,
	setUserId: (id: string) => void
) => Promise<string> = (UID: string, setUserId: (id: string) => void) =>
	new Promise((res) => {
		try {
			onValue(ref(database, `pairs/${UID}`), (snapshot) => {
				const data = snapshot.val();
				setUserId(data);
				res(data as string);
			});
		} catch (error) {
			console.error(error);
		}
	});

export const getMyUserUser = (
	id: string,
	setUserUser: (user: User) => void
) => {
	try {
		onValue(ref(database, `users/${id}`), (snapshot) => {
			const data = snapshot.val();
			setUserUser(data);
		});
	} catch (error) {
		console.error(error);
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
		console.error(error);
	}
};

export const exitFromChat = (
	id: string,
	chatId: string,
	members: { [key: string]: true }
) => {
	try {
		remove(ref(database, `chats/${chatId}/info/members/${id}`));
		remove(ref(database, `users/${id}/chats/${chatId}`));
		Object.keys(members).length === 1 && deleteChat(chatId, members);
	} catch (error) {
		console.error(error);
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
		console.error(error);
	}
};

export const sendMessage = async (id: string, chatId: string, text: string) => {
	const message: Message = {
		sender: id,
		text: text,
		sentAt: dayjs().valueOf(),
	};
	try {
		text !== '' &&
			set(ref(database, `chats/${chatId}/messages/${uniqid()}`), message);
	} catch (error) {
		console.error(error);
	}
};

export const editMessage = (
	chatId: string | null,
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
		console.error(error);
	}
};

export const deleteMessage = (chatId: string | null, messageId: string) => {
	try {
		remove(ref(database, `chats/${chatId}/messages/${messageId}`));
	} catch (error) {
		console.error(error);
	}
};

export const setOnline = (id: string, value: boolean) => {
	try {
		id && set(ref(database, `users/${id}/online`), value);
	} catch (error) {
		console.error(error);
	}
};

export const checkOnline = (
	id: string,
	setOnline: (id: string, online: boolean) => void
) => {
	try {
		const unsubscribe = onValue(
			ref(database, `users/${id}/online`),
			(snapshot) => {
				const data = snapshot.val();
				data ? setOnline(id, true) : setOnline(id, false);
			}
		);
		return unsubscribe;
	} catch (error) {
		console.error(error);
	}
};
