import { onValue, ref, remove, set } from 'firebase/database';
import { database } from './firebase';
import { User } from 'settings/interfaces';

export const updateUser = (uid: string, user: User) => {
	try {
		set(ref(database, `users/${uid}`), user);
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

export const getSentFriendRequests = (
	uid: string,
	setSentFriendRequests: (arg0: { [key: string]: true }) => void
) => {
	try {
		onValue(ref(database, `users/${uid}/sentFriendRequests`), (snapshot) => {
			const data = snapshot.val();
			setSentFriendRequests(data || {});
		});
	} catch (error) {
		alert(error);
	}
};

export const getFriendRequests = (
	uid: string,
	setFriendRequests: (arg0: { [key: string]: true }) => void
) => {
	try {
		onValue(ref(database, `users/${uid}/friendRequests`), (snapshot) => {
			const data = snapshot.val();
			setFriendRequests(data || {});
		});
	} catch (error) {
		alert(error);
	}
};

export const getFriends = (
	uid: string,
	setFriends: (arg0: { [key: string]: true }) => void
) => {
	try {
		onValue(ref(database, `users/${uid}/friends`), (snapshot) => {
			const data = snapshot.val();
			setFriends(data || {});
		});
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
