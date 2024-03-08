import React, { useCallback } from 'react';
import firebaseApp from '../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import constants from '../settings/constants';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';
import languages from 'settings/languages';
import { Button } from 'antd';

const SignOutButton: React.FC = observer(() => {
	const { language, setLogged } = userStore;
	const { setList } = listStore;
	const { setCategories } = categoryStore;
	const auth = getAuth(firebaseApp);

	const logOut = useCallback(async () => {
		try {
			await signOut(auth);
			setLogged(false);
			setList([]);
			setCategories([constants.defaultCategory]);
		} catch (error: any) {
			alert(error.message);
		}
	}, [auth, setCategories, setList, setLogged]);

	return (
		<Button
			danger
			onClick={logOut}
		>
			{languages.signOut[language]}
		</Button>
	);
});

export default SignOutButton;
