import React, { useCallback } from 'react';
import { app } from '../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import constants from '../settings/constants';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';
import { Button } from 'antd';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';
import { setOnline } from 'utils/community';
import { communityStore } from 'utils/communityStore';

interface Props {
	close: () => void;
}

const LogOutButton: React.FC<Props> = observer(({ close }) => {
	const { setLogged, isSmallScreen, setLoading } = userStore;
	const { setUserList } = listStore;
	const { setUserCategories } = categoryStore;
	const { resetOptions, userOptions } = optionsStore;
	const { myUser } = communityStore;

	const auth = getAuth(app);

	const logOut = useCallback(async () => {
		try {
			await signOut(auth);
			setLogged(false);
			setLoading(true);
			setUserList({});
			setUserCategories({ 0: constants.defaultCategory });
			resetOptions();
			setOnline(myUser.id, false);
			close();
			sessionStorage.clear();
		} catch (error: any) {
			alert(error.message);
		}
	}, [
		myUser.id,
		auth,
		setUserCategories,
		setUserList,
		setLogged,
		resetOptions,
		setLoading,
		close,
	]);

	return (
		<Button
			size={isSmallScreen ? 'small' : 'middle'}
			onClick={logOut}
		>
			{languages.logOut[userOptions.language]}
		</Button>
	);
});

export default LogOutButton;
